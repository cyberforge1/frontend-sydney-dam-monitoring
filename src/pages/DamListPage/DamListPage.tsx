// src/pages/DamListPage/DamListPage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllDamsQuery } from '../../services/damsApi';
import './DamListPage.scss';

const DamListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetAllDamsQuery();

  const dams = data ?? [];

  return (
    <div className="DamListPage">
      <Link to="/" className="home-btn" aria-label="Back to Home">
        ← Home
      </Link>

      <div className="list-wrapper" role="region" aria-label="Dam list">
        <h1 className="list-title">Select a Dam</h1>
        <p className="list-meta" aria-live="polite">
          {isLoading ? 'Loading…' : `${dams.length} dam${dams.length === 1 ? '' : 's'}`}
        </p>

        {isLoading && <div className="state">Loading dams…</div>}

        {isError && (
          <div className="state">
            <p>Couldn’t load dams.</p>
            <button type="button" className="btn btn-retry" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <ul className="dam-list">
            {dams.map((d) => (
              <li key={d.dam_id}>
                <button
                  type="button"
                  className="dam-row"
                  onClick={() => navigate(`/dams/${encodeURIComponent(d.dam_id)}`)}
                  aria-label={`View details for ${d.dam_name ?? 'Dam'} (${d.dam_id})`}
                >
                  <span className="dam-name">{d.dam_name ?? 'Unnamed Dam'}</span>
                  <span className="dam-id">{d.dam_id}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DamListPage;
