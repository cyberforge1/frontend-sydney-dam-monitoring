// src/pages/HomePage/HomePage.tsx
import React from 'react';
import {
  useGetAllDamsQuery,
  useGetAllLatestDataQuery,
  useGetAllDamGroupsQuery,
} from '../../services/damsApi';
import './HomePage.scss';

const HomePage: React.FC = () => {
  const { data: dams, isLoading: loadingDams, error: damsError } = useGetAllDamsQuery();
  const { data: latest, isLoading: loadingLatest, error: latestError } = useGetAllLatestDataQuery();
  const { data: groups, isLoading: loadingGroups, error: groupsError } = useGetAllDamGroupsQuery();

  if (loadingDams || loadingLatest || loadingGroups) {
    return <div className="loading">Loading…</div>;
  }

  const anyError = (damsError ?? latestError ?? groupsError) as any;
  if (anyError) {
    return <div className="error">Failed to load: {anyError?.error ?? 'Unknown error'}</div>;
  }

  return (
    <div className="HomePage">
      <header>
        <h1>NSW Water Dashboard</h1>
        <p className="subtitle">Live dam data, groups, and analyses</p>
      </header>

      <section className="card">
        <h2>Dams ({dams?.length ?? 0})</h2>
        <ul>
          {dams?.map((d) => (
            <li key={d.dam_id}>
              <span className="name">{d.dam_name}</span>
              <span className="muted"> ({d.dam_id})</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Latest data ({latest?.length ?? 0})</h2>
        <ul>
          {latest?.map((r) => (
            <li key={r.dam_id}>
              <span className="name">{r.dam_id}</span>
              <span className="muted">
                {' '}
                — {r.percentage_full ?? '—'}% on {r.date}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Groups ({groups?.length ?? 0})</h2>
        <ul>
          {groups?.map((g) => (
            <li key={g.group_name}>{g.group_name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
