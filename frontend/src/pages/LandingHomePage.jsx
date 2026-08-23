import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Database, 
  AlertTriangle, 
  FileText, 
  Camera, 
  ArrowRight, 
  LayoutDashboard, 
  Building, 
  MapPin, 
  CheckCircle, 
  Search,
  ExternalLink,
  History,
  FileCheck2
} from "lucide-react";
import { api } from "../services/api";
import { formatINR } from "../utils/formatters";

export default function LandingHomePage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboardSummary()
      .then(data => setSummary(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalWorks = summary?.totalWorks || 3013;
  const highRisk = summary?.highRiskCount || 294;
  const totalCost = summary?.totalSanctionedAmount || 5931310000;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 font-sans">
      
      {/* 1. CLEAN HERO SECTION */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              <span>MoSPI • Smart India Hackathon (SIH26102)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              MPLADS Rakshak
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              An explainable AI decision-support tool for <strong>e-SAKSHI (MPLADS)</strong>. It helps District Planning Officers and auditors quickly identify unusual project costs, chronic execution delays, duplicate proposals, and unverified physical completion.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/queue"
                className="px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium text-xs transition flex items-center gap-1.5 shadow-xs"
              >
                <span>Open Scrutiny Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/dashboard"
                className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs border border-slate-300 transition flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-slate-600" />
                <span>Executive Dashboard</span>
              </Link>

              <Link
                to="/works/MPL-2024-UP-004821/capture-evidence"
                className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs border border-slate-300 transition flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5 text-slate-600" />
                <span>Mobile Geo-Camera</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Column */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-72 shrink-0">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-medium text-slate-500 block">Total Sanctions</span>
              <span className="text-lg font-bold font-mono text-slate-900">{totalWorks.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-slate-400 block">8 Test Districts</span>
            </div>

            <div className="p-3.5 rounded-lg bg-red-50/60 border border-red-200">
              <span className="text-[11px] font-medium text-red-700 block">High-Risk Flags</span>
              <span className="text-lg font-bold font-mono text-red-700">{highRisk}</span>
              <span className="text-[10px] text-red-500 block">Requires Review</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-medium text-slate-500 block">Total Fund Value</span>
              <span className="text-lg font-bold font-mono text-slate-900">{formatINR(totalCost)}</span>
              <span className="text-[10px] text-slate-400 block">Sanctioned</span>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
              <span className="text-[11px] font-medium text-emerald-800 block">Scoring Engine</span>
              <span className="text-lg font-bold font-mono text-emerald-800">100%</span>
              <span className="text-[10px] text-emerald-600 block">Explainable (0–100)</span>
            </div>
          </div>

        </div>
      </section>


      {/* 2. HOW THE PLATFORM WORKS (Simple 4 Steps) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            How MPLADS Rakshak Works
          </h2>
          <p className="text-xs text-slate-500">
            A simple 4-step workflow designed for District and Ministry officers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Step 1 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Step 1</span>
                <Database className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">1. Data Ingestion</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connects with e-SAKSHI data exports or CSV files. Automatically validates missing fields and data completeness.
              </p>
            </div>
            <Link to="/data" className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 pt-2 border-t border-slate-100">
              <span>View Data Health</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Step 2</span>
                <AlertTriangle className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">2. Risk Prioritization</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculates transparent 0–100 risk scores using peer cost IQR, delay durations, and duplicate text matching.
              </p>
            </div>
            <Link to="/queue" className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 pt-2 border-t border-slate-100">
              <span>Inspect Queue</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Step 3</span>
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">3. Risk Passport Dossier</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Officers review full forensic evidence: peer median benchmarks, execution timeline, and nearby duplicate proposals.
              </p>
            </div>
            <Link to="/passport/MPL-2024-UP-004821" className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 pt-2 border-t border-slate-100">
              <span>Sample Passport</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Step 4</span>
                <Camera className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">4. Geo-Verified Evidence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Field teams take on-site completion photos with live GPS coordinate locks, distance mismatch checks, and SHA-256 hash.
              </p>
            </div>
            <Link to="/works/MPL-2024-UP-004821/capture-evidence" className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 pt-2 border-t border-slate-100">
              <span>Test Camera</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </section>


      {/* 3. CASE STUDY / PRIORITY INQUEST CARD */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
              CASE INQUEST
            </span>
            <span className="text-xs font-semibold text-slate-700">
              Work ID #MPL-2024-UP-004821 • Varanasi, Uttar Pradesh
            </span>
          </div>
          <span className="text-xs text-slate-500 font-mono">Score: 84 / 100</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900">
            Construction of CC Road and Paver Works from Main Chowk to Panchayat Bhawan, Village Rampur
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
            <strong>Why it was flagged:</strong> Sanctioned cost is <strong>₹48.00 Lakh</strong> (+53.8% above peer median of ₹31.20L) • A near-identical CC road proposal was detected 420 meters away • Statutory completion certificate is missing on file.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            to="/passport/MPL-2024-UP-004821"
            className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Open Risk Passport Dossier</span>
          </Link>

          <Link
            to="/works/MPL-2024-UP-004821/capture-evidence"
            className="px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs border border-slate-300 transition flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5 text-slate-600" />
            <span>Capture Geo-Verified Evidence</span>
          </Link>
        </div>
      </section>


      {/* 4. DIRECT OFFICER MODULES (Clean 4 Cards) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Direct Access Modules
          </h2>
          <p className="text-xs text-slate-500">
            Navigate directly to core administrative and investigation pages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <Link
            to="/queue"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-xs transition space-y-1.5"
          >
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-bold text-slate-900">Scrutiny Queue</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-slate-500 text-[11px]">Filter all 3,013 works by district, risk score, and house (Lok Sabha / Rajya Sabha).</p>
          </Link>

          <Link
            to="/map"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-xs transition space-y-1.5"
          >
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-bold text-slate-900">Geospatial Map</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-slate-500 text-[11px]">Inspect geographic clustering and proximity between nearby project sanctions.</p>
          </Link>

          <Link
            to="/investigations"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-xs transition space-y-1.5"
          >
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-bold text-slate-900">Case Management</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-slate-500 text-[11px]">Track field inspection orders, compliance reviews, and officer determinations.</p>
          </Link>

          <Link
            to="/audit"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-xs transition space-y-1.5"
          >
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-bold text-slate-900">Officer Audit Trail</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-slate-500 text-[11px]">View chronological logs of all officer decisions, risk score changes, and exports.</p>
          </Link>

        </div>
      </section>


      {/* 5. FOOTER NOTE */}
      <footer className="pt-6 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
        <p className="font-medium text-slate-700">
          MPLADS Rakshak • Ministry of Statistics and Programme Implementation (MoSPI)
        </p>
        <p className="text-[11px] text-slate-400">
          This system provides automated decision support intelligence to assist authorized officers. Final determinations remain under statutory officer authority.
        </p>
      </footer>

    </div>
  );
}
