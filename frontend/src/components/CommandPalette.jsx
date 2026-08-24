import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Command, 
  ArrowRight, 
  Sparkles, 
  AlertOctagon, 
  LayoutDashboard, 
  Map, 
  Copy, 
  Camera, 
  History, 
  Sliders, 
  FileText, 
  RefreshCw, 
  Sun, 
  Moon, 
  TrendingUp, 
  Check, 
  X,
  Layers,
  Database
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';

export default function CommandPalette({ isOpen, onClose, onAnalysisRun }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();
  const { addToast } = useToast();

  const actions = [
    // Navigation
    { id: 'nav-home', title: 'Overview & Workflow Hub', category: 'Navigation', icon: Sparkles, action: () => navigate('/') },
    { id: 'nav-dash', title: 'Executive Analytics Dashboard', category: 'Navigation', icon: LayoutDashboard, action: () => navigate('/dashboard') },
    { id: 'nav-queue', title: 'Prioritised Scrutiny Queue', category: 'Navigation', icon: AlertOctagon, action: () => navigate('/queue') },
    { id: 'nav-map', title: 'Geospatial Distribution Map', category: 'Navigation', icon: Map, action: () => navigate('/map') },
    { id: 'nav-similar', title: 'Duplicate Scope Matcher', category: 'Navigation', icon: Copy, action: () => navigate('/similar') },
    { id: 'nav-camera', title: 'Field Geo-Camera Evidence', category: 'Navigation', icon: Camera, action: () => navigate('/works/MPL-2024-UP-004821/capture-evidence') },
    { id: 'nav-works', title: 'Browse All 3,000+ Sanctioned Works', category: 'Navigation', icon: Layers, action: () => navigate('/works') },
    { id: 'nav-reports', title: 'Statutory PDF Audit Dossiers', category: 'Navigation', icon: FileText, action: () => navigate('/reports') },
    { id: 'nav-settings', title: 'Model Calibration & Weights', category: 'Navigation', icon: Sliders, action: () => navigate('/settings') },
    { id: 'nav-audit', title: 'Officer Audit Trail & Logs', category: 'Navigation', icon: History, action: () => navigate('/audit') },
    { id: 'nav-data', title: 'Data Ingestion & Integrity Center', category: 'Navigation', icon: Database, action: () => navigate('/data') },

    // Quick Filters
    { id: 'filter-high', title: 'Filter: High Risk Proposals (Score ≥ 70)', category: 'Quick Filters', icon: AlertOctagon, action: () => navigate('/queue?search=High%20Risk') },
    { id: 'filter-cost', title: 'Filter: Cost Outliers (>+50% Peer Median)', category: 'Quick Filters', icon: TrendingUp, action: () => navigate('/queue?search=Cost%20Outlier') },
    { id: 'filter-delay', title: 'Filter: Milestone Delays (>180 Days)', category: 'Quick Filters', icon: History, action: () => navigate('/queue?search=Execution%20Delay') },
    { id: 'filter-varanasi', title: 'Filter: Varanasi District Works (UP)', category: 'Quick Filters', icon: Map, action: () => navigate('/queue?search=Varanasi') },
    { id: 'filter-roads', title: 'Filter: Rural Roads & CC Roadways', category: 'Quick Filters', icon: Layers, action: () => navigate('/queue?search=Roads') },

    // System Actions
    {
      id: 'sys-run',
      title: 'Run AI Anomaly Cycle (Recalculate All 3,000 Works)',
      category: 'System Actions',
      icon: RefreshCw,
      action: async () => {
        try {
          addToast('Triggering AI anomaly cycle...', 'info');
          await api.runFullAnalysis();
          addToast('AI Analytical cycle completed successfully!', 'success');
          if (onAnalysisRun) onAnalysisRun();
        } catch (e) {
          addToast('Error: ' + e.message, 'error');
        }
      }
    },
    {
      id: 'sys-theme',
      title: isDark ? 'Switch to Clean Light Theme' : 'Switch to Dark Slate Theme',
      category: 'System Actions',
      icon: isDark ? Sun : Moon,
      action: () => toggleTheme()
    }
  ];

  const filtered = query.trim() === '' 
    ? actions 
    : actions.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) || 
        a.category.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Blurred Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      {/* Spotlight Command Modal Container */}
      <div 
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[75vh] z-50 transform animate-scaleUp"
      >
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, district, or page (e.g. Analytics, Varanasi, High Risk)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            ESC to close
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 sm:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60 flex-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-xs">
              No matching commands or pages found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                        {item.title}
                      </div>
                      <div className={`text-[10px] font-mono ${isSelected ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                        {item.category}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 transition-transform ${
                    isSelected ? 'translate-x-1 text-white opacity-100' : 'opacity-0'
                  }`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Guide */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-3">
            <span><strong>↑↓</strong> to navigate</span>
            <span><strong>↵</strong> to select</span>
            <span><strong>ESC</strong> to exit</span>
          </div>
          <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold">
            MPLADS Rakshak Quick Actions
          </span>
        </div>
      </div>
    </div>
  );
}
