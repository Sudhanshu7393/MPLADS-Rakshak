import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import DemoTourModal from './components/DemoTourModal';
import { ToastProvider } from './context/ToastContext';
import { api } from './services/api';
import { Sparkles } from 'lucide-react';

function MainLayout() {
  const [activeDataMode, setActiveDataMode] = useState('DEMO / SYNTHETIC DATA');
  const [refreshKey, setRefreshKey] = useState(0);
  const [isTourOpen, setIsTourOpen] = useState(false);

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
        <main className="flex-1 overflow-y-auto bg-slate-100 min-h-[calc(100vh-4rem)] relative">
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

          {/* Floating SIH 2026 Interactive Tour Trigger */}
          <button
            onClick={() => setIsTourOpen(true)}
            className="fixed bottom-6 left-64 z-30 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xl transition border border-blue-400/30"
          >
            <Sparkles className="w-4 h-4 text-sky-300" />
            <span>Interactive SIH Tour 🚀</span>
          </button>

          <DemoTourModal
            isOpen={isTourOpen}
            onClose={() => setIsTourOpen(false)}
          />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}
