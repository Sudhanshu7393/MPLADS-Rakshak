import React from 'react';
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
  Layers
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

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col justify-between shrink-0 font-sans">
      
      {/* Navigation Links */}
      <div className="p-3.5 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Operational Modules
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0 opacity-90" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Official Guidelines Info Card */}
      <div className="p-3.5 border-t border-slate-800">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="font-bold text-slate-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Statutory Governance</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            All analytical outputs serve as administrative decision-support. Final determinations rest with authorized officers.
          </p>
        </div>
      </div>

    </aside>
  );
}
