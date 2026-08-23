import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { ThemeProvider } from './context/ThemeContext';
import { api } from './services/api';
import { Compass } from 'lucide-react';

function MainLayout() {
  const [activeDataMode, setActiveDataMode] = useState('PUBLIC DATA');
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
    <div className="h-screen bg-[#F1F5F9] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 flex flex-col font-sans overflow-hidden transition-colors duration-200">
      <Navbar 
        activeDataMode={activeDataMode} 
        onAnalysisRun={() => setRefreshKey(k => k + 1)}
      />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#F1F5F9] dark:bg-[#0B0F19] p-4 md:p-6 lg:p-8 relative transition-colors duration-200">
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

          {/* Floating Operational Guide Trigger (Bottom-Right) */}
          <button
            onClick={() => setIsTourOpen(true)}
            className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-slate-100 font-semibold text-xs shadow-xl transition-all hover:scale-105 border border-slate-700 backdrop-blur-md no-print"
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
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<MainLayout />} />
          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}
