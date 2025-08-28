// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
// import SelectedDamPage from './pages/SelectedDamPage/SelectedDamPage'; // ⬅️ re-enabled
import DamListPage from './pages/DamListPage/DamListPage';             // ⬅️ re-enabled
// import PageTwo from './pages/PageTwo/PageTwo';
// import PageThree from './pages/PageThree/PageThree';
// import PageFour from './pages/PageFour/PageFour';
// import PageFive from './pages/PageFive/PageFive';
// import Footer from './components/Footer/Footer';
// import ApiConnectionPage from './pages/ApiConnectionPage/ApiConnectionPage'; // Import the new page
// import TestingPage from './pages/TestingPage/TestingPage'; // Import the new page
// import { Provider } from 'react-redux'; // Added Provider for Redux
// import store from './store/store'; // Import Redux store

// import TestingApiCalls from './components/TestingApiCalls/TestingApiCalls'; // <-- tester
import './App.scss';

const App: React.FC = () => {
  return (
    // <Provider store={store}> {/* Wrap the app with Redux Provider */}
    <Router>
      <div className="App">

        <Routes>
          {/* Dedicated endpoint for the tester */}
          {/* <Route path="/api-test" element={<TestingApiCalls />} /> */}

          {/* Home route now renders the actual HomePage */}
          <Route
            path="/"
            element={
              <div className="stacked-pages">
                <HomePage />
                {/* <TestingPage /> */}
                {/* <ApiConnectionPage /> */}
                {/* <PageTwo /> */}
                {/* <PageThree /> */}
                {/* <PageFour />
                <PageFive /> */}
                {/* <Footer /> */}
              </div>
            }
          />

          {/* Dam List page */}
          <Route path="/damlist" element={<DamListPage />} />

          {/* Selected Dam routes (deep-link + backward compatible) */}
          {/* <Route path="/dam/:damId" element={<SelectedDamPage />} />  */}
          {/* <Route path="/dam" element={<SelectedDamPage />} /> */}

          {/* 404 → optionally redirect to Home while you’re building */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </div>
    </Router>
    // </Provider>
  );
};

export default App;
