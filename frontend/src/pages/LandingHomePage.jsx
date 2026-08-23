import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Database, 
  Cpu, 
  AlertOctagon, 
  FileText, 
  Camera, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Building2, 
  Coins, 
  CheckCircle2, 
  Compass, 
  Layers, 
  MapPin, 
  Users, 
  Search, 
  FileCheck,
  Eye
} from "lucide-react";
import { api } from "../services/api";
import { formatINR } from "../utils/formatters";

export default function LandingHomePage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboardSummary()
      .then(data => setSummary(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalWorks = summary?.totalWorks || 3013;
  const highRisk = summary?.highRiskCount || 294;
  const totalCost = summary?.totalSanctionedAmount || 5931310000;

  const steps = [
    {
      num: '01',
      title: 'Data Ingestion & Audit',
      desc: 'Ingests public CSV and authorized eSAKSHI records with dynamic schema mapping and automated completeness validation.',
      badge: `${totalWorks.toLocaleString('en-IN')} Records Active`,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: Database,
      accent: 'from-emerald-600 to-teal-700',
      border: 'hover:border-emerald-500',
      link: '/data',
      btnText: 'Ingestion Center'
    },
    {
      num: '02',
      title: 'AI Multi-Signal Engine',
      desc: 'Transparent 100-pt formula: Cost IQR outliers, milestone timeline delays, TF-IDF duplicate text matching & agency concentration.',
      badge: '6 ML Models Active',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: Cpu,
      accent: 'from-blue-600 to-indigo-800',
      border: 'hover:border-blue-500',
      link: '/settings',
      btnText: 'Calibrate Models'
    },
    {
      num: '03',
      title: 'Prioritised Scrutiny Queue',
      desc: 'Risk-ranked triage register allowing officers to filter high-priority proposals across districts, categories, and anomaly signals.',
      badge: `${highRisk} High-Risk Flags`,
      badgeColor: 'bg-red-100 text-red-800 border-red-300',
      icon: AlertOctagon,
      accent: 'from-red-600 to-rose-800',
      border: 'hover:border-red-500',
      link: '/queue',
      btnText: 'Scrutiny Queue'
    },
    {
      num: '04',
      title: '360° Risk Passport',
      desc: 'Complete investigative dossier: Sector peer cost benchmarks, delay breakdown, nearby duplicates, and document registers.',
      badge: '6-Tab Case Inquest',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: FileText,
      accent: 'from-amber-600 to-orange-700',
      border: 'hover:border-amber-500',
      link: '/passport/MPL-2024-UP-004821',
      btnText: 'Sample Passport'
    },
    {
      num: '05',
      title: 'Geo-Verified Evidence',
      desc: 'On-site physical inspection using live mobile camera, GPS coordinate verification, tamper-evident SHA-256 hash & distance checks.',
      badge: 'Mobile Camera + GPS',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      icon: Camera,
      accent: 'from-purple-600 to-violet-800',
      border: 'hover:border-purple-500',
      link: '/works/MPL-2024-UP-004821/capture-evidence',
      btnText: 'Launch Camera'
    },
    {
      num: '06',
      title: 'Officer Action & Ledger',
      desc: 'Human-in-the-loop determinations: Field visit orders, compliance sign-offs, immutable audit trail & statutory PDF reports.',
      badge: 'Append-Only Ledger',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      icon: ShieldCheck,
      accent: 'from-slate-700 to-slate-900',
      border: 'hover:border-slate-500',
      link: '/investigations',
      btnText: 'Case Management'
    }
  ];

  const roles = [
    {
      title: 'District Planning Officer (DPO)',
      role: 'District Administration',
      desc: 'Prioritize local high-risk sanctions, inspect peer cost deviations, assign physical field verifications, and record final statutory approvals.',
      link: '/queue',
      btnText: 'District Queue',
      icon: Building2,
      color: 'bg-blue-50 border-blue-200 text-blue-900'
    },
    {
      title: 'Field Verification Team',
      role: 'On-Site Inspection',
      desc: 'Capture live completion photos at work sites with tamper-evident GPS coordinate locks and distance mismatch verification.',
      link: '/works/MPL-2024-UP-004821/capture-evidence',
      btnText: 'Field Camera',
      icon: Camera,
      color: 'bg-purple-50 border-purple-200 text-purple-900'
    },
    {
      title: 'State Nodal Officer',
      role: 'State Oversight',
      desc: 'Monitor inter-district implementation intensity, chronic milestone execution delays, and implementing agency concentration.',
      link: '/map',
      btnText: 'Geospatial Map',
      icon: MapPin,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900'
    },
    {
      title: 'Ministry / Statutory Auditor',
      role: 'National MoSPI Audit',
      desc: 'Verify append-only officer audit trails, evaluate national data completeness metrics, and export court-ready statutory dossiers.',
      link: '/audit',
      btnText: 'Audit Trail',
      icon: ShieldCheck,
      color: 'bg-slate-50 border-slate-200 text-slate-900'
    }
  ];

  return (
    <div className="space-y-10 pb-12 font-sans">
      
      {/* 1. HERO SECTION (Clean, Modern, Simple) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1E36] via-[#102A4C] to-[#0B1E36] text-white py-14 px-6 md:px-12 rounded-3xl shadow-xl border border-slate-800">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:28px_28px]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          {/* Top Statutory Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ministry of Statistics &amp; Programme Implementation • MoSPI</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Explainable AI Risk &amp; Anomaly Layer for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">MPLADS Implementation</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            An intelligence and decision-support layer operating seamlessly over <strong>eSAKSHI</strong>. Analyzes project records for peer cost outliers, milestone lags, duplicate proposals, and geo-verified completion evidence.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/queue"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs md:text-sm shadow-lg hover:shadow-blue-500/30 transition transform active:scale-95 flex items-center gap-2"
            >
              <span>Explore Scrutiny Queue ({highRisk} Flags)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/works/MPL-2024-UP-004821/capture-evidence"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs md:text-sm shadow-lg hover:shadow-emerald-500/30 transition transform active:scale-95 flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Test Geo-Camera Capture</span>
            </Link>

            <Link
              to="/dashboard"
              className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold text-xs md:text-sm transition flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>Full Analytics Dashboard</span>
            </Link>
          </div>

          {/* 4 Floating Live Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 max-w-4xl mx-auto">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Sanctions</span>
              <span className="text-lg md:text-xl font-black font-mono text-white">{totalWorks.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-emerald-400 block font-medium">Pan-India Baseline</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">High Risk Flags</span>
              <span className="text-lg md:text-xl font-black font-mono text-red-400">{highRisk}</span>
              <span className="text-[10px] text-slate-400 block font-medium">Score &ge; 70 Triage</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Sanctioned Value</span>
              <span className="text-lg md:text-xl font-black font-mono text-amber-300">{formatINR(totalCost)}</span>
              <span className="text-[10px] text-slate-400 block font-medium">Under Surveillance</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Explainable AI</span>
              <span className="text-lg md:text-xl font-black font-mono text-blue-300">100% Sum</span>
              <span className="text-[10px] text-blue-400 block font-medium">Zero Black-Box</span>
            </div>
          </div>

        </div>
      </section>


      {/* 2. STEP-BY-STEP OPERATIONAL LIFECYCLE (Interactive 6 Cards) */}
      <section className="space-y-6 max-w-7xl mx-auto px-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-700">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Operational Pipeline</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              6-Step Institutional Governance Flow
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Click any step to inspect the live engine, triage queue, or evidence verification module.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative group bg-white rounded-2xl p-6 border-2 border-slate-200 ${item.border} shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.accent} text-white font-black text-lg flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 font-mono">
                      STEP {item.num}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="mt-1">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <Link
                    to={item.link}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md transition-all flex items-center justify-between group-hover:bg-blue-600"
                  >
                    <span>Launch {item.btnText}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 3. CASE INQUEST SPOTLIGHT CARD */}
      <section className="max-w-7xl mx-auto px-2">
        <div className="bg-white rounded-2xl border-2 border-slate-300 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-black bg-red-100 text-red-800 border border-red-200 font-mono">
                  FLAGSHIP ANOMALY SPOTLIGHT • #MPL-2024-UP-004821
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Varanasi, UP • Rural Roads &amp; Bridges
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-black text-slate-900">
                Construction of CC Road and Paver Works from Main Chowk to Panchayat Bhawan, Village Rampur
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200">
                  <span className="text-red-600 font-bold block text-[10px] uppercase">Cost Deviation</span>
                  <span className="font-extrabold text-slate-900 text-sm">₹48.00 Lakh</span>
                  <span className="text-red-700 text-[10px] block">+53.8% above peer median</span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-amber-600 font-bold block text-[10px] uppercase">Nearby Duplicate</span>
                  <span className="font-extrabold text-slate-900 text-sm">420m Proximity</span>
                  <span className="text-amber-700 text-[10px] block">Near-identical scope (#004822)</span>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
                  <span className="text-purple-600 font-bold block text-[10px] uppercase">Physical Proof</span>
                  <span className="font-extrabold text-slate-900 text-sm">Missing Certificate</span>
                  <span className="text-purple-700 text-[10px] block">Geo-camera inquest required</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                to="/passport/MPL-2024-UP-004821"
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-md"
              >
                <Eye className="w-4 h-4 text-blue-400" />
                <span>Inspect Risk Passport</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/works/MPL-2024-UP-004821/capture-evidence"
                className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-md"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Geo-Evidence</span>
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* 4. ROLE-BASED ACCESS PORTALS */}
      <section className="space-y-6 max-w-7xl mx-auto px-2">
        <div className="border-b border-slate-200 pb-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-700">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Institutional Stakeholders</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Role-Specific Decision Support Portals
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roles.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={i} className={`p-5 rounded-2xl border ${r.color} shadow-xs flex flex-col justify-between space-y-4`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5 text-slate-800" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/80 border border-slate-200">
                      {r.role}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">{r.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{r.desc}</p>
                </div>

                <Link
                  to={r.link}
                  className="w-full py-2 px-3 rounded-lg font-bold text-xs bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 shadow-xs transition flex items-center justify-between"
                >
                  <span>Open {r.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>


      {/* 5. STATUTORY DISCLAIMER FOOTER */}
      <footer className="pt-8 border-t border-slate-200 text-center space-y-2 text-xs text-slate-500 max-w-4xl mx-auto">
        <p className="font-semibold text-slate-700">
          MPLADS Rakshak • Ministry of Statistics &amp; Programme Implementation (MoSPI)
        </p>
        <p className="text-[11px] text-slate-400">
          All analytical outputs serve strictly as decision-support intelligence for authorized administrative officers. Final legal and financial determinations rest exclusively with statutory authorities.
        </p>
      </footer>

    </div>
  );
}
