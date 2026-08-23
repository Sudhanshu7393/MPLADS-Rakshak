/**
 * MPLADS Rakshak API Client
 */

const API_BASE = '/api';

export function getAuthToken() {
  return localStorage.getItem('rakshak_token') || '';
}

export function getCurrentUser() {
  const user = localStorage.getItem('rakshak_user');
  if (user) {
    try { return JSON.parse(user); } catch (e) { return null; }
  }
  // Default Demo Profile
  return {
    fullName: "District Planning Officer (Varanasi)",
    email: "district.officer@mplads.gov.in",
    role: "ROLE_DISTRICT_OFFICER",
    district: "Varanasi",
    department: "District Planning Cell"
  };
}

export function saveAuthSession(token, user) {
  localStorage.setItem('rakshak_token', token);
  localStorage.setItem('rakshak_user', JSON.stringify(user));
}

export function clearAuthSession() {
  localStorage.removeItem('rakshak_token');
  localStorage.removeItem('rakshak_user');
}

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API Error ${response.status}: ${response.statusText}`);
  }

  // Handle empty responses
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  return null;
}

export const api = {
  // Auth
  login: (email, password) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }),

  // Dashboard
  getDashboardSummary: () => request('/dashboard/summary'),

  // Works & Risk Queue
  getRiskQueue: (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    );
    const query = new URLSearchParams(cleanParams).toString();
    return request(`/risks/queue${query ? '?' + query : ''}`);
  },
  getRiskPassport: (workId) => request(`/risks/passport/${workId}`),
  runAnalysis: () => request('/risks/run-analysis', { method: 'POST' }),
  runFullAnalysis: () => request('/risks/run-analysis', { method: 'POST' }),
  submitEvidenceAction: (workId, data) => request(`/risks/evidence-action/${workId}`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Filter options
  getDistricts: () => request('/works/filters/districts'),
  getCategories: () => request('/works/filters/categories'),
  getMapWorks: () => request('/works/map'),

  // Similar Works
  getSimilarWorks: (workId) => request(`/similar/${workId}`),
  getAllSimilarWorks: () => request('/similar'),

  // Investigations
  getInvestigations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/investigations${query ? '?' + query : ''}`);
  },
  createInvestigation: (data) => request('/investigations', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateInvestigation: (caseNumber, data) => request(`/investigations/${caseNumber}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
  addInvestigationNote: (caseNumber, data) => request(`/investigations/${caseNumber}/notes`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getInvestigationNotes: (caseNumber) => request(`/investigations/${caseNumber}/notes`),

  // Data Ingestion
  uploadCSV: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const token = getAuthToken();
    const response = await fetch(`${API_BASE}/data/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: formData
    });
    if (!response.ok) throw new Error('Upload failed');
    return await response.json();
  },
  ingestData: (data) => request('/data/ingest', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  loadDemoData: () => request('/data/load-demo', { method: 'POST' }),
  getDataStatus: () => request('/data/status'),
  getImportHistory: () => request('/data/history'),

  // Audit Logs
  getAuditLogs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/audit${query ? '?' + query : ''}`);
  },
  getRecentAuditLogs: () => request('/audit/recent'),

  // Settings & Risk Weights
  getRiskWeights: () => request('/settings/weights'),
  updateRiskWeights: (data) => request('/settings/weights', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Reports
  getDossier: (workId) => request(`/reports/dossier/${workId}`),

  // Works (browse all)
  getWorks: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/works${query ? '?' + query : ''}`);
  },

  // Completion Evidence
  captureEvidence: async (workId, formData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE}/works/${workId}/evidence/capture`, {
      method: 'POST',
      headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
      body: formData
    });
    if (!response.ok) throw new Error(await response.text() || 'Upload failed');
    return await response.json();
  },
  getEvidenceForWork: (workId) => request(`/works/${workId}/evidence`),
  getEvidenceById: (evidenceId) => request(`/evidence/${evidenceId}`),
  verifyEvidence: (evidenceId, data) => request(`/evidence/${evidenceId}/verify`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),

  // Data Quality
  getDataQuality: () => request('/data/quality'),
};
