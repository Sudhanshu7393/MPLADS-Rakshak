import React from 'react';

export default function GovHeader() {
  return (
    <div className="bg-slate-900 text-slate-200 text-[11px] font-sans border-b border-slate-800">
      {/* National Tri-color Strip */}
      <div className="h-0.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]" />
        <div className="h-full w-1/3 bg-[#FFFFFF]" />
        <div className="h-full w-1/3 bg-[#138808]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-100">
            भारत सरकार | Government of India
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">
            सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय (MoSPI)
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono">
          <span className="hidden md:inline">MPLADS eSAKSHI Intelligence Layer</span>
          <span className="text-slate-700 hidden md:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[9px] font-bold uppercase tracking-wider border border-slate-700">
              SECURE GOV PORTAL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
