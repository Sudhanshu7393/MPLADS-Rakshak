import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderSearch, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  UserCheck, 
  Eye, 
  Plus, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';
import { formatDate } from '../utils/formatters';
import EmptyState from '../components/EmptyState';
import Breadcrumbs from '../components/Breadcrumbs';
import { useToast } from '../context/ToastContext';

const STATUS_TABS = ['ALL', 'OPEN', 'FIELD_VERIFICATION', 'UNDER_REVIEW', 'ESCALATED', 'RESOLVED', 'DISMISSED'];

export default function InvestigationsPage() {
  const { addToast } = useToast();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');

  const [selectedCase, setSelectedCase] = useState(null);
  const [caseNotes, setCaseNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const loadCases = async () => {
    setLoading(true);
    try {
      const res = await api.getInvestigations({ page: 0, size: 50 });
      setCases(res?.content || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  const openCaseDetail = async (c) => {
    setSelectedCase(c);
    setNewStatus(c.status);
    try {
      const notes = await api.getInvestigationNotes(c.caseNumber);
      setCaseNotes(notes || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatusAndNote = async (e) => {
    e.preventDefault();
    if (!selectedCase) return;
    setActionLoading(true);
    try {
      await api.updateInvestigation(selectedCase.caseNumber, {
        status: newStatus,
        officerNote: newNote || `Status updated to ${newStatus}`
      });
      setNewNote('');
      addToast(`Case ${selectedCase.caseNumber} updated to ${newStatus}`, 'success');
      loadCases();
      // Reload notes
      const notes = await api.getInvestigationNotes(selectedCase.caseNumber);
      setCaseNotes(notes || []);
      setSelectedCase(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredCases = cases.filter(c => {
    if (activeTab === 'ALL') return true;
    return c.status === activeTab;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      
      <Breadcrumbs />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black tracking-tight text-slate-900">INVESTIGATIONS &amp; CASE MANAGEMENT</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {cases.length} Total Cases
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Statutory administrative review workflows, field verification dispatch, and audit-logged officer findings.
          </p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-2 rounded-lg transition whitespace-nowrap border ${
              activeTab === tab
                ? 'bg-gov-navy text-white border-gov-navy shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.replace('_', ' ')} {tab !== 'ALL' && `(${cases.filter(c => c.status === tab).length})`}
          </button>
        ))}
      </div>

      {/* Cases List & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Cases Grid */}
        <div className="lg:col-span-2 space-y-3">
          {loading ? (
            <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Loading inquiry dossiers...
            </div>
          ) : filteredCases.length === 0 ? (
            <EmptyState
              icon={FolderSearch}
              title="No active cases in this status"
              message="Open any flagged work in the Risk Queue to initiate a new administrative inquiry or request field verification."
              actionText="Open Risk Queue"
              actionLink="/queue"
            />
          ) : (
            filteredCases.map((c, idx) => (
              <div
                key={idx}
                onClick={() => openCaseDetail(c)}
                className={`bg-white rounded-xl border p-4 shadow-xs cursor-pointer transition ${
                  selectedCase?.caseNumber === c.caseNumber
                    ? 'border-blue-600 ring-2 ring-blue-100 bg-blue-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {c.caseNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Work ID: {c.workId}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${
                    c.status === 'FIELD_VERIFICATION' ? 'bg-red-50 text-red-800 border-red-200' :
                    c.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                    c.status === 'DISMISSED' ? 'bg-slate-100 text-slate-700 border-slate-200' :
                    'bg-blue-50 text-blue-800 border-blue-200'
                  }`}>
                    {c.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900 line-clamp-1 mb-1">
                  {c.workName}
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 line-clamp-2 mb-2">
                  <strong>Trigger:</strong> {c.reasonForReview}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Assigned: <strong>{c.assignedOfficer}</strong></span>
                  <span className="font-mono">{formatDate(c.createdAt)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Col: Active Case Thread Panel */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs h-fit space-y-4 sticky top-20">
          {selectedCase ? (
            <>
              <div className="pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-xs text-slate-900 bg-blue-50 text-blue-900 px-2 py-0.5 rounded border border-blue-200">
                    {selectedCase.caseNumber}
                  </span>
                  <Link
                    to={`/passport/${selectedCase.workId}`}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>View Full Passport</span>
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <h3 className="font-bold text-sm text-slate-900 line-clamp-2 mt-1">
                  {selectedCase.workName}
                </h3>
              </div>

              {/* Status Update Form */}
              <form onSubmit={handleUpdateStatusAndNote} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Update Case Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="OPEN">OPEN (Under Initial Review)</option>
                    <option value="FIELD_VERIFICATION">FIELD VERIFICATION (Mandated Site Visit)</option>
                    <option value="UNDER_REVIEW">UNDER REVIEW (Detailed Inquest)</option>
                    <option value="ESCALATED">ESCALATED (State / Central Nodal)</option>
                    <option value="RESOLVED">RESOLVED (Action Completed)</option>
                    <option value="DISMISSED">DISMISSED (Legitimate Variance)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Add Case Progress Note</label>
                  <textarea
                    rows={3}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter statutory inspection summary, findings, or instructions..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full py-2 bg-gov-navy hover:bg-gov-dark text-white rounded-lg font-semibold shadow-xs transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Update Case &amp; Record Audit Log</span>
                </button>
              </form>

              {/* Chronological Notes */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Action History ({caseNotes.length})
                </span>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {caseNotes.map((n, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-semibold text-slate-800">{n.authorName}</span>
                        <span className="font-mono">{formatDate(n.createdAt)}</span>
                      </div>
                      <p className="text-slate-700 font-medium">{n.noteText}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-xs text-slate-400">
              <FolderSearch className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              Select an investigation case on the left to review proceedings or update status.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
