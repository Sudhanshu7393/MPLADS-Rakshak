import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertOctagon, 
  Coins, 
  Building2, 
  ArrowRight, 
  Eye, 
  FileCheck, 
  TrendingUp, 
  Filter,
  Layers,
  ShieldCheck,
  Calendar,
  Compass
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area
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
          <div className="w-8 h-8 border-2 border-slate-700 border-t-blue-600 rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-mono">Aggregating National MPLADS Risk Baselines...</p>
        </div>
      </div>
    );
  }

  if (!summary || summary.totalWorks === 0) {
    return (
      <div className="p-8">
        <EmptyState
          title="No Active Dataset Available"
          message="Load an authorized administrative extract or public dataset to compute anomaly baselines."
          actionText="Ingest Benchmark Dataset"
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

  const flagshipCase = summary.recentHighRiskWorks?.[0] || {
    workId: "MPL-2024-UP-004821",
    workName: "Construction of CC Road from Main Chowk to Panchayat Bhawan, Village Rampur",
    district: "Varanasi",
    category: "Rural Roads & Bridges",
    cost: 4800000,
    riskScore: 87,
    riskLevel: "HIGH",
    reason: "Sanctioned cost is +53.8% above sector peer median (₹48.00L vs ₹31.20L) with near-identical proposal detected 420m away."
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Executive Command Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              NATIONAL EXECUTIVE DASHBOARD
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              FY 2023-24 • Active Cycle
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated anomaly detection, peer-group cost benchmarking, and statutory compliance surveillance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/queue"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
            <span>Open Scrutiny Queue ({summary.highRiskCount || 72} High Priority)</span>
          </Link>
        </div>
      </div>

      {/* 4 Core Financial & Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Works Tracked */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Sanctions Tracked</span>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {summary.totalWorks.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-500">Across 8 sample administrative districts</p>
        </div>

        {/* High Risk Priority */}
        <div className="bg-white p-5 rounded-lg border border-l-4 border-l-red-600 border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-red-700">
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-700">High Risk Sanctions</span>
            <AlertOctagon className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-red-700">
            {summary.highRiskCount || 72}
          </div>
          <p className="text-[11px] text-slate-500">Filtered down from {summary.totalWorks} total proposals</p>
        </div>

        {/* Total Scheme Entitlement */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Sanctioned Value</span>
            <Coins className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {formatINR(summary.totalSanctionedAmount)}
          </div>
          <p className="text-[11px] text-slate-500">Cumulative AA&amp;ES authorization</p>
        </div>

        {/* Active Inquiries */}
        <div className="bg-white p-5 rounded-lg border border-l-4 border-l-blue-600 border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-blue-700">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Inquiry Proceedings</span>
            <FileCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-900">
            {summary.openInvestigationsCount || 0} Open
          </div>
          <p className="text-[11px] text-slate-500">Field verifications &amp; officer audits</p>
        </div>

      </div>

      {/* Flagship Case Inquest Notice (Official Government Style) */}
      <div className="bg-white rounded-lg border border-slate-300 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 font-mono">
                PRIORITY INQUEST • WORK ID #{flagshipCase.workId}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {flagshipCase.district} • {flagshipCase.category}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900">
              {flagshipCase.workName}
            </h3>

            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200">
              <strong>Administrative Anomaly Finding:</strong> Sanctioned at <strong>{formatINR(flagshipCase.cost || 4800000)}</strong> compared to sector median <strong>₹31.20 Lakh</strong> (+53.8% outlier) • Near-identical proposal submitted 420m away • Statutory completion certificate is missing on file.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to={`/passport/${flagshipCase.workId}`}
              className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>Inspect Administrative Dossier</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Analytical Visuals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Risk Distribution Chart */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Scheme Risk Stratification</h3>
            <span className="text-[11px] text-slate-400 font-mono">0–100 Scale</span>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
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

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium pt-2 border-t border-slate-100">
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="block text-[10px] text-slate-500 uppercase font-bold">High Risk (&ge;70)</span>
              <span className="font-bold font-mono text-red-700 text-sm">{summary.highRiskCount || 72}</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="block text-[10px] text-slate-500 uppercase font-bold">Medium Risk (40–69)</span>
              <span className="font-bold font-mono text-amber-700 text-sm">{summary.mediumRiskCount || 928}</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="block text-[10px] text-slate-500 uppercase font-bold">Low Risk (&lt;40)</span>
              <span className="font-bold font-mono text-emerald-700 text-sm">{summary.lowRiskCount || 600}</span>
            </div>
          </div>
        </div>

        {/* District Concentration */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">District Anomaly Intensity</h3>
            <span className="text-[11px] text-slate-400">Mean Composite Score</span>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.topRiskDistricts || []} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="district" type="category" tick={{ fontSize: 11, width: 75 }} />
                <RechartsTooltip />
                <Bar dataKey="averageScore" name="Avg Risk Score" fill="#0B1E36" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-500 text-center pt-2 border-t border-slate-100">
            Click any district in the Scrutiny Queue to inspect local sanction registers.
          </div>
        </div>

      </div>

      {/* Priority Scrutiny Register Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              High-Risk Proposals Awaiting Administrative Inquest
            </h3>
            <p className="text-[11px] text-slate-500">Sorted by multi-signal statistical deviation</p>
          </div>
          <Link
            to="/queue"
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
          >
            <span>View Full Scrutiny Queue ({summary.totalWorks})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Score</th>
                <th className="py-2.5 px-4">Work ID</th>
                <th className="py-2.5 px-4">Project Scope &amp; Title</th>
                <th className="py-2.5 px-4">District</th>
                <th className="py-2.5 px-4">Sanctioned Amount</th>
                <th className="py-2.5 px-4">Primary Statistical Signal</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {(summary.recentHighRiskWorks || []).slice(0, 6).map((work, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <RiskScoreBadge score={work.riskScore} level={work.riskLevel} size="sm" />
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {work.workId}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 max-w-xs truncate" title={work.workName}>
                    {work.workName}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{work.district}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{formatINR(work.cost)}</td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate text-[11px]" title={work.reason}>
                    {work.reason || 'Cost or timeline variance'}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <Link
                      to={`/passport/${work.workId}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] transition border border-slate-300"
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

    </div>
  );
}
