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
    <aside className="w-64 bg-white text-slate-700 border-r border-slate-200 flex flex-col justify-between shrink-0 font-sans transition-colors duration-200 no-print sidebar">
      
      {/* Navigation Links */}
      <div className="p-3.5 space-y-1 overflow-y-auto">
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
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0B2545] text-white font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Footer System Status Badge */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-medium">
          <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
          <div className="leading-tight">
            <span className="font-bold block">Engine Active</span>
            <span className="text-[10px] text-emerald-700">ML Analytical Services Online</span>
          </div>
        </div>
      </div>

    </aside>
  );
}
