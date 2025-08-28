// # src/graphs/DamCapacityGraph/DamCapacityGraph.tsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './DamCapacityGraph.scss';
import { DamAnalysis } from '../../types/types';

Chart.register(...registerables);

interface DamCapacityGraphProps {
  damName: string;
  series: DamAnalysis[]; // analysis rows for THIS dam, sorted or unsorted
}

const DamCapacityGraph: React.FC<DamCapacityGraphProps> = ({ damName, series }) => {
  if (!series || series.length === 0) {
    return <div> No analysis available for {damName}.</div>;
  }

  // Sort by date (ascending) so the line moves left→right over time
  const sorted = [...series].sort(
    (a, b) => new Date(a.analysis_date).getTime() - new Date(b.analysis_date).getTime()
  );

  const labels = sorted.map((d) => d.analysis_date);
  const percentages = sorted.map((d) => d.avg_percentage_full_12_months ?? 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Dam Capacity % (12 mo avg)',
        data: percentages,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="dam-capacity-graph" style={{ textAlign: 'center' }}>
      <h2>{damName} Capacity Percentage (12 mo avg)</h2>
      <Line data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default DamCapacityGraph;
