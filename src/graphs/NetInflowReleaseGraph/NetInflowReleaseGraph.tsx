// # src/graphs/NetInflowReleaseGraph/NetInflowReleaseGraph.tsx

import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchSpecificDamAnalysisByIdThunk } from '../../features/damResources/damResourcesSlice';
import './NetInflowReleaseGraph.scss';

Chart.register(...registerables);

interface NetInflowReleaseGraphProps {
    damId: string;
}

const NetInflowReleaseGraph: React.FC<NetInflowReleaseGraphProps> = ({ damId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { specificDamAnalyses, status, error } = useSelector((state: RootState) => state.damResources);
    const { selectedDam } = useSelector((state: RootState) => state.dams);

    useEffect(() => {
        dispatch(fetchSpecificDamAnalysisByIdThunk(damId));
    }, [dispatch, damId]);

    if (status === 'loading') {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const damName = selectedDam?.dam_name || 'Dam';
    const labels = specificDamAnalyses.map((d) => d.analysis_date);
    const inflows = specificDamAnalyses.map((d) => d.avg_storage_inflow_12_months || 0);
    const releases = specificDamAnalyses.map((d) => d.avg_storage_release_12_months || 0);
    const netFlows = inflows.map((inflow, index) => inflow - releases[index]);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Net Inflow/Release',
                data: netFlows,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    font: { size: 18 },
                },
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    font: { size: 14 },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Net Flow (ML)',
                    font: { size: 18 },
                },
                ticks: {
                    beginAtZero: true,
                    font: { size: 14 },
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: `${damName} Net Inflow and Release Over 12 Months`,
                font: { size: 24 },
            },
            legend: {
                display: true,
                position: 'top' as const,
                labels: {
                    font: { size: 14 },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="net-inflow-release-graph-container">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default NetInflowReleaseGraph;
