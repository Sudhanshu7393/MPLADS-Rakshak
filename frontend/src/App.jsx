import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import GovHeader from './components/GovHeader';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import LandingHomePage from './pages/LandingHomePage';
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
import WorksPage from './pages/WorksPage';
import CameraCapturePage from './pages/CameraCapturePage';
import DemoTourModal from './components/DemoTourModal';
import { ToastProvider } from './context/ToastContext';
import { api } from './services/api';
import { Compass } from 'lucide-react';

function MainLayout() {
  const [activeDataMode, setActiveDataMode] = useState('PUBLIC DATA');
  const [refreshKey, setRefreshKey] = useState(0);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
    <div className="h-screen bg-slate-100 flex flex-col font-sans overflow-hidden">
      <GovHeader />
      <Navbar 
        activeDataMode={activeDataMode} 
        onAnalysisRun={() => setRefreshKey(k => k + 1)}
      />
      <div className="flex-1 flex overflow-hidden">
        {!isHomePage && <Sidebar />}
        <main className={`flex-1 overflow-y-auto bg-slate-100 ${isHomePage ? 'p-0' : 'p-4 md:p-6'} relative`}>
          <Routes>
            <Route path="/" element={<LandingHomePage key={refreshKey} />} />
            <Route path="/dashboard" element={<Dashboard key={refreshKey} />} />
            <Route path="/queue" element={<RiskQueue key={refreshKey} />} />
            <Route path="/passport/:workId" element={<RiskPassport key={refreshKey} />} />
            <Route path="/works/:workId/capture-evidence" element={<CameraCapturePage />} />
            <Route path="/similar" element={<SimilarWorksPage key={refreshKey} />} />
            <Route path="/works" element={<WorksPage key={refreshKey} />} />
            <Route path="/map" element={<MapViewPage key={refreshKey} />} />
            <Route path="/investigations" element={<InvestigationsPage key={refreshKey} />} />
            <Route path="/data" element={<DataImportPage key={refreshKey} />} />
            <Route path="/audit" element={<AuditLogsPage key={refreshKey} />} />
            <Route path="/settings" element={<SettingsPage key={refreshKey} />} />
            <Route path="/reports" element={<ReportsPage key={refreshKey} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Floating Operational Guide Trigger */}
          <button
            onClick={() => setIsTourOpen(true)}
            className="fixed bottom-6 left-68 z-30 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs shadow-md transition border border-slate-700"
          >
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Workflow Walkthrough</span>
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
