import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Camera, MapPin, AlertTriangle, CheckCircle2, Upload,
  RotateCcw, Send, Info, ArrowLeft, Shield, X
} from 'lucide-react';
import { api, getCurrentUser } from '../services/api';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/Breadcrumbs';

const GPS_ACCURACY_WARN_M = 100; // Warn if GPS accuracy worse than 100m
const GPS_ACCURACY_BLOCK_M = 500; // Block if GPS worse than 500m

const EVIDENCE_STATUS_COLORS = {
  SUBMITTED: 'bg-blue-100 text-blue-800 border-blue-200',
  LOCATION_VERIFIED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  LOCATION_MISMATCH: 'bg-red-100 text-red-800 border-red-200',
  UNDER_REVIEW: 'bg-amber-100 text-amber-800 border-amber-200',
  VERIFIED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  REJECTED: 'bg-red-100 text-red-800 border-red-200',
};

export default function CameraCapturePage() {
  const { workId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const user = getCurrentUser();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Camera state
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [capturedImageBlob, setCapturedImageBlob] = useState(null);
  const [capturedImageUrl, setCapturedImageUrl] = useState('');

  // GPS state
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gps, setGps] = useState(null); // { lat, lon, accuracy }
  const [gpsError, setGpsError] = useState('');

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  // Work info
  const [work, setWork] = useState(null);

  useEffect(() => {
    api.getEvidenceForWork(workId).catch(() => {});
    // Fetch work details
    fetch(`/api/works/${workId}`)
      .then(r => r.json())
      .then(w => setWork(w))
      .catch(() => {});
    return () => stopCamera();
  }, [workId]);

  const startCamera = async () => {
    setCameraError('');
    try {
      const constraints = {
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setCameraError('Camera permission denied. Please allow camera access in browser settings and reload.');
      } else if (err.name === 'NotFoundError') {
        setCameraError('No camera found on this device.');
      } else {
        setCameraError('Camera error: ' + err.message);
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(blob => {
      if (blob) {
        setCapturedImageBlob(blob);
        setCapturedImageUrl(URL.createObjectURL(blob));
        stopCamera();
        fetchGPS();
      }
    }, 'image/jpeg', 0.92);
  };

  const retake = () => {
    setCapturedImageBlob(null);
    setCapturedImageUrl('');
    setGps(null);
    setGpsError('');
    setSubmitted(false);
    setResult(null);
    startCamera();
  };

  const fetchGPS = () => {
    setGpsLoading(true);
    setGpsError('');
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by this browser.');
      setGpsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: new Date(pos.timestamp).toISOString()
        });
        setGpsLoading(false);
      },
      (err) => {
        if (err.code === 1) {
          setGpsError('Location access denied. GPS coordinates are required. Please allow location access.');
        } else if (err.code === 2) {
          setGpsError('Location unavailable. Please move to an open area and try again.');
        } else {
          setGpsError('GPS timeout. Please try again in an open area.');
        }
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleSubmit = async () => {
    if (!capturedImageBlob) { addToast('No photo captured', 'error'); return; }
    if (!gps) { addToast('GPS location required. Please allow location access.', 'error'); return; }
    if (gps.accuracy > GPS_ACCURACY_BLOCK_M) {
      addToast(`GPS accuracy too low (${Math.round(gps.accuracy)}m). Move to open area.`, 'error');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('photo', capturedImageBlob, 'evidence.jpg');
      formData.append('capturedLat', gps.lat.toString());
      formData.append('capturedLon', gps.lon.toString());
      formData.append('gpsAccuracy', gps.accuracy.toString());
      formData.append('captureSource', 'CAMERA_LIVE');
      formData.append('capturedAt', new Date().toISOString().split('.')[0]);
      formData.append('uploaderName', user?.fullName || 'Officer');
      formData.append('uploaderRole', user?.role || 'ROLE_DISTRICT_OFFICER');

      const res = await api.captureEvidence(workId, formData);
      setResult(res);
      setSubmitted(true);
      addToast('Evidence submitted successfully!', 'success');
    } catch (err) {
      addToast('Upload failed: ' + err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const gpsAccuracyColor = gps
    ? gps.accuracy <= 30 ? 'text-emerald-700'
      : gps.accuracy <= GPS_ACCURACY_WARN_M ? 'text-amber-700'
      : 'text-red-700'
    : '';

  if (submitted && result) {
    return (
      <div className="p-6 md:p-8 space-y-6 max-w-2xl mx-auto font-sans">
        <Breadcrumbs />
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${result.locationMismatch ? 'bg-amber-100' : 'bg-emerald-100'}`}>
            {result.locationMismatch
              ? <AlertTriangle className="w-8 h-8 text-amber-600" />
              : <CheckCircle2 className="w-8 h-8 text-emerald-600" />}
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {result.locationMismatch ? 'Evidence Submitted — Location Mismatch Flagged' : 'Evidence Successfully Submitted'}
          </h2>
          <p className="text-xs text-slate-500">
            Evidence ID: <span className="font-mono font-bold">{result.evidenceId}</span>
          </p>

          {result.locationMismatch && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 text-left">
              <p className="font-bold mb-1">⚠ Location Mismatch Detected</p>
              <p>Capture location is <strong>{Math.round(result.locationDistanceMeters)}m</strong> away from the registered work location.</p>
              <p className="mt-1 text-amber-700">This has been flagged for officer review. Status: <strong>LOCATION_MISMATCH</strong></p>
            </div>
          )}

          {!result.locationMismatch && result.locationDistanceMeters !== null && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 text-left">
              <p className="font-bold mb-1">✓ GPS Location Verified</p>
              <p>Capture location is within <strong>{Math.round(result.locationDistanceMeters)}m</strong> of the registered work site.</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-xs text-left pt-2">
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">GPS Accuracy</span>
              <span className="font-bold text-slate-900">{Math.round(result.gpsAccuracyMeters)}m</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Status</span>
              <span className={`font-bold px-2 py-0.5 rounded text-[11px] border ${EVIDENCE_STATUS_COLORS[result.verificationStatus] || 'bg-slate-100 text-slate-800'}`}>
                {result.verificationStatus}
              </span>
            </div>
          </div>

          <div className="flex gap-3 justify-center pt-2">
            <Link
              to={`/passport/${workId}`}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
            >
              View Risk Passport
            </Link>
            <button
              onClick={retake}
              className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition border border-slate-200"
            >
              Capture Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-2xl mx-auto font-sans">
      <Breadcrumbs />

      <div className="flex items-center gap-3">
        <Link to={`/passport/${workId}`} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Risk Passport
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1 shadow-sm">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-blue-600" />
          <h1 className="text-base font-extrabold text-slate-900">GEO-VERIFIED COMPLETION EVIDENCE</h1>
        </div>
        <p className="text-xs text-slate-500">
          Capture a completion photo with GPS coordinates for work: <span className="font-mono font-bold text-blue-700">{workId}</span>
        </p>
        {work?.workName && (
          <p className="text-xs text-slate-700 font-medium">{work.workName}</p>
        )}
      </div>

      {/* Step 1: Camera */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold flex items-center justify-center">1</span>
            Capture Photo
          </h3>
        </div>

        {!capturedImageUrl ? (
          <div className="space-y-3 p-4">
            {cameraError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{cameraError}</span>
              </div>
            )}

            {!cameraActive ? (
              <button
                onClick={startCamera}
                className="w-full py-10 border-2 border-dashed border-slate-300 rounded-xl text-xs text-slate-500 font-semibold hover:border-blue-400 hover:bg-blue-50 transition flex flex-col items-center gap-3"
              >
                <Camera className="w-10 h-10 text-slate-300" />
                <span>Tap to Open Camera</span>
                <span className="text-[11px] text-slate-400 font-normal">Uses rear camera on mobile devices</span>
              </button>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden bg-black aspect-video relative">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                    <button
                      onClick={capturePhoto}
                      className="w-16 h-16 rounded-full bg-white border-4 border-slate-300 hover:border-blue-400 shadow-lg transition flex items-center justify-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-red-600" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={stopCamera}
                  className="text-xs text-slate-500 flex items-center gap-1 hover:text-red-600"
                >
                  <X className="w-3.5 h-3.5" /> Cancel camera
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 space-y-3">
            <div className="rounded-xl overflow-hidden aspect-video bg-black">
              <img src={capturedImageUrl} alt="Captured" className="w-full h-full object-cover" />
            </div>
            <button onClick={retake} className="text-xs text-slate-500 flex items-center gap-1 hover:text-blue-600">
              <RotateCcw className="w-3.5 h-3.5" /> Retake photo
            </button>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Step 2: GPS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold flex items-center justify-center">2</span>
            GPS Location
          </h3>
        </div>
        <div className="p-4">
          {gpsLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              Fetching GPS coordinates (high-accuracy)...
            </div>
          )}

          {gpsError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{gpsError}</span>
              </div>
              <button onClick={fetchGPS} className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-[11px] font-semibold">
                Retry GPS
              </button>
            </div>
          )}

          {gps && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Latitude</span>
                  <span className="font-mono font-bold text-slate-900">{gps.lat.toFixed(6)}</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Longitude</span>
                  <span className="font-mono font-bold text-slate-900">{gps.lon.toFixed(6)}</span>
                </div>
              </div>
              <div className={`text-xs font-semibold flex items-center gap-1.5 ${gpsAccuracyColor}`}>
                <MapPin className="w-3.5 h-3.5" />
                GPS Accuracy: ±{Math.round(gps.accuracy)}m
                {gps.accuracy > GPS_ACCURACY_WARN_M && (
                  <span className="text-amber-600 font-normal">— accuracy low, consider moving outdoors</span>
                )}
              </div>
              {gps.accuracy > GPS_ACCURACY_BLOCK_M && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-xs text-red-700">
                  GPS accuracy (±{Math.round(gps.accuracy)}m) is too low to submit. Maximum allowed: ±{GPS_ACCURACY_BLOCK_M}m. Move to open area.
                </div>
              )}
            </div>
          )}

          {!gps && !gpsLoading && !gpsError && capturedImageUrl && (
            <button onClick={fetchGPS} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-500 transition flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Fetch GPS Location
            </button>
          )}

          {!capturedImageUrl && (
            <p className="text-xs text-slate-400">Capture a photo first to enable GPS fetch.</p>
          )}
        </div>
      </div>

      {/* Step 3: Note + Submit */}
      {capturedImageUrl && gps && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold flex items-center justify-center">3</span>
            Submit Evidence
          </h3>

          <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 space-y-1 border border-slate-100">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
              <Shield className="w-3.5 h-3.5 text-blue-600" /> Evidence Metadata
            </div>
            <div>Work ID: <span className="font-mono font-bold">{workId}</span></div>
            <div>Officer: <span className="font-bold">{user?.fullName}</span> ({user?.role?.replace('ROLE_', '')})</div>
            <div>Timestamp: <span className="font-mono">{new Date().toLocaleString('en-IN')}</span></div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={uploading || gps.accuracy > GPS_ACCURACY_BLOCK_M}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading Evidence...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Geo-Verified Evidence
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
            <Info className="w-3 h-3" />
            Photo, GPS coordinates, and timestamp will be permanently recorded in the audit trail.
          </p>
        </div>
      )}
    </div>
  );
}
