import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Cpu, 
  AlertOctagon, 
  FileText, 
  Camera, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MapPin,
  Play
} from 'lucide-react';

export default function WorkflowPipelineHub({ summary, onRunAnalysis }) {
  const steps = [
    {
      step: '01',
      title: 'Data Ingestion & Quality Audit',
      badge: `${summary?.totalWorks?.toLocaleString('en-IN') || '3,013'} Records Loaded`,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Zero-loss CSV/API schema mapping with automated completeness scorecard across coordinates & sanction records.',
      icon: Database,
      accentColor: 'from-emerald-500 to-teal-700',
      shadowColor: 'hover:shadow-emerald-200',
      borderColor: 'border-emerald-300 hover:border-emerald-500',
      buttonBg: 'bg-emerald-700 hover:bg-emerald-800 text-white',
      linkText: 'Open Ingestion Center',
      linkTo: '/data'
    },
    {
      step: '02',
      title: 'AI Multi-Signal Scoring Engine',
      badge: '6 Analytical Engines',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      description: 'Transparent 100-pt decomposition: Cost IQR outliers, milestone delays, TF-IDF duplicate matcher & agency concentration.',
      icon: Cpu,
      accentColor: 'from-blue-600 to-indigo-800',
      shadowColor: 'hover:shadow-blue-200',
      borderColor: 'border-blue-300 hover:border-blue-500',
      buttonBg: 'bg-blue-700 hover:bg-blue-800 text-white',
      linkText: 'Calibrate Risk Weights',
      linkTo: '/settings'
    },
    {
      step: '03',
      title: 'Prioritised Scrutiny Queue',
      badge: `${summary?.highRiskCount || 294} High-Risk Flags`,
      badgeColor: 'bg-red-100 text-red-800 border-red-300',
      description: 'Explainable triage queue sorted by risk score. Multi-filter by district, category, execution lag, and overlapping proposals.',
      icon: AlertOctagon,
      accentColor: 'from-red-600 to-rose-800',
      shadowColor: 'hover:shadow-red-200',
      borderColor: 'border-red-300 hover:border-red-500',
      buttonBg: 'bg-red-700 hover:bg-red-800 text-white',
      linkText: 'Inspect Scrutiny Queue',
      linkTo: '/queue'
    },
    {
      step: '04',
      title: '360° Risk Passport Dossier',
      badge: '6-Tab Case Inquest',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      description: 'Deep investigative dossier: Peer group cost benchmarking, delay breakdown, nearby duplicates, and compliance gaps.',
      icon: FileText,
      accentColor: 'from-amber-500 to-orange-700',
      shadowColor: 'hover:shadow-amber-200',
      borderColor: 'border-amber-300 hover:border-amber-500',
      buttonBg: 'bg-amber-700 hover:bg-amber-800 text-white',
      linkText: 'View Flagship Dossier',
      linkTo: '/passport/MPL-2024-UP-004821'
    },
    {
      step: '05',
      title: 'Geo-Verified Evidence Capture',
      badge: 'Mobile Camera + GPS Lock',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      description: 'Field physical verification via live mobile camera, tamper-evident SHA-256 hash & Haversine distance mismatch detection.',
      icon: Camera,
      accentColor: 'from-purple-600 to-violet-800',
      shadowColor: 'hover:shadow-purple-200',
      borderColor: 'border-purple-300 hover:border-purple-500',
      buttonBg: 'bg-purple-700 hover:bg-purple-800 text-white',
      linkText: 'Launch Live Camera',
      linkTo: '/works/MPL-2024-UP-004821/capture-evidence'
    },
    {
      step: '06',
      title: 'Officer Action & Governance Ledger',
      badge: 'Append-Only Audit Trail',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      description: 'Human-in-the-loop decision recording: Field visit orders, compliance sign-offs, statutory notes & printable PDF dossiers.',
      icon: ShieldCheck,
      accentColor: 'from-slate-700 to-slate-900',
      shadowColor: 'hover:shadow-slate-300',
      borderColor: 'border-slate-300 hover:border-slate-500',
      buttonBg: 'bg-slate-900 hover:bg-slate-800 text-white',
      linkText: 'Open Case Management',
      linkTo: '/investigations'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Banner / Guide Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 md:p-8 text-white shadow-lg border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Interactive Operational Lifecycle</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              End-to-End Governance &amp; Risk Intelligence Flow
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Step-by-step institutional workflow for identifying anomalies, validating geo-tagged execution evidence, and recording statutory officer determinations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onRunAnalysis}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-blue-500/25 transition-all transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Run Analytical Cycle</span>
            </button>
            <Link
              to="/reports?workId=MPL-2024-UP-004821"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Print Scheme Dossier</span>
            </Link>
          </div>
        </div>

        {/* Decorative Grid Backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* 6 Step Elevated 3D Cards with Dotted Flow Animation */}
      <div className="relative">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative group bg-white rounded-2xl p-6 border-2 ${item.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                {/* Top Step Number & Badge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.accentColor} text-white font-black text-lg flex items-center justify-center shadow-md transform group-hover:rotate-6 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 font-mono">
                        STEP {item.step}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="mt-1.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Button (3D Elevated Style) */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={item.linkTo}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-between ${item.buttonBg} group-hover:gap-3`}
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Animated subtle corner glow */}
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 animate-ping transition-opacity" />
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
