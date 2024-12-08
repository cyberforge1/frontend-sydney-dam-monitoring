// src/graphs/NetInflowReleaseGraph/NetInflowReleaseGraph.tsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface DamResource {
    date: string;
    storage_inflow: number;
    storage_release: number;
}

interface NetInflowReleaseGraphProps {
    data: DamResource[];
    damName: string;
}

const NetInflowReleaseGraph: React.FC<NetInflowReleaseGraphProps> = ({ data, damName }) => {
    const labels = data.map(d => d.date);
    const inflows = data.map(d => d.storage_inflow);
    const releases = data.map(d => d.storage_release);
    const netFlows = inflows.map((inflow, index) => inflow - releases[index]);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Net Inflow/Release',
                data: netFlows,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }
        ]
    };

    const options = {
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
                    text: 'Net Inflow/Release (ML)',
                    font: { size: 18 }
                },
                ticks: { font: { size: 14 } }
            }
        },
        plugins: {
            title: {
                display: true,
                text: `${damName} Net Inflow and Release Over 12 Months`,
                font: { size: 24 }
            },
            legend: {
                labels: { font: { size: 14 } }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default NetInflowReleaseGraph;
