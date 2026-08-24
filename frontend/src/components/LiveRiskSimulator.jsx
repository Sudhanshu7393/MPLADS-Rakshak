import React, { useState } from 'react';
import { 
  Sliders, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Building2, 
  Layers, 
  Camera, 
  ShieldAlert, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatINR } from '../utils/formatters';

export default function LiveRiskSimulator() {
  const [costDeviation, setCostDeviation] = useState(54); // +54% cost inflation
  const [delayDays, setDelayDays] = useState(195); // 195 days delay
  const [hasDuplicateMatch, setHasDuplicateMatch] = useState(true); // 92% similarity
  const [hasAgencyMonopoly, setHasAgencyMonopoly] = useState(true); // High HHI
  const [missingEvidence, setMissingEvidence] = useState(false); // Missing completion certificate

  // Calculate composite risk score in real-time
  let costPts = 0;
  if (costDeviation > 50) costPts = 25;
  else if (costDeviation > 25) costPts = 14;
  else if (costDeviation > 10) costPts = 7;

  let delayPts = 0;
  if (delayDays > 180) delayPts = 20;
  else if (delayDays > 90) delayPts = 12;
  else if (delayDays > 30) delayPts = 6;

  const simPts = hasDuplicateMatch ? 18 : 0;
  const agencyPts = hasAgencyMonopoly ? 15 : 0;
  const evidencePts = missingEvidence ? 12 : 0;

  // ML / Deterministic ensemble
  const rawScore = 10 + costPts + delayPts + simPts + agencyPts + evidencePts;
  const compositeScore = Math.min(98, Math.max(12, rawScore));

  const isHighRisk = compositeScore >= 70;
  const isMediumRisk = compositeScore >= 35 && compositeScore < 70;

  const getScoreColor = () => {
    if (isHighRisk) return { text: 'text-red-500', bg: 'bg-red-500', ring: '#EF4444', label: 'HIGH RISK (SCRUTINY REQUIRED)', badgeBg: 'bg-red-500/10 text-red-500 border-red-500/30' };
    if (isMediumRisk) return { text: 'text-amber-500', bg: 'bg-amber-500', ring: '#F59E0B', label: 'MEDIUM RISK (ADVISORY CHECK)', badgeBg: 'bg-amber-500/10 text-amber-500 border-amber-500/30' };
    return { text: 'text-emerald-500', bg: 'bg-emerald-500', ring: '#10B981', label: 'LOW RISK (ROUTINE SANCTION)', badgeBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' };
  };

  const statusInfo = getScoreColor();

  // Reset to default
  const handleReset = () => {
    setCostDeviation(54);
    setDelayDays(195);
    setHasDuplicateMatch(true);
    setHasAgencyMonopoly(true);
    setMissingEvidence(false);
  };

  return (
    <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-8 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                INTERACTIVE DEMO PLAYGROUND
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                Live AI Risk Engine &amp; Explainability Simulator
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Adjust project parameters to watch the Explainable AI decompose risk signals and calculate scores in real time.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold self-start sm:self-auto transition shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* 1. Cost Deviation Slider */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Category Peer Cost Deviation
              </span>
              <span className={`font-mono font-black ${costDeviation > 50 ? 'text-red-600 dark:text-red-400' : 'text-blue-700 dark:text-blue-400'}`}>
                {costDeviation >= 0 ? '+' : ''}{costDeviation}% vs Peer Median
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="100"
              step="2"
              value={costDeviation}
              onChange={(e) => setCostDeviation(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-20% (Low Cost)</span>
              <span>+25% (Peer Norm)</span>
              <span>+100% (High Anomaly)</span>
            </div>
          </div>

          {/* 2. Delay Slider */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                <Clock className="w-4 h-4 text-amber-500" />
                Milestone Execution Delay
              </span>
              <span className={`font-mono font-black ${delayDays > 180 ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {delayDays} Days Past Target
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="365"
              step="5"
              value={delayDays}
              onChange={(e) => setDelayDays(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 Days (On-Time)</span>
              <span>90 Days (Warning)</span>
              <span>365 Days (Critical)</span>
            </div>
          </div>

          {/* 3. Toggles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            
            {/* Duplicate match toggle */}
            <button
              onClick={() => setHasDuplicateMatch(p => !p)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-1 ${
                hasDuplicateMatch 
                  ? 'bg-purple-50 dark:bg-purple-950/30 border-purple-300 dark:border-purple-800 text-purple-950 dark:text-purple-300 shadow-xs' 
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <Layers className="w-4 h-4 text-purple-600" />
                <span className={`w-2 h-2 rounded-full ${hasDuplicateMatch ? 'bg-purple-600 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'}`} />
              </div>
              <div className="text-[11px] font-bold">Duplicate Match</div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400">{hasDuplicateMatch ? '92% NLP (<400m)' : 'No Proximity Match'}</div>
            </button>

            {/* Agency Monopoly toggle */}
            <button
              onClick={() => setHasAgencyMonopoly(p => !p)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-1 ${
                hasAgencyMonopoly 
                  ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-800 text-indigo-950 dark:text-indigo-300 shadow-xs' 
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span className={`w-2 h-2 rounded-full ${hasAgencyMonopoly ? 'bg-indigo-600 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'}`} />
              </div>
              <div className="text-[11px] font-bold">Agency Monopoly</div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400">{hasAgencyMonopoly ? 'HHI > 2800 (Dominant)' : 'Normal Diversification'}</div>
            </button>

            {/* Missing Evidence toggle */}
            <button
              onClick={() => setMissingEvidence(p => !p)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-1 ${
                missingEvidence 
                  ? 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800 text-red-950 dark:text-red-300 shadow-xs' 
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <Camera className="w-4 h-4 text-red-600" />
                <span className={`w-2 h-2 rounded-full ${missingEvidence ? 'bg-red-600 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'}`} />
              </div>
              <div className="text-[11px] font-bold">Missing Proof</div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400">{missingEvidence ? 'Missing Certificates' : 'Verified GPS Hash'}</div>
            </button>

          </div>

        </div>

        {/* Right: Live AI Gauge & Decomposition Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50/90 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 flex flex-col items-center justify-between space-y-4 shadow-sm text-center">
          
          {/* Animated Speedometer / Circular Gauge */}
          <div className="relative w-40 h-40 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-200 dark:text-slate-700 fill-none"
              />
              {/* Animated Progress Ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke={statusInfo.ring}
                strokeWidth="8"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * compositeScore) / 100}
                strokeLinecap="round"
                className="fill-none transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white transition-all">
                {compositeScore}
              </span>
              <span className="text-[10px] font-bold text-slate-400 font-mono">OUT OF 100</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-black border transition-all ${statusInfo.badgeBg}`}>
            {statusInfo.label}
          </div>

          {/* Live AI Explainability Breakdown */}
          <div className="w-full space-y-1.5 text-left text-[11px] pt-3 border-t border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Active Decomposed Risk Signals:
            </span>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300">
              {costPts > 0 && (
                <li className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Cost Anomaly: +{costDeviation}% (+{costPts} pts)</span>
                </li>
              )}
              {delayPts > 0 && (
                <li className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Timeline Delay: {delayDays} days (+{delayPts} pts)</span>
                </li>
              )}
              {hasDuplicateMatch && (
                <li className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Duplicate Scope Detected (+18 pts)</span>
                </li>
              )}
              {hasAgencyMonopoly && (
                <li className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>Agency Monopoly Flagged (+15 pts)</span>
                </li>
              )}
              {missingEvidence && (
                <li className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Missing Completion Certificate (+12 pts)</span>
                </li>
              )}
              {costPts === 0 && delayPts === 0 && !hasDuplicateMatch && !hasAgencyMonopoly && !missingEvidence && (
                <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>All signals within standard statutory bounds.</span>
                </li>
              )}
            </ul>
          </div>

          <Link
            to="/queue"
            className="w-full py-2 rounded-xl bg-[#0B2545] dark:bg-blue-600 hover:bg-[#071B30] dark:hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
          >
            <span>View Full Scrutiny Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

        </div>

      </div>

    </div>
  );
}
