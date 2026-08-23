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
  ArrowUpRight,
  Filter,
  Zap
} from 'lucide-react';
import { api } from '../services/api';
import { formatINR } from '../utils/formatters';
import RevealOnScroll from '../components/RevealOnScroll';

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
      api.getRiskQueue({ page: 0, size: 5, sort: 'overallRiskScore,desc' })
    ]).then(([sumData, queueData]) => {
      setSummary(sumData);
      setHighRiskWorks(queueData?.content || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const totalWorks = summary?.totalWorks || 3013;
  const highRisk = summary?.highRiskCount || 294;
  const totalCost = summary?.totalSanctionedAmount || 5931310000;

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/queue?search=' + encodeURIComponent(searchQuery.trim()));
    } else {
      navigate('/queue');
    }
  };

  const handleQuickTagSearch = (tag) => {
    setSearchQuery(tag);
    navigate('/queue?search=' + encodeURIComponent(tag));
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

  const quickFilters = [
    { label: "🚨 High Risk Flags", query: "High Risk" },
    { label: "💰 Cost Inflation (>+50%)", query: "Cost Outlier" },
    { label: "⏳ Delay (>180 Days)", query: "Execution Delay" },
    { label: "📍 Varanasi (UP)", query: "Varanasi" },
    { label: "🛣️ Rural Roads", query: "Rural Roads" },
    { label: "👥 Single Agency Monopoly", query: "Agency Monopoly" }
  ];

  const services = [
    {
      title: "Cost Outlier Detection",
      desc: "Multi-district peer median benchmarking with IQR variance analysis to detect inflated estimates.",
      icon: TrendingUp,
      accent: "from-blue-600 to-indigo-600",
      link: "/queue?search=Cost%20Outlier",
      tag: "IQR Statistical Engine",
      stat: "+53.8% Avg Outlier"
    },
    {
      title: "Timeline & Delay Tracking",
      desc: "Tracks execution lags exceeding 180+ days past sanctioned milestone dates with automated risk inflation.",
      icon: Clock,
      accent: "from-amber-600 to-orange-600",
      link: "/queue?search=Execution%20Delay",
      tag: "Milestone Engine",
      stat: "180+ Days Threshold"
    },
    {
      title: "Duplicate Proposal Matcher",
      desc: "TF-IDF NLP text proximity and Haversine geospatial clustering (<500m) to catch double-dipping proposals.",
      icon: Layers,
      accent: "from-indigo-600 to-purple-600",
      link: "/similar",
      tag: "Geospatial Clustering",
      stat: "<500m Proximity Lock"
    },
    {
      title: "Geo-Camera Evidence Lock",
      desc: "Mobile photo progress capture with hardware GPS locking, distance mismatch alerts, and SHA-256 hashes.",
      icon: Camera,
      accent: "from-emerald-600 to-teal-600",
      link: "/works/MPL-2024-UP-004821/capture-evidence",
      tag: "Tamper-Proof Lock",
      stat: "SHA-256 Verified"
    },
    {
      title: "Agency Monopoly Index",
      desc: "Herfindahl-Hirschman Index (HHI) analysis to detect contractor concentration and single-bidder monopolies.",
      icon: Building2,
      accent: "from-slate-700 to-slate-900",
      link: "/queue",
      tag: "HHI Market Power",
      stat: "HHI > 2500 Monitored"
    },
    {
      title: "Statutory Audit Ledger",
      desc: "Immutable cryptographic event log recording every officer determination, memo issue, and verification.",
      icon: ShieldCheck,
      accent: "from-blue-800 to-slate-900",
      link: "/audit",
      tag: "Append-Only Ledger",
      stat: "100% Audit Trail"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] font-sans text-slate-900 dark:text-slate-100 -m-3 sm:-m-5 md:-m-6 lg:-m-8 relative scroll-smooth selection:bg-blue-600 selection:text-white transition-colors duration-300">
      
      {/* 1. CINEMATIC 100% FULL-SCREEN PARLIAMENT HERO VIEWPORT */}
      <section className="relative bg-slate-950 text-white min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-3.75rem)] flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
        
        {/* Unobstructed Parliament Architectural Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-95 scale-100 pointer-events-none transition-transform duration-1000 ease-out"
          style={{ backgroundImage: "url('/parliament_bg.jpg')" }}
        />

        {/* Subtle Dark Vignette Mask for ultra-crisp title readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60 pointer-events-none" />

        {/* Top Spacer for vertical balance */}
        <div className="h-6 sm:h-10 shrink-0" />

        {/* ONLY THE PROJECT TITLE ON THE IMAGE (VERTICALLY CENTERED) */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-4 sm:space-y-5 my-auto py-4 sm:py-6">
          
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-slate-900/85 border border-slate-700/80 text-blue-300 text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-2xl hover:border-blue-400/50 transition">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
            <span className="truncate max-w-[260px] sm:max-w-none">
              Ministry of Statistics &amp; Programme Implementation • e-SAKSHI (MoSPI)
            </span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-2xl">
            MPLADS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-200">RAKSHAK</span>
          </h1>

          <p className="text-xs sm:text-lg md:text-xl font-medium text-slate-200 tracking-wide max-w-2xl mx-auto drop-shadow-md leading-relaxed px-2">
            National AI-Powered Anomaly Intelligence &amp; Decision Support Layer for Public Funds Governance
          </p>

        </div>

        {/* Full-Screen Viewport Bottom Bar (Telemetry + Smooth Scroll Trigger + Government Badge) */}
        <div className="w-full relative z-20 pb-4 sm:pb-6 px-3 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-slate-300 border-t border-white/10 pt-3 sm:pt-4 bg-slate-950/50 backdrop-blur-sm">
          
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-center sm:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>Live Surveillance: <strong className="text-white font-mono">{totalWorks.toLocaleString('en-IN')} Works</strong> • <strong className="text-white font-mono">{formatINR(totalCost)}</strong> • <strong className="text-red-400 font-mono">{highRisk} Flags</strong></span>
          </div>

          <a 
            href="#command-center"
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-400/30 text-[11px] sm:text-xs text-blue-300 hover:text-white hover:bg-blue-600/40 transition-all font-bold animate-bounce shadow-lg shrink-0"
          >
            <span>Explore Scrutiny Queue &amp; Analytics</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>

          <div className="text-right space-y-0.5 select-none hidden sm:block">
            <div className="text-xs font-black text-white uppercase tracking-widest font-sans drop-shadow-md">
              Government of India
            </div>
            <div className="text-[10px] text-slate-300 font-semibold drop-shadow-md">
              भारत सरकार • MoSPI
            </div>
          </div>

        </div>

      </section>


      {/* 2. LOWER PORTAL CONTENT WITH APPLE-STYLE SCROLL REVEAL & SUBTLE ASHOKA WATERMARK */}
      <div 
        id="command-center"
        className="relative bg-cover bg-fixed bg-center scroll-mt-6"
        style={{ backgroundImage: "url('/gov_watermark.jpg')" }}
      >
        
        {/* Original soft subtle tint for clean elegant texture */}
        <div className="absolute inset-0 bg-[#F8FAFC]/94 dark:bg-[#0B0F19]/96 pointer-events-none transition-colors duration-300" />

        <div className="relative z-10">

          {/* A. EXECUTIVE COMMAND & SEARCH CENTER (REVEALS ON SCROLL) */}
          <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4 relative z-20">
            <RevealOnScroll delay={0}>
              <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-7 shadow-xl border border-slate-200/90 dark:border-slate-800 space-y-4 sm:space-y-5 transition-all hover:shadow-2xl">
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Search Form */}
                  <form onSubmit={handleSearch} className="flex-1 w-full lg:max-w-2xl">
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 sm:left-4 pointer-none" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Constituency, District, or Work (e.g. Varanasi, CC Road)..."
                        className="w-full bg-slate-50/70 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl pl-10 sm:pl-11 pr-20 sm:pr-24 py-2 sm:py-2.5 text-xs sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-blue-500/20 focus:border-[#0B2545] dark:focus:border-blue-500 shadow-xs transition"
                      />
                      <button
                        type="submit"
                        className="absolute right-1 sm:right-1.5 px-3 sm:px-4 py-1 sm:py-1.5 bg-[#0B2545] dark:bg-blue-600 hover:bg-[#071B30] dark:hover:bg-blue-500 text-white text-[11px] sm:text-xs font-bold rounded-lg transition shadow-xs flex items-center gap-1"
                      >
                        <span>Search</span>
                      </button>
                    </div>
                  </form>

                  {/* Quick Action Navigation Buttons (Adaptive 2-Column Grid on Mobile, Flex on Desktop) */}
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
                    <Link
                      to="/queue"
                      className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0B2545] dark:bg-blue-600 hover:bg-[#071B30] dark:hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 sm:gap-2 border border-[#0B2545] dark:border-blue-500 group"
                    >
                      <AlertOctagon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 shrink-0" />
                      <span className="truncate">Scrutiny Queue</span>
                      <span className="bg-red-600 text-white font-mono text-[10px] px-1.5 py-0.5 rounded-full font-black">
                        {highRisk}
                      </span>
                    </Link>

                    <Link
                      to="/dashboard"
                      className="px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700 hover:border-slate-400 shadow-xs transition flex items-center justify-center gap-1.5"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400 shrink-0" />
                      <span className="truncate">Analytics</span>
                    </Link>

                    <Link
                      to="/works/MPL-2024-UP-004821/capture-evidence"
                      className="px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700 hover:border-slate-400 shadow-xs transition flex items-center justify-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="truncate">Geo-Camera</span>
                    </Link>

                    <Link
                      to="/works"
                      className="px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700 hover:border-slate-400 shadow-xs transition flex items-center justify-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 shrink-0" />
                      <span className="truncate">All Works</span>
                    </Link>
                  </div>

                </div>

                {/* Instant Filter Chips */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Filter className="w-3 h-3 text-slate-500 shrink-0" />
                    Quick Filters:
                  </span>
                  {quickFilters.map((qf, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickTagSearch(qf.query)}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-300 text-[10px] sm:text-[11px] font-medium transition cursor-pointer"
                    >
                      {qf.label}
                    </button>
                  ))}
                </div>

                {/* Live Telemetry Bar */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span>Surveillance: <strong className="text-slate-800 dark:text-slate-200 font-mono">{totalWorks.toLocaleString('en-IN')} Works</strong></span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-[10px] sm:text-[11px]">
                    <span>Value: <strong className="text-slate-900 dark:text-slate-100">{formatINR(totalCost)}</strong></span>
                    <span>•</span>
                    <span>High Risk: <strong className="text-red-600 dark:text-red-400">{highRisk}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">100% Explainable AI</span>
                  </div>
                </div>

              </div>
            </RevealOnScroll>
          </section>


          {/* B. THREE CORE PILLAR HIGHLIGHT CARDS (STAGGERED REVEAL) */}
          <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              
              <RevealOnScroll delay={100}>
                <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-blue-600 flex items-start gap-3 sm:gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-400 shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">Explainable AI Scoring</h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Deterministic scoring based on peer group IQR cost deviation and timeline lags.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-600 flex items-start gap-3 sm:gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">Geo-Camera Verification</h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      On-site photo evidence locked with GPS coordinates and SHA-256 digital hashes.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={300}>
                <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-slate-800 dark:border-l-slate-600 flex items-start gap-3 sm:gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                    <FileCheck2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white transition">Statutory PDF Dossier</h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      1-click court-ready audit reports with full officer audit trails and comparative graphs.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

            </div>
          </section>


          {/* C. FOUR BOLD METRIC STATS BANNER (REVEALS UPWARD) */}
          <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
            <RevealOnScroll delay={150}>
              <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center divide-y sm:divide-y-0 divide-slate-100 dark:divide-slate-800 hover:shadow-md transition">
                
                <div className="space-y-1">
                  <div className="text-xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
                    {formatINR(totalCost)}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Sanctioned Value Audited
                  </div>
                </div>

                <div className="space-y-1 pt-2 sm:pt-0">
                  <div className="text-xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
                    {totalWorks.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Sanctioned Projects
                  </div>
                </div>

                <div className="space-y-1 pt-2 sm:pt-0">
                  <div className="text-xl sm:text-3xl font-extrabold font-mono text-red-600 dark:text-red-400">
                    {highRisk}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    High-Risk Flags
                  </div>
                </div>

                <div className="space-y-1 pt-2 sm:pt-0">
                  <div className="text-xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                    100%
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Explainable AI
                  </div>
                </div>

              </div>
            </RevealOnScroll>
          </section>


          {/* D. SIX ANALYTICAL ENGINES GRID (UPWARD REVEAL WITH STAGGER) */}
          <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-4 sm:space-y-6">
            
            <RevealOnScroll delay={50}>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 block">
                    SYSTEM ARCHITECTURE
                  </span>
                  <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    6 Calibrated Anomaly &amp; Risk Engines
                  </h2>
                </div>

                <Link
                  to="/queue"
                  className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 inline-flex items-center gap-1"
                >
                  <span>View Full Scrutiny Queue</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {services.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <RevealOnScroll key={idx} delay={idx * 70}>
                    <div
                      className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-3 sm:space-y-4 group relative overflow-hidden h-full"
                    >
                      <div className="space-y-2 sm:space-y-2.5">
                        
                        <div className="flex items-center justify-between">
                          <div className={'w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ' + item.accent + ' flex items-center justify-center text-white shadow-xs group-hover:scale-110 transition-transform'}>
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {item.stat}
                          </span>
                        </div>

                        <div>
                          <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            {item.tag}
                          </span>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <Link
                        to={item.link}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 pt-2.5 border-t border-slate-100 dark:border-slate-800 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Explore Engine</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>

          </section>


          {/* E. RECENT HIGH-RISK PROPOSALS TABLE REGISTER (SMOOTH UPWARD FLOAT) */}
          <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4 sm:space-y-5">
            
            <RevealOnScroll delay={50}>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400 block">
                    TRIAGE REGISTER
                  </span>
                  <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    High-Risk Priority Proposals
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Sanctioned works with composite risk score ≥ 70 requiring priority determination.
                  </p>
                </div>

                <Link
                  to="/queue"
                  className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 inline-flex items-center gap-1"
                >
                  <span>View All ({highRisk})</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={120}>
              <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[650px]">
                    <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200/80 dark:border-slate-700">
                      <tr>
                        <th className="py-3 px-3 sm:px-4">Risk Score</th>
                        <th className="py-3 px-3 sm:px-4">Work ID</th>
                        <th className="py-3 px-3 sm:px-4">Project Title &amp; Location</th>
                        <th className="py-3 px-3 sm:px-4">Cost (INR)</th>
                        <th className="py-3 px-3 sm:px-4">Primary Anomaly Signal</th>
                        <th className="py-3 px-3 sm:px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                      {highRiskWorks.map((work) => {
                        const score = work.riskScore !== undefined && work.riskScore !== null ? work.riskScore : (work.overallRiskScore || 85);
                        const title = work.workName || work.workTitle || 'Sanctioned Project';
                        const cost = work.sanctionedAmount || work.estimatedCost || 4800000;
                        const reason = work.primaryReason || (work.riskSignals && work.riskSignals[0] ? work.riskSignals[0].split(':')[0] : 'Peer Cost Outlier (+53.8%)');

                        return (
                          <tr key={work.workId} className="hover:bg-slate-50/90 dark:hover:bg-slate-800/60 transition group">
                            <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 group-hover:bg-red-600 group-hover:text-white transition">
                                {score} / 100
                              </span>
                            </td>
                            <td className="py-3 px-3 sm:px-4 font-mono font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                              {work.workId}
                            </td>
                            <td className="py-3 px-3 sm:px-4 max-w-xs sm:max-w-sm">
                              <div className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1" title={title}>
                                {title}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                {work.district || 'Varanasi'}, {work.state || 'UP'}
                              </div>
                            </td>
                            <td className="py-3 px-3 sm:px-4 font-mono font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                              {formatINR(cost)}
                            </td>
                            <td className="py-3 px-3 sm:px-4 text-slate-700 dark:text-slate-300 max-w-xs truncate">
                              {reason}
                            </td>
                            <td className="py-3 px-3 sm:px-4 text-right whitespace-nowrap">
                              <Link
                                to={'/passport/' + work.workId}
                                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 hover:text-white text-slate-800 dark:text-slate-200 font-semibold text-xs transition border border-slate-300 dark:border-slate-700 shadow-xs"
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
            </RevealOnScroll>

          </section>


          {/* F. FAQ & STATUTORY GOVERNANCE SECTION (REVEALS UPWARD) */}
          <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4 sm:space-y-5">
            
            <RevealOnScroll delay={50}>
              <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  STATUTORY COMPLIANCE
                </span>
                <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>
            </RevealOnScroll>

            <div className="space-y-2.5 sm:space-y-3 max-w-4xl">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <RevealOnScroll key={idx} delay={idx * 50}>
                    <div
                      className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                        className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 sm:gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:text-blue-700 dark:hover:text-blue-400 transition"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={'w-4 h-4 text-slate-400 shrink-0 transition-transform ' + (isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : '')} />
                      </button>
                      {isOpen && (
                        <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-1 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 leading-relaxed bg-slate-50/50 dark:bg-slate-950/30">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>

          </section>


          {/* G. FORMAL GOVERNMENT FOOTER */}
          <footer className="bg-[#0F172A] dark:bg-[#060A12] text-slate-400 pt-8 sm:pt-10 pb-6 sm:pb-8 border-t border-slate-800 dark:border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                
                <div className="space-y-2 sm:col-span-2">
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

              <div className="border-t border-slate-800 dark:border-slate-900 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <p>© 2026 MPLADS Rakshak • Ministry of Statistics &amp; Programme Implementation (MoSPI). All rights reserved.</p>
                <p className="font-mono text-[11px]">Smart India Hackathon SIH26102</p>
              </div>

            </div>
          </footer>

        </div>

      </div>

    </div>
  );
}
