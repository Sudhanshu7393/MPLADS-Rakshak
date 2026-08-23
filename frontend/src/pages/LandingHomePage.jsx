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
  TrendingUp, 
  Building2, 
  Coins, 
  CheckCircle2, 
  Compass, 
  MapPin, 
  Users, 
  Eye,
  Layers,
  Sparkles,
  RefreshCw,
  FolderCheck
} from "lucide-react";
import { api } from "../services/api";
import { formatINR } from "../utils/formatters";
import RiskScoreBadge from "../components/RiskScoreBadge";

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
  const recentWorks = summary?.recentHighRiskWorks || [];

  const steps = [
    {
      num: '01',
      title: 'Data Ingestion & Audit',
      desc: 'Ingests public CSV and authorized eSAKSHI records with dynamic column mapping and automated data completeness scoring.',
      badge: `${totalWorks.toLocaleString('en-IN')} Records Active`,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
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
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
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
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
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
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
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
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
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
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
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
      color: 'bg-blue-50/70 border-blue-200 text-blue-900'
    },
    {
      title: 'Field Verification Team',
      role: 'On-Site Inspection',
      desc: 'Capture live completion photos at work sites with tamper-evident GPS coordinate locks and distance mismatch verification.',
      link: '/works/MPL-2024-UP-004821/capture-evidence',
      btnText: 'Field Camera',
      icon: Camera,
      color: 'bg-purple-50/70 border-purple-200 text-purple-900'
    },
    {
      title: 'State Nodal Officer',
      role: 'State Oversight',
      desc: 'Monitor inter-district implementation intensity, chronic milestone execution delays, and implementing agency concentration.',
      link: '/map',
      btnText: 'Geospatial Map',
      icon: MapPin,
      color: 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
    },
    {
      title: 'Ministry / Statutory Auditor',
      role: 'National MoSPI Audit',
      desc: 'Verify append-only officer audit trails, evaluate national data completeness metrics, and export court-ready statutory dossiers.',
      link: '/audit',
      btnText: 'Audit Trail',
      icon: ShieldCheck,
      color: 'bg-slate-50 border-slate-300 text-slate-900'
    }
  ];

  return (
    <div className="space-y-8 pb-12 font-sans max-w-7xl mx-auto">
      
      {/* 1. HERO SECTION (Clean, Modern, User-Friendly) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Ministry of Statistics &amp; Programme Implementation • MoSPI (SIH26102)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              MPLADS Rakshak
            </h1>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              An explainable AI-powered decision-support layer for <strong>e-SAKSHI (MPLADS)</strong>. It helps authorized officers detect peer cost outliers, chronic execution delays, duplicate proposals, and verify physical completion proof.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/queue"
                className="px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
              >
                <span>Explore Scrutiny Queue ({highRisk} Flags)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/works/MPL-2024-UP-004821/capture-evidence"
                className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Launch Geo-Camera</span>
              </Link>

              <Link
                to="/dashboard"
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4 text-blue-700" />
                <span>Executive Dashboard</span>
              </Link>
            </div>
          </div>

          {/* 4 Metric Cards in Hero */}
          <div className="grid grid-cols-2 gap-3 w-full lg:w-80 shrink-0">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Total Sanctions</span>
              <span className="text-xl font-black font-mono text-slate-900">{totalWorks.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-slate-400 block font-medium">8 Test Districts</span>
            </div>

            <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-0.5">
              <span className="text-[11px] font-bold text-red-700 uppercase block">High-Risk Flags</span>
              <span className="text-xl font-black font-mono text-red-700">{highRisk}</span>
              <span className="text-[10px] text-red-500 block font-medium">Score &ge; 70 Triage</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-0.5">
              <span className="text-[11px] font-bold text-amber-800 uppercase block">Fund Value</span>
              <span className="text-xl font-black font-mono text-amber-900">{formatINR(totalCost)}</span>
              <span className="text-[10px] text-amber-700 block font-medium">Sanctioned</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-0.5">
              <span className="text-[11px] font-bold text-emerald-800 uppercase block">AI Formula</span>
              <span className="text-xl font-black font-mono text-emerald-800">100%</span>
              <span className="text-[10px] text-emerald-600 block font-medium">Explainable (0–100)</span>
            </div>
          </div>

        </div>
      </section>


      {/* 2. 6-STEP OPERATIONAL PIPELINE (Tactile 3D Buttons & Smooth Hover) */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-700">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Operational Pipeline</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              6-Step Institutional Governance Flow
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Click any step to inspect the live engine, triage queue, or evidence verification module.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative group bg-white rounded-2xl p-5 border-2 border-slate-200 ${item.border} shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.accent} text-white font-black flex items-center justify-center shadow-xs transform group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 font-mono">
                      STEP {item.num}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
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

                <div className="pt-3 border-t border-slate-100">
                  <Link
                    to={item.link}
                    className="w-full py-2.5 px-3.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-xs hover:shadow-md transition flex items-center justify-between group-hover:bg-blue-700"
                  >
                    <span>Launch {item.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 3. CASE INQUEST SPOTLIGHT CARD */}
      <section>
        <div className="bg-white rounded-2xl border-2 border-slate-300 p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-100 text-red-800 border border-red-200 font-mono">
                  CASE SPOTLIGHT • #MPL-2024-UP-004821
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Varanasi, UP • Rural Roads &amp; Bridges
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Construction of CC Road and Paver Works from Main Chowk to Panchayat Bhawan, Village Rampur
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200">
                  <span className="text-red-700 font-bold block text-[10px] uppercase">Cost Deviation</span>
                  <span className="font-extrabold text-slate-900 text-sm">₹48.00 Lakh</span>
                  <span className="text-red-700 text-[10px] block">+53.8% above peer median</span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-amber-800 font-bold block text-[10px] uppercase">Nearby Duplicate</span>
                  <span className="font-extrabold text-slate-900 text-sm">420m Proximity</span>
                  <span className="text-amber-800 text-[10px] block">Similar work (#004822)</span>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
                  <span className="text-purple-700 font-bold block text-[10px] uppercase">Physical Proof</span>
                  <span className="font-extrabold text-slate-900 text-sm">Missing Certificate</span>
                  <span className="text-purple-700 text-[10px] block">Geo-camera required</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                to="/passport/MPL-2024-UP-004821"
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Inspect Risk Passport</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/works/MPL-2024-UP-004821/capture-evidence"
                className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Geo-Evidence</span>
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* 4. LIVE PROPOSALS TABLE PREVIEW */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              High-Risk Proposals Awaiting Administrative Inquest
            </h3>
            <p className="text-xs text-slate-500">Sorted by multi-signal statistical deviation</p>
          </div>
          <Link
            to="/queue"
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
          >
            <span>View Full Scrutiny Queue ({totalWorks})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Work ID</th>
                  <th className="py-3 px-4">Project Title &amp; Location</th>
                  <th className="py-3 px-4">Sanctioned Amount</th>
                  <th className="py-3 px-4">Primary Statistical Signal</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {recentWorks.slice(0, 5).map((work, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <RiskScoreBadge score={work.riskScore} level={work.riskLevel} size="sm" />
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {work.workId}
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-slate-900 truncate" title={work.workName}>
                        {work.workName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {work.district}, {work.state || 'UP'} • {work.category}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {formatINR(work.cost)}
                    </td>
                    <td className="py-3 px-4 text-[11px] text-slate-600 max-w-xs truncate" title={work.reason}>
                      {work.reason || 'Cost or timeline variance'}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/passport/${work.workId}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition border border-slate-300"
                      >
                        <span>Inspect Dossier</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* 5. ROLE-BASED ACCESS PORTALS */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-700">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Institutional Stakeholders</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Role-Specific Decision Support Portals
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={i} className={`p-5 rounded-2xl border ${r.color} shadow-xs flex flex-col justify-between space-y-4`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                      <Icon className="w-4 h-4 text-slate-800" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/90 border border-slate-200">
                      {r.role}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">{r.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{r.desc}</p>
                </div>

                <Link
                  to={r.link}
                  className="w-full py-2 px-3 rounded-lg font-bold text-xs bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 shadow-xs transition flex items-center justify-between"
                >
                  <span>Open {r.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>


      {/* 6. STATUTORY FOOTER */}
      <footer className="pt-8 border-t border-slate-200 text-center space-y-1.5 text-xs text-slate-500 max-w-4xl mx-auto">
        <p className="font-bold text-slate-700">
          MPLADS Rakshak • Ministry of Statistics &amp; Programme Implementation (MoSPI)
        </p>
        <p className="text-[11px] text-slate-400">
          All analytical outputs serve strictly as decision-support intelligence for authorized administrative officers. Final legal and financial determinations rest exclusively with statutory authorities.
        </p>
      </footer>

    </div>
  );
}
