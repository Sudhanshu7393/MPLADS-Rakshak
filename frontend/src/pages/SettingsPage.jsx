import React, { useState, useEffect } from 'react';
import { Sliders, Save, RefreshCw, CheckCircle2, ShieldAlert, Info, RotateCcw, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';
import { useToast } from '../context/ToastContext';

export default function SettingsPage() {
  const { addToast } = useToast();
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
      if (data) {
        setWeights(prev => ({ ...prev, ...data }));
      }
    } catch (e) {
      console.error("Using default risk weights:", e);
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
      addToast('Scoring weights saved! Universe recalculated with updated weights.', 'success');
      setSuccessMsg('Parameters calibrated successfully. Live scores synchronized.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      addToast('Error updating weights: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setWeights({
      costWeight: 0.25,
      delayWeight: 0.20,
      ruleWeight: 0.20,
      similarityWeight: 0.15,
      agencyWeight: 0.10,
      fundEvidenceWeight: 0.10,
      lowThreshold: 39,
      mediumThreshold: 69
    });
    addToast('Reset to statutory default parameters.', 'info');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto font-sans">
      
      <Breadcrumbs />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              RISK SCORING CALIBRATION
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Configurable Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Transparent, administrative weight tuning for multi-signal anomaly decomposition (MoSPI Compliance).
          </p>
        </div>

        <button
          type="button"
          onClick={loadWeights}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-xs transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Reload Config</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-2 shadow-xs animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Calibration Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Signal Contribution Weights</h3>
          </div>
          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
            totalWeightPct === 100 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
              : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
          }`}>
            Total Weight: {totalWeightPct}%
          </span>
        </div>

        <div className="space-y-4 text-xs">
          
          {/* Cost Anomaly */}
          <div className="space-y-1">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-800 dark:text-slate-200">1. Category Peer Cost Anomaly Weight</span>
              <span className="font-mono text-blue-700 dark:text-blue-400 font-bold">{Math.round((weights.costWeight || 0) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={weights.costWeight || 0}
              onChange={(e) => setWeights({ ...weights, costWeight: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Statistical deviation against category peer median and IQR fences.</span>
          </div>

          {/* Delay Anomaly */}
          <div className="space-y-1 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-800 dark:text-slate-200">2. Milestone &amp; Execution Delay Weight</span>
              <span className="font-mono text-blue-700 dark:text-blue-400 font-bold">{Math.round((weights.delayWeight || 0) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={weights.delayWeight || 0}
              onChange={(e) => setWeights({ ...weights, delayWeight: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Elapsed duration vs expected milestone deadlines.</span>
          </div>

          {/* Rule Violation */}
          <div className="space-y-1 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-800 dark:text-slate-200">3. Deterministic Policy Red Flags Weight</span>
              <span className="font-mono text-blue-700 dark:text-blue-400 font-bold">{Math.round((weights.ruleWeight || 0) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={weights.ruleWeight || 0}
              onChange={(e) => setWeights({ ...weights, ruleWeight: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Sanction lead times, 1-year norm, and guideline compliance.</span>
          </div>

          {/* Duplicate / Similarity */}
          <div className="space-y-1 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-800 dark:text-slate-200">4. Semantic &amp; Geospatial Similarity Weight</span>
              <span className="font-mono text-blue-700 dark:text-blue-400 font-bold">{Math.round((weights.similarityWeight || 0) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={weights.similarityWeight || 0}
              onChange={(e) => setWeights({ ...weights, similarityWeight: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500">TF-IDF n-grams + Haversine distance proximity matching.</span>
          </div>

          {/* Agency Pattern */}
          <div className="space-y-1 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-800 dark:text-slate-200">5. Agency Concentration &amp; Pattern Weight</span>
              <span className="font-mono text-blue-700 dark:text-blue-400 font-bold">{Math.round((weights.agencyWeight || 0) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={weights.agencyWeight || 0}
              onChange={(e) => setWeights({ ...weights, agencyWeight: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500">High share of works or high flag density for single agency in district.</span>
          </div>

          {/* Evidence Center Missing Docs */}
          <div className="space-y-1 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-800 dark:text-slate-200">6. Missing Compliance Evidence Weight</span>
              <span className="font-mono text-blue-700 dark:text-blue-400 font-bold">{Math.round((weights.fundEvidenceWeight || 0) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={weights.fundEvidenceWeight || 0}
              onChange={(e) => setWeights({ ...weights, fundEvidenceWeight: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Missing completion certificates, photo verification, or work orders.</span>
          </div>

        </div>

        {/* Risk Level Thresholds */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">Risk Level Classification Bands</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-center">
              <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 block">Low Risk Band</span>
              <span className="font-mono font-bold text-sm text-emerald-900 dark:text-emerald-200">0 – {weights.lowThreshold}</span>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-center">
              <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 block">Medium Risk Band</span>
              <span className="font-mono font-bold text-sm text-amber-900 dark:text-amber-200">{weights.lowThreshold + 1} – {weights.mediumThreshold}</span>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-center">
              <span className="text-[11px] font-semibold text-red-800 dark:text-red-300 block">High Risk Band</span>
              <span className="font-mono font-bold text-sm text-red-900 dark:text-red-200">{weights.mediumThreshold + 1} – 100</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-[#0B2545] dark:bg-blue-600 hover:bg-[#071B30] dark:hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Calibrating Universe...' : 'Save & Recalibrate Universe'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
