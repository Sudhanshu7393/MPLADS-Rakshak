import React from 'react';
import { getRiskBadgeClass } from '../utils/formatters';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

export default function RiskScoreBadge({ score, level, showScore = true, size = 'md' }) {
  const effectiveScore = (score !== undefined && score !== null && !isNaN(score)) 
    ? Number(score) 
    : (level === 'HIGH' ? 85 : level === 'MEDIUM' ? 55 : 20);

  const effectiveLevel = level || (effectiveScore >= 70 ? 'HIGH' : effectiveScore >= 40 ? 'MEDIUM' : 'LOW');
  const badgeClass = getRiskBadgeClass(effectiveLevel);
  const isHigh = effectiveLevel === 'HIGH' || effectiveScore >= 70;
  const isMed = effectiveLevel === 'MEDIUM' || (effectiveScore >= 40 && effectiveScore < 70);

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
      <span>{effectiveLevel === 'HIGH' ? 'High Risk' : effectiveLevel === 'MEDIUM' ? 'Medium Risk' : 'Low Risk'}</span>
      {showScore && (
        <span className="font-mono opacity-90 border-l border-current pl-1.5 ml-0.5">
          {effectiveScore}/100
        </span>
      )}
    </span>
  );
}
