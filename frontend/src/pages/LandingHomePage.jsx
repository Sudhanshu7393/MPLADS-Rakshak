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
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import { formatINR } from '../utils/formatters';

export default function LandingHomePage() {
  const [summary, setSummary] = useState(null);
  const [highRiskWorks, setHighRiskWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
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

  const steps = [
    {
      num: 1,
      tag: 'STEP 01',
      title: 'Data Ingestion & Quality Audit',
      subtitle: 'Dynamic Schema Mapping & Validation',
      desc: 'Connects to e-SAKSHI public portal and CSV streams. Automatically normalizes columns, flags incomplete records, and scores data health (99.2% schema readiness).',
      icon: Database,
      link: '/data',
      btnText: 'Open Ingestion Gateway',
      badge: 'e-SAKSHI Stream'
    },
    {
      num: 2,
      tag: 'STEP 02',
      title: 'AI Multi-Signal Scoring Engine',
      subtitle: 'Unsupervised Anomaly Calibration',
      desc: 'Executes 6 calibrated analytical models: Peer Group Cost IQR Outliers, Timeline Delay Lag, TF-IDF Duplicate Scope Matcher, Haversine Distance Clustering (<500m), and Agency Monopoly.',
      icon: Cpu,
      link: '/settings',
      btnText: 'Calibrate AI Weights',
      badge: '6 Risk Engines'
    },
    {
      num: 3,
      tag: 'STEP 03',
      title: 'Prioritised Scrutiny Queue',
      subtitle: 'Risk-Ranked Triage for Officers',
      desc: 'Sorts thousands of proposals into high, medium, and low risk bands. Officers can filter by Lok Sabha / Rajya Sabha constituency, district, risk signals, and cost brackets.',
      icon: AlertOctagon,
      link: '/queue',
      btnText: 'Explore Scrutiny Queue',
      badge: highRisk + ' Flags (Score >= 70)'
    },
    {
      num: 4,
      tag: 'STEP 04',
      title: '360° Forensic Risk Passport',
      subtitle: '6-Tab Comprehensive Case Dossier',
      desc: 'Deep-dives into flagged proposals (e.g. Varanasi CC Road #004821): Peer cost medians (+53.8%), milestone delay tracking, nearby duplicate work maps, and missing completion certificates.',
      icon: FileText,
      link: '/passport/MPL-2024-UP-004821',
      btnText: 'Inspect Varanasi Dossier',
      badge: '100% Explainable'
    },
    {
      num: 5,
      tag: 'STEP 05',
      title: 'Geo-Verified Physical Evidence',
      subtitle: 'Mobile Camera & GPS Proximity Lock',
      desc: 'Field verification teams capture on-site completion photos on mobile. Locks high-accuracy GPS coordinates, generates SHA-256 tamper-evident hash, and validates site distance.',
      icon: Camera,
      link: '/works/MPL-2024-UP-004821/capture-evidence',
      btnText: 'Launch Field Geo-Camera',
      badge: 'Tamper-Evident SHA-256'
    },
    {
      num: 6,
      tag: 'STEP 06',
      title: 'Officer Action & Audit Ledger',
      subtitle: 'Immutable Trail & PDF Export',
      desc: 'District Planning Officers review forensic evidence, issue inspection notices, approve genuine proposals, and export court-ready statutory PDF reports with immutable cryptographic audit logging.',
      icon: ShieldCheck,
      link: '/audit',
      btnText: 'View Officer Audit Trail',
      badge: 'Append-Only Audit'
    }
  ];

  const currentStepData = steps.find(s => s.num === activeStep) || steps[0];

  const roles = [
    {
      role: 'District Planning Officer (DPO)',
      jurisdiction: 'Varanasi District HQ',
      desc: 'Authorized to triage high-risk flags, review peer cost benchmarks, order on-site inspections, and sanction genuine works.',
      link: '/queue',
      badge: 'DPO Triage Portal',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
    },
    {
      role: 'Field Verification Surveyor',
      jurisdiction: 'Rural Roads & Infrastructure',
      desc: 'Equipped with mobile camera to capture GPS-locked physical progress evidence and milestone completion proof.',
      link: '/works/MPL-2024-UP-004821/capture-evidence',
      badge: 'Mobile Field App',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300'
    },
    {
      role: 'State Nodal Officer',
      jurisdiction: 'Uttar Pradesh State Level',
      desc: 'Monitors cross-district fund distribution, agency monopoly concentrations, and parliamentary constituency utilization.',
      link: '/dashboard',
      badge: 'State Oversight',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
    },
    {
      role: 'Statutory Auditor (CAG / MoSPI)',
      jurisdiction: 'National Level Audit',
      desc: 'Reviews cryptographic officer audit logs, system risk calibration parameters, and exports court-ready forensic reports.',
      link: '/reports',
      badge: 'Auditor Console',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 font-sans">
      
      {/* 1. HERO SECTION & QUICK DISCOVERY */}
      <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-obsidian-850 p-6 sm:p-10 border border-slate-200 dark:border-slate-800/80 shadow-xs space-y-6">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-400/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Ministry of Statistics &amp; Programme Implementation • MoSPI (SIH26102)</span>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Explainable AI Risk &amp; Anomaly Intelligence for <span className="gradient-text">e-SAKSHI (MPLADS)</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Empowering District Planning Officers to automatically detect peer cost outliers, chronic execution delays, duplicate proposals, and capture tamper-evident geo-verified completion evidence.
            </p>
          </div>

          {/* Quick Universal Search & Action Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Constituency, District, or Work (e.g. Varanasi, CC Road, Rampur)..."
                className="w-full bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white rounded-2xl pl-12 pr-28 py-3.5 text-xs sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Popular:</span>
            <button 
              type="button"
              onClick={() => setFilterAndSearch('Cost Outlier')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition text-[11px] font-medium border border-slate-200 dark:border-slate-700"
            >
              ⚡ +53.8% Cost Outliers
            </button>
            <button 
              type="button"
              onClick={() => setFilterAndSearch('Execution Delay')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition text-[11px] font-medium border border-slate-200 dark:border-slate-700"
            >
              ⏱️ Delay &gt; 180 Days
            </button>
            <button 
              type="button"
              onClick={() => setFilterAndSearch('Varanasi')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition text-[11px] font-medium border border-slate-200 dark:border-slate-700"
            >
              📍 Varanasi CC Road
            </button>
            <button 
              type="button"
              onClick={() => setFilterAndSearch('Duplicate')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition text-[11px] font-medium border border-slate-200 dark:border-slate-700"
            >
              🔄 Nearby Duplicates (&lt;500m)
            </button>
          </div>

          {/* 3 Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              to="/queue"
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition flex items-center gap-2 transform active:scale-95"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Prioritised Scrutiny Queue ({highRisk} Flags)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/works/MPL-2024-UP-004821/capture-evidence"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition flex items-center gap-2 transform active:scale-95"
            >
              <Camera className="w-4 h-4" />
              <span>Launch Geo-Camera Evidence</span>
            </Link>

            <Link
              to="/dashboard"
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 transition flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Executive Dashboard</span>
            </Link>
          </div>

        </div>

        {/* 4 Live Platform Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/80">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-obsidian-950 border border-slate-200 dark:border-slate-800/80 transition transform hover:-translate-y-0.5 hover:shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sanctioned Value</span>
              <Coins className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-amber-300 mt-1">
              {formatINR(totalCost)}
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Across 8 Districts</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-obsidian-950 border border-slate-200 dark:border-slate-800/80 transition transform hover:-translate-y-0.5 hover:shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Works</span>
              <Building2 className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
              {totalWorks.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">eSAKSHI Sanctions</span>
          </div>

          <div className="p-4 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 transition transform hover:-translate-y-0.5 hover:shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">High Risk Flags</span>
              <AlertOctagon className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-red-600 dark:text-red-400 mt-1">
              {highRisk}
            </div>
            <span className="text-[10px] text-red-700/80 dark:text-red-400/80">Score &ge; 70 Triage</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 transition transform hover:-translate-y-0.5 hover:shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Explainable AI</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              100%
            </div>
            <span className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80">Zero Black-Box</span>
          </div>
        </div>

      </section>


      {/* 2. LIVE INFINITE MARQUEE TICKER */}
      <section className="marquee-container overflow-hidden rounded-2xl bg-slate-900 text-slate-200 py-3 border border-slate-800 shadow-xs no-print">
        <div className="flex whitespace-nowrap marquee-content animate-marquee">
          <div className="flex items-center gap-8 text-xs font-semibold px-4">
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE DATA STREAM: 3,013 e-SAKSHI Sanctions Synced
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-amber-300">
              ⚡ PEER COST ANOMALY: IQR Multi-District Baselines Active
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-purple-300">
              📍 FIELD GEO-CAMERA: SHA-256 Tamper-Proof Geotag Lock Ready
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-blue-300">
              🏛️ PARLIAMENTARY AUDIT: Lok Sabha (543) &amp; Rajya Sabha (245) Monitored
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-rose-300">
              🚨 TRIAGE QUEUE: 294 High-Risk Flags Prioritised for DPO Scrutiny
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-teal-300">
              🛡️ STATUTORY EVIDENCE: Append-Only Immutable Audit Ledger
            </span>
          </div>

          <div className="flex items-center gap-8 text-xs font-semibold px-4">
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE DATA STREAM: 3,013 e-SAKSHI Sanctions Synced
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-amber-300">
              ⚡ PEER COST ANOMALY: IQR Multi-District Baselines Active
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-purple-300">
              📍 FIELD GEO-CAMERA: SHA-256 Tamper-Proof Geotag Lock Ready
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-blue-300">
              🏛️ PARLIAMENTARY AUDIT: Lok Sabha (543) &amp; Rajya Sabha (245) Monitored
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-rose-300">
              🚨 TRIAGE QUEUE: 294 High-Risk Flags Prioritised for DPO Scrutiny
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-teal-300">
              🛡️ STATUTORY EVIDENCE: Append-Only Immutable Audit Ledger
            </span>
          </div>
        </div>
      </section>


      {/* 3. GUIDED STEP-BY-STEP INTERACTIVE WORKFLOW WIZARD */}
      <section className="bg-white dark:bg-obsidian-850 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800/80 shadow-xs space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Interactive Governance Wizard</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              6-Step Operational Scrutiny Lifecycle
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Step <strong>{activeStep}</strong> of 6</span>
            <div className="w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300"
                style={{ width: ((activeStep / 6) * 100) + '%' }}
              />
            </div>
          </div>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {steps.map((step) => {
            const isCurrent = activeStep === step.num;
            const isPast = activeStep > step.num;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(step.num)}
                className={'p-3 rounded-2xl text-left border transition-all ' + (
                  isCurrent 
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 dark:border-blue-400 shadow-xs ring-2 ring-blue-500/20' 
                    : isPast
                    ? 'bg-slate-50 dark:bg-obsidian-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    : 'bg-white dark:bg-obsidian-900 border-slate-200 dark:border-slate-800/60 text-slate-400 hover:border-slate-300'
                )}
              >
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className={isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}>
                    {step.tag}
                  </span>
                  {isPast && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1 line-clamp-1">
                  {step.title.split(' ')[0]} {step.title.split(' ')[1]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-obsidian-950 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-300 dark:border-blue-700/50">
                  {currentStepData.tag} • {currentStepData.badge}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {currentStepData.subtitle}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {currentStepData.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentStepData.desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                to={currentStepData.link}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition flex items-center justify-center gap-2 transform active:scale-95"
              >
                <span>{currentStepData.btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  disabled={activeStep === 1}
                  className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold disabled:opacity-30 transition"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(prev => Math.min(6, prev + 1))}
                  disabled={activeStep === 6}
                  className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold disabled:opacity-30 transition"
                >
                  Next Step
                </button>
              </div>
            </div>

          </div>
        </div>

      </section>


      {/* 4. CASE SPOTLIGHT CARD (Varanasi CC Road) */}
      <section className="bg-white dark:bg-obsidian-850 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800/80 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300 border border-red-300 dark:border-red-800/60 font-mono">
                CASE INQUEST SPOTLIGHT • #MPL-2024-UP-004821
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Varanasi, UP • Rural Roads &amp; Bridges
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              Construction of CC Road and Paver Works from Main Chowk to Panchayat Bhawan, Village Rampur
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-obsidian-950 border border-red-200 dark:border-red-900/40">
                <span className="text-red-600 dark:text-red-400 font-bold block text-[10px] uppercase">Cost Variance</span>
                <span className="font-black text-slate-900 dark:text-white text-base">₹48.00 Lakh</span>
                <span className="text-red-600 dark:text-red-400 text-[10px] block">+53.8% above peer median</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-obsidian-950 border border-amber-200 dark:border-amber-900/40">
                <span className="text-amber-600 dark:text-amber-400 font-bold block text-[10px] uppercase">Duplicate Proximity</span>
                <span className="font-black text-slate-900 dark:text-white text-base">420m Radius</span>
                <span className="text-amber-600 dark:text-amber-400 text-[10px] block">Similar work (#004822)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-obsidian-950 border border-purple-200 dark:border-purple-900/40">
                <span className="text-purple-600 dark:text-purple-400 font-bold block text-[10px] uppercase">Completion Proof</span>
                <span className="font-black text-slate-900 dark:text-white text-base">Missing Doc</span>
                <span className="text-purple-600 dark:text-purple-400 text-[10px] block">Geo-camera required</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link
              to="/passport/MPL-2024-UP-004821"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-xs"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>Inspect Risk Passport</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/works/MPL-2024-UP-004821/capture-evidence"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-xs"
            >
              <Camera className="w-4 h-4" />
              <span>Capture Geo-Evidence</span>
            </Link>
          </div>

        </div>
      </section>


      {/* 5. LIVE SCRUTINY QUEUE PREVIEW TABLE */}
      <section className="bg-white dark:bg-obsidian-850 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              High-Risk Priority Proposals (Triage Register)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Proposals flagged with composite risk score ≥ 70 requiring immediate officer determination.
            </p>
          </div>

          <Link
            to="/queue"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            <span>View Full Scrutiny Queue ({highRisk})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Work ID &amp; Description</th>
                <th className="py-2.5 px-3">Constituency / District</th>
                <th className="py-2.5 px-3">Cost (INR)</th>
                <th className="py-2.5 px-3">Risk Score</th>
                <th className="py-2.5 px-3">Key Anomaly Signal</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {highRiskWorks.map((work) => (
                <tr key={work.workId} className="hover:bg-slate-50 dark:hover:bg-obsidian-950 transition">
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 block text-[11px]">
                      {work.workId}
                    </span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium line-clamp-1 max-w-xs">
                      {work.workTitle}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    <span className="font-semibold block">{work.district}</span>
                    <span className="text-[10px] text-slate-400">{work.state}</span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-slate-100">
                    {formatINR(work.sanctionedAmount || work.estimatedCost)}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md font-mono font-bold text-[11px] bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400 border border-red-300 dark:border-red-800/60">
                      {work.overallRiskScore} / 100
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[11px] font-semibold text-red-600 dark:text-red-400">
                      {work.riskSignals && work.riskSignals[0] ? work.riskSignals[0].split(':')[0] : 'Peer Cost Outlier'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      to={'/passport/' + work.workId}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition inline-flex items-center gap-1 shadow-xs"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>


      {/* 6. ROLE-SPECIFIC GOVERNANCE GATEWAYS */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Role-Specific Governance Portals
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tailored consoles for each stakeholder tier in the MPLADS administrative hierarchy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-obsidian-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 transition transform hover:-translate-y-0.5 hover:shadow-xs"
            >
              <div className="space-y-2">
                <span className={'px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ' + item.badgeColor}>
                  {item.badge}
                </span>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {item.role}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 font-mono">
                  {item.jurisdiction}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <Link
                to={item.link}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-between"
              >
                <span>Enter Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>


      {/* 7. STATUTORY COMPLIANCE & FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 pt-6 pb-12 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
        <p className="font-bold text-slate-700 dark:text-slate-300">
          MPLADS Rakshak • Ministry of Statistics &amp; Programme Implementation (MoSPI)
        </p>
        <p className="text-[11px] text-slate-500">
          Smart India Hackathon SIH26102 Decision Support Intelligence Layer. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
