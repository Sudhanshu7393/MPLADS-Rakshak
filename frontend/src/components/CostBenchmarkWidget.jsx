import React from 'react';
import { formatINR } from '../utils/formatters';
import { TrendingUp, AlertCircle, Info } from 'lucide-react';

export default function CostBenchmarkWidget({ peerComparison, sanctionedAmount, category }) {
  if (!peerComparison) return null;

  const currentCost = sanctionedAmount || peerComparison.currentCost || 0;
  const peerMedian = peerComparison.peerMedian || 3120000;
  const peerQ25 = peerComparison.peerQ25 || 2000000;
  const peerQ75 = peerComparison.peerQ75 || 3200000;
  const devPct = peerComparison.deviationPercentage || 0;
  const count = peerComparison.comparableCount || 23;
  const isAnomalous = peerComparison.isAnomalous || devPct > 35;

  // Visual Slider percentages
  const maxScale = Math.max(currentCost * 1.25, peerMedian * 1.8, 6000000);
  const currentPos = Math.min(95, Math.max(5, (currentCost / maxScale) * 100));
  const medianPos = Math.min(95, Math.max(5, (peerMedian / maxScale) * 100));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className={`w-4 h-4 ${isAnomalous ? 'text-red-600' : 'text-slate-600'}`} />
          <h4 className="text-sm font-bold text-slate-900">Peer Cost Benchmark Comparison</h4>
        </div>
        <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
          {category || 'Same Category'} ({count} peers)
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <span className="text-xs text-slate-500 font-medium block">Current Project Cost</span>
          <span className={`text-base font-bold ${isAnomalous ? 'text-red-700' : 'text-slate-900'}`}>
            {formatINR(currentCost)}
          </span>
        </div>
        <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-100">
          <span className="text-xs text-blue-700 font-medium block">Peer Group Median</span>
          <span className="text-base font-bold text-blue-900">
            {formatINR(peerMedian)}
          </span>
        </div>
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <span className="text-xs text-slate-500 font-medium block">Peer IQR Range (25-75%)</span>
          <span className="text-sm font-bold text-slate-800">
            {formatINR(peerQ25)} – {formatINR(peerQ75)}
          </span>
        </div>
      </div>

      {/* Visual Benchmark Track */}
      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-[11px] font-mono text-slate-400">
          <span>₹0</span>
          <span>Peer Median: {formatINR(peerMedian)}</span>
          <span>{formatINR(maxScale)}</span>
        </div>

        <div className="relative w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          {/* IQR Range bar */}
          <div
            className="absolute top-0 bottom-0 bg-blue-200/80"
            style={{
              left: `${(peerQ25 / maxScale) * 100}%`,
              width: `${((peerQ75 - peerQ25) / maxScale) * 100}%`
            }}
          />
          {/* Peer Median marker */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-blue-700 z-10"
            style={{ left: `${medianPos}%` }}
          />
        </div>

        {/* Project Cost pointer */}
        <div className="relative w-full h-6">
          <div
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${currentPos}%` }}
          >
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white shadow-xs whitespace-nowrap">
              ▲ {formatINR(currentCost)} ({devPct > 0 ? `+${devPct}%` : `${devPct}%`})
            </span>
          </div>
        </div>
      </div>

      {isAnomalous ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Cost Anomaly Identified:</span> This project's sanctioned cost is <strong>{devPct}% higher</strong> than the peer median for comparable {category} works in this administrative zone.
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-600 flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-500 shrink-0" />
          <span>Project cost is within standard statistical variance for this work category.</span>
        </div>
      )}
    </div>
  );
}
