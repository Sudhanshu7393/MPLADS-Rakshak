import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Copy, MapPin, Eye, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { formatINR, formatDate } from '../utils/formatters';
import EmptyState from '../components/EmptyState';

export default function SimilarWorksPage() {
  const [similarities, setSimilarities] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSimilarities = async () => {
    setLoading(true);
    try {
      const data = await api.getAllSimilarWorks();
      setSimilarities(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSimilarities();
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black tracking-tight text-slate-900">
              SIMILAR &amp; DUPLICATE WORKS DETECTOR
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {similarities.length} Overlap Pairs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            NLP TF-IDF character/word n-gram vectorization and Haversine geospatial proximity clustering.
          </p>
        </div>
      </div>

      {/* Philosophy Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Human-in-the-Loop Safeguard:</span> Detection produces <strong>“Potentially similar work detected”</strong> rather than “Confirmed Duplicate”. Different phases of a road or separate facilities in the same village may legitimately share titles.
        </div>
      </div>

      {/* Comparison Cards Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-500">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Analyzing semantic and geospatial similarity across all proposals...
        </div>
      ) : similarities.length === 0 ? (
        <EmptyState
          icon={Copy}
          title="No duplicate proposals detected"
          message="All recorded MPLADS proposals exhibit distinct titles, scopes, and geographic coordinates."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {similarities.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3 hover:border-blue-300 transition">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    Source: {item.sourceWorkId}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    Target: {item.targetWorkId}
                  </span>
                </div>

                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-red-100 text-red-800 border border-red-200">
                  {item.similarityScore}% Match
                </span>
              </div>

              {/* Target Project Details */}
              <div className="space-y-1.5 text-xs">
                <div className="font-bold text-slate-900 line-clamp-2">
                  {item.targetWorkName}
                </div>

                <div className="flex items-center gap-4 text-slate-500 text-[11px] pt-1">
                  <span><strong>District:</strong> {item.targetDistrict}</span>
                  <span><strong>Category:</strong> {item.targetCategory}</span>
                  <span><strong>Cost:</strong> {formatINR(item.targetSanctionedAmount)}</span>
                </div>

                {item.distanceMeters !== null && (
                  <div className="flex items-center gap-1 text-[11px] text-red-700 font-semibold pt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Location Proximity: Only {Math.round(item.distanceMeters)} meters apart</span>
                  </div>
                )}
              </div>

              {/* Quick links */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-medium">
                  {item.targetAgency ? `Agency: ${item.targetAgency}` : 'Agency unassigned'}
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/passport/${item.sourceWorkId}`}
                    className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition"
                  >
                    View Source
                  </Link>
                  <Link
                    to={`/passport/${item.targetWorkId}`}
                    className="px-2.5 py-1 rounded bg-gov-navy hover:bg-gov-dark text-white font-semibold text-[11px] transition flex items-center gap-1"
                  >
                    <span>Inspect Target</span>
                    <Eye className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
