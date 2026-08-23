import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RefreshCw, LogOut, ShieldCheck, Sun, Moon, Sparkles, ChevronRight, Menu, X } from 'lucide-react';
import { getCurrentUser, clearAuthSession, api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ activeDataMode = 'PUBLIC DATA', onAnalysisRun, onToggleMobileNav, mobileNavOpen }) {
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

  return (
    <header className="w-full z-40 bg-[#0B2545] border-b border-[#133B5C] text-white sticky top-0 shadow-md transition-colors duration-200 no-print">
      
      {/* Official National Tricolor Accent Line */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]" />
        <div className="h-full w-1/3 bg-[#FFFFFF]" />
        <div className="h-full w-1/3 bg-[#138808]" />
      </div>

      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-15">
          
          {/* Left: Mobile Hamburger & Logo Branding */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Hamburger Drawer Trigger */}
            <button
              onClick={onToggleMobileNav}
              className="p-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition md:hidden"
              title="Open Navigation Menu"
            >
              {mobileNavOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>

            <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-600 border border-blue-400/40 flex items-center justify-center shadow-xs text-white shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2 leading-tight">
                  <span className="font-black text-xs sm:text-sm tracking-wider text-white truncate max-w-[130px] sm:max-w-none">
                    MPLADS RAKSHAK
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-blue-900/80 text-blue-200 border border-blue-400/30 px-1.5 sm:px-2 py-0.5 rounded">
                    MoSPI
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 font-medium hidden md:block">
                  National Risk &amp; Anomaly Intelligence Layer • Government of India
                </p>
              </div>
            </Link>

          </div>

          {/* Right Action Items & Surveillance Status */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Live Data Stream Status Badge (Desktop Only) */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>e-SAKSHI Active Feed</span>
            </div>

            {/* Quick Run Analysis Trigger */}
            <button
              onClick={handleTriggerAnalysis}
              disabled={runningAnalysis}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] sm:text-xs font-bold transition disabled:opacity-50 shadow-xs"
              title="Run unsupervised anomaly engine"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-white ${runningAnalysis ? 'animate-spin' : ''}`} />
              <span className="hidden xs:inline sm:inline">
                {runningAnalysis ? 'Analyzing...' : 'Run Analysis'}
              </span>
            </button>

            {/* Light / Dark Mode Toggle Switcher */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10 transition flex items-center justify-center shadow-xs"
              title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300 transition-transform rotate-0 hover:rotate-90" />
              ) : (
                <Moon className="w-4 h-4 text-sky-200 transition-transform rotate-0 hover:-rotate-12" />
              )}
            </button>

            {/* Officer Profile & Sign out */}
            <div className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-3 border-l border-slate-700">
              <div className="text-right hidden lg:block">
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
