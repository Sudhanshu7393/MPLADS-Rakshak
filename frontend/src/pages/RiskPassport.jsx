import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  ArrowLeft, 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  Building, 
  MapPin, 
  Coins, 
  FileText, 
  Copy, 
  Send, 
  UserCheck, 
  Download, 
  Printer, 
  AlertTriangle,
  FileSearch,
  MessageSquare,
  History,
  TrendingUp,
  Info,
  Layers
} from 'lucide-react';
import { api } from '../services/api';
import { formatINR, formatDate, getRiskBadgeClass } from '../utils/formatters';
import RiskScoreBadge from '../components/RiskScoreBadge';
import EvidenceCenterWidget from '../components/EvidenceCenterWidget';
import CostBenchmarkWidget from '../components/CostBenchmarkWidget';
import TimelineProgressWidget from '../components/TimelineProgressWidget';

const DOSSIER_TABS = [
  { id: 'overview', label: '1. Why Flagged & Overview', icon: AlertOctagon },
  { id: 'evidence', label: '2. Evidence Center (Documents)', icon: FileText, badge: 'Required' },
  { id: 'cost', label: '3. Peer Cost Comparison', icon: TrendingUp },
  { id: 'timeline', label: '4. Timeline & Delay', icon: Clock },
  { id: 'similar', label: '5. Similar Works', icon: Copy },
];

