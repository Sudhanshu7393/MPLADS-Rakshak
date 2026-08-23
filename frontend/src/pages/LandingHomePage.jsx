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
  ExternalLink,
  Lock,
  FileCheck2,
  Sliders,
  Printer
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
      desc: 'Connects directly to e-SAKSHI data feeds and CSV extracts. Automatically normalizes administrative fields, flags incomplete records, and verifies data health with 99.2% schema conformance.',
      icon: Database,
      link: '/data',
      btnText: 'Open Ingestion Gateway',
      badge: 'e-SAKSHI Feed'
    },
    {
      num: 2,
      tag: 'STEP 02',
      title: 'Multi-Signal Analytical Risk Engine',
      subtitle: 'Calibrated Anomaly Detection',
      desc: 'Executes 6 calibrated statistical models: Peer Group Cost Interquartile Outliers, Milestone Timeline Delays, TF-IDF Text Proximity, Haversine Distance Clustering (<500m), and Agency Monopoly indices.',
      icon: Cpu,
      link: '/settings',
      btnText: 'Review Model Parameters',
      badge: '6 Risk Engines'
    },
    {
      num: 3,
      tag: 'STEP 03',
      title: 'Prioritised Scrutiny Queue',
      subtitle: 'Risk-Ranked Administrative Triage',
      desc: 'Ranks thousands of sanctioned works into High, Medium, and Low risk bands. District Officers can filter by parliamentary constituency, block, village, cost brackets, and anomaly signals.',
      icon: AlertOctagon,
      link: '/queue',
      btnText: 'Open Scrutiny Queue',
      badge: '294 High-Risk Flags'
    },
    {
      num: 4,
      tag: 'STEP 04',
      title: '360° Forensic Risk Passport',
      subtitle: 'Comprehensive Case Dossier',
      desc: 'Deep-dives into individual works (e.g. Varanasi CC Road #MPL-2024-UP-004821): Peer cost medians (+53.8%), milestone timeline delay tracking, duplicate work maps, and missing completion certificates.',
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
      badge: 'SHA-256 Hash'
    },
    {
      num: 6,
      tag: 'STEP 06',
      title: 'Officer Determination & Audit Ledger',
      subtitle: 'Cryptographic Immutable Trail',
      desc: 'District Planning Officers record determinations, order field inspections, approve genuine proposals, and export court-ready statutory PDF reports with immutable cryptographic audit logging.',
      icon: ShieldCheck,
      link: '/audit',
      btnText: 'View Statutory Audit Trail',
      badge: 'Append-Only Ledger'
    }
  ];

  const currentStepData = steps.find(s => s.num === activeStep) || steps[0];

  const roles = [
    {
      role: 'District Planning Officer (DPO)',
      jurisdiction: 'Varanasi District Administration',
      desc: 'Authorized to triage high-risk flags, review peer cost benchmarks, order on-site inspections, and sanction genuine works.',
      link: '/queue',
      badge: 'DPO Triage Portal',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200'
    },
    {
      role: 'Field Verification Surveyor',
      jurisdiction: 'Rural Infrastructure Wings',
      desc: 'Equipped with mobile camera to capture GPS-locked physical progress evidence and milestone completion proof.',
      link: '/works/MPL-2024-UP-004821/capture-evidence',
      badge: 'Mobile Field App',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200'
    },
    {
      role: 'State Nodal Officer',
      jurisdiction: 'State Planning Department',
      desc: 'Monitors cross-district fund distribution, agency monopoly concentrations, and parliamentary constituency utilization.',
      link: '/dashboard',
      badge: 'State Oversight',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
    },
    {
      role: 'Statutory Auditor (CAG / MoSPI)',
      jurisdiction: 'National Audit & Oversight',
      desc: 'Reviews cryptographic officer audit logs, system risk calibration parameters, and exports court-ready forensic reports.',
      link: '/reports',
      badge: 'Auditor Console',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans pb-12">
      
      {/* 1. OFFICIAL GOVERNMENT HERO SECTION */}
      <section className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        
        <div className="space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Ministry of Statistics &amp; Programme Implementation (MoSPI) • Government of India</span>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight leading-tight">
              Explainable AI Risk &amp; Anomaly Intelligence for <span className="text-blue-700">e-SAKSHI (MPLADS)</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              Administrative Decision Support Layer for District Planning Officers to detect peer cost outliers, execution delays, duplicate proposals, and capture tamper-evident geo-verified completion evidence.
            </p>
          </div>

          {/* Quick Universal Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl pt-2">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Constituency, District, or Work (e.g. Varanasi, CC Road, Rampur)..."
                className="w-full bg-slate-50 text-slate-900 rounded-xl pl-11 pr-28 py-3 text-xs sm:text-sm placeholder-slate-400 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-2 bg-[#0B2545] hover:bg-[#133B5C] text-white text-xs font-bold rounded-lg transition shadow-xs"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Quick Filters:</span>
            <button 
              type="button"
              onClick={() => setFilterAndSearch('Cost Outlier')}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-[11px] font-medium border border-slate-200"
            >
              Cost Outlier (+53.8%)
            </button>
            <button 
              type="button"
              onClick={() => setFilterAndSearch('Execution Delay')}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-[11px] font-medium border border-slate-200"
            >
              Delay &gt; 180 Days
            </button>
            <button 
              type="button"
              onClick={() => setFilterAndSearch('Varanasi')}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-[11px] font-medium border border-slate-200"
            >
              Varanasi CC Road
            </button>
            <button 
              type="button"
              onClick={() => setFilterAndSearch('Duplicate')}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-[11px] font-medium border border-slate-200"
            >
              Nearby Duplicates (&lt;500m)
            </button>
          </div>

          {/* 3 Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              to="/queue"
              className="px-5 py-2.5 rounded-lg bg-[#0B2545] hover:bg-[#133B5C] text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center gap-2"
            >
              <AlertOctagon className="w-4 h-4 text-red-400" />
              <span>Prioritised Scrutiny Queue (294 Flags)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/works/MPL-2024-UP-004821/capture-evidence"
              className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Launch Field Geo-Camera</span>
            </Link>

            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 transition flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-blue-700" />
              <span>Executive Dashboard</span>
            </Link>
          </div>

        </div>

        {/* 4 Official Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Sanctioned Value</span>
              <Coins className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-[#0B2545] mt-1">
              {formatINR(totalCost)}
            </div>
            <span className="text-[10px] text-slate-500">Across 8 Districts</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Total Works</span>
              <Building2 className="w-4 h-4 text-blue-700" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 mt-1">
              {totalWorks.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-slate-500">e-SAKSHI Records</span>
          </div>

          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-red-800 uppercase tracking-wider">High Risk Flags</span>
              <AlertOctagon className="w-4 h-4 text-red-700" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-red-700 mt-1">
              {highRisk}
            </div>
            <span className="text-[10px] text-red-800">Score &ge; 70 Triage</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Explainable AI</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-emerald-800 mt-1">
              100%
            </div>
            <span className="text-[10px] text-emerald-800">Deterministic Rules</span>
          </div>
        </div>

      </section>


      {/* 2. OFFICIAL MARQUEE TICKER */}
      <section className="marquee-container overflow-hidden rounded-xl bg-[#0B2545] text-slate-100 py-2.5 border border-[#133B5C] shadow-xs no-print">
        <div className="flex whitespace-nowrap marquee-content animate-marquee">
          <div className="flex items-center gap-8 text-xs font-semibold px-4">
            <span className="flex items-center gap-2 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE DATA: 3,013 e-SAKSHI Sanctions Synced
            </span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1.5 text-amber-200">
              PEER COST ANOMALY: IQR Multi-District Baselines Active
            </span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1.5 text-blue-200">
              FIELD EVIDENCE: SHA-256 Tamper-Proof Geotag Lock Ready
            </span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1.5 text-slate-200">
              PARLIAMENTARY AUDIT: Lok Sabha (543) &amp; Rajya Sabha (245) Monitored
            </span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1.5 text-red-200">
              TRIAGE QUEUE: 294 High-Risk Flags Prioritised for DPO Scrutiny
            </span>
          </div>

          <div className="flex items-center gap-8 text-xs font-semibold px-4">
            <span className="flex items-center gap-2 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE DATA: 3,013 e-SAKSHI Sanctions Synced
            </span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1.5 text-amber-200">
              PEER COST ANOMALY: IQR Multi-District Baselines Active
            </span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1.5 text-blue-200">
              FIELD EVIDENCE: SHA-256 Tamper-Proof Geotag Lock Ready
            </span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1.5 text-slate-200">
              PARLIAMENTARY AUDIT: Lok Sabha (543) &amp; Rajya Sabha (245) Monitored
            </span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1.5 text-red-200">
              TRIAGE QUEUE: 294 High-Risk Flags Prioritised for DPO Scrutiny
            </span>
          </div>
        </div>
      </section>


      {/* 3. 6-STEP INTERACTIVE WORKFLOW LIFECYCLE */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
              <Compass className="w-4 h-4 text-blue-700" />
              <span>Operational Scrutiny Workflow</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2545] tracking-tight">
              6-Step Statutory Governance Lifecycle
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Step <strong>{activeStep}</strong> of 6</span>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="h-full bg-blue-700 transition-all duration-300"
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
                className={'p-3 rounded-xl text-left border transition-all ' + (
                  isCurrent 
                    ? 'bg-blue-50 border-blue-600 shadow-xs ring-1 ring-blue-600' 
                    : isPast
                    ? 'bg-slate-50 border-slate-200 text-slate-700'
                    : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                )}
              >
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className={isCurrent ? 'text-blue-800' : 'text-slate-500'}>
                    {step.tag}
                  </span>
                  {isPast && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">
                  {step.title.split(' ')[0]} {step.title.split(' ')[1]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Box */}
        <div className="p-6 sm:p-8 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-300">
                  {currentStepData.tag} • {currentStepData.badge}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {currentStepData.subtitle}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#0B2545]">
                {currentStepData.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentStepData.desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                to={currentStepData.link}
                className="px-6 py-3 rounded-lg bg-[#0B2545] hover:bg-[#133B5C] text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2"
              >
                <span>{currentStepData.btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  disabled={activeStep === 1}
                  className="px-3 py-1.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold disabled:opacity-30 transition"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(prev => Math.min(6, prev + 1))}
                  disabled={activeStep === 6}
                  className="px-3 py-1.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold disabled:opacity-30 transition"
                >
                  Next Step
                </button>
              </div>
            </div>

          </div>
        </div>

      </section>


      {/* 4. CASE INQUEST SPOTLIGHT CARD (Varanasi CC Road) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-red-100 text-red-900 border border-red-300 font-mono">
                CASE INQUEST SPOTLIGHT • #MPL-2024-UP-004821
              </span>
              <span className="text-xs font-bold text-slate-600">
                Varanasi, UP • Rural Roads &amp; Bridges
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#0B2545]">
              Construction of CC Road and Paver Works from Main Chowk to Panchayat Bhawan, Village Rampur
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 rounded-lg bg-slate-50 border border-red-200">
                <span className="text-red-800 font-bold block text-[10px] uppercase">Cost Variance</span>
                <span className="font-bold text-slate-900 text-base">₹48.00 Lakh</span>
                <span className="text-red-700 text-[10px] block">+53.8% above peer median</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-amber-200">
                <span className="text-amber-800 font-bold block text-[10px] uppercase">Duplicate Proximity</span>
                <span className="font-bold text-slate-900 text-base">420m Radius</span>
                <span className="text-amber-700 text-[10px] block">Similar work (#004822)</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-purple-200">
                <span className="text-purple-800 font-bold block text-[10px] uppercase">Completion Proof</span>
                <span className="font-bold text-slate-900 text-base">Missing Doc</span>
                <span className="text-purple-700 text-[10px] block">Geo-camera required</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link
              to="/passport/MPL-2024-UP-004821"
              className="px-5 py-2.5 rounded-lg bg-[#0B2545] hover:bg-[#133B5C] text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>Inspect Risk Passport</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/works/MPL-2024-UP-004821/capture-evidence"
              className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs"
            >
              <Camera className="w-4 h-4" />
              <span>Capture Geo-Evidence</span>
            </Link>
          </div>

        </div>
      </section>


      {/* 5. LIVE SCRUTINY QUEUE PREVIEW TABLE */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0B2545]">
              High-Risk Priority Proposals (Triage Register)
            </h3>
            <p className="text-xs text-slate-500">
              Proposals flagged with composite risk score ≥ 70 requiring immediate administrative determination.
            </p>
          </div>

          <Link
            to="/queue"
            className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
          >
            <span>View Full Scrutiny Queue (294)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px] bg-slate-50">
                <th className="py-2.5 px-3">Work ID &amp; Description</th>
                <th className="py-2.5 px-3">Constituency / District</th>
                <th className="py-2.5 px-3">Cost (INR)</th>
                <th className="py-2.5 px-3">Risk Score</th>
                <th className="py-2.5 px-3">Key Anomaly Signal</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {highRiskWorks.map((work) => (
                <tr key={work.workId} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-blue-800 block text-[11px]">
                      {work.workId}
                    </span>
                    <span className="text-slate-900 font-medium line-clamp-1 max-w-xs">
                      {work.workTitle}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    <span className="font-semibold block">{work.district}</span>
                    <span className="text-[10px] text-slate-500">{work.state}</span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    {formatINR(work.sanctionedAmount || work.estimatedCost)}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-red-100 text-red-900 border border-red-200">
                      {work.overallRiskScore} / 100
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[11px] font-semibold text-red-700">
                      {work.riskSignals && work.riskSignals[0] ? work.riskSignals[0].split(':')[0] : 'Peer Cost Outlier'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      to={'/passport/' + work.workId}
                      className="px-3 py-1.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-[11px] transition inline-flex items-center gap-1 shadow-xs"
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
        <div className="border-b border-slate-200 pb-2">
          <h3 className="text-base sm:text-lg font-bold text-[#0B2545]">
            Role-Specific Administrative Consoles
          </h3>
          <p className="text-xs text-slate-500">
            Tailored interfaces for each stakeholder tier in the MPLADS administrative hierarchy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className={'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ' + item.badgeColor}>
                  {item.badge}
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  {item.role}
                </h4>
                <p className="text-[10px] font-bold text-slate-500 font-mono">
                  {item.jurisdiction}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <Link
                to={item.link}
                className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-[#0B2545] hover:text-white text-slate-800 text-xs font-bold transition flex items-center justify-between"
              >
                <span>Enter Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>


      {/* 7. STATUTORY COMPLIANCE & OFFICIAL FOOTER */}
      <footer className="border-t border-slate-200 pt-6 text-center text-xs text-slate-500 space-y-1.5">
        <p className="font-bold text-slate-700">
          MPLADS Rakshak • Ministry of Statistics &amp; Programme Implementation (MoSPI)
        </p>
        <p className="text-[11px] text-slate-500">
          National Informatics Centre &amp; MoSPI Decision Support Intelligence Layer • SIH26102
        </p>
      </footer>

    </div>
  );
}
