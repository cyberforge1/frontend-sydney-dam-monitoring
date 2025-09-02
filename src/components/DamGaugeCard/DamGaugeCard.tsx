// src/components/DamGaugeCard/DamGaugeCard.tsx
import React, { useMemo } from 'react';
import './DamGaugeCard.scss';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

type Props = {
  name: string;
  damId: string;
  percentFull?: number | null;      // 0–100
  lastWeekPercent?: number | null;  // optional (for ▲▼ delta)
  onClick?: (damId: string) => void;
};

const DamGaugeCard: React.FC<Props> = ({
  name,
  damId,
  percentFull,
  lastWeekPercent,
  onClick,
}) => {
  const pct =
    typeof percentFull === 'number'
      ? Math.max(0, Math.min(100, percentFull))
      : undefined;

  const delta = useMemo(() => {
    if (pct == null || lastWeekPercent == null) return undefined;
    return +(pct - lastWeekPercent).toFixed(1);
  }, [pct, lastWeekPercent]);

  const data = [{ value: pct ?? 0 }];

  return (
    <article
      className="DamGaugeCard"
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(damId)}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(damId)}
      aria-label={`${name} – ${pct != null ? pct.toFixed(1) + '%' : 'no data'}`}
    >
      <header className="dg__head">
        <h3 className="dg__title">{name}</h3>
        <div className="dg__meta">
          <span className="dg__pct">{pct != null ? `${pct.toFixed(1)}%` : '—'}</span>
          {delta != null && (
            <span className={`dg__delta ${delta >= 0 ? 'is-up' : 'is-down'}`}>
              {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}%
            </span>
          )}
        </div>
      </header>

      <div className="dg__gauge">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={data}
            startAngle={90}
            endAngle={-270}
            innerRadius="72%"
            outerRadius="88%"
          >
            <RadialBar dataKey="value" background cornerRadius={8} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="dg__center">{pct != null ? `${pct.toFixed(0)}%` : '—'}</div>
      </div>
    </article>
  );
};

export default DamGaugeCard;
