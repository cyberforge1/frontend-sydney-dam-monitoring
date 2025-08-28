// src/graphs/NetInflowReleaseGraph/NetInflowReleaseGraph.tsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './NetInflowReleaseGraph.scss';
import { DamAnalysis } from '../../types/types';

Chart.register(...registerables);

interface NetInflowReleaseGraphProps {
  damName: string;
  series: DamAnalysis[]; // analysis rows for THIS dam
}

const NetInflowReleaseGraph: React.FC<NetInflowReleaseGraphProps> = ({ damName, series }) => {
  if (!series || series.length === 0) {
    return <div>No inflow/release analysis available for {damName}.</div>;
  }

  const sorted = [...series].sort(
    (a, b) => new Date(a.analysis_date).getTime() - new Date(b.analysis_date).getTime()
  );

  const labels = sorted.map((d) => d.analysis_date);
  const inflows = sorted.map((d) => d.avg_storage_inflow_12_months ?? 0);
  const releases = sorted.map((d) => d.avg_storage_release_12_months ?? 0);
  const net = inflows.map((inflow, i) => inflow - (releases[i] ?? 0));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Net Inflow - Release (12 mo avg)',
        data: net,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Date', font: { size: 18 } },
        ticks: { maxRotation: 45, minRotation: 45, font: { size: 14 } },
      },
      y: {
        title: { display: true, text: 'Net Flow (ML)', font: { size: 18 } },
        ticks: { beginAtZero: true, font: { size: 14 } },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `${damName} Net Inflow vs Release (12 mo avg)`,
        font: { size: 20 },
      },
      legend: { display: true, position: 'top' as const },
    },
  };

  return (
    <div className="net-inflow-release-graph-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default NetInflowReleaseGraph;
