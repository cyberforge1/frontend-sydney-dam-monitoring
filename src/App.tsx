// src/App.tsx

import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { store } from './app/store';

import HomePage from './pages/HomePage/HomePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import AboutPage from './pages/AboutPage/AboutPage';
import DamDetailPage from './pages/DamDetailPage/DamDetailPage';
import TestVideoPage from './components/TestVideoPage/TestVideoPage';

import StorageGraph from './graphs/StorageGraph/StorageGraph';
import InflowGraph from './graphs/InflowGraph/InflowGraph';
import ReleaseGraph from './graphs/ReleaseGraph/ReleaseGraph';

import './App.scss';

// --- Stacked Layout ---
const StackedPages: React.FC = () => {
  const location = useLocation();

  const homeRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = location.pathname;

    let target: HTMLElement | null = null;
    if (path.startsWith('/dashboard')) target = dashboardRef.current;
    else if (path.startsWith('/about')) target = aboutRef.current;
    else target = homeRef.current; // default for "/" or "/home"

    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.pathname]);

  return (
    <>
      <div ref={homeRef} id="home-section">
        <HomePage />
      </div>
      <div ref={dashboardRef} id="dashboard-section">
        <DashboardPage />
      </div>
      <div ref={aboutRef} id="about-section">
        <AboutPage />
      </div>
    </>
  );
};

// --- Main App ---
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            {/* Stacked routes */}
            <Route path="/" element={<StackedPages />} />
            <Route path="/home" element={<StackedPages />} />
            <Route path="/dashboard" element={<StackedPages />} />
            <Route path="/about" element={<StackedPages />} />

            {/* Standalone graph routes */}
            <Route path="/graphs/storage" element={<StorageGraph />} />
            <Route path="/graphs/inflow" element={<InflowGraph />} />
            <Route path="/graphs/release" element={<ReleaseGraph />} />

            {/* Other standalone routes */}
            <Route path="/dams/:damId" element={<DamDetailPage />} />
            <Route path="/test-video" element={<TestVideoPage />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
