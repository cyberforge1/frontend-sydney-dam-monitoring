// src/pages/DashboardPage/DashboardPage.tsx

import React, { useState } from 'react';
import './DashboardPage.scss';

import StorageGraph from '../../graphs/StorageGraph/StorageGraph';
import InflowGraph from '../../graphs/InflowGraph/InflowGraph';
import ReleaseGraph from '../../graphs/ReleaseGraph/ReleaseGraph';

const graphs = [
  { id: 'storage', Component: StorageGraph },
  { id: 'inflow', Component: InflowGraph },
  { id: 'release', Component: ReleaseGraph },
];

const DashboardPage: React.FC = () => {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + graphs.length) % graphs.length);
  const next = () => setIndex((i) => (i + 1) % graphs.length);

  const ActiveGraph = graphs[index].Component;

  return (
    <div className="DashboardPage" aria-label="Dashboard">
      <button
        className="nav-arrow nav-arrow--left"
        onClick={prev}
        aria-label="Previous graph"
      >
        ◀
      </button>

      <section className="graph-stage" role="region" aria-label="Graph stage">
        <div className="graph-canvas">
          <ActiveGraph />
        </div>
      </section>

      <button
        className="nav-arrow nav-arrow--right"
        onClick={next}
        aria-label="Next graph"
      >
        ▶
      </button>
    </div>
  );
};

export default DashboardPage;
