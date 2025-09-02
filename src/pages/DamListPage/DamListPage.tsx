// src/pages/DamListPage/DamListPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './DamListPage.scss';

const DamListPage: React.FC = () => {
  return (
    <div className="DamListPage">
      <Link to="/" className="home-btn" aria-label="Back to Home">
        ← Home
      </Link>

      <h1>Dam List Page</h1>
    </div>
  );
};

export default DamListPage;
