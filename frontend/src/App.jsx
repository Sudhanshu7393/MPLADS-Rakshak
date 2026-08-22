import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RiskQueue from './pages/RiskQueue';
import RiskPassport from './pages/RiskPassport';
import SimilarWorksPage from './pages/SimilarWorksPage';
import MapViewPage from './pages/MapViewPage';
import InvestigationsPage from './pages/InvestigationsPage';
import DataImportPage from './pages/DataImportPage';
import AuditLogsPage from './pages/AuditLogsPage';
import SettingsPage from './pages/SettingsPage';
import ReportsPage from './pages/ReportsPage';
import { getAuthToken, api } from './services/api';

function MainLayout() {
  const [activeDataMode, setActiveDataMode] = useState('DEMO/SYNTHETIC DATA');
  const [refreshKey, setRefreshKey] = useState(0);

  const loadDataMode = async () => {
    try {
      const summary = await api.getDashboardSummary();
      if (summary?.activeDataMode) {
        setActiveDataMode(summary.activeDataMode);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadDataMode();
  }, [refreshKey]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Navbar 
        activeDataMode={activeDataMode} 
        onAnalysisRun={() => setRefreshKey(k => k + 1)}
      />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-100 min-h-[calc(100vh-4rem)]">
          <Routes>
            <Route path="/" element={<Dashboard key={refreshKey} />} />
            <Route path="/queue" element={<RiskQueue key={refreshKey} />} />
            <Route path="/passport/:workId" element={<RiskPassport key={refreshKey} />} />
            <Route path="/similar" element={<SimilarWorksPage key={refreshKey} />} />
            <Route path="/map" element={<MapViewPage key={refreshKey} />} />
            <Route path="/investigations" element={<InvestigationsPage key={refreshKey} />} />
            <Route path="/data" element={<DataImportPage key={refreshKey} />} />
            <Route path="/audit" element={<AuditLogsPage key={refreshKey} />} />
            <Route path="/settings" element={<SettingsPage key={refreshKey} />} />
            <Route path="/reports" element={<ReportsPage key={refreshKey} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}
