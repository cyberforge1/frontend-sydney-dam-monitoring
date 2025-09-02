// src/App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import HomePage from './pages/HomePage/HomePage';
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
            {/* Root: show HomePage, then AboutPage directly underneath */}
            <Route
              path="/"
              element={
                <>
                  <HomePage />
                  <AboutPage />
                </>
              }
            />

            {/* Other routes remain the same */}
            <Route path="/dams" element={<DamListPage />} />
            <Route path="/dams/:damId" element={<DamDetailPage />} />
            {/* Keep a standalone About page if you want direct navigation */}
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