export default function RiskPassport() {
  const { workId } = useParams();
  const navigate = useNavigate();

  const [passport, setPassport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Investigation Action State
  const [actionLoading, setActionLoading] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const loadPassport = async () => {
    setLoading(true);
    try {
      const data = await api.getRiskPassport(workId);
      setPassport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPassport();
  }, [workId]);

  const handleCreateOrUpdateCase = async (status, priority = 'HIGH', reason) => {
    setActionLoading(true);
    try {
      if (passport.investigationCase) {
        await api.updateInvestigation(passport.investigationCase.caseNumber, {
          status: status,
          priority: priority,
          officerNote: noteText || `Officer transitioned status to ${status}.`
        });
      } else {
        await api.createInvestigation({
          workId: workId,
          priority: priority,
          reasonForReview: reason || `Officer opened case with action [${status}].`,
          initialNote: noteText || `Case opened from Risk Passport.`
        });
      }
      setNoteText('');
      setActionSuccessMsg(`Action recorded: ${status}`);
      setTimeout(() => setActionSuccessMsg(''), 3000);
      loadPassport();
    } catch (err) {
      alert('Error updating case: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    if (!passport.investigationCase) {
      handleCreateOrUpdateCase('OPEN', 'MEDIUM', 'Note added by reviewing officer.');
      return;
    }
    setActionLoading(true);
    try {
      await api.addInvestigationNote(passport.investigationCase.caseNumber, {
        noteText: noteText,
        actionType: 'NOTE_ADDED'
      });
      setNoteText('');
      setActionSuccessMsg('Investigation note recorded in audit log.');
      setTimeout(() => setActionSuccessMsg(''), 3000);
      loadPassport();
    } catch (err) {
      alert('Error adding note: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs text-slate-500 min-h-[60vh] flex items-center justify-center">
        <div className="space-y-3">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Compiling 360-degree Risk Passport Dossier...</p>
        </div>
      </div>
    );
  }

  if (error || !passport) {
    return (
      <div className="p-8 text-center">
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl border border-red-200">
          <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-900">Work Dossier Not Found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">{error || `Work ID ${workId} does not exist.`}</p>
          <Link to="/queue" className="px-4 py-2 bg-gov-navy text-white text-xs font-semibold rounded-lg">
            Return to Risk Queue
          </Link>
        </div>
      </div>
    );
  }

  const work = passport.work;
  const score = passport.overallScore || 0;
  const riskLevel = passport.riskLevel || 'LOW';
  const subscores = passport.subscores || {};
  const reasons = passport.reasons || [];
  const invCase = passport.investigationCase;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto font-sans">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/queue"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Risk Queue</span>
        </Link>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Work ID:</span>
          <span className="font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
            {work.workId}
          </span>
        </div>
      </div>

      {/* Main Identity Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                {work.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {work.subCategory || 'General'}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {work.district}, {work.state}
              </span>
            </div>

            <h1 className="text-xl font-extrabold text-slate-900 leading-snug">
              {work.workName}
            </h1>

            <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span><strong>Constituency:</strong> {work.constituency || 'Varanasi'}</span>
              <span><strong>Block:</strong> {work.block || 'Kashi Vidyapeeth'}</span>
              <span><strong>Village:</strong> {work.village || 'Rampur'}</span>
              <span><strong>Agency:</strong> {work.implementingAgencyName || 'Unassigned'}</span>
            </div>
          </div>

          {/* Risk Score Highlight */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-4 shrink-0">
            <div className="text-center">
              <div className={`text-3xl font-black ${
                riskLevel === 'HIGH' ? 'text-red-700' : riskLevel === 'MEDIUM' ? 'text-amber-700' : 'text-emerald-700'
              }`}>
                {score}<span className="text-sm font-normal text-slate-400">/100</span>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                {riskLevel} RISK
              </div>
            </div>

            <div className="border-l border-slate-200 pl-4 space-y-1 text-xs">
              <span className="text-slate-500 text-[11px] block">Data Confidence:</span>
              <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200">
                {passport.confidence || 'HIGH'}
              </span>
              <div className="text-[10px] text-slate-400">
                {passport.modelVersion || 'v1.2-ensemble'}
              </div>
            </div>
          </div>

        </div>

        {/* Financial Details Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Sanctioned Cost</span>
            <span className="font-mono font-bold text-sm text-slate-900">{formatINR(work.sanctionedAmount)}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Expenditure Amount</span>
            <span className="font-mono font-bold text-sm text-slate-900">{formatINR(work.expenditureAmount)}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Execution Status</span>
            <span className="font-semibold text-sm text-slate-800">{work.status}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Physical Progress</span>
            <span className="font-bold text-sm text-blue-700">{work.progressPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Action Toolbar (Prominent & Clear) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
            Officer Action:
          </span>

          <button
            onClick={() => handleCreateOrUpdateCase('FIELD_VERIFICATION', 'CRITICAL', 'Mandated physical on-site verification by District Engineer.')}
            disabled={actionLoading}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Request Field Verification</span>
          </button>

          <button
            onClick={() => handleCreateOrUpdateCase('UNDER_REVIEW', 'HIGH', 'Flagged for internal administrative scrutiny.')}
            disabled={actionLoading}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition disabled:opacity-50"
          >
            <FileSearch className="w-3.5 h-3.5" />
            <span>Mark for Review</span>
          </button>

          <button
            onClick={() => handleCreateOrUpdateCase('DISMISSED', 'LOW', 'Officer verified flag to be normal execution variance.')}
            disabled={actionLoading}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition disabled:opacity-50"
          >
            <span>Dismiss Flag</span>
          </button>
        </div>

        <Link
          to={`/reports?workId=${work.workId}`}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5 shadow-xs"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Official Dossier</span>
        </Link>
      </div>

      {actionSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Tabs Navigation (Easy to switch between sections) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {DOSSIER_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition whitespace-nowrap border ${
                activeTab === tab.id
                  ? 'bg-gov-navy text-white border-gov-navy shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-sky-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview & Why Flagged */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* WHY THIS WORK WAS FLAGGED */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-red-600" />
                <h3 className="text-sm font-extrabold text-slate-900">WHY THIS WORK WAS FLAGGED</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Multi-Signal Decomposition</span>
            </div>

            {/* Subscore decomposition chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-500 block">Cost Anomaly</span>
                <span className={`text-base font-bold ${subscores.cost_anomaly > 15 ? 'text-red-700' : 'text-slate-800'}`}>
                  {subscores.cost_anomaly || 25} pts
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-500 block">Delay Anomaly</span>
                <span className={`text-base font-bold ${subscores.delay_anomaly > 10 ? 'text-amber-700' : 'text-slate-800'}`}>
                  {subscores.delay_anomaly || 20} pts
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-500 block">Rule Violations</span>
                <span className="text-base font-bold text-slate-800">
                  {subscores.rule_violation || 20} pts
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-500 block">Duplicate Match</span>
                <span className={`text-base font-bold ${subscores.similarity_duplicate > 5 ? 'text-red-700' : 'text-slate-800'}`}>
                  {subscores.similarity_duplicate || 15} pts
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-500 block">Agency Pattern</span>
                <span className="text-base font-bold text-slate-800">
                  {subscores.agency_concentration || 6} pts
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-500 block">Missing Evidence</span>
                <span className={`text-base font-bold ${subscores.missing_evidence > 0 ? 'text-red-700' : 'text-slate-800'}`}>
                  {subscores.missing_evidence || 8} pts
                </span>
              </div>
            </div>

            {/* Plain English Evidence Points */}
            <div className="space-y-2 pt-2">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50/70 border border-red-100 text-xs text-red-900 font-medium">
                  <span className="text-red-600 font-bold">•</span>
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Preview of Evidence & Peer Cost */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EvidenceCenterWidget
              evidenceCenter={passport.evidenceCenter}
              workId={work.workId}
              onActionComplete={loadPassport}
            />
            <CostBenchmarkWidget
              peerComparison={passport.peerComparison}
              sanctionedAmount={work.sanctionedAmount}
              category={work.category}
            />
          </div>

        </div>
      )}

      {/* Tab 2: Evidence Center */}
      {activeTab === 'evidence' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <EvidenceCenterWidget
            evidenceCenter={passport.evidenceCenter}
            workId={work.workId}
            onActionComplete={loadPassport}
          />
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Click any missing document row above to view the statutory deadline, risk points impact, or dispatch a direct requisition notice.</span>
          </div>
        </div>
      )}

      {/* Tab 3: Peer Cost Comparison */}
      {activeTab === 'cost' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <CostBenchmarkWidget
            peerComparison={passport.peerComparison}
            sanctionedAmount={work.sanctionedAmount}
            category={work.category}
          />
        </div>
      )}

      {/* Tab 4: Execution Timeline & Delay */}
      {activeTab === 'timeline' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <TimelineProgressWidget
            timeline={passport.timelineAnalysis}
            status={work.status}
            progressPercentage={work.progressPercentage}
          />
        </div>
      )}

      {/* Tab 5: Similar Works */}
      {activeTab === 'similar' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Copy className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-bold text-slate-900">Potentially Similar / Overlapping Works</h4>
            </div>
            <span className="text-xs text-slate-400 font-mono">TF-IDF &amp; Haversine Distance</span>
          </div>

          {passport.similarWorks && passport.similarWorks.length > 0 ? (
            <div className="space-y-3">
              {passport.similarWorks.map((sim, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <Link to={`/passport/${sim.targetWorkId}`} className="font-mono font-bold text-blue-700 hover:underline">
                      {sim.targetWorkId}
                    </Link>
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-red-100 text-red-800 border border-red-200">
                      {sim.similarityScore}% Text Match
                    </span>
                  </div>

                  <div className="font-semibold text-slate-800">
                    {sim.targetWorkName}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>Cost: <strong>{formatINR(sim.targetSanctionedAmount)}</strong></span>
                    {sim.distanceMeters !== null && (
                      <span className="text-red-700 font-semibold">
                        📍 {Math.round(sim.distanceMeters)}m away
                      </span>
                    )}
                    <span>{sim.targetDistrict}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-slate-400">
              No overlapping or duplicate works detected within this geographic cluster.
            </div>
          )}
        </div>
      )}

      {/* Investigation Notes & Audit Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Officer Findings &amp; Investigation Log ({passport.investigationNotes?.length || 0})
            </h3>
          </div>
          {invCase && (
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 font-mono">
              Case: {invCase.caseNumber} [{invCase.status}]
            </span>
          )}
        </div>

        {/* Add Note Input */}
        <form onSubmit={handleAddNote} className="space-y-2">
          <textarea
            rows={2}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add an officer review finding, field observation, or instructions..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={actionLoading || !noteText.trim()}
              className="px-4 py-2 bg-gov-navy hover:bg-gov-dark text-white rounded-xl text-xs font-semibold shadow-xs transition flex items-center gap-1.5 disabled:opacity-40"
            >
              <Send className="w-3 h-3" />
              <span>Record Officer Finding</span>
            </button>
          </div>
        </form>

        {/* Notes Timeline */}
        {passport.investigationNotes && passport.investigationNotes.length > 0 ? (
          <div className="space-y-3 pt-3 border-t border-slate-100">
            {passport.investigationNotes.map((note, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-0.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-800">
                    {note.authorName} ({note.authorRole?.replace('ROLE_', '')})
                  </span>
                  <span className="font-mono text-slate-400">{formatDate(note.createdAt)}</span>
                </div>
                <p className="text-slate-700 font-medium">{note.noteText}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-xs text-slate-400">
            No officer investigation notes logged yet for this work.
          </div>
        )}
      </div>

    </div>
  );
}
