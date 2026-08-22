import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Printer, Download, Search, Shield, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';
import { formatINR, formatDate } from '../utils/formatters';
import RiskScoreBadge from '../components/RiskScoreBadge';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ReportsPage() {
  const [searchParams] = useSearchParams();
  const initialWorkId = searchParams.get('workId') || 'MPL-2024-UP-004821';
  
  const [workId, setWorkId] = useState(initialWorkId);
  const [dossier, setDossier] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadDossier = async (idToFetch) => {
    if (!idToFetch) return;
    setLoading(true);
    try {
      const data = await api.getDossier(idToFetch);
      setDossier(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDossier(initialWorkId);
  }, [initialWorkId]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadDossier(workId);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto font-sans">
      
      <div className="print:hidden">
        <Breadcrumbs />
      </div>

      {/* Search and Print Bar (Hidden during print) */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={workId}
              onChange={(e) => setWorkId(e.target.value)}
              placeholder="Enter Work ID (e.g. MPL-2024-UP-004821)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-gov-navy text-white text-xs font-semibold rounded-lg hover:bg-gov-dark transition"
          >
            Generate Dossier
          </button>
        </form>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF Dossier</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Generating statutory risk dossier...
        </div>
      ) : dossier ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-300 shadow-md space-y-6 print:border-none print:shadow-none print:p-0">
          
          {/* Official Dossier Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-slate-900" />
                <h1 className="text-lg font-black tracking-wider text-slate-900">
                  {dossier.reportTitle}
                </h1>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Ministry of Statistics &amp; Programme Implementation (MoSPI) • Data Informatics Division
              </p>
            </div>

            <div className="text-right text-xs font-mono">
              <div className="font-bold text-slate-900">{dossier.referenceCode}</div>
              <div className="text-slate-500 text-[11px]">{dossier.generatedAt}</div>
            </div>
          </div>

          {/* Disclaimer Banner */}
          <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-700 italic leading-snug">
            {dossier.disclaimer}
          </div>

          {/* Work Summary Grid */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b pb-1">
              1. Project Identification &amp; Statutory Metadata
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
              <div>
                <span className="text-slate-400 block text-[11px]">Work ID</span>
                <span className="font-mono font-bold text-slate-900">{dossier.workSummary?.workId}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Category</span>
                <span className="font-semibold text-slate-800">{dossier.workSummary?.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">District / State</span>
                <span className="font-semibold text-slate-800">{dossier.workSummary?.district}, {dossier.workSummary?.state}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Sanctioned Cost</span>
                <span className="font-mono font-bold text-slate-900">{formatINR(dossier.workSummary?.sanctionedCost)}</span>
              </div>
            </div>
            <div className="text-xs pt-2">
              <span className="text-slate-400 block text-[11px]">Project Title</span>
              <span className="font-bold text-slate-900 text-sm">{dossier.workSummary?.workName}</span>
            </div>
          </div>

          {/* Risk Evaluation Findings */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b pb-1">
              2. AI &amp; Statistical Risk Findings
            </h3>
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-[11px] text-slate-500 block font-bold">Overall Risk Score</span>
                <span className="text-2xl font-black text-red-700">
                  {dossier.riskEvaluation?.overallScore}/100
                </span>
              </div>
              <div className="border-l pl-4 space-y-1 text-xs">
                <div><strong>Classification:</strong> {dossier.riskEvaluation?.riskLevel} RISK</div>
                <div><strong>Confidence Index:</strong> {dossier.riskEvaluation?.confidence}</div>
                <div><strong>Model Pipeline:</strong> {dossier.riskEvaluation?.modelVersion}</div>
              </div>
            </div>

            {/* Reasons list */}
            <div className="space-y-1.5 pt-1 text-xs">
              <span className="font-bold text-slate-800 block">Identified Risk Factors:</span>
              {(dossier.riskEvaluation?.reasons || []).map((r, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-red-50/50 border border-red-100 rounded text-red-900">
                  <span className="text-red-600 font-bold">•</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Checklist */}
          {dossier.evidenceCenter && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b pb-1">
                3. Statutory Evidence Audit (Evidence Center)
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {dossier.evidenceCenter.evidenceItems?.map((ev, idx) => (
                  <div key={idx} className="p-2 border rounded bg-slate-50 flex items-center justify-between">
                    <span>{ev.name}</span>
                    <span className="font-semibold">{ev.status === 'AVAILABLE' ? '✅ Present' : '❌ Missing'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Officer Signoff Footer */}
          <div className="pt-8 border-t-2 border-slate-900 grid grid-cols-2 gap-8 text-xs">
            <div>
              <div className="font-bold text-slate-900 mb-6">Generated By:</div>
              <div className="font-semibold text-slate-800">{dossier.generatedBy}</div>
              <div className="text-slate-500 text-[11px]">Authorized Review Officer</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-900 mb-6">Countersigned:</div>
              <div className="text-slate-400">__________________________</div>
              <div className="text-slate-500 text-[11px] mt-1">District Planning Authority / MoSPI</div>
            </div>
          </div>

        </div>
      ) : null}

    </div>
  );
}
