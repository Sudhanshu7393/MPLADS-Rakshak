import React from 'react';
import { getRiskBadgeClass } from '../utils/formatters';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

export default function RiskScoreBadge({ score, level, showScore = true, size = 'md' }) {
  const badgeClass = getRiskBadgeClass(level);
  const isHigh = (level || '').toUpperCase() === 'HIGH' || score >= 70;
  const isMed = (level || '').toUpperCase() === 'MEDIUM' || (score >= 40 && score < 70);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3.5 py-1.5 text-sm font-bold'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${badgeClass} ${sizeClasses[size] || sizeClasses.md}`}>
      {isHigh ? (
        <AlertCircle className="w-3.5 h-3.5 text-red-600" />
      ) : isMed ? (
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
      ) : (
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
      )}
      <span>{level || (isHigh ? 'High Risk' : isMed ? 'Medium Risk' : 'Low Risk')}</span>
      {showScore && score !== undefined && (
        <span className="font-mono opacity-90 border-l border-current pl-1.5 ml-0.5">
          {score}/100
        </span>
      )}
    </span>
  );
}
