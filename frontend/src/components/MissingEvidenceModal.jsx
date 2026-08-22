import React, { useState } from 'react';
import { X, AlertCircle, FileText, Send, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../services/api';

export default function MissingEvidenceModal({ isOpen, onClose, evidenceItem, workId, onActionComplete }) {
  const [officerNote, setOfficerNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen || !evidenceItem) return null;

  const handleAction = async (actionType) => {
    setSubmitting(true);
    try {
      await api.submitEvidenceAction(workId, {
        evidenceId: evidenceItem.id,
        actionType: actionType,
        officerNote: officerNote || (actionType === 'REQUEST_EVIDENCE' 
          ? `Dispatched formal requisition for missing evidence: ${evidenceItem.name}` 
          : `Officer reviewed and marked ${evidenceItem.name} as explained.`)
      });
      setSuccessMessage(actionType === 'REQUEST_EVIDENCE' ? 'Requisition dispatched & logged!' : 'Marked as explained & logged!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
        if (onActionComplete) onActionComplete();
      }, 1200);
    } catch (err) {
      alert('Error recording action: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-slate-900 text-slate-100 w-full max-w-lg rounded-xl border border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔍</span>
            <h3 className="font-bold text-base tracking-wide text-white">Missing Evidence Detail</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-sm">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
              Evidence Required
            </span>
            <div className="text-base font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              {evidenceItem.name}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                Expected by
              </span>
              <div className="flex items-center gap-1.5 text-slate-300 font-mono text-xs">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {evidenceItem.expectedBy || 'Statutory Milestone'}
              </div>
            </div>
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                Current Status
              </span>
              <div className="flex items-center gap-1.5 font-medium text-red-400">
                <span>❌</span>
                <span>{evidenceItem.status === 'NOT_AVAILABLE' ? 'Not Available' : 'Under Review'}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
              Why it matters:
            </span>
            <p className="text-slate-300 bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
              {evidenceItem.whyItMatters || 'Project compliance requirement under statutory scheme guidelines.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                Risk Impact:
              </span>
              <span className="inline-block px-2.5 py-1 rounded bg-red-950/80 border border-red-800 text-red-300 font-mono font-semibold text-xs">
                +{evidenceItem.riskImpactPts || 8} Risk Points
              </span>
            </div>
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                Recommended Action:
              </span>
              <p className="text-xs text-amber-300/90 leading-tight">
                {evidenceItem.recommendedAction || 'Request document from Implementing Agency'}
              </p>
            </div>
          </div>

          {/* Optional Note input */}
          <div className="pt-2 border-t border-slate-800">
            <label className="text-xs font-semibold text-slate-400 block mb-1">
              Officer Investigation Note (Optional)
            </label>
            <textarea
              rows={2}
              value={officerNote}
              onChange={(e) => setOfficerNote(e.target.value)}
              placeholder="Add specific instructions for field requisition or justification..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {successMessage && (
            <div className="p-3 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-lg text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {successMessage}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleAction('MARK_AS_EXPLAINED')}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition disabled:opacity-50"
          >
            [ MARK AS EXPLAINED ]
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleAction('REQUEST_EVIDENCE')}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            [ REQUEST EVIDENCE ]
          </button>
        </div>

      </div>
    </div>
  );
}
