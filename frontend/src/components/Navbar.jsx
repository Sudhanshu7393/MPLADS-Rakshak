import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RefreshCw, LogOut, ShieldCheck, Sun, Moon, Sparkles, ChevronRight } from 'lucide-react';
import { getCurrentUser, clearAuthSession, api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ activeDataMode = 'PUBLIC DATA', onAnalysisRun }) {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const { theme, toggleTheme, isDark } = useTheme();
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

  const navLinks = [
    { to: '/', label: 'Overview & Workflow' },
    { to: '/dashboard', label: 'Executive Analytics' },
    { to: '/queue', label: 'Scrutiny Queue' },
    { to: '/map', label: 'Geospatial Map' },
    { to: '/works/MPL-2024-UP-004821/capture-evidence', label: 'Field Camera' },
  ];

  return (
    <header className="w-full z-40 bg-[#0B2545] border-b border-[#133B5C] text-white sticky top-0 shadow-md transition-colors duration-200 no-print">
      
      {/* Official National Tricolor Accent Line */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]" />
        <div className="h-full w-1/3 bg-[#FFFFFF]" />
        <div className="h-full w-1/3 bg-[#138808]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15">
          
          {/* Logo & Ministry Branding */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600 border border-blue-400/40 flex items-center justify-center shadow-xs text-white">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 leading-tight">
                <span className="font-black text-sm tracking-wider text-white">
                  MPLADS RAKSHAK
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-900/80 text-blue-200 border border-blue-400/30 px-2 py-0.5 rounded">
                  MoSPI
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium hidden sm:block">
                National Risk &amp; Anomaly Intelligence Layer • Government of India
              </p>
            </div>
          </Link>

          {/* Right Action Items & Surveillance Status */}
          <div className="flex items-center gap-3">
            
            {/* Live Data Stream Status Badge */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>e-SAKSHI Active Feed</span>
            </div>

            {/* Quick Run Analysis Trigger */}
            <button
              onClick={handleTriggerAnalysis}
              disabled={runningAnalysis}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition disabled:opacity-50 shadow-xs"
              title="Run unsupervised anomaly engine"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-white ${runningAnalysis ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">
                {runningAnalysis ? 'Analyzing...' : 'Run Analysis'}
              </span>
            </button>

            {/* Officer Profile & Sign out */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-700">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white leading-tight">
                  {user?.fullName || 'District Planning Officer'}
                </div>
                <div className="text-[10px] text-slate-300 font-mono">
                  Varanasi, Uttar Pradesh
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
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

