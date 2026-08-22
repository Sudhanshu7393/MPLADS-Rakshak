import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  AlertOctagon, 
  MapPin, 
  FolderSearch, 
  Copy, 
  Database, 
  FileText, 
  History, 
  Sliders, 
  ExternalLink 
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Command Center', icon: LayoutDashboard },
  { path: '/queue', label: 'Risk Queue', icon: AlertOctagon, badge: 'Priority' },
  { path: '/map', label: 'Geospatial Map', icon: MapPin },
  { path: '/investigations', label: 'Investigations', icon: FolderSearch },
  { path: '/similar', label: 'Similar Works', icon: Copy },
  { path: '/data', label: 'Data & Import', icon: Database },
  { path: '/reports', label: 'Reports & Export', icon: FileText },
  { path: '/audit', label: 'Audit Logs', icon: History },
  { path: '/settings', label: 'Risk Calibration', icon: Sliders },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 shrink-0 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 shadow-xs">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Intelligence Modules
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-gov-navy text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        isActive ? 'bg-red-500/30 text-red-200' : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Official Guidelines Info Card */}
      <div className="pt-4 border-t border-slate-100">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[11px] text-slate-600 space-y-1.5">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <span>🛡️</span>
            <span>SIH 2026 Safeguard</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Flags represent statistical anomalies requiring officer scrutiny. Risk is not fraud; human judgment remains statutory.
          </p>
        </div>
      </div>
    </aside>
  );
}
