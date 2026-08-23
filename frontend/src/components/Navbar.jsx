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
    <header className="w-full z-40 bg-white/90 dark:bg-obsidian-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white sticky top-0 shadow-xs transition-colors duration-200 no-print">
      
      {/* Subtle National Tricolor Accent Line */}
      <div className="h-0.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]" />
        <div className="h-full w-1/3 bg-[#FFFFFF] dark:bg-slate-400" />
        <div className="h-full w-1/3 bg-[#138808]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo & Ministry Branding */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center shadow-xs text-white group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="font-extrabold text-sm tracking-wide text-slate-900 dark:text-white">
                  MPLADS RAKSHAK
                </span>
                <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-400/30 px-1.5 py-0.2 rounded-md">
                  MoSPI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
                National Risk &amp; Anomaly Intelligence Layer
              </p>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs font-bold' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2">
            
            {/* Interactive Sun / Moon Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition transform active:scale-95 shadow-xs border border-slate-200 dark:border-slate-700"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Quick Run Analysis Trigger */}
            <button
              onClick={handleTriggerAnalysis}
              disabled={runningAnalysis}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white dark:text-slate-200 border border-transparent dark:border-slate-700 text-xs font-semibold transition disabled:opacity-50 shadow-xs"
              title="Run unsupervised anomaly engine"
            >
              <RefreshCw className={`w-3 h-3 text-white dark:text-blue-400 ${runningAnalysis ? 'animate-spin' : ''}`} />
              <span className="hidden lg:inline">
                {runningAnalysis ? 'Running...' : 'Run Engine'}
              </span>
            </button>

            {/* Officer Profile & Sign out */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {user?.fullName || 'District Officer'}
                </div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400 font-mono">
                  Varanasi, UP
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
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

