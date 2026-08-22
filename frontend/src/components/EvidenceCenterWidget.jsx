import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';
import MissingEvidenceModal from './MissingEvidenceModal';

export default function EvidenceCenterWidget({ evidenceCenter, workId, onActionComplete }) {
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!evidenceCenter || !evidenceCenter.evidenceItems) {
    return (
      <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
          <FileText className="w-4 h-4 text-blue-400" />
          <span>Evidence Center</span>
        </div>
        <p className="text-xs text-slate-400">Standard evidence checklist evaluated.</p>
      </div>
    );
  }

  const items = evidenceCenter.evidenceItems;
  const missingCount = evidenceCenter.missingCount || 0;
  const firstMissing = items.find(i => i.status === 'NOT_AVAILABLE') || items[0];

  const handleOpenDetail = (item) => {
    setSelectedEvidence(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-slate-900 text-slate-100 rounded-xl border border-slate-800 shadow-md p-5 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-base">📄</span>
            <h4 className="text-sm font-bold tracking-wide text-white">Evidence Center</h4>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            DOCUMENTS &amp; EVIDENCE
          </span>
        </div>

        {/* Required Evidence Checklist */}
        <div className="space-y-2 mb-4">
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider block mb-2">
            Required Evidence
          </span>

          <div className="space-y-2">
            {items.map((item) => {
              const isAvail = item.status === 'AVAILABLE';
              const isWarning = item.status === 'PENDING_REVIEW';
              const isMissing = item.status === 'NOT_AVAILABLE';

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenDetail(item)}
                  className={`flex items-center justify-between p-2.5 rounded-lg border transition cursor-pointer text-xs ${
                    isMissing
                      ? 'bg-red-950/40 border-red-900/60 hover:bg-red-950/70 text-red-200'
                      : isWarning
                      ? 'bg-amber-950/40 border-amber-900/60 hover:bg-amber-950/70 text-amber-200'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isAvail && <span className="text-emerald-400">✅</span>}
                    {isWarning && <span className="text-amber-400">⚠️</span>}
                    {isMissing && <span className="text-red-400">❌</span>}
                    <span className={`font-medium ${isMissing ? 'font-semibold text-white' : ''}`}>
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isMissing && item.riskImpactPts > 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-900/80 text-red-300 font-mono">
                        +{item.riskImpactPts} pts
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Missing evidence summary */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-medium">
            {missingCount > 0 ? (
              <span className="text-red-400 font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                {missingCount} required evidence missing
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                All statutory evidence files present
              </span>
            )}
          </div>

          {missingCount > 0 && (
            <button
              onClick={() => handleOpenDetail(firstMissing)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition"
            >
              [ VIEW MISSING EVIDENCE ]
            </button>
          )}
        </div>

      </div>

      {/* Deep Dive Modal */}
      <MissingEvidenceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        evidenceItem={selectedEvidence}
        workId={workId}
        onActionComplete={onActionComplete}
      />
    </>
  );
}
