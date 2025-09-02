// src/pages/DamListPage/DamListPage.tsx
import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllDamsQuery } from '../../services/damsApi';
import './DamListPage.scss';

const DamListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetAllDamsQuery();
  const [query, setQuery] = useState('');

  const dams = data ?? [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dams;
    return dams.filter((d) => {
      const name = (d.dam_name ?? '').toLowerCase();
      const id = (d.dam_id ?? '').toLowerCase();
      return name.includes(q) || id.includes(q);
    });
  }, [dams, query]);

  return (
    <div className="DamListPage">
      <Link to="/" className="home-btn" aria-label="Back to Home">
        ← Home
      </Link>

      <div className="list-wrapper" role="region" aria-label="Dam list">
        <h1 className="list-title">Select a Dam</h1>

        {/* Search/filter */}
        <div className="list-controls">
          <input
            className="list-search"
            type="text"
            placeholder="Filter by name or ID…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter dams by name or ID"
          />
          <span className="result-count" aria-live="polite">
            {isLoading ? 'Loading…' : `${filtered.length} result${filtered.length === 1 ? '' : 's'}`}
          </span>
        </div>

        {/* States */}
        {isLoading && <div className="state">Loading dams…</div>}

        {isError && (
          <div className="state">
            <p>Couldn’t load dams.</p>
            <button type="button" className="btn btn-retry" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        )}

        {/* List */}
        {!isLoading && !isError && (
          <ul className="dam-list">
            {filtered.map((d) => (
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
