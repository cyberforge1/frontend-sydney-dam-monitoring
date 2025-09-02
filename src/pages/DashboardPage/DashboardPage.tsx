// src/pages/DashboardPage/DashboardPage.tsx
import React from 'react';
import './DashboardPage.scss';

const DashboardPage: React.FC = () => {
  return (
    <div className="DashboardPage">
      <section
        className="dashboard-box"
        role="region"
        aria-label="Dashboard content container"
      >
        {/* Add future components here */}
        <h2 className="dashboard-box__title">Dashboard</h2>
        <p className="dashboard-box__hint">
          Flexible container ready for charts, filters, and cards.
        </p>
      </section>
    </div>
  );
};

export default DashboardPage;
