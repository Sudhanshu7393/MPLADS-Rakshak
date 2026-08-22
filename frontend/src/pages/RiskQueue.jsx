import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ArrowRight, 
  AlertOctagon, 
  Eye, 
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  FileCheck
} from 'lucide-react';
import { api } from '../services/api';
import { formatINR, formatDate, getRiskBadgeClass } from '../utils/formatters';
import RiskScoreBadge from '../components/RiskScoreBadge';
import EmptyState from '../components/EmptyState';
import Breadcrumbs from '../components/Breadcrumbs';

const QUICK_FILTERS = [
  { id: 'ALL', label: 'All Scrutiny Items' },
  { id: 'COST_OUTLIER', label: 'Peer Cost Outliers (&gt;50% Variance)' },
  { id: 'CHRONIC_DELAY', label: 'Milestone Execution Delays (&gt;180 Days)' },
  { id: 'MISSING_DOC', label: 'Mandatory Compliance Evidence Gaps' },
  { id: 'DUPLICATE', label: 'Geospatial & Semantic Overlaps' },
];

export default function RiskQueue() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Filters
  const [riskLevel, setRiskLevel] = useState('');
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('riskScore');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [activeQuickFilter, setActiveQuickFilter] = useState('ALL');

  // Metadata dropdowns
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.all([api.getDistricts(), api.getCategories()])
      .then(([dList, cList]) => {
        setDistricts(dList || []);
        setCategories(cList || []);
      })
      .catch(console.error);
  }, []);

  const loadQueue = async () => {
    setLoading(true);
    try {
      let searchQuery = search;
      if (activeQuickFilter === 'COST_OUTLIER') searchQuery = 'Cost benchmark';
      else if (activeQuickFilter === 'CHRONIC_DELAY') searchQuery = 'delayed';
      else if (activeQuickFilter === 'MISSING_DOC') searchQuery = 'missing';
      else if (activeQuickFilter === 'DUPLICATE') searchQuery = 'similar';

      const data = await api.getRiskQueue({
        riskLevel: riskLevel || undefined,
        district: district || undefined,
        category: category || undefined,
        status: status || undefined,
        search: searchQuery || undefined,
        sortBy,
        sortDir,
        page,
        size: pageSize
      });

      setWorks(data?.content || []);
      setTotalPages(data?.totalPages || 1);
      setTotalElements(data?.totalElements || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQueue();
  }, [riskLevel, district, category, status, search, sortBy, sortDir, page, pageSize, activeQuickFilter]);

  const handleResetFilters = () => {
    setRiskLevel('');
    setDistrict('');
    setCategory('');
    setStatus('');
    setSearch('');
    setActiveQuickFilter('ALL');
    setSortBy('riskScore');
    setSortDir('desc');
    setPage(0);
  };

  return (
    <div className="p-6 md:p-8 space-y-5 max-w-7xl mx-auto font-sans">
      
      <Breadcrumbs />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              PRIORITIZED RISK QUEUE
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-red-100 text-red-800 border border-red-200">
              {totalElements} Flagged Projects
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Explainable prioritization rank derived from peer group cost deviations, milestone lags, and duplicate clusters.
          </p>
        </div>
      </div>

      {/* Smart 1-Click Quick Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {QUICK_FILTERS.map((qf) => (
          <button
            key={qf.id}
            onClick={() => {
              setActiveQuickFilter(qf.id);
              setPage(0);
            }}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap border ${
              activeQuickFilter === qf.id
                ? 'bg-gov-navy text-white border-gov-navy shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {qf.label}
          </button>
        ))}
      </div>

      {/* Multi-Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          
          {/* Keyword Search */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by Work ID, Project Title, Agency..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>

          {/* Risk Level Filter */}
          <select
            value={riskLevel}
            onChange={(e) => { setRiskLevel(e.target.value); setPage(0); }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Risk Levels</option>
            <option value="HIGH">🔴 High Risk (70–100)</option>
            <option value="MEDIUM">🟡 Medium Risk (40–69)</option>
            <option value="LOW">🟢 Low Risk (0–39)</option>
          </select>

          {/* District Filter */}
          <select
            value={district}
            onChange={(e) => { setDistrict(e.target.value); setPage(0); }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Districts</option>
            {districts.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(0); }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>

        </div>

        {/* Sub-bar: Sorting and Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-semibold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-medium text-slate-800"
            >
              <option value="riskScore">Risk Score (High to Low)</option>
              <option value="sanctionedAmount">Sanctioned Cost</option>
              <option value="createdAt">Date Ingested</option>
            </select>

            <button
              onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px] text-slate-700"
            >
              {sortDir === 'desc' ? 'DESC ↓' : 'ASC ↑'}
            </button>
          </div>

          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-red-600 transition font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>

      {/* Main Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Analyzing risk queue records...
          </div>
        ) : works.length === 0 ? (
          <EmptyState
            icon={Filter}
            title="No works matching selected filters"
            message="Try widening your search query or reset filters to display the full queue."
            actionText="Reset Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Priority / Score</th>
                    <th className="py-3 px-4">Work ID</th>
                    <th className="py-3 px-4">Project Title &amp; Location</th>
                    <th className="py-3 px-4">Cost</th>
                    <th className="py-3 px-4">Primary Anomaly Signal</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {works.map((work, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      
                      {/* Score Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <RiskScoreBadge score={work.riskScore} level={work.riskLevel} />
                      </td>

                      {/* Work ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {work.workId}
                      </td>

                      {/* Title & Location */}
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="font-bold text-slate-900 line-clamp-1" title={work.workName}>
                          {work.workName}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{work.district}, {work.state}</span>
                          <span>•</span>
                          <span className="text-blue-700 font-medium">{work.category}</span>
                        </div>
                      </td>

                      {/* Cost */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {formatINR(work.sanctionedAmount)}
                      </td>

                      {/* Primary Signal */}
                      <td className="py-3.5 px-4 max-w-xs text-[11px] text-slate-700">
                        <span className="line-clamp-2" title={work.primaryReason}>
                          {work.primaryReason}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded font-medium text-[11px] bg-slate-100 text-slate-700">
                          {work.status} ({work.progressPercentage}%)
                        </span>
                      </td>

                      {/* Open Passport Link */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <Link
                          to={`/passport/${work.workId}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gov-navy text-white hover:bg-gov-dark font-semibold text-[11px] transition shadow-xs"
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

            {/* Pagination */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 bg-slate-50">
              <div>
                Showing <strong>{page * pageSize + 1}</strong> to <strong>{Math.min((page + 1) * pageSize, totalElements)}</strong> of <strong>{totalElements}</strong> works
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="px-3 py-1 bg-white border border-slate-200 rounded-lg font-semibold disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="font-bold px-2">{page + 1} / {totalPages}</span>
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="px-3 py-1 bg-white border border-slate-200 rounded-lg font-semibold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
