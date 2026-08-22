import React, { useState } from 'react';
import { Shield, Play, RefreshCw, User, LogOut, CheckCircle, Bell, ChevronDown } from 'lucide-react';
import DataModeBadge from './DataModeBadge';
import { getCurrentUser, clearAuthSession, api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ activeDataMode = 'DEMO/SYNTHETIC DATA', onAnalysisRun }) {
  const [runningAnalysis, setRunningAnalysis] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleRunAnalysis = async () => {
    setRunningAnalysis(true);
    try {
      await api.runAnalysis();
      if (onAnalysisRun) onAnalysisRun();
    } catch (e) {
      alert('Error running risk intelligence engine: ' + e.message);
    } finally {
      setRunningAnalysis(false);
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-gov-navy text-white border-b border-slate-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand & Emblem */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-xs">
            <Shield className="w-6 h-6 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-wider text-white">MPLADS RAKSHAK</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                SIH 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              MoSPI • AI-Powered Risk, Anomaly &amp; Transparency Intelligence Layer
            </p>
          </div>
        </div>

        {/* Center: Data Mode Indicator */}
        <div className="hidden md:flex items-center">
          <DataModeBadge mode={activeDataMode} />
        </div>

        {/* Right: Actions & Officer Profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAnalysis}
            disabled={runningAnalysis}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition disabled:opacity-50"
            title="Re-run Multi-Tier Anomaly Detection & Scoring"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${runningAnalysis ? 'animate-spin' : ''}`} />
            <span>{runningAnalysis ? 'Analysing...' : 'Run Anomaly Scan'}</span>
          </button>

          {/* Officer Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 transition"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 font-bold text-[10px]">
                {user?.fullName ? user.fullName[0] : 'O'}
              </div>
              <div className="text-left hidden lg:block">
                <span className="font-semibold block leading-tight text-white">{user?.fullName || 'Officer'}</span>
                <span className="text-[10px] text-slate-400 block leading-none">{user?.district || 'Central Nodal'}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white text-slate-900 border border-slate-200 shadow-xl p-3 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="pb-2.5 mb-2.5 border-b border-slate-100">
                  <div className="font-bold text-slate-900">{user?.fullName}</div>
                  <div className="text-slate-500 text-[11px]">{user?.email}</div>
                  <div className="mt-1 inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">
                    {user?.role?.replace('ROLE_', '') || 'OFFICER'}
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 mb-2">
                  <strong>Department:</strong> {user?.department || 'District Planning Cell'}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 font-semibold transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out / Switch Profile</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
