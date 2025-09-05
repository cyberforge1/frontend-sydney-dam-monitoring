// src/pages/DamDetailPage/DamDetailPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './DamDetailPage.scss';

const DamDetailPage: React.FC = () => {
  return (
    <div className="DamDetailPage">
      {/* Top-left Home button */}
      <Link to="/" className="home-btn" aria-label="Back to Home">
        Home
      </Link>

      {/* Centered page title */}
      <h1 className="damdetail-title">Dam Detail</h1>
    </div>
  );
};

export default DamDetailPage;
