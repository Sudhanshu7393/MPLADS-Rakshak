import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, AlertOctagon, FileText, Send, X, Eye } from 'lucide-react';

const TOUR_STEPS = [
  {
    step: 1,
    title: 'Command Center & Risk Prioritization',
    subtitle: 'From 1,600 Raw Works to a Prioritized Scrutiny Queue',
    description: 'Instead of officers manually auditing thousands of records, the AI engine runs multi-tier statistical anomaly scans across cost, delay, duplicates, and missing evidence.',
    targetUrl: '/',
    actionLabel: 'View Command Center',
    highlight: '258 High & Medium Risk Works ranked by priority'
  },
  {
    step: 2,
    title: 'Inspect Flagship Case (Varanasi CC Road)',
    subtitle: 'Cost Outlier (+54%) + 420m Duplicate Proposal',
    description: 'Work MPL-2024-UP-004821 was sanctioned at ₹48 Lakh (Peer category median is ₹31.2 Lakh). A 92% similar proposal was also submitted 420 meters away.',
    targetUrl: '/passport/MPL-2024-UP-004821',
    actionLabel: 'Open Risk Passport',
    highlight: 'Score: 87/100 • Explainable decomposition'
  },
  {
    step: 3,
    title: 'Auditing Evidence Center (New Facility)',
    subtitle: 'Statutory Document Checklist & Requisition',
    description: 'The work is marked completed, but the Completion Certificate is ❌ Missing (+8 risk points). Officers can click [REQUEST EVIDENCE] to dispatch a formal requisition notice.',
    targetUrl: '/passport/MPL-2024-UP-004821',
    actionLabel: 'Inspect Evidence Center',
    highlight: 'Sanction Doc ✅, Work Order ✅, Completion Cert ❌'
  },
  {
    step: 4,
    title: 'Taking Action & Immutable Audit Trail',
    subtitle: 'Human-in-the-Loop Governance',
    description: 'The officer clicks [Request Field Verification] to assign a site engineer. Every single action is permanently recorded in the tamper-evident audit ledger.',
    targetUrl: '/audit',
    actionLabel: 'View Audit Trail',
    highlight: 'Statutory compliance & official dossier export'
  }
];

export default function DemoTourModal({ isOpen, onClose }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const current = TOUR_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onClose();
    }
  };

  const handleJump = (url) => {
    navigate(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-5 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight">
                SIH 2026 GUIDED DEMO TOUR
              </h2>
              <span className="text-[11px] text-slate-400">
                Step {current.step} of {TOUR_STEPS.length}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 gap-2">
          {TOUR_STEPS.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-1.5 rounded-full cursor-pointer transition-all ${
                idx === currentStepIndex
                  ? 'bg-blue-600'
                  : idx < currentStepIndex
                  ? 'bg-emerald-500'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
          <div className="space-y-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {current.highlight}
            </span>
            <h3 className="text-base font-extrabold text-slate-900 pt-1">
              {current.title}
            </h3>
            <p className="text-xs font-semibold text-slate-600">
              {current.subtitle}
            </p>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
            {current.description}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => handleJump(current.targetUrl)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 underline"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Go to this screen now</span>
          </button>

          <div className="flex items-center gap-2">
            {currentStepIndex > 0 && (
              <button
                onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Back
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-gov-navy hover:bg-gov-dark text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5"
            >
              <span>{currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
