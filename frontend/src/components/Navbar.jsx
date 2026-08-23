import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RefreshCw, LogOut, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { getCurrentUser, clearAuthSession, api } from '../services/api';
import { useToast } from '../context/ToastContext';

export default function Navbar({ activeDataMode = 'PUBLIC DATA', onAnalysisRun }) {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const [runningAnalysis, setRunningAnalysis] = useState(false);
  const isGateway = location.pathname === '/';

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
    <header className={`w-full z-40 transition-all duration-300 font-sans ${
      isGateway 
        ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 text-white sticky top-0' 
        : 'bg-[#0B1E36] text-white border-b border-slate-800 sticky top-0 shadow-xs'
    }`}>
      
      {/* Subtle National Tricolor Accent Line */}
      <div className="h-0.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]" />
        <div className="h-full w-1/3 bg-[#FFFFFF]" />
        <div className="h-full w-1/3 bg-[#138808]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo & Ministry Branding */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="font-extrabold text-sm tracking-wide text-white">
                  MPLADS RAKSHAK
                </span>
                <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 px-1.5 py-0.2 rounded">
                  MoSPI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden md:block">
                National Risk &amp; Anomaly Intelligence Layer
              </p>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="flex items-center gap-1 text-xs font-semibold">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg transition ${
                location.pathname === '/' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              Gateway
            </Link>

            <Link
              to="/workflow"
              className={`px-3 py-1.5 rounded-lg transition ${
                location.pathname === '/workflow' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              Workflow Hub
            </Link>

            <Link
              to="/dashboard"
              className={`px-3 py-1.5 rounded-lg transition ${
                location.pathname === '/dashboard' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/queue"
              className={`px-3 py-1.5 rounded-lg transition hidden sm:inline-block ${
                location.pathname === '/queue' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              Scrutiny Queue
            </Link>

            <Link
              to="/works/MPL-2024-UP-004821/capture-evidence"
              className={`px-3 py-1.5 rounded-lg transition hidden md:inline-block ${
                location.pathname.includes('/capture-evidence') 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              Field Camera
            </Link>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2">
            
            {/* Quick Run Analysis Trigger */}
            <button
              onClick={handleTriggerAnalysis}
              disabled={runningAnalysis}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-semibold transition disabled:opacity-50"
              title="Run unsupervised anomaly engine"
            >
              <RefreshCw className={`w-3 h-3 text-blue-400 ${runningAnalysis ? 'animate-spin' : ''}`} />
              <span className="hidden lg:inline">
                {runningAnalysis ? 'Running...' : 'Run Engine'}
              </span>
            </button>

            {/* Officer Profile & Sign out */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <div className="text-[11px] font-bold text-slate-200 leading-tight">
                  {user?.fullName || 'District Officer'}
                </div>
                <div className="text-[9px] text-slate-400 font-mono">
                  Varanasi, UP
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}

