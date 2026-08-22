import React, { useState, useEffect } from 'react';
import { Sliders, Save, RefreshCw, CheckCircle2, ShieldAlert, Info } from 'lucide-react';
import { api } from '../services/api';

export default function SettingsPage() {
  const [weights, setWeights] = useState({
    costWeight: 0.25,
    delayWeight: 0.20,
    ruleWeight: 0.20,
    similarityWeight: 0.15,
    agencyWeight: 0.10,
    fundEvidenceWeight: 0.10,
    lowThreshold: 39,
    mediumThreshold: 69
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const loadWeights = async () => {
    setLoading(true);
    try {
      const data = await api.getRiskWeights();
      if (data) setWeights(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeights();
  }, []);

  const totalWeightPct = Math.round(
    ((weights.costWeight || 0) +
     (weights.delayWeight || 0) +
     (weights.ruleWeight || 0) +
     (weights.similarityWeight || 0) +
     (weights.agencyWeight || 0) +
     (weights.fundEvidenceWeight || 0)) * 100
  );

  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    try {
      await api.updateRiskWeights(weights);
      setSuccessMsg('Scoring weights updated and universe recalibrated!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      alert('Error updating weights: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black tracking-tight text-slate-900">RISK SCORING CALIBRATION</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
              Configurable Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Transparent, administrative weight tuning for multi-signal anomaly decomposition.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Calibration Form */}
      <form onSubmit={handleSave} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Signal Contribution Weights</h3>
          </div>
          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
            totalWeightPct === 100 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            Total Weight: {totalWeightPct}%
          </span>
        </div>

        <div className="space-y-4 text-xs">
          
          {/* Cost Anomaly */}
          <div className="space-y-1">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-800">1. Category Peer Cost Anomaly Weight</span>
              <span className="font-mono text-blue-700">{Math.round(weights.costWeight * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={weights.costWeight}
              onChange={(e) => setWeights({ ...weights, costWeight: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400">Statistical deviation against category peer median and IQR fences.</span>
          </div>

          {/* Delay Anomaly */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-800">2. Milestone &amp; Execution Delay Weight</span>
              <span className="font-mono text-blue-700">{Math.round(weights.delayWeight * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={weights.delayWeight}
              onChange={(e) => setWeights({ ...weights, delayWeight: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400">Elapsed duration vs expected milestone deadlines.</span>
          </div>

          {/* Rule Violation */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-800">3. Deterministic Policy Red Flags Weight</span>
              <span className="font-mono text-blue-700">{Math.round(weights.ruleWeight * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={weights.ruleWeight}
              onChange={(e) => setWeights({ ...weights, ruleWeight: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400">Sanction lead times, 1-year norm, and guideline compliance.</span>
          </div>

          {/* Duplicate / Similarity */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-800">4. Semantic &amp; Geospatial Similarity Weight</span>
              <span className="font-mono text-blue-700">{Math.round(weights.similarityWeight * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={weights.similarityWeight}
              onChange={(e) => setWeights({ ...weights, similarityWeight: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400">TF-IDF n-grams + Haversine distance proximity matching.</span>
          </div>

          {/* Agency Pattern */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-800">5. Agency Concentration &amp; Pattern Weight</span>
              <span className="font-mono text-blue-700">{Math.round(weights.agencyWeight * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={weights.agencyWeight}
              onChange={(e) => setWeights({ ...weights, agencyWeight: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400">High share of works or high flag density for single agency in district.</span>
          </div>

          {/* Evidence Center Missing Docs */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-800">6. Missing Compliance Evidence Weight</span>
              <span className="font-mono text-blue-700">{Math.round(weights.fundEvidenceWeight * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={weights.fundEvidenceWeight}
              onChange={(e) => setWeights({ ...weights, fundEvidenceWeight: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400">Missing completion certificates, photo verification, or work orders.</span>
          </div>

        </div>

        {/* Risk Level Thresholds */}
        <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
          <span className="font-bold text-slate-900 block">Risk Level Classification Bands</span>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
              <span className="text-[11px] font-semibold text-emerald-800 block">Low Risk Band</span>
              <span className="font-mono font-bold text-sm text-emerald-900">0 – {weights.lowThreshold}</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
              <span className="text-[11px] font-semibold text-amber-800 block">Medium Risk Band</span>
              <span className="font-mono font-bold text-sm text-amber-900">{weights.lowThreshold + 1} – {weights.mediumThreshold}</span>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
              <span className="text-[11px] font-semibold text-red-800 block">High Risk Band</span>
              <span className="font-mono font-bold text-sm text-red-900">{weights.mediumThreshold + 1} – 100</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={loadWeights}
            className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Reset to Defaults
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-gov-navy hover:bg-gov-dark text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Calibrating Universe...' : 'Save & Recalibrate Universe'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
