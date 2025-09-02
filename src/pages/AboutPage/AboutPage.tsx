// src/pages/AboutPage/AboutPage.tsx

import React from 'react';
import './AboutPage.scss';

const AboutPage: React.FC = () => {
  return (
    <div className="AboutPage">
      <div className="about-card">
        <h1>About this Project</h1>
        <p className="lead">
          This dashboard visualises NSW dam information fetched from a Flask REST API (proxied via Vite).
        </p>

        <h2>What’s inside</h2>
        <ul>
          <li>Frontend: React + Vite + RTK Query</li>
          <li>Backend: Flask + Flask-RESTX + SQLAlchemy</li>
          <li>Proxy: Vite dev server <code>/api → http://127.0.0.1:5001</code></li>
          <li>Endpoints: dams, latest_data, dam_resources, analyses, groups</li>
        </ul>

        <h2>Status</h2>
        <p>
          The list endpoints return <strong>plain arrays</strong> (no pagination). Detail endpoints return single objects.
        </p>

        <h2>Next steps</h2>
        <ol>
          <li>Add navigation to key views (Dam List, Dam Detail).</li>
          <li>Table views with sorting/filtering.</li>
          <li>Charts for storage % and flows over time.</li>
        </ol>

        <p className="muted">
          Tip: Use <code>node smoke_api.js</code> to quickly verify backend health.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
