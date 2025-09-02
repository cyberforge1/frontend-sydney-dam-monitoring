// src/components/DamPieCard/DamPieCard.tsx
import React from 'react';
import './DamPieCard.scss';

type Props = {
  name: string;
  damId: string;
  percentFull?: number | null;
  onClick?: (damId: string) => void;
};

const clamp = (n: number) => Math.max(0, Math.min(100, n));

const DamPieCard: React.FC<Props> = ({ name, damId, percentFull, onClick }) => {
  const p = typeof percentFull === 'number' ? clamp(percentFull) : undefined;
  const empty = typeof p === 'number' ? (100 - p) : undefined;

  const bg = typeof p === 'number'
    ? { backgroundImage: `conic-gradient(#5b7cfa ${p}%, #ef4b83 0)` } // blue full, pink empty
    : { background: 'linear-gradient(135deg, #f3f4f6 25%, #e5e7eb 100%)' };   // loading/unknown

  return (
    <article className="DamPieCard" role="button" tabIndex={0}
      onClick={() => onClick?.(damId)}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(damId); }}
      aria-label={`${name} (${damId}) – ${typeof p === 'number' ? `percentage full ${p.toFixed(2)}%` : 'no data'}`}
    >
      <header className="card__header">
        <h3 className="card__title">{name}</h3>
        <p className="card__subtitle">
          Percentage Full: {typeof p === 'number' ? p.toFixed(2) : '—'}%
        </p>

        <div className="legend">
          <span className="chip chip--full" aria-hidden />
          <span className="legend__label">Full</span>
          <span className="chip chip--empty" aria-hidden />
          <span className="legend__label">Empty</span>
        </div>
      </header>

      <div className="pie" style={bg} aria-hidden="true">
        {/* optional ring outline */}
        <div className="pie__ring" />
      </div>

      {typeof p === 'number' && (
        <p className="sr-only">
          {p.toFixed(2)} percent full, {empty!.toFixed(2)} percent empty.
        </p>
      )}
    </article>
  );
};

export default DamPieCard;
