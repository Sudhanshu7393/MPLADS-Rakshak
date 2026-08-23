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
  ChevronLeft,
  ChevronRight,
  Menu,
  PanelLeftClose,
  PanelLeftOpen
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

export default function Sidebar({ isCollapsed, onToggle }) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = isCollapsed !== undefined ? isCollapsed : internalCollapsed;
  const toggle = onToggle || (() => setInternalCollapsed(prev => !prev));

  return (
    <>
      <aside 
        className={`${
          collapsed ? 'w-0 -ml-64 lg:w-16 lg:ml-0' : 'w-64'
        } bg-white text-slate-700 border-r border-slate-200 flex flex-col justify-between shrink-0 font-sans transition-all duration-300 ease-in-out no-print sidebar relative overflow-hidden z-20`}
      >
        
        {/* Header with Title & Collapse Button */}
        <div className="p-3.5 space-y-1 overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-between px-2 py-1.5 mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {!collapsed && <span>Operational Modules</span>}
            <button
              onClick={toggle}
              className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition ml-auto"
              title={collapsed ? "Expand Sidebar" : "Hide Sidebar"}
            >
              {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
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
                      ? 'bg-[#0B2545] text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
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
          <div className="p-3.5 border-t border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <div className="leading-tight">
                <span className="font-bold block">Engine Active</span>
                <span className="text-[10px] text-emerald-700">ML Services Online</span>
              </div>
            </div>
          </div>
        )}

      </aside>

      {/* Floating Toggle Pill when completely collapsed on small screens */}
      {collapsed && (
        <button
          onClick={toggle}
          className="fixed top-18 left-3 z-30 p-2 rounded-lg bg-slate-900 text-white shadow-lg hover:bg-slate-800 transition lg:hidden"
          title="Open Operational Modules"
        >
          <PanelLeftOpen className="w-4 h-4" />
        </button>
      )}
    </>
  );
}
