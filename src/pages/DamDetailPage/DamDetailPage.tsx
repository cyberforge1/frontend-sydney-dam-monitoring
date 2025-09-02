// src/pages/DamDetailPage/DamDetailPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './DamDetailPage.scss';

const DamDetailPage: React.FC = () => {
  return (
    <div className="DamDetailPage">
      <Link to="/" className="home-btn" aria-label="Back to Home">
        ← Home
      </Link>

      <h1>Dam Detail Page</h1>
    </div>
  );
};

export default DamDetailPage;
