import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Search,
  ExternalLink,
  Lock,
  FileCheck2
} from "lucide-react";
import { api } from "../services/api";
import { formatINR } from "../utils/formatters";

export default function GrandGatewayPage() {
  const [summary, setSummary] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.getDashboardSummary()
      .then(data => setSummary(data))
      .catch(console.error);
  }, []);

  const totalWorks = summary?.totalWorks || 3013;
  const highRisk = summary?.highRiskCount || 294;
  const totalCost = summary?.totalSanctionedAmount || 5931310000;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/queue?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/queue");
    }
  };

  const gateways = [
    {
      title: "1. Operational Workflow Hub",
      subtitle: "End-to-End Governance Pipeline",
      desc: "Interactive 6-step operational lifecycle from data ingestion to officer sign-off and audit trails.",
      badge: "6-Step Process",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/40",
      icon: Compass,
      link: "/workflow",
      accent: "from-blue-600 to-indigo-800",
      glow: "hover:border-blue-400 hover:shadow-blue-500/20",
      btnText: "Enter Workflow Hub"
    },
    {
      title: "2. Prioritised Scrutiny Queue",
      subtitle: "Risk-Ranked Triage Register",
      desc: "Explore 294 high-risk proposals flagged for cost inflation, chronic execution delays, or duplicate scopes.",
      badge: `${highRisk} High-Risk Flags`,
      badgeColor: "bg-red-500/20 text-red-300 border-red-400/40",
      icon: AlertOctagon,
      link: "/queue",
      accent: "from-red-600 to-rose-800",
      glow: "hover:border-red-400 hover:shadow-red-500/20",
      btnText: "Open Scrutiny Queue"
    },
    {
      title: "3. Executive Analytics Dashboard",
      subtitle: "National & District Intelligence",
      desc: "Deep analytical stratification pie charts, top risk district rankings, and comprehensive sanction statistics.",
      badge: "Full Visual Insights",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/40",
      icon: TrendingUp,
      link: "/dashboard",
      accent: "from-amber-600 to-orange-800",
      glow: "hover:border-amber-400 hover:shadow-amber-500/20",
      btnText: "Open Analytics"
    },
    {
      title: "4. Mobile Field Geo-Camera",
      subtitle: "On-Site Physical Verification",
      desc: "Capture live completion photos on mobile with tamper-evident GPS coordinate locks and distance validation.",
      badge: "GPS Proof + SHA-256",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-400/40",
      icon: Camera,
      link: "/works/MPL-2024-UP-004821/capture-evidence",
      accent: "from-purple-600 to-violet-800",
      glow: "hover:border-purple-400 hover:shadow-purple-500/20",
      btnText: "Launch Field Camera"
    },
    {
      title: "5. 360° Forensic Risk Passport",
      subtitle: "Sample High-Risk Case Inquest",
      desc: "Inspect Varanasi CC Road (#004821): Peer cost median benchmarks, milestone delays, and nearby duplicate maps.",
      badge: "Flagship Dossier",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
      icon: FileText,
      link: "/passport/MPL-2024-UP-004821",
      accent: "from-emerald-600 to-teal-800",
      glow: "hover:border-emerald-400 hover:shadow-emerald-500/20",
      btnText: "Inspect Case Dossier"
    },
    {
      title: "6. Data Health & Ingestion Audit",
      subtitle: "e-SAKSHI Gateway Integration",
      desc: "Live data pipeline status, schema completeness validation, dynamic column mapping, and record health scorecard.",
      badge: "99.2% Data Health",
      badgeColor: "bg-slate-400/20 text-slate-300 border-slate-400/40",
      icon: Database,
      link: "/data",
      accent: "from-slate-700 to-slate-900",
      glow: "hover:border-slate-400 hover:shadow-slate-500/20",
      btnText: "Inspect Data Pipeline"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. MAJESTIC HERO SECTION WITH OFFICIAL PARLIAMENT BACKDROP */}
      <div className="relative min-h-[580px] flex items-center justify-center overflow-hidden border-b border-slate-800">
        
        {/* Parliament Background Image with Cinematic Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transform transition-transform duration-1000"
          style={{ backgroundImage: "url('/parliament_hero_bg.jpg')" }}
        />

        {/* Ambient Gradients for Perfect Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/90" />

        {/* Content Box */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
          
          {/* Official Ministry Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ministry of Statistics &amp; Programme Implementation • MoSPI (SIH26102)</span>
          </div>

          {/* Grand Main Title */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase drop-shadow-2xl">
              MPLADS <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-blue-300 to-emerald-400">RAKSHAK</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              National Explainable AI Risk &amp; Anomaly Intelligence Layer for <strong>e-SAKSHI (MPLADS)</strong>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Empowering authorized officers to automatically detect peer cost outliers, chronic execution delays, duplicate proposals, and capture tamper-evident geo-verified completion proof.
          </p>

          {/* Quick Universal Search in Hero */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any Parliamentary Constituency, District, or Project (e.g. Varanasi, CC Road, Patna)..."
                className="w-full bg-slate-900/90 text-white rounded-2xl pl-12 pr-32 py-4 text-xs sm:text-sm placeholder-slate-400 shadow-2xl border-2 border-slate-700/80 focus:outline-none focus:border-blue-400 backdrop-blur-md"
              />
              <button
                type="submit"
                className="absolute right-2.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition shadow-md"
              >
                Search
              </button>
            </div>
          </form>

          {/* 4 Floating Glassmorphic Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md text-left shadow-lg">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Sanctioned Value</span>
              <span className="text-lg sm:text-xl font-black font-mono text-amber-300">{formatINR(totalCost)}</span>
              <span className="text-[10px] text-slate-400 block">Across 8 Districts</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md text-left shadow-lg">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Tracked Projects</span>
              <span className="text-lg sm:text-xl font-black font-mono text-white">{totalWorks.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-slate-400 block">eSAKSHI Sanctions</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-red-900/40 backdrop-blur-md text-left shadow-lg">
              <span className="text-[10px] text-red-400 uppercase font-bold block">High Risk Flags</span>
              <span className="text-lg sm:text-xl font-black font-mono text-red-400">{highRisk}</span>
              <span className="text-[10px] text-red-300/80 block">Score &ge; 70 Triage</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-900/40 backdrop-blur-md text-left shadow-lg">
              <span className="text-[10px] text-emerald-400 uppercase font-bold block">Explainable AI</span>
              <span className="text-lg sm:text-xl font-black font-mono text-emerald-400">100%</span>
              <span className="text-[10px] text-emerald-300/80 block">0–100 Multi-Signal</span>
            </div>
          </div>

        </div>
      </div>


      {/* 2. THE 6 PRIMARY INTERACTIVE GATEWAY CARDS */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Master Platform Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Access Core Operational Gateways
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Select any module below to immediately transition into the full live platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gateways.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative group bg-slate-900/90 rounded-3xl p-6 border-2 border-slate-800 ${item.glow} shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between space-y-5`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.accent} text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-white group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-400">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <Link
                    to={item.link}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-blue-600 text-white shadow-md transition-all flex items-center justify-between group-hover:shadow-blue-500/30"
                  >
                    <span>{item.btnText}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>


      {/* 3. CASE INQUEST SPOTLIGHT CARD */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-red-500/20 text-red-300 border border-red-500/40 font-mono">
                  CASE INQUEST SPOTLIGHT • #MPL-2024-UP-004821
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Varanasi, UP • Rural Roads &amp; Bridges
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                Construction of CC Road and Paver Works from Main Chowk to Panchayat Bhawan, Village Rampur
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-red-900/50">
                  <span className="text-red-400 font-bold block text-[10px] uppercase">Cost Variance</span>
                  <span className="font-black text-white text-base">₹48.00 Lakh</span>
                  <span className="text-red-300 text-[10px] block">+53.8% above peer median</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-900/50">
                  <span className="text-amber-400 font-bold block text-[10px] uppercase">Duplicate Proximity</span>
                  <span className="font-black text-white text-base">420m Radius</span>
                  <span className="text-amber-300 text-[10px] block">Similar work (#004822)</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-purple-900/50">
                  <span className="text-purple-400 font-bold block text-[10px] uppercase">Completion Proof</span>
                  <span className="font-black text-white text-base">Missing Doc</span>
                  <span className="text-purple-300 text-[10px] block">Geo-camera required</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                to="/passport/MPL-2024-UP-004821"
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/30"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>Inspect Risk Passport</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/works/MPL-2024-UP-004821/capture-evidence"
                className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/30"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Geo-Evidence</span>
              </Link>
            </div>

          </div>
        </div>
      </div>


      {/* 4. FOOTER */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500 space-y-1.5 max-w-4xl mx-auto px-4">
        <p className="font-bold text-slate-400">
          MPLADS Rakshak • Ministry of Statistics &amp; Programme Implementation (MoSPI)
        </p>
        <p className="text-[11px] text-slate-500">
          Smart India Hackathon SIH26102 Decision Support Intelligence Layer. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
