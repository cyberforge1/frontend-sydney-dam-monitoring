// src/pages/DamDetailPage/DamDetailPage.tsx

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './DamDetailPage.scss';
import { useGetDamByIdQuery } from '../../services/damsApi';

// Import the new graphs
import Graph1 from '../../graphs/Graph1/Graph1';
import Graph2 from '../../graphs/Graph2/Graph2';
import Graph3 from '../../graphs/Graph3/Graph3';
import Graph4 from '../../graphs/Graph4/Graph4';

type DetailGraph = React.ComponentType<{ fullScreen?: boolean }>;

const DamDetailPage: React.FC = () => {
  const { damId = '' } = useParams<{ damId: string }>();
  const { data: dam, isLoading } = useGetDamByIdQuery(damId, { skip: !damId });

  const title = isLoading ? 'Loading…' : (dam?.dam_name ?? 'Dam Detail');

  // Dynamically supplied list of components (2x2 grid will render first 4)
  const detailGraphs: DetailGraph[] = [Graph1, Graph2, Graph3, Graph4];

  return (
    <div className="DamDetailPage" aria-label="Dam Detail Page">
      <section className="detail-stage" role="region" aria-label="Dam detail layout">
        <header className="hero" aria-live="polite">
          <Link to="/" className="home-btn" aria-label="Back to Home">
            Home
          </Link>
          <div className="hero__title">{title}</div>
        </header>

        {detailGraphs.map((Comp, idx) => (
          <div key={idx} className="panel">
            <Comp />
          </div>
        ))}
      </section>
    </div>
  );
};

export default DamDetailPage;
