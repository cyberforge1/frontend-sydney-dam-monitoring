// src/pages/DashboardPage/DashboardPage.tsx
import React from 'react';
import './DashboardPage.scss';
import DamGroupGrid from '../../components/DamGroupGrid/DamGroupGrid';

const DashboardPage: React.FC = () => {
  return (
    <div className="DashboardPage">
      <section
        className="dashboard-box"
        role="region"
        aria-label="Dashboard content container"
      >
        <h2 className="dashboard-box__title">Status Board</h2>

        {/* Group-of-8 dam gauges with a group selector */}
        <DamGroupGrid />
      </section>
    </div>
  );
};

export default DashboardPage;
