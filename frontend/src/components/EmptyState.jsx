import React from 'react';
import { Database, PlusCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  icon: Icon = Database,
  title = "No records found",
  message = "Upload an authorized or public MPLADS dataset to begin risk intelligence analysis.",
  actionText = "Go to Data Import",
  actionLink = "/data",
  onActionClick
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-slate-300 text-center max-w-lg mx-auto my-8 shadow-xs">
      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-4 border border-slate-200">
        <Icon className="w-7 h-7 text-gov-blue" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mb-6 leading-relaxed">{message}</p>
      
      {onActionClick ? (
        <button
          onClick={onActionClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gov-navy hover:bg-gov-dark text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {actionText}
        </button>
      ) : actionLink ? (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gov-navy hover:bg-gov-dark text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          {actionText}
        </Link>
      ) : null}
    </div>
  );
}
