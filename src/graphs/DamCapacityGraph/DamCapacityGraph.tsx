// src/graphs/DamCapacityGraph/DamCapacityGraph.tsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './DamCapacityGraph.scss';

Chart.register(...registerables);

interface DamResource {
  date: string;
  percentage_full: number;
}

interface DamCapacityGraphProps {
  data: DamResource[];
  damName: string;
}

const DamCapacityGraph: React.FC<DamCapacityGraphProps> = ({ data, damName }) => {
  const labels = data.map(d => d.date);
  const percentages = data.map(d => d.percentage_full);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Dam Capacity Percentage',
        data: percentages,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: { size: 18 }
        },
        ticks: { font: { size: 14 } }
      },
      y: {
        title: {
          display: true,
          text: 'Percentage Full',
          font: { size: 18 }
        },
        ticks: { font: { size: 14 } }
      }
    },
    plugins: {
      title: {
        display: true,
        text: `${damName} Capacity Percentage Over 12 Months`,
        font: { size: 24 }
      },
      legend: {
        labels: { font: { size: 14 } }
      }
    },
    responsive: true,
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DamCapacityGraph;
