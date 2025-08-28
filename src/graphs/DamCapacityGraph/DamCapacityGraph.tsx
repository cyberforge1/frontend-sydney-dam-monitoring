// src/graphs/DamCapacityGraph/DamCapacityGraph.tsx

import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { DamAnalysis } from '../../types/types';

interface Props {
  damName: string;
  series: DamAnalysis[];
}

/**
 * Capacity graph:
 * - X axis: analysis_date (string)
 * - Lines: avg_percentage_full_12_months and avg_storage_volume_12_months
 *   (If 5y/20y are present across multiple dates, you can extend easily.)
 *
 * This component defensively handles:
 * - Empty / invalid series
 * - Records that may be missing one of the fields
 */
const DamCapacityGraph: React.FC<Props> = ({ damName, series }) => {
  // --- Guard: empty or invalid input should not break the graph ---
  const safe = Array.isArray(series) ? series : [];
  const hasData = safe.length > 0;

  const data = useMemo(() => {
    if (!hasData) return [];
    // Map to a shape Recharts understands; coerce undefined to null.
    return safe.map((d) => ({
      analysis_date: d.analysis_date,
      avg_percentage_full_12_months:
        typeof d.avg_percentage_full_12_months === 'number'
          ? Number(d.avg_percentage_full_12_months)
          : null,
      avg_storage_volume_12_months:
        typeof d.avg_storage_volume_12_months === 'number'
          ? Number(d.avg_storage_volume_12_months)
          : null,
    }));
  }, [safe, hasData]);

  if (!hasData) {
    return <div>No data to display.</div>;
  }

  return (
    <div aria-label={`Capacity graph for ${damName}`}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="analysis_date" />
          <YAxis
            yAxisId="left"
            tickFormatter={(v) => `${v}%`}
            // percentage axis
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            // storage volume axis
          />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="avg_percentage_full_12_months"
            name="% full (12m avg)"
            dot
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avg_storage_volume_12_months"
            name="Storage vol (12m avg)"
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DamCapacityGraph;
