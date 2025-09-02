// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import HomePage from './pages/HomePage/HomePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import DamListPage from './pages/DamListPage/DamListPage';
import DamDetailPage from './pages/DamDetailPage/DamDetailPage';
import AboutPage from './pages/AboutPage/AboutPage';
import './App.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            {/* Root: Home -> Dashboard -> About (stacked) */}
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

            {/* Standalone routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dams" element={<DamListPage />} />
            <Route path="/dams/:damId" element={<DamDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
