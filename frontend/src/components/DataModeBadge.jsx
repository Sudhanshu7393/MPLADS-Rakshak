import React from 'react';
import { Database, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function DataModeBadge({ mode = 'DEMO/SYNTHETIC DATA' }) {
  const isDemo = mode.toUpperCase().includes('DEMO') || mode.toUpperCase().includes('SYNTHETIC');
  const isPublic = mode.toUpperCase().includes('PUBLIC');
  const isAuthorized = mode.toUpperCase().includes('AUTHORIZED');

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border shadow-sm ${
      isDemo
        ? 'bg-amber-500/10 text-amber-700 border-amber-300 ring-1 ring-amber-400/20'
        : isPublic
        ? 'bg-blue-500/10 text-blue-700 border-blue-300 ring-1 ring-blue-400/20'
        : 'bg-emerald-500/10 text-emerald-700 border-emerald-300 ring-1 ring-emerald-400/20'
    }`}>
      {isDemo ? (
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
      ) : isPublic ? (
        <Database className="w-3.5 h-3.5 text-blue-600" />
      ) : (
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
      )}
      <span>{mode.toUpperCase()}</span>
    </div>
  );
}
