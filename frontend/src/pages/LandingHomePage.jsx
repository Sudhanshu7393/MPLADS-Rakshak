import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Search, 
  Check, 
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Layers,
  Sparkles,
  RefreshCw,
  MapPin,
  Clock,
  Shield,
  Activity,
  AlertTriangle,
  FolderSearch,
  CheckCircle,
  HelpCircle,
  FileCheck2,
  Sliders,
  ArrowUpRight
} from 'lucide-react';
import { api } from '../services/api';
import { formatINR } from '../utils/formatters';

export default function LandingHomePage() {
  const [summary, setSummary] = useState(null);
  const [highRiskWorks, setHighRiskWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.getDashboardSummary(),
      api.getRiskQueue({ page: 0, size: 4, sort: 'overallRiskScore,desc' })
    ]).then(([sumData, queueData]) => {
      setSummary(sumData);
      setHighRiskWorks(queueData?.content || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const totalWorks = summary?.totalWorks || 3013;
  const highRisk = summary?.highRiskCount || 294;
  const totalCost = summary?.totalSanctionedAmount || 5931310000;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/queue?search=' + encodeURIComponent(searchQuery.trim()));
    } else {
      navigate('/queue');
    }
  };

  const setFilterAndSearch = (query) => {
    setSearchQuery(query);
    navigate('/queue?search=' + encodeURIComponent(query));
  };

  const faqs = [
    {
      q: "How does MPLADS Rakshak detect cost inflation anomalies?",
      a: "Our statistical AI engine computes peer-group Interquartile Range (IQR) medians across identical project categories within the same district or state. Proposals exceeding +1.5x IQR (e.g. +53.8% above sector average) are automatically flagged for administrative review."
    },
    {
      q: "Does MPLADS Rakshak replace the official e-SAKSHI portal?",
      a: "No. MPLADS Rakshak acts as an intelligent decision-support layer sitting non-invasively on top of e-SAKSHI. It ingests public and administrative streams to rank risk, leaving final sanctioning and approval authority with the District Planning Officers (DPOs)."
    },
    {
      q: "How is mobile photo evidence protected against GPS spoofing?",
      a: "When field surveyors capture on-site completion photos, our geo-camera captures hardware GPS coordinates, verifies proximity against the registered work location (flagging anything >500m away), and generates an immutable SHA-256 digital hash."
    },
    {
      q: "Can officers export court-ready audit dossiers for inquiries?",
      a: "Yes. Every work dossier generates a 360° Risk Passport that can be exported in 1-click as a standardized statutory PDF report with timestamped audit trails, peer comparison charts, and geo-evidence."
    }
  ];

  const services = [
    {
      title: "Cost Outlier Detection",
      desc: "Multi-district peer median benchmarking with IQR variance analysis to detect inflated estimates.",
      icon: TrendingUp,
      color: "bg-blue-600 text-white",
      link: "/queue?search=Cost%20Outlier",
      tag: "IQR Statistical Engine"
    },
    {
      title: "Timeline & Delay Tracking",
      desc: "Tracks execution lags exceeding 180+ days past sanctioned milestone dates with automated risk inflation.",
      icon: Clock,
      color: "bg-slate-700 text-white",
      link: "/queue?search=Execution%20Delay",
      tag: "Milestone Engine"
    },
    {
      title: "Duplicate Proposal Matcher",
      desc: "TF-IDF NLP text proximity and Haversine geospatial clustering (<500m) to catch double-dipping proposals.",
      icon: Layers,
      color: "bg-indigo-600 text-white",
      link: "/similar",
      tag: "Geospatial Clustering"
    },
    {
      title: "Geo-Camera Evidence Lock",
      desc: "Mobile photo progress capture with hardware GPS locking, distance mismatch alerts, and SHA-256 hashes.",
      icon: Camera,
      color: "bg-emerald-600 text-white",
      link: "/works/MPL-2024-UP-004821/capture-evidence",
      tag: "Tamper-Proof Lock"
    },
    {
      title: "Agency Monopoly Index",
      desc: "Herfindahl-Hirschman Index (HHI) analysis to detect contractor concentration and single-bidder monopolies.",
      icon: Building2,
      color: "bg-slate-800 text-white",
      link: "/queue",
      tag: "HHI Market Power"
    },
    {
      title: "Statutory Audit Ledger",
      desc: "Immutable cryptographic event log recording every officer determination, memo issue, and verification.",
      icon: ShieldCheck,
      color: "bg-blue-800 text-white",
      link: "/audit",
      tag: "Append-Only Ledger"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 -m-4 md:-m-6 lg:-m-8">
      
      {/* 1. SEAMLESS CINEMATIC HERO SECTION WITH ILLUMINATED PARLIAMENT ARCHITECTURE */}
      <section className="relative bg-slate-950 text-white pt-10 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
        
        {/* Full Parliament Architectural Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90 scale-100 pointer-events-none transition-transform duration-700"
          style={{ backgroundImage: "url('/parliament_bg.jpg')" }}
        />

        {/* Sophisticated Dark Gradient Vignette for Razor-Sharp Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Headline & Controls */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Ministry of Statistics &amp; Programme Implementation • e-SAKSHI</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              AI-Powered Risk Intelligence for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">MPLADS Governance</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Automated decision-support platform enabling District Planning Officers to detect peer cost outliers, execution delays, duplicate proposals, and capture tamper-evident geo-verified completion evidence.
            </p>

            {/* Clean Professional Search Bar */}
            <form onSubmit={handleSearch} className="max-w-lg pt-1">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Constituency, District, or Work (e.g. Varanasi, CC Road)..."
                  className="w-full bg-slate-900/90 text-white rounded-xl pl-11 pr-28 py-3 text-xs sm:text-sm placeholder-slate-400 border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition shadow-sm"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <Link
                to="/queue"
                className="px-4.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 transform active:scale-95"
              >
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>Scrutiny Queue ({highRisk} Flags)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/dashboard"
                className="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700/80 backdrop-blur-md transition flex items-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                <span>Executive Analytics</span>
              </Link>

              <Link
                to="/works/MPL-2024-UP-004821/capture-evidence"
                className="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700/80 backdrop-blur-md transition flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>Geo-Camera</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Sleek Frosted Glass Spotlight Card */}
          <div className="lg:col-span-5 flex justify-center">
            
            <div className="w-full max-w-sm bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4.5 text-white shadow-2xl border border-white/10 space-y-3.5">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold block text-slate-200 leading-none">CASE INQUEST SPOTLIGHT</span>
                    <span className="text-[9px] text-slate-400 font-mono">#MPL-2024-UP-004821</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-500/20 text-red-300 border border-red-400/30">
                  87 / 100 HIGH RISK
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white leading-snug">
                  Construction of CC Road &amp; Paver Works, Rampur, Varanasi
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Sanctioned cost is <strong className="text-red-400">+53.8% above peer median</strong> with near-duplicate detected 420m away.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-0.5">
                  <span className="text-[9px] text-slate-400 block font-bold uppercase">Cost Variance</span>
                  <span className="font-mono font-bold text-white text-xs">₹48.00 Lakh</span>
                  <span className="text-[9px] text-red-400 block font-bold">+53.8% Outlier</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-0.5">
                  <span className="text-[9px] text-slate-400 block font-bold uppercase">Proximity</span>
                  <span className="font-mono font-bold text-white text-xs">420 Meters</span>
                  <span className="text-[9px] text-amber-400 block font-bold">Duplicate Cluster</span>
                </div>
              </div>

              <Link
                to="/passport/MPL-2024-UP-004821"
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <span>Inspect Forensic Risk Passport</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* 2. THREE CORE PILLAR HIGHLIGHTS (CLEAN ELEVATED WHITE CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0 shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-slate-900">Explainable AI Scoring</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deterministic scoring based on peer group IQR cost deviation and timeline lags.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-slate-900">Geo-Camera Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                On-site photo evidence locked with GPS coordinates and SHA-256 digital hashes.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-800 shrink-0 shadow-xs">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-slate-900">Statutory PDF Dossier</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                1-click court-ready audit reports with full officer audit trails and comparative graphs.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* 3. FOUR BOLD METRIC STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">
              {formatINR(totalCost)}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Sanctioned Value Audited
            </div>
          </div>

          <div className="space-y-1 pt-4 lg:pt-0">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">
              {totalWorks.toLocaleString('en-IN')}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Sanctioned Project Records
            </div>
          </div>

          <div className="space-y-1 pt-4 lg:pt-0">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-red-600">
              {highRisk}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              High-Risk Anomaly Flags
            </div>
          </div>

          <div className="space-y-1 pt-4 lg:pt-0">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600">
              100%
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Explainable AI (Zero Black-Box)
            </div>
          </div>

        </div>
      </section>


      {/* 4. SIX ANALYTICAL ENGINES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              6 Calibrated Anomaly &amp; Risk Engines
            </h2>
          </div>

          <Link
            to="/queue"
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
          >
            <span>View Full Scrutiny Queue</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 shadow-xs flex flex-col justify-between space-y-4 transition"
              >
                <div className="space-y-2.5">
                  <div className={'w-9 h-9 rounded-lg ' + item.color + ' flex items-center justify-center'}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 pt-2.5 border-t border-slate-100"
                >
                  <span>Explore Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

      </section>


      {/* 5. RECENT HIGH-RISK PROPOSALS TABLE REGISTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 block">
              TRIAGE REGISTER
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              High-Risk Priority Proposals
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sanctioned works with composite risk score ≥ 70 requiring priority determination.
            </p>
          </div>

          <Link
            to="/queue"
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
          >
            <span>View All ({highRisk})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Risk Score</th>
                  <th className="py-3 px-4">Work ID</th>
                  <th className="py-3 px-4">Project Title &amp; Location</th>
                  <th className="py-3 px-4">Cost (INR)</th>
                  <th className="py-3 px-4">Primary Anomaly Signal</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {highRiskWorks.map((work) => {
                  const score = work.riskScore !== undefined && work.riskScore !== null ? work.riskScore : (work.overallRiskScore || 85);
                  const title = work.workName || work.workTitle || 'Sanctioned Project';
                  const cost = work.sanctionedAmount || work.estimatedCost || 4800000;
                  const reason = work.primaryReason || (work.riskSignals && work.riskSignals[0] ? work.riskSignals[0].split(':')[0] : 'Peer Cost Outlier (+53.8%)');

                  return (
                    <tr key={work.workId} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-red-50 text-red-700 border border-red-200">
                          {score} / 100
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {work.workId}
                      </td>
                      <td className="py-3 px-4 max-w-sm">
                        <div className="font-bold text-slate-900 line-clamp-1" title={title}>
                          {title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {work.district || 'Varanasi'}, {work.state || 'UP'}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {formatINR(cost)}
                      </td>
                      <td className="py-3 px-4 text-slate-700 max-w-xs truncate">
                        {reason}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <Link
                          to={'/passport/' + work.workId}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 font-semibold text-xs transition border border-slate-300"
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </section>


      {/* 6. FAQ & STATUTORY GOVERNANCE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
        
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            STATUTORY COMPLIANCE
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-700 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={'w-4 h-4 text-slate-400 transition-transform ' + (isOpen ? 'rotate-180 text-blue-600' : '')} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>


      {/* 7. FORMAL GOVERNMENT FOOTER */}
      <footer className="bg-[#0F172A] text-slate-400 pt-10 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-sm tracking-wider text-white">MPLADS RAKSHAK</span>
                <span className="text-[10px] font-bold uppercase bg-blue-900/80 text-blue-200 border border-blue-400/30 px-1.5 py-0.2 rounded">MoSPI</span>
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                National AI-Powered Anomaly Intelligence &amp; Decision Support Layer for e-SAKSHI (MoSPI). Developed for Smart India Hackathon SIH26102.
              </p>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-bold text-white uppercase tracking-wider block">Operational Modules</span>
              <ul className="space-y-1 text-slate-400">
                <li><Link to="/dashboard" className="hover:text-white transition">Executive Analytics</Link></li>
                <li><Link to="/queue" className="hover:text-white transition">Prioritised Scrutiny Queue</Link></li>
                <li><Link to="/map" className="hover:text-white transition">Geospatial Distribution</Link></li>
                <li><Link to="/similar" className="hover:text-white transition">Duplicate Scope Matcher</Link></li>
              </ul>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-bold text-white uppercase tracking-wider block">Audit &amp; Governance</span>
              <ul className="space-y-1 text-slate-400">
                <li><Link to="/audit" className="hover:text-white transition">Officer Audit Trail</Link></li>
                <li><Link to="/reports" className="hover:text-white transition">Statutory Reports</Link></li>
                <li><Link to="/data" className="hover:text-white transition">Data Ingestion Center</Link></li>
                <li><Link to="/settings" className="hover:text-white transition">Model Calibration</Link></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© 2026 MPLADS Rakshak • Ministry of Statistics &amp; Programme Implementation (MoSPI). All rights reserved.</p>
            <p className="font-mono text-[11px]">Smart India Hackathon SIH26102</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
