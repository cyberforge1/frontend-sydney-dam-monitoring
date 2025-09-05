// src/App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import HomePage from './pages/HomePage/HomePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import DamDetailPage from './pages/DamDetailPage/DamDetailPage';
import AboutPage from './pages/AboutPage/AboutPage';
import TestVideoPage from './components/TestVideoPage/TestVideoPage';
import './App.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HomePage />
                  <DashboardPage />
                  <AboutPage />
                </>
              }
            />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* Removed: <Route path="/dams" element={<DamListPage />} /> */}
            <Route path="/dams/:damId" element={<DamDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/test-video" element={<TestVideoPage />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
