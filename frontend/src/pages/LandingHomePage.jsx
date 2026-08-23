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
      color: "bg-blue-600",
      link: "/queue?search=Cost%20Outlier",
      tag: "IQR Statistical Engine"
    },
    {
      title: "Timeline & Delay Tracking",
      desc: "Tracks execution lags exceeding 180+ days past sanctioned milestone dates with automated risk inflation.",
      icon: Clock,
      color: "bg-amber-600",
      link: "/queue?search=Execution%20Delay",
      tag: "Milestone Engine"
    },
    {
      title: "Duplicate Proposal Matcher",
      desc: "TF-IDF NLP text proximity and Haversine geospatial clustering (<500m) to catch double-dipping proposals.",
      icon: Layers,
      color: "bg-purple-600",
      link: "/similar",
      tag: "Geospatial Clustering"
    },
    {
      title: "Geo-Camera Evidence Lock",
      desc: "Mobile photo progress capture with hardware GPS locking, distance mismatch alerts, and SHA-256 hashes.",
      icon: Camera,
      color: "bg-emerald-600",
      link: "/works/MPL-2024-UP-004821/capture-evidence",
      tag: "Tamper-Proof Lock"
    },
    {
      title: "Agency Monopoly Index",
      desc: "Herfindahl-Hirschman Index (HHI) analysis to detect contractor concentration and single-bidder monopolies.",
      icon: Building2,
      color: "bg-rose-600",
      link: "/queue",
      tag: "HHI Market Power"
    },
    {
      title: "Statutory Audit Ledger",
      desc: "Immutable cryptographic event log recording every officer determination, memo issue, and verification.",
      icon: ShieldCheck,
      color: "bg-teal-600",
      link: "/audit",
      tag: "Append-Only Ledger"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 -m-4 md:-m-6 lg:-m-8">
      
      {/* 1. HERO SECTION WITH RICH ATMOSPHERIC HERO BACKGROUND & ORANGE ACCENT GLOW */}
      <section className="relative bg-[#08182B] text-white pt-14 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Atmospheric Infrastructure & Engineering Blueprint Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1600&auto=format&fit=crop')" 
          }}
        />

        {/* Ambient Gradient Masks & Glowing Accents */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08182B] via-[#08182B]/90 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-[#F97316]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Saffron / Orange Bordered Frame Accent */}
            <div className="border-l-4 border-[#F97316] pl-4 py-1">
              <span className="text-xs font-black uppercase tracking-widest text-[#F97316] block">
                NATIONAL ANOMALY INTELLIGENCE LAYER
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Ministry of Statistics &amp; Programme Implementation • e-SAKSHI (MoSPI)
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Securing Public Funds,<br />
              <span className="text-[#F97316]">Empowering Integrity.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Explainable AI decision-support platform enabling District Planning Officers to proactively detect peer cost outliers, execution delays, duplicate proposals, and capture tamper-evident geo-verified completion evidence.
            </p>

            {/* Quick Search Input */}
            <form onSubmit={handleSearch} className="max-w-lg pt-2">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Constituency, District, or Work (e.g. Varanasi, CC Road)..."
                  className="w-full bg-slate-900/90 text-white rounded-xl pl-11 pr-28 py-3.5 text-xs sm:text-sm placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F97316] shadow-xl backdrop-blur-md"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg transition shadow-xs"
                >
                  Search
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/queue"
                className="px-6 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-orange-500/25 transition flex items-center gap-2 transform active:scale-95"
              >
                <span>EXPLORE SCRUTINY QUEUE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/works/MPL-2024-UP-004821/capture-evidence"
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center gap-2 backdrop-blur-md"
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Launch Geo-Camera</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Hero Showcase Card (Clean UI on Glowing Orange Semicircle) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Orange Backdrop Accent Circle (Matching Reference Semicircle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-full opacity-95 shadow-2xl blur-xs -z-0" />

            {/* Main Interactive Spotlight Card */}
            <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 text-slate-900 shadow-2xl border border-slate-100 space-y-4">
              
              {/* Header with Case ID */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black block leading-none">CASE INQUEST SPOTLIGHT</span>
                    <span className="text-[10px] text-slate-400 font-mono">#MPL-2024-UP-004821</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-red-100 text-red-700 border border-red-200">
                  87 / 100 HIGH RISK
                </span>
              </div>

              {/* Work Title & Location */}
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  Construction of CC Road &amp; Paver Works, Rampur, Varanasi
                </h4>
                <p className="text-xs text-slate-500">
                  Sanctioned cost is <strong>+53.8% above peer median</strong> with a near-identical proposal detected 420m away.
                </p>
              </div>

              {/* Clean Metric Badges Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-2xl bg-red-50/70 border border-red-100 space-y-0.5">
                  <span className="text-[10px] text-red-600 block font-bold uppercase">COST VARIANCE</span>
                  <span className="font-mono font-bold text-slate-900 text-base">₹48.00 Lakh</span>
                  <span className="text-[10px] text-red-700 block font-bold">+53.8% above median</span>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-0.5">
                  <span className="text-[10px] text-amber-700 block font-bold uppercase">DUPLICATE DISTANCE</span>
                  <span className="font-mono font-bold text-slate-900 text-base">420 Meters</span>
                  <span className="text-[10px] text-amber-700 block font-bold">Similar proposal</span>
                </div>
              </div>

              <Link
                to="/passport/MPL-2024-UP-004821"
                className="w-full py-3 rounded-xl bg-[#08182B] hover:bg-blue-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-xs"
              >
                <span>Inspect 360° Forensic Passport</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F97316]" />
              </Link>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#08182B] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-black">
                  ✓
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">MONITORED VALUE</div>
                  <div className="text-xs font-mono font-black text-emerald-400">₹593.13 Crore</div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* 2. FLOATING 3 KEY HIGHLIGHT CARDS (OVERLAPPING HERO BOTTOM) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-start gap-4 transition transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Explainable AI Scoring</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                100% deterministic, zero black-box scoring based on peer cost IQR, delay lags, and text similarity.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-start gap-4 transition transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shrink-0 shadow-xs">
              <Camera className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Geo-Camera Evidence</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mobile progress photos locked with hardware GPS coordinates and immutable SHA-256 tamper hashes.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-start gap-4 transition transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Statutory PDF Dossier</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                1-click export of court-ready audit reports with full officer audit trails and comparative graphs.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* 3. ABOUT / CAPABILITIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#F97316]">
                ABOUT THE PLATFORM
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                National Decision-Support Layer for Public Infrastructure
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                MPLADS Rakshak bridges the critical gap between fund sanctioning and ground reality. By analyzing multi-dimensional administrative records, it provides automated risk intelligence without modifying existing e-SAKSHI workflows.
              </p>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Automatic Peer-Group Cost Baselines</h4>
                  <p className="text-[11px] text-slate-500">Calculates interquartile variance across similar roads, community halls, and water projects.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Geospatial Duplicate Cluster Identification</h4>
                  <p className="text-[11px] text-slate-500">Haversine distance algorithms catch proposals with overlapping physical boundaries within 500m.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Immutable Cryptographic Audit Trail</h4>
                  <p className="text-[11px] text-slate-500">Records all administrative determinations in an append-only verifiable ledger for statutory oversight.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#F97316] hover:text-[#EA580C] transition group"
              >
                <span>EXPLORE EXECUTIVE ANALYTICS DASHBOARD</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

          {/* Right Visual Box */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl bg-[#08182B] text-white p-8 space-y-6">
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                  <div>
                    <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider block">NATIONAL COVERAGE</span>
                    <span className="text-lg font-black text-white">e-SAKSHI Ecosystem Integration</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold font-mono">
                    MoSPI SIH26102
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                    <div className="text-2xl font-black font-mono text-[#F97316]">543</div>
                    <div className="text-[10px] text-slate-300 uppercase font-bold mt-1">Lok Sabha MPs</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                    <div className="text-2xl font-black font-mono text-emerald-400">245</div>
                    <div className="text-[10px] text-slate-300 uppercase font-bold mt-1">Rajya Sabha MPs</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-semibold">Data Ingestion Schema Health</span>
                    <span className="font-mono font-bold text-emerald-400">99.2% Conformance</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99.2%' }} />
                  </div>
                </div>
              </div>

              {/* Overlapping Pill Badge */}
              <div className="absolute -bottom-5 right-6 z-20 bg-[#F97316] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
                <span className="text-xl font-black font-mono">3,013+</span>
                <span className="text-xs font-bold leading-tight">Sanctioned Works<br />Audited Live</span>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* 4. 6-GRID "A WIDE RANGE OF RISK ENGINES" SECTION */}
      <section className="bg-white py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#F97316]">
                ANALYTICAL SUITE
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                6 Calibrated Anomaly &amp; Risk Engines
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Deterministic algorithmic modules that execute continuous scrutiny across all sanctioned works.
              </p>
            </div>

            <Link
              to="/queue"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F97316] hover:text-[#EA580C] transition group shrink-0"
            >
              <span>VIEW FULL SCRUTINY QUEUE</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* 6 Clean White Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#F97316] shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-4">
                    {/* Circle Icon Badge */}
                    <div className={'w-12 h-12 rounded-2xl ' + item.color + ' text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform'}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        {item.tag}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 group-hover:text-[#F97316] transition pt-2 border-t border-slate-100"
                  >
                    <span>EXPLORE ENGINE</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* 5. 4-COLUMN STATS COUNTER BANNER */}
      <section className="bg-[#08182B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono text-white">
                ₹593.1 Cr
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Sanctioned Value
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono text-[#F97316]">
                3,013
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                e-SAKSHI Sanctions Monitored
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono text-red-400">
                294
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                High-Risk Anomaly Flags
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-mono text-emerald-400">
                100%
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Explainable Determinism
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 6. RECENT HIGH-RISK PROPOSALS SHOWCASE (CLEAN CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#F97316]">
              FLAGGED TRIAGE REGISTER
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              High-Risk Proposals Awaiting Determination
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Proposals with composite score ≥ 70 requiring priority officer scrutiny before fund disbursement.
            </p>
          </div>

          <Link
            to="/queue"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F97316] hover:text-[#EA580C] transition group shrink-0"
          >
            <span>VIEW ALL 294 FLAGS</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Showcase Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highRiskWorks.slice(0, 4).map((work) => {
            const score = work.riskScore !== undefined && work.riskScore !== null ? work.riskScore : (work.overallRiskScore || 85);
            const title = work.workName || work.workTitle || 'Sanctioned Infrastructure Work';
            const cost = work.sanctionedAmount || work.estimatedCost || 4800000;
            const reason = work.primaryReason || (work.riskSignals && work.riskSignals[0] ? work.riskSignals[0].split(':')[0] : 'Peer Cost Outlier (+53.8%)');

            return (
              <div
                key={work.workId}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-600 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-red-100 text-red-700 border border-red-200">
                      {score} / 100 RISK
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-bold">
                      {work.workId}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2" title={title}>
                    {title}
                  </h4>

                  <div className="text-[11px] text-slate-500 space-y-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{work.district || 'Varanasi'}, {work.state || 'UP'}</span>
                    </div>
                    <div className="font-mono font-bold text-slate-900 text-sm">
                      {formatINR(cost)}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-red-50/70 border border-red-100 text-[10px] text-red-700 font-semibold line-clamp-2">
                    {reason}
                  </div>
                </div>

                <Link
                  to={'/passport/' + work.workId}
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-[#08182B] hover:text-white text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <span>Inspect Passport</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

      </section>


      {/* 7. FAQ ACCORDION SECTION */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Heading & Official Notice Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border-l-4 border-[#F97316] pl-4 py-1">
                <span className="text-xs font-black uppercase tracking-widest text-[#F97316] block">
                  STATUTORY GOVERNANCE &amp; FAQS
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Administrative Clarity for Reviewing Officers
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Answers to Frequently Asked Questions
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clear operational guidelines on how MPLADS Rakshak integrates with e-SAKSHI, protects data integrity, and supports district administrative determinations.
              </p>

              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
                  <span className="text-sm">Administrative Decision-Support Notice</span>
                </div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Analytical scores provide non-binding prioritization. Final approvals and cancellations rest exclusively with authorized District Planning Officers.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Accordion */}
            <div className="lg:col-span-7 space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-700 transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={'w-4 h-4 text-slate-400 transition-transform ' + (isOpen ? 'rotate-180 text-[#F97316]' : '')} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>


      {/* 8. OFFICIAL FOOTER */}
      <footer className="bg-[#08182B] text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-black text-sm tracking-wider text-white">MPLADS RAKSHAK</span>
                <span className="text-[10px] font-bold uppercase bg-blue-900/80 text-blue-200 border border-blue-400/30 px-2 py-0.5 rounded">MoSPI</span>
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                National AI-Powered Anomaly Intelligence &amp; Decision Support Layer for e-SAKSHI (MoSPI). Developed for Smart India Hackathon SIH26102.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-white uppercase tracking-wider block">Quick Portals</span>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link to="/dashboard" className="hover:text-white transition">Executive Analytics</Link></li>
                <li><Link to="/queue" className="hover:text-white transition">Prioritised Scrutiny Queue</Link></li>
                <li><Link to="/map" className="hover:text-white transition">Geospatial Distribution</Link></li>
                <li><Link to="/similar" className="hover:text-white transition">Duplicate Scope Matcher</Link></li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-white uppercase tracking-wider block">Governance &amp; Audit</span>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link to="/audit" className="hover:text-white transition">Officer Audit Trail</Link></li>
                <li><Link to="/reports" className="hover:text-white transition">Statutory Reports</Link></li>
                <li><Link to="/data" className="hover:text-white transition">Data Ingestion Center</Link></li>
                <li><Link to="/settings" className="hover:text-white transition">Model Calibration</Link></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 MPLADS Rakshak • Ministry of Statistics &amp; Programme Implementation (MoSPI). All rights reserved.</p>
            <p className="font-mono text-[11px]">Smart India Hackathon SIH26102</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
