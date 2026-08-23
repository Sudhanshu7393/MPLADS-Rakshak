import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Compass,
  LayoutDashboard, 
  AlertOctagon, 
  Map, 
  Copy, 
  FolderSearch, 
  Database, 
  History, 
  Sliders, 
  FileText,
  ShieldCheck,
  Layers,
  PanelLeftClose,
  PanelLeftOpen,
  X
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Overview & Workflow Hub', icon: Compass, exact: true },
  { to: '/dashboard', label: 'Executive Analytics', icon: LayoutDashboard },
  { to: '/queue', label: 'Prioritised Scrutiny Queue', icon: AlertOctagon },
  { to: '/works', label: 'All Works (Browse)', icon: Layers },
  { to: '/map', label: 'Geospatial Distribution', icon: Map },
  { to: '/similar', label: 'Duplicate Proposals', icon: Copy },
  { to: '/investigations', label: 'Case Management', icon: FolderSearch },
  { to: '/data', label: 'Data Ingestion & Audit', icon: Database },
  { to: '/reports', label: 'Statutory Reports', icon: FileText },
  { to: '/audit', label: 'Officer Audit Trail', icon: History },
  { to: '/settings', label: 'Model Calibration', icon: Sliders },
];

export default function Sidebar({ isCollapsed, onToggle, mobileOpen = false, onCloseMobile }) {
  const [internalCollapsed, setInternalCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved !== null ? saved === 'true' : true; // Default: Compact Icon Mode
  });

  const collapsed = isCollapsed !== undefined ? isCollapsed : internalCollapsed;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalCollapsed(prev => {
        const next = !prev;
        localStorage.setItem('sidebar_collapsed', String(next));
        return next;
      });
    }
  };

  return (
    <>
      {/* 1. DESKTOP & TABLET SIDEBAR (VISIBLE ON MD AND ABOVE) */}
      <aside 
        className={`hidden md:flex ${
          collapsed ? 'w-16' : 'w-64'
        } bg-white dark:bg-[#0F172A] text-slate-700 dark:text-slate-200 border-r border-slate-200 dark:border-slate-800 flex-col justify-between shrink-0 font-sans transition-all duration-300 ease-in-out no-print sidebar relative overflow-hidden z-20`}
      >
        
        {/* Header with Title & Collapse Button */}
        <div className="p-3 space-y-1 overflow-y-auto overflow-x-hidden">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-1 py-1.5 mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500`}>
            {!collapsed && <span>Operational Modules</span>}
            <button
              onClick={handleToggle}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? <PanelLeftOpen className="w-4 h-4 text-slate-600 dark:text-slate-300" /> : <PanelLeftClose className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
            </button>
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0B2545] dark:bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  } ${collapsed ? 'justify-center px-2' : ''}`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Footer System Status Badge */}
        {!collapsed && (
          <div className="p-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-[11px] font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse shrink-0" />
              <div className="leading-tight">
                <span className="font-bold block">Engine Active</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400">ML Services Online</span>
              </div>
            </div>
          </div>
        )}

      </aside>

      {/* 2. MOBILE SLIDE-OVER DRAWER WITH BACKDROP (PHONES & SMALL TABLETS) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          
          {/* Dimmed Blurred Backdrop */}
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Sliding Drawer Container */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 shadow-2xl flex flex-col justify-between z-50 transform transition-transform duration-300 ease-out border-r border-slate-200 dark:border-slate-800">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-black text-sm text-slate-900 dark:text-white tracking-wide block">
                    MPLADS RAKSHAK
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    MoSPI Government Portal
                  </span>
                </div>
              </div>

              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links List */}
            <div className="p-3 space-y-1.5 overflow-y-auto flex-1">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Operational Modules
              </div>

              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.exact}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#0B2545] dark:bg-blue-600 text-white font-bold shadow-sm'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Drawer Footer Status */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-medium">
                <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-bold">e-SAKSHI Active Feed</span>
              </div>
            </div>

          </div>

        </div>
      )}
    </>
  );
}
