/**
 * Currency, Date and Risk formatting utilities for MPLADS Rakshak
 */

export function formatINR(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  const num = Number(amount);
  
  if (Math.abs(num) >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  }
  if (Math.abs(num) >= 100000) {
    return `₹${(num / 100000).toFixed(2)} L`;
  }
  if (Math.abs(num) >= 1000) {
    return `₹${(num / 1000).toFixed(1)} K`;
  }
  return `₹${num.toLocaleString('en-IN')}`;
}

export function formatDate(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch (e) {
    return dateString;
  }
}

export function getRiskBadgeClass(level) {
  switch ((level || '').toUpperCase()) {
    case 'HIGH':
    case 'CRITICAL':
      return 'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-300';
    case 'MEDIUM':
    case 'MODERATE':
      return 'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-300';
    case 'LOW':
    case 'NORMAL':
    default:
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-300';
  }
}

export function getRiskColorHex(level) {
  switch ((level || '').toUpperCase()) {
    case 'HIGH':
      return '#DC2626';
    case 'MEDIUM':
      return '#D97706';
    case 'LOW':
    default:
      return '#16A34A';
  }
}
