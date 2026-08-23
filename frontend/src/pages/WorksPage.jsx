import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, RotateCcw, Layers, ArrowRight, Camera } from "lucide-react";
import { api } from "../services/api";
import { formatINR, formatDate } from "../utils/formatters";
import Breadcrumbs from "../components/Breadcrumbs";
import EmptyState from "../components/EmptyState";

export default function WorksPage() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.all([api.getDistricts(), api.getCategories()])
      .then(([d, c]) => { setDistricts(d || []); setCategories(c || []); })
      .catch(console.error);
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getWorks({ district: district || undefined, category: category || undefined, status: status || undefined, search: search || undefined, page, size: 20 });
      setWorks(data?.content || []);
      setTotalPages(data?.totalPages || 1);
      setTotalElements(data?.totalElements || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [district, category, status, search, page]);

  const reset = () => { setDistrict(""); setCategory(""); setStatus(""); setSearch(""); setPage(0); };

  return (
    <div className="p-6 md:p-8 space-y-5 max-w-7xl mx-auto font-sans">
      <Breadcrumbs />

      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">ALL WORKS</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {totalElements} Records
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Browse and search all MPLADS project records. Click Risk Passport to view anomaly analysis.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Work ID, Project Title..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <select value={district} onChange={(e) => { setDistrict(e.target.value); setPage(0); }} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none">
            <option value="">All Districts</option>
            {districts.map((d, i) => <option key={i} value={d}>{d}</option>)}
          </select>
          <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(0); }} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none">
            <option value="">All Categories</option>
            {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(0); }} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none">
            <option value="">All Statuses</option>
            <option>Ongoing</option><option>Delayed</option><option>Completed</option><option>Sanctioned</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button onClick={reset} className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 font-medium">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading works...
          </div>
        ) : works.length === 0 ? (
          <EmptyState icon={Layers} title="No works found" message="Try adjusting your filters." actionText="Reset Filters" onAction={reset} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Work ID</th>
                    <th className="py-3 px-4">Project Title & Location</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Cost</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Progress</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {works.map((work, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-mono font-bold text-slate-800 text-[11px] whitespace-nowrap">{work.workId}</td>
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-semibold text-slate-900 line-clamp-1">{work.workName}</div>
                        <div className="text-[11px] text-slate-500">{work.district}, {work.state}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{work.category}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">{formatINR(work.sanctionedAmount)}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">{work.status}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${work.progressPercentage || 0}%` }} />
                          </div>
                          <span className="text-[11px] text-slate-500">{work.progressPercentage}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center gap-1.5 justify-end">
                          <Link to={`/works/${work.workId}/capture-evidence`} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-[11px] transition" title="Capture Evidence">
                            <Camera className="w-3 h-3" />
                          </Link>
                          <Link to={`/passport/${work.workId}`} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-semibold text-[11px] transition">
                            Passport <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 bg-slate-50">
              <span>Showing <strong>{page * 20 + 1}</strong>–<strong>{Math.min((page + 1) * 20, totalElements)}</strong> of <strong>{totalElements}</strong></span>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="px-3 py-1 bg-white border border-slate-200 rounded-lg font-semibold disabled:opacity-40">Previous</button>
                <span className="font-bold">{page + 1} / {totalPages}</span>
                <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="px-3 py-1 bg-white border border-slate-200 rounded-lg font-semibold disabled:opacity-40">Next</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
