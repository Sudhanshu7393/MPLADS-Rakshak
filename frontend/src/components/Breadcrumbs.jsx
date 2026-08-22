import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const ROUTE_LABELS = {
  queue: 'Risk Queue',
  passport: 'Risk Passport',
  similar: 'Similar Works',
  map: 'Geospatial Map',
  investigations: 'Investigations Hub',
  data: 'Data Ingestion',
  audit: 'Audit Logs',
  settings: 'Calibration Settings',
  reports: 'Reports & Export'
};

export default function Breadcrumbs({ extraCrumb }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 font-medium">
      <Link to="/" className="hover:text-blue-600 flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>Command Center</span>
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = ROUTE_LABELS[value] || value;

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            {isLast && !extraCrumb ? (
              <span className="font-bold text-slate-800">{label}</span>
            ) : (
              <Link to={to} className="hover:text-blue-600 transition">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}

      {extraCrumb && (
        <>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="font-bold text-slate-800">{extraCrumb}</span>
        </>
      )}
    </nav>
  );
}
