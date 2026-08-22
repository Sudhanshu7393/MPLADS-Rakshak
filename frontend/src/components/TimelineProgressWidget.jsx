import React from 'react';
import { formatDate } from '../utils/formatters';
import { Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function TimelineProgressWidget({ timeline, status, progressPercentage }) {
  if (!timeline) return null;

  const delayDays = timeline.delayDays || 0;
  const isDelayed = timeline.isDelayed || delayDays > 30;
  const progress = progressPercentage || timeline.progressPercentage || 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${isDelayed ? 'text-amber-600' : 'text-slate-600'}`} />
          <h4 className="text-sm font-bold text-slate-900">Execution Timeline &amp; Delay Analysis</h4>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
          isDelayed ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}>
          {isDelayed ? `${delayDays} Days Overdue` : 'On Schedule'}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
          <span>Physical Progress Reported</span>
          <span className="font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${
              progress >= 90 ? 'bg-emerald-600' : progress >= 40 ? 'bg-blue-600' : 'bg-amber-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Milestones grid */}
      <div className="grid grid-cols-4 gap-3 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <span className="text-slate-400 block text-[11px]">Sanction Date</span>
          <span className="font-semibold text-slate-800">{formatDate(timeline.sanctionDate)}</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <span className="text-slate-400 block text-[11px]">Execution Start</span>
          <span className="font-semibold text-slate-800">{formatDate(timeline.startDate)}</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <span className="text-slate-400 block text-[11px]">Expected Completion</span>
          <span className="font-semibold text-slate-800">{formatDate(timeline.expectedCompletionDate)}</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <span className="text-slate-400 block text-[11px]">Actual / Current</span>
          <span className="font-semibold text-slate-800">{formatDate(timeline.actualCompletionDate) || 'Ongoing'}</span>
        </div>
      </div>

      {isDelayed && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Timeline Flag:</strong> Execution has exceeded the scheduled milestone target by <strong>{delayDays} days</strong> (approx {Math.round(delayDays / 30)} months).
          </div>
        </div>
      )}
    </div>
  );
}
