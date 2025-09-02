// src/pages/DamDetailPage/DamDetailPage.tsx
import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  useGetDamByIdQuery,
  useGetLatestDataByIdQuery,
  useGetSpecificDamAnalysisByIdQuery,
} from '../../services/damsApi';
import './DamDetailPage.scss';

const fmtNum = (n?: number | null, digits = 0) =>
  typeof n === 'number' ? n.toLocaleString(undefined, { maximumFractionDigits: digits }) : '—';

const fmtPct = (n?: number | null, digits = 1) =>
  typeof n === 'number' ? `${n.toFixed(digits)}%` : '—';

const fmtDate = (iso?: string) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '—' : d.toLocaleString();
};

const DamDetailPage: React.FC = () => {
  const { damId: rawDamId } = useParams<{ damId: string }>();
  const damId = decodeURIComponent(rawDamId ?? '');

  const {
    data: dam,
    isLoading: damLoading,
    isError: damError,
    refetch: refetchDam,
  } = useGetDamByIdQuery(damId, { skip: !damId });

  const {
    data: latest,
    isLoading: latestLoading,
    isError: latestError,
    refetch: refetchLatest,
  } = useGetLatestDataByIdQuery(damId, { skip: !damId });

  const {
    data: analyses,
    isLoading: analysisLoading,
    isError: analysisError,
    refetch: refetchAnalysis,
  } = useGetSpecificDamAnalysisByIdQuery({ damId }, { skip: !damId });

  const latestAnalysis = useMemo(() => {
    if (!analyses || analyses.length === 0) return undefined;
    return analyses
      .slice()
      .sort((a, b) => b.analysis_date.localeCompare(a.analysis_date))[0];
  }, [analyses]);

  const anyLoading = damLoading || latestLoading || analysisLoading;
  const anyError = damError || latestError || analysisError;

  return (
    <div className="DamDetailPage">
      <Link to="/" className="home-btn" aria-label="Back to Home">
        ← Home
      </Link>

      <main className="detail-content" role="main" aria-live="polite">
        {/* Header */}
        <header className="detail-header">
          <h1 className="detail-title">
            {dam?.dam_name ?? 'Dam'} <span className="detail-id">({damId})</span>
          </h1>
          {anyLoading && <p className="muted">Loading dam data…</p>}
          {anyError && (
            <div className="error">
              <p>Couldn’t load one or more data sections.</p>
              <div className="row-gap">
                <button className="btn" onClick={() => { refetchDam(); refetchLatest(); refetchAnalysis(); }}>
                  Retry
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Meta / static attributes */}
        <section className="card">
          <h2 className="section-title">Overview</h2>
          <div className="meta-grid">
            <div className="kv">
              <span className="k">Name</span>
              <span className="v">{dam?.dam_name ?? '—'}</span>
            </div>
            <div className="kv">
              <span className="k">ID</span>
              <span className="v">{dam?.dam_id ?? damId}</span>
            </div>
            <div className="kv">
              <span className="k">Full volume</span>
              <span className="v">{fmtNum(dam?.full_volume)} </span>
            </div>
            <div className="kv">
              <span className="k">Latitude</span>
              <span className="v">{dam?.latitude ?? '—'}</span>
            </div>
            <div className="kv">
              <span className="k">Longitude</span>
              <span className="v">{dam?.longitude ?? '—'}</span>
            </div>
          </div>
        </section>

        {/* Latest readings */}
        <section className="card">
          <h2 className="section-title">Latest Reading</h2>
          <div className="meta-grid">
            <div className="kv">
              <span className="k">As of</span>
              <span className="v">{fmtDate(latest?.date)}</span>
            </div>
            <div className="kv">
              <span className="k">% full</span>
              <span className="v">{fmtPct(latest?.percentage_full)}</span>
            </div>
            <div className="kv">
              <span className="k">Storage volume</span>
              <span className="v">{fmtNum(latest?.storage_volume)}</span>
            </div>
            <div className="kv">
              <span className="k">Inflow</span>
              <span className="v">{fmtNum(latest?.storage_inflow)}</span>
            </div>
            <div className="kv">
              <span className="k">Release</span>
              <span className="v">{fmtNum(latest?.storage_release)}</span>
            </div>
          </div>
        </section>

        {/* Roll-up analysis (most recent) */}
        <section className="card">
          <h2 className="section-title">Averages (most recent analysis)</h2>
          <p className="muted">Analysis date: {fmtDate(latestAnalysis?.analysis_date)}</p>

          <div className="table like-grid">
            <div className="t-head">
              <span>Metric</span>
              <span>12 months</span>
              <span>5 years</span>
              <span>20 years</span>
            </div>

            <div className="t-row">
              <span>% full</span>
              <span>{fmtPct(latestAnalysis?.avg_percentage_full_12_months)}</span>
              <span>{fmtPct(latestAnalysis?.avg_percentage_full_5_years)}</span>
              <span>{fmtPct(latestAnalysis?.avg_percentage_full_20_years)}</span>
            </div>

            <div className="t-row">
              <span>Storage volume</span>
              <span>{fmtNum(latestAnalysis?.avg_storage_volume_12_months)}</span>
              <span>{fmtNum(latestAnalysis?.avg_storage_volume_5_years)}</span>
              <span>{fmtNum(latestAnalysis?.avg_storage_volume_20_years)}</span>
            </div>

            <div className="t-row">
              <span>Inflow</span>
              <span>{fmtNum(latestAnalysis?.avg_storage_inflow_12_months)}</span>
              <span>{fmtNum(latestAnalysis?.avg_storage_inflow_5_years)}</span>
              <span>{fmtNum(latestAnalysis?.avg_storage_inflow_20_years)}</span>
            </div>

            <div className="t-row">
              <span>Release</span>
              <span>{fmtNum(latestAnalysis?.avg_storage_release_12_months)}</span>
              <span>{fmtNum(latestAnalysis?.avg_storage_release_5_years)}</span>
              <span>{fmtNum(latestAnalysis?.avg_storage_release_20_years)}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DamDetailPage;
