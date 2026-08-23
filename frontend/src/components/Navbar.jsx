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
            <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base tracking-wide text-white">
                  MPLADS RAKSHAK
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium">
                सांसद स्थानीय क्षेत्र विकास योजना • MoSPI
              </p>
            </div>
          </Link>

          {/* Center Navigation Links (Clean Indian Gov Style) */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800 transition"
            >
              मुख्य पृष्ठ (Home)
            </Link>
            <Link
              to="/dashboard"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              डैशबोर्ड (Dashboard)
            </Link>
            <Link
              to="/queue"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              स्क्रूटनी (Risk Queue)
            </Link>
            <Link
              to="/map"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              मानचित्र (Map)
            </Link>
            <Link
              to="/works/MPL-2024-UP-004821/capture-evidence"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              फील्ड कैमरा (Camera)
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
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold transition disabled:opacity-50 shadow-xs"
              title="Run unsupervised anomaly engine"
            >
              <RefreshCw className={`w-3 h-3 ${runningAnalysis ? 'animate-spin' : ''}`} />
              <span className="hidden xl:inline">
                {runningAnalysis ? 'विश्लेषण जारी...' : 'Run Analysis'}
              </span>
            </button>

            {/* User Profile / Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-200 leading-tight">
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
