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
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dams" element={<DamListPage />} />
          <Route path="/dams/:damId" element={<DamDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
