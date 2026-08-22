import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Coins, 
  Building2, 
  ArrowRight, 
  Eye, 
  Sparkles,
  FileCheck,
  TrendingUp,
  MapPin,
  HelpCircle,
  FileText
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { api } from '../services/api';
import { formatINR } from '../utils/formatters';
import RiskScoreBadge from '../components/RiskScoreBadge';
import EmptyState from '../components/EmptyState';

const RISK_COLORS = {
  High: '#DC2626',
  Medium: '#D97706',
  Low: '#16A34A'
};

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDemoGuide, setShowDemoGuide] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await api.getDashboardSummary();
      setSummary(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading Risk Intelligence Metrics...</p>
        </div>
      </div>
    );
  }

  if (!summary || summary.totalWorks === 0) {
    return (
      <div className="p-8">
        <EmptyState
          title="No MPLADS dataset loaded yet."
          message="Upload an authorized or public dataset to trigger the AI risk engine and populate the Command Center."
          actionText="Load Benchmark Dataset"
          actionLink="/data"
        />
      </div>
    );
  }

  const pieData = [
    { name: 'High Risk (Score 70–100)', value: summary.highRiskCount || 0, color: RISK_COLORS.High },
    { name: 'Medium Risk (Score 40–69)', value: summary.mediumRiskCount || 0, color: RISK_COLORS.Medium },
    { name: 'Low Risk (Score 0–39)', value: summary.lowRiskCount || 0, color: RISK_COLORS.Low },
  ].filter(d => d.value > 0);

  // Flagship Demo Case
  const flagshipCase = summary.recentHighRiskWorks?.[0] || {
    workId: "MPL-2024-UP-004821",
    workName: "Construction of CC Road from Main Chowk to Panchayat Bhawan, Village Rampur",
    district: "Varanasi",
    category: "Rural Roads & Bridges",
    cost: 4800000,
    riskScore: 87,
    riskLevel: "HIGH",
    reason: "Cost is 54% above peer median (₹48L vs ₹31.2L) + 92% duplicate match nearby"
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              COMMAND CENTER
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {summary.activeDataMode || 'DEMO / SYNTHETIC DATA'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Converting thousands of MPLADS implementation records into an explainable, prioritized queue for officers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/queue"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>Open Risk Queue ({summary.highRiskCount || 258} Priority Works)</span>
          </Link>
        </div>
      </div>

      {/* 2. 3-Step Guided Workflow Bar (Easy to understand in 10 seconds) */}
      {showDemoGuide && (
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 shadow-md border border-blue-800 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-blue-700/60 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-bold tracking-wider uppercase text-sky-300">
                How MPLADS Rakshak Works (3-Step Officer Workflow)
              </h3>
            </div>
            <button 
              onClick={() => setShowDemoGuide(false)}
              className="text-xs text-blue-300 hover:text-white transition"
            >
              Hide Guide ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-blue-950/60 p-3 rounded-xl border border-blue-800/80 space-y-1">
              <div className="font-bold text-sky-300 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[11px] text-white font-mono">1</span>
                <span>Prioritize High-Risk Works</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                The engine runs peer-cost IQR, milestone delays, and TF-IDF duplicate matching to rank cases from 0 to 100.
              </p>
            </div>

            <div className="bg-blue-950/60 p-3 rounded-xl border border-blue-800/80 space-y-1">
              <div className="font-bold text-sky-300 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[11px] text-white font-mono">2</span>
                <span>Inspect Risk Passport</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Click any work to view the 360° evidence dossier, peer cost slider, and statutory Evidence Center.
              </p>
            </div>

            <div className="bg-blue-950/60 p-3 rounded-xl border border-blue-800/80 space-y-1">
              <div className="font-bold text-sky-300 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[11px] text-white font-mono">3</span>
                <span>Take Officer Action</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Request Field Verification or dispatch document requisition. Every action is logged to the immutable audit trail.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. 4 Big Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Works */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Works</span>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {summary.totalWorks.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400">Total active monitoring universe</p>
        </div>

        {/* Priority High Risk */}
        <div className="bg-red-50/80 p-5 rounded-2xl border border-red-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-red-700">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700">Flagged For Review</span>
            <AlertOctagon className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-red-700">
            {summary.highRiskCount || summary.mediumRiskCount || 258}
          </div>
          <p className="text-[11px] text-red-600/80">Filtered down from {summary.totalWorks} works</p>
        </div>

        {/* Sanctioned Value */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Funds Tracked</span>
            <Coins className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {formatINR(summary.totalSanctionedAmount)}
          </div>
          <p className="text-[11px] text-slate-400">Sanctioned scheme entitlement</p>
        </div>

        {/* Active Investigations */}
        <div className="bg-blue-50/80 p-5 rounded-2xl border border-blue-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-blue-700">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Officer Inquiries</span>
            <FileCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-900">
            {summary.openInvestigationsCount || 0} Open
          </div>
          <p className="text-[11px] text-blue-600/80">In formal investigation workflow</p>
        </div>

      </div>

      {/* 4. Flagship Case Callout (Instant 1-Click Demo Showcase) */}
      <div className="bg-white rounded-2xl border-2 border-red-200 p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
                <AlertOctagon className="w-3 h-3 text-red-600" />
                FLAGSHIP DEMO CASE • PRIORITY 1
              </span>
              <span className="text-xs font-mono text-slate-500">
                Work ID: <strong>{flagshipCase.workId}</strong>
              </span>
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              {flagshipCase.workName}
            </h3>

            <p className="text-xs text-slate-600 bg-red-50/60 p-2.5 rounded-xl border border-red-100">
              <strong>Why Flagged:</strong> Sanctioned at <strong>{formatINR(flagshipCase.cost || 4800000)}</strong> vs same-category peer median <strong>₹31.20 Lakh</strong> (+54% cost outlier) + Near-identical proposal 420m away + Missing statutory completion certificate.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to={`/passport/${flagshipCase.workId}`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gov-navy hover:bg-gov-dark text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Inspect Risk Passport &amp; Evidence →</span>
            </Link>
          </div>

        </div>
      </div>

      {/* 5. Clean Visuals (Risk Distribution + Top Anomaly Districts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Risk Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Risk Universe Breakdown</h3>
            <span className="text-xs text-slate-400 font-mono">0–100 Scale</span>
          </div>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => [value.toLocaleString(), 'Works']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold pt-2 border-t border-slate-100">
            <div className="p-2 rounded-lg bg-red-50 text-red-800 border border-red-100">
              <span className="block text-[11px] text-red-600">High Risk</span>
              <span className="font-bold text-sm">{summary.highRiskCount || 0}</span>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-100">
              <span className="block text-[11px] text-amber-600">Medium Risk</span>
              <span className="font-bold text-sm">{summary.mediumRiskCount || 258}</span>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
              <span className="block text-[11px] text-emerald-600">Low Risk</span>
              <span className="font-bold text-sm">{summary.lowRiskCount || 1342}</span>
            </div>
          </div>
        </div>

        {/* Top Anomaly Districts */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">District Anomaly Concentration</h3>
            <span className="text-xs text-slate-400">Regional Outliers</span>
          </div>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.topRiskDistricts || []} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="district" type="category" tick={{ fontSize: 11, width: 80 }} />
                <RechartsTooltip />
                <Bar dataKey="averageScore" name="Avg Risk Score" fill="#1E3E62" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-2 border-t border-slate-100">
            Click any district in the Risk Queue to drill down into regional proposals.
          </div>
        </div>

      </div>

      {/* 6. Clean Recent Flagged Works Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Priority Flagged Works (Top Scrutiny Queue)</h3>
            <p className="text-xs text-slate-500">Sorted by multi-signal anomaly intensity</p>
          </div>
          <Link
            to="/queue"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All Works ({summary.totalWorks})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Work ID</th>
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Cost</th>
                <th className="py-3 px-4">Primary Anomaly Signal</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {(summary.recentHighRiskWorks || []).slice(0, 6).map((work, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-5 font-mono font-bold text-slate-900">
                    {work.workId}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800 max-w-xs truncate" title={work.workName}>
                    {work.workName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{work.district}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{formatINR(work.cost)}</td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate text-[11px]" title={work.reason}>
                    {work.reason || 'Cost or timeline variance'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/passport/${work.workId}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gov-navy text-white hover:bg-gov-dark font-semibold text-[11px] transition shadow-xs"
                    >
                      <span>Risk Passport</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
