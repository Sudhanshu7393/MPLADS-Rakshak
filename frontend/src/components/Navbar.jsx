import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RefreshCw, User, LogOut, ShieldCheck, Database, Search } from 'lucide-react';
import { getCurrentUser, clearAuthSession, api } from '../services/api';
import DataModeBadge from './DataModeBadge';
import { useToast } from '../context/ToastContext';

export default function Navbar({ activeDataMode = 'PUBLIC DATA', onAnalysisRun }) {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [runningAnalysis, setRunningAnalysis] = useState(false);

  const handleLogout = () => {
    clearAuthSession();
    navigate('/login');
  };

  const handleTriggerAnalysis = async () => {
    setRunningAnalysis(true);
    try {
      await api.runFullAnalysis();
      addToast('Analytical cycle completed. All risk scores updated against live baselines.', 'success');
      if (onAnalysisRun) onAnalysisRun();
    } catch (e) {
      addToast('Error running analytical cycle: ' + e.message, 'error');
    } finally {
      setRunningAnalysis(false);
    }
  };

  return (
    <header className="bg-[#0B1E36] text-white border-b border-slate-800 sticky top-0 z-40 shadow-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Ministry Branding */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wide text-white">
                  MPLADS RAKSHAK
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-900/80 text-blue-200 border border-blue-700/60 px-1.5 py-0.5 rounded">
                  ANALYTICAL ENGINE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                National Risk &amp; Anomaly Prioritisation Platform • MoSPI
              </p>
            </div>
          </Link>

          {/* Center Navigation Links (English Modern Style) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition"
            >
              Home &amp; Workflow
            </Link>
            <Link
              to="/dashboard"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              Executive Analytics
            </Link>
            <Link
              to="/queue"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              Scrutiny Queue
            </Link>
            <Link
              to="/map"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              Geospatial Map
            </Link>
            <Link
              to="/works/MPL-2024-UP-004821/capture-evidence"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              Field Camera
            </Link>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2.5">
            
            {/* Active Data Mode Badge */}
            <DataModeBadge mode={activeDataMode} />

            {/* Run Risk Engine Trigger */}
            <button
              onClick={handleTriggerAnalysis}
              disabled={runningAnalysis}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition disabled:opacity-50"
              title="Run unsupervised anomaly engine across all records"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${runningAnalysis ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">
                {runningAnalysis ? 'Running...' : 'Run Analytical Cycle'}
              </span>
            </button>

            {/* User Profile / Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-slate-200 leading-tight">
                  {user?.fullName || 'District Planning Officer'}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {user?.role ? user.role.replace('ROLE_', '') : 'Varanasi, UP'}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
