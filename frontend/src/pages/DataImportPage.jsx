import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet, 
  RefreshCw, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Info
} from 'lucide-react';
import { api } from '../services/api';
import { formatDate } from '../utils/formatters';

export default function DataImportPage() {
  const [dataStatus, setDataStatus] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Upload & Mapping State
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [columnMappings, setColumnMappings] = useState({});
  const [sourceType, setSourceType] = useState('PUBLIC DATA');
  const [ingesting, setIngesting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const loadStatus = async () => {
    setLoading(true);
    try {
      const [status, hist] = await Promise.all([
        api.getDataStatus(),
        api.getImportHistory()
      ]);
      setDataStatus(status);
      setHistory(hist || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const prev = await api.uploadCSV(file);
      setPreview(prev);
      setColumnMappings(prev.suggestedColumnMappings || {});
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleConfirmIngest = async () => {
    if (!preview) return;
    setIngesting(true);
    try {
      await api.ingestData({
        tempFileId: preview.tempFileId,
        sourceType: sourceType,
        columnMappings: columnMappings
      });
      setSuccessMsg('Dataset successfully validated, mapped, and ingested into PostgreSQL Analytical Store!');
      setPreview(null);
      loadStatus();
    } catch (err) {
      alert('Ingestion error: ' + err.message);
    } finally {
      setIngesting(false);
    }
  };

  const handleLoadDemoDataset = async () => {
    setIngesting(true);
    try {
      await api.loadDemoData();
      setSuccessMsg('Deterministic SIH Demo Dataset (1,600 works) successfully loaded and analyzed!');
      loadStatus();
    } catch (err) {
      alert('Error loading demo dataset: ' + err.message);
    } finally {
      setIngesting(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black tracking-tight text-slate-900">
              DATA INGESTION &amp; QUALITY CENTER
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {dataStatus?.activeSourceType || 'PUBLIC DATA'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Zero-loss flexible CSV/API ingestion pipeline with dynamic schema column mapping and data quality validation.
          </p>
        </div>

        {/* 1-Click Demo Data Ingestion Trigger */}
        <button
          onClick={handleLoadDemoDataset}
          disabled={ingesting}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>{ingesting ? 'Loading & Scoring...' : 'Load SIH Demo Dataset (1,600 Works)'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 3 Data Modes Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
            Mode 1 • Public Data Mode
          </span>
          <h4 className="text-sm font-bold text-slate-900">Open Government Data (OGD)</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Ingests publicly accessible MPLADS records from data.gov.in and MoSPI portals without requiring private credentials.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
            Mode 2 • Authorized Data Mode
          </span>
          <h4 className="text-sm font-bold text-slate-900">Direct eSAKSHI Integration</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Architected to connect securely to authorized government endpoints without altering backend risk analysis models.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
            Mode 3 • Demo / Synthetic Mode
          </span>
          <h4 className="text-sm font-bold text-slate-900">Deterministic SIH Test Bench</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Fixed random-seed benchmark dataset with known anomaly scenarios (cost outliers, timeline delays, duplicate works).
          </p>
        </div>
      </div>

      {/* Live Data Quality Metrics */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Active Data Quality &amp; Completeness Scorecard</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500 block text-[11px]">Total Records</span>
            <span className="text-base font-extrabold text-slate-900">{dataStatus?.totalRecords || 0}</span>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
            <span className="text-emerald-700 block text-[11px]">Valid Clean Records</span>
            <span className="text-base font-extrabold text-emerald-800">{dataStatus?.validRecords || 0}</span>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
            <span className="text-amber-700 block text-[11px]">Records with Warnings</span>
            <span className="text-base font-extrabold text-amber-800">{dataStatus?.warningRecords || 0}</span>
          </div>
          <div className="p-3 rounded-lg bg-red-50 border border-red-100">
            <span className="text-red-700 block text-[11px]">Quarantined / Invalid</span>
            <span className="text-base font-extrabold text-red-800">{dataStatus?.invalidRecords || 0}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500 block text-[11px]">Missing Coordinates</span>
            <span className="text-base font-extrabold text-slate-800">{dataStatus?.missingCoordinates || 0}</span>
          </div>
        </div>
      </div>

      {/* CSV Ingestion & Mapping Area */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Upload New MPLADS Dataset</h3>
          </div>
          <span className="text-xs text-slate-400">Supported: CSV, RFC 4180</span>
        </div>

        {!preview ? (
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center space-y-3 bg-slate-50/50 hover:bg-slate-50 transition">
            <FileSpreadsheet className="w-10 h-10 text-slate-400 mx-auto" />
            <div>
              <label className="cursor-pointer text-xs font-bold text-blue-700 hover:text-blue-800 bg-white px-4 py-2 rounded-lg border border-slate-300 shadow-xs inline-block">
                <span>Select CSV File</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-[11px] text-slate-500">
              Drag &amp; drop or browse. The system automatically inspects headers and suggests column mappings.
            </p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between bg-blue-50/60 p-3 rounded-lg border border-blue-200 text-xs">
              <div>
                <strong>Uploaded File:</strong> {preview.fileName} ({preview.totalRows} sample rows detected)
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-600">Assign Data Mode:</span>
                <select
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value)}
                  className="bg-white border border-slate-300 rounded px-2 py-1 font-bold text-xs"
                >
                  <option value="PUBLIC DATA">PUBLIC DATA</option>
                  <option value="AUTHORIZED DATA">AUTHORIZED DATA</option>
                  <option value="DEMO/SYNTHETIC DATA">DEMO/SYNTHETIC DATA</option>
                </select>
              </div>
            </div>

            {/* Column Mapping Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <div className="bg-slate-50 p-3 font-bold text-slate-700 border-b border-slate-200 flex items-center justify-between">
                <span>Dynamic Schema Column Mapping</span>
                <span className="text-[11px] text-slate-400 font-normal">Map external headers to internal fields</span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {preview.detectedHeaders?.map((header, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between hover:bg-slate-50">
                    <span className="font-mono font-semibold text-slate-800">{header}</span>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <select
                        value={columnMappings[header] || ''}
                        onChange={(e) => setColumnMappings({ ...columnMappings, [header]: e.target.value })}
                        className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">-- Ignore / Skip --</option>
                        {preview.systemFields?.map((sf, i) => (
                          <option key={i} value={sf}>{sf}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={ingesting}
                onClick={handleConfirmIngest}
                className="px-5 py-2 rounded-lg bg-gov-navy hover:bg-gov-dark text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{ingesting ? 'Validating & Running Risk Engine...' : 'Confirm Mapping & Ingest'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ingestion History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 font-bold text-xs text-slate-800">
          Previous Dataset Ingestion Audit Log
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
              <tr>
                <th className="py-2.5 px-4">Import Time</th>
                <th className="py-2.5 px-4">Dataset Name</th>
                <th className="py-2.5 px-4">Mode</th>
                <th className="py-2.5 px-4">Total Records</th>
                <th className="py-2.5 px-4">Valid</th>
                <th className="py-2.5 px-4">Warnings</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {history.map((h, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-mono text-slate-500">{formatDate(h.importedAt)}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{h.fileName}</td>
                  <td className="py-2.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      {h.sourceType}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-mono">{h.totalRecords}</td>
                  <td className="py-2.5 px-4 font-mono text-emerald-700">{h.validRecords}</td>
                  <td className="py-2.5 px-4 font-mono text-amber-700">{h.warningRecords}</td>
                  <td className="py-2.5 px-4 text-emerald-700 font-bold">{h.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
