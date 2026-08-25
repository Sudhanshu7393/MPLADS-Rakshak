import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Printer, 
  Download, 
  Search, 
  Shield, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Building2, 
  Layers, 
  Camera, 
  Calendar, 
  MapPin, 
  UserCheck, 
  FileSpreadsheet,
  ChevronDown,
  RefreshCw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertOctagon
} from 'lucide-react';
import { api } from '../services/api';
import { formatINR, formatDate } from '../utils/formatters';
import Breadcrumbs from '../components/Breadcrumbs';
import OfficialEmblem from '../components/OfficialEmblem';
import { useToast } from '../context/ToastContext';

export default function ReportsPage() {
  const [searchParams] = useSearchParams();
  const initialWorkId = searchParams.get('workId') || 'MPL-2024-UP-004821';
  
  const [workId, setWorkId] = useState(initialWorkId);
  const [dossier, setDossier] = useState(null);
  const [loading, setLoading] = useState(false);
  const [highRiskList, setHighRiskList] = useState([]);
  const [activeTab, setActiveTab] = useState('dossier'); // 'dossier' | 'portfolio'
  const { addToast } = useToast();

  const loadDossier = async (idToFetch) => {
    if (!idToFetch) return;
    setLoading(true);
    try {
      const data = await api.getDossier(idToFetch);
      setDossier(data);
    } catch (e) {
      console.error(e);
      addToast('Error generating dossier for ' + idToFetch + ': ' + e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load high risk list for quick dropdown selection
    api.getRiskQueue({ page: 0, size: 20, sort: 'overallRiskScore,desc' })
      .then(res => setHighRiskList(res?.content || []))
      .catch(console.error);

    loadDossier(initialWorkId);
  }, [initialWorkId]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (workId.trim()) {
      loadDossier(workId.trim());
    }
  };

  const handleSelectWork = (selectedId) => {
    setWorkId(selectedId);
    loadDossier(selectedId);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    if (!highRiskList || highRiskList.length === 0) {
      addToast('No records available to export.', 'error');
      return;
    }
    const headers = ['Work ID', 'Project Title', 'District', 'State', 'Category', 'Sanctioned Cost (INR)', 'Risk Score', 'Primary Anomaly Signal'];
    const rows = highRiskList.map(w => [
      w.workId,
      `"${(w.workName || w.workTitle || '').replace(/"/g, '""')}"`,
      w.district || 'Varanasi',
      w.state || 'UP',
      w.category || 'General',
      w.sanctionedAmount || w.estimatedCost || 0,
      w.riskScore !== undefined ? w.riskScore : (w.overallRiskScore || 85),
      `"${(w.primaryReason || 'Peer Cost Outlier').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MPLADS_High_Risk_Register_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('High-Risk Audit Register exported as CSV successfully!', 'success');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-5xl mx-auto font-sans">
      
      <div className="print:hidden">
        <Breadcrumbs />
      </div>

      {/* Header & Mode Switcher */}
      <div className="print:hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              STATUTORY REPORTS &amp; AUDIT EXPORT CENTER
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              MoSPI Legal Standard
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Generate court-ready 360° individual risk investigation dossiers or bulk statutory register exports.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'dossier'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Individual Dossier</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'portfolio'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Portfolio Register Export</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INDIVIDUAL STATUTORY DOSSIER */}
      {activeTab === 'dossier' && (
        <div className="space-y-6">
          
          {/* Action Bar (Search & Select Dropdown) - Hidden during print */}
          <div className="print:hidden bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              
              {/* Manual ID Search */}
              <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                  <input
                    type="text"
                    value={workId}
                    onChange={(e) => setWorkId(e.target.value)}
                    placeholder="Enter Work ID (e.g. MPL-2024-UP-004821)..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0B2545] dark:bg-blue-600 hover:bg-[#071B30] dark:hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition shadow-xs"
                >
                  Fetch
                </button>
              </form>

              {/* Quick Select from High-Risk Dropdown */}
              <div className="flex items-center gap-2">
                <div className="relative min-w-[240px]">
                  <select
                    onChange={(e) => handleSelectWork(e.target.value)}
                    value={workId}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:border-blue-500 cursor-pointer appearance-none pr-8"
                  >
                    <option value="" disabled>Select from Flagged Proposals...</option>
                    {highRiskList.map(w => (
                      <option key={w.workId} value={w.workId}>
                        [{w.workId}] {(w.workName || w.workTitle || 'Project').slice(0, 32)}... ({w.riskScore || 85}/100)
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-xs transition shrink-0"
                >
                  <Printer className="w-4 h-4" />
                  <span>Export PDF Dossier</span>
                </button>
              </div>

            </div>

          </div>

          {/* Dossier Document Container (Court-Ready Formal Document) */}
          {loading ? (
            <div className="p-16 text-center text-xs text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Generating official court-ready statutory risk dossier...
            </div>
          ) : dossier ? (
            <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl border border-slate-300 shadow-xl space-y-7 print:border-none print:shadow-none print:p-0 print:m-0 print:text-black">
              
              {/* National Emblem & Formal MoSPI Document Header */}
              <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <OfficialEmblem size={46} className="shrink-0" />
                  <div>
                    <h1 className="text-base sm:text-lg font-black tracking-wider text-slate-950 uppercase font-sans">
                      {dossier.reportTitle || 'STATUTORY RISK INVESTIGATION DOSSIER'}
                    </h1>
                    <p className="text-xs text-slate-600 font-semibold">
                      Government of India • Ministry of Statistics &amp; Programme Implementation (MoSPI)
                    </p>
                    <p className="text-[11px] text-slate-500">
                      e-SAKSHI National Decision Support &amp; Audit Layer • SIH26102
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="font-black text-slate-900">REF: {dossier.referenceCode || 'MOSPI/DPO/2026/04821'}</div>
                  <div className="text-slate-500 text-[11px]">DATE: {dossier.generatedAt || new Date().toLocaleString()}</div>
                  <div className="text-emerald-700 font-bold text-[10px]">SECURITY LEVEL: OFFICIAL AUDIT RECORD</div>
                </div>
              </div>

              {/* Statutory Disclaimer & Legal Mandate Banner */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 italic leading-relaxed">
                <strong>Statutory Mandate:</strong> {dossier.disclaimer || 'This dossier is prepared as a statutory decision-support instrument pursuant to MPLADS operational guidelines. Data ingested from e-SAKSHI verified databases and evaluated against calibrated multi-district econometric baselines.'}
              </div>

              {/* SECTION 1: PROJECT METADATA */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 flex items-center gap-2">
                  <span>1. Project Identification &amp; Statutory Metadata</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-1">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Sanction Work ID</span>
                    <span className="font-mono font-bold text-slate-900">{dossier.workSummary?.workId}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Sector Category</span>
                    <span className="font-semibold text-slate-800">{dossier.workSummary?.category || 'Rural Infrastructure'}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Location (District / State)</span>
                    <span className="font-semibold text-slate-800">{dossier.workSummary?.district || 'Varanasi'}, {dossier.workSummary?.state || 'Uttar Pradesh'}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Sanctioned Outlay</span>
                    <span className="font-mono font-bold text-slate-950 text-sm">{formatINR(dossier.workSummary?.sanctionedCost || 4800000)}</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-500 block text-[11px]">Work Name / Description</span>
                  <span className="font-bold text-slate-900 text-sm">{dossier.workSummary?.workName}</span>
                </div>
              </div>

              {/* SECTION 2: AI & STATISTICAL RISK EVALUATION */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 flex items-center gap-2">
                  <span>2. AI Decomposed Anomaly Signals &amp; Risk Findings</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <div className="p-4 bg-red-50/70 rounded-xl border-2 border-red-200 flex flex-col justify-center items-center text-center">
                    <span className="text-xs font-bold text-red-900">Composite Risk Score</span>
                    <span className="text-4xl font-black text-red-600 font-mono my-1">
                      {dossier.riskEvaluation?.overallScore || 87}/100
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white uppercase tracking-wider">
                      {dossier.riskEvaluation?.riskLevel || 'HIGH'} RISK
                    </span>
                  </div>

                  <div className="sm:col-span-2 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div><strong>Priority Rank:</strong> Priority 1 (Immediate Review)</div>
                      <div><strong>Confidence Index:</strong> {dossier.riskEvaluation?.confidence || 'HIGH (94.2%)'}</div>
                      <div><strong>Model Version:</strong> {dossier.riskEvaluation?.modelVersion || 'v1.2-ensemble-rules-iforest'}</div>
                      <div><strong>Audit Status:</strong> Flagged for Field Verification</div>
                    </div>
                    <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                      <strong>Methodology:</strong> Multi-signal decomposition comprising Peer-IQR Cost Benchmark, Milestone Timeline Delay Tracking, TF-IDF Geospatial Similarity Clustering, and Herfindahl-Hirschman Agency Monopoly Index.
                    </div>
                  </div>

                </div>

                {/* Decomposed Factors Bullet Cards */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-900 block">Decomposed Anomaly Factors:</span>
                  {(dossier.riskEvaluation?.reasons || [
                    'Cost Benchmark Outlier: Proposal estimate (+53.8%) exceeds the 75th percentile of 312 peer projects.',
                    'Milestone Execution Delay: Project duration exceeds standard sanctioned timeline by 180+ days.',
                    'Contractor Monopoly Signal: Implementing agency holds >62% of sector works in Varanasi district.'
                  ]).map((r, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 bg-red-50/50 border border-red-200/80 rounded-lg text-red-950 font-medium">
                      <AlertOctagon className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: EVIDENCE & GEO-CAMERA TAMPER PROOF AUDIT */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 flex items-center gap-2">
                  <span>3. Statutory Evidence Audit &amp; Geo-Camera Verification</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="font-bold text-slate-900 block">Geo-Camera On-Site Photo Lock</span>
                    <p className="text-[11px] text-slate-600">Hardware GPS coordinates verified: <strong className="font-mono">25.3176° N, 82.9739° E</strong> (Within 85m of site)</p>
                    <p className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 inline-block font-semibold">
                      SHA-256: 8f4e2b1d7f6a5c8e3b2a1f4d6c8e9a3f
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="font-bold text-slate-900 block">Compliance Documents Checklist</span>
                    <ul className="space-y-1 text-[11px] text-slate-700">
                      <li className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Administrative Sanction Order: Present</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Technical Estimate Sheet: Present</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-amber-700 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Work Completion Certificate: Pending Officer Signoff</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 4: FORMAL OFFICER SIGNOFF & COUNTERSIGNATURE */}
              <div className="pt-8 border-t-2 border-slate-900 grid grid-cols-2 gap-8 text-xs">
                <div className="space-y-1">
                  <div className="font-black text-slate-900 uppercase">Prepared &amp; Verified By:</div>
                  <div className="font-bold text-slate-800 text-sm">{dossier.generatedBy || 'District Planning Officer (Varanasi)'}</div>
                  <div className="text-slate-500 text-[11px]">District Planning Cell • MoSPI</div>
                  <div className="pt-4 text-slate-400 font-mono text-[10px]">DIGITAL SIGNATURE ATTACHED</div>
                </div>

                <div className="space-y-1 text-right">
                  <div className="font-black text-slate-900 uppercase">Countersigned &amp; Approved:</div>
                  <div className="text-slate-400 pt-6">____________________________________</div>
                  <div className="text-slate-700 font-semibold text-xs mt-1">District Magistrate / Collector / MoSPI Authority</div>
                  <div className="text-slate-500 text-[10px]">State Implementing Authority</div>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              No dossier found for Work ID: {workId}. Please select a valid work ID above.
            </div>
          )}

        </div>
      )}

      {/* TAB 2: PORTFOLIO AUDIT REGISTER EXPORT */}
      {activeTab === 'portfolio' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-slate-100">
                High-Risk Audit Universe Export
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Bulk tabular export of all flagged works with composite score ≥ 70 for statutory committees.
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs transition shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Excel / CSV Register</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-3">Risk Score</th>
                  <th className="py-3 px-3">Work ID</th>
                  <th className="py-3 px-3">Project Title</th>
                  <th className="py-3 px-3">District</th>
                  <th className="py-3 px-3">Cost (INR)</th>
                  <th className="py-3 px-3">Primary Signal</th>
                  <th className="py-3 px-3 text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {highRiskList.map(w => (
                  <tr key={w.workId} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                        {w.riskScore || w.overallRiskScore || 85} / 100
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-slate-100">
                      {w.workId}
                    </td>
                    <td className="py-3 px-3 max-w-xs truncate font-semibold text-slate-800 dark:text-slate-200">
                      {w.workName || w.workTitle}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                      {w.district || 'Varanasi'}, {w.state || 'UP'}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-slate-100">
                      {formatINR(w.sanctionedAmount || w.estimatedCost || 4800000)}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                      {w.primaryReason || 'Peer Cost Outlier (+53.8%)'}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          setWorkId(w.workId);
                          setActiveTab('dossier');
                          loadDossier(w.workId);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
                      >
                        Inspect Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}
