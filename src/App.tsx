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
import ThemeSwitch, { ThemeName } from './components/ThemeSwitch/ThemeSwitch';
import './App.scss';

const THEME_KEY = 'app-theme';

// Choose a sensible default: respect system dark mode if available.
function getInitialTheme(): ThemeName {
  const saved = typeof window !== 'undefined' ? (localStorage.getItem(THEME_KEY) as ThemeName | null) : null;
  if (saved) return saved;
  const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'theme-navy' : 'theme-arctic';
}

const App: React.FC = () => {
  const [theme, setTheme] = React.useState<ThemeName>(getInitialTheme);

  React.useEffect(() => {
    try { localStorage.setItem(THEME_KEY, theme); } catch {}
  }, [theme]);

  return (
    <Provider store={store}>
      <div className={`App ${theme}`}>
        <Router>
          {/* Tiny theme switcher (remove if you don’t want it visible) */}
          <ThemeSwitch value={theme} onChange={setTheme} />

          <Routes>
            {/* Root stacks Home + Dashboard + About as in your project */}
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
