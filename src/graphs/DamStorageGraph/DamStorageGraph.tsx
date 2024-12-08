// # src/graphs/DamStorageGraph/DamStorageGraph.tsx

import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllLatestDataThunk } from '../../features/damResources/damResourcesSlice';
import './DamStorageGraph.scss';

Chart.register(...registerables);

const DamStorageGraph: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { latestData, status, error } = useSelector((state: RootState) => state.damResources);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllLatestDataThunk());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return <div>Loading storage data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (latestData.length === 0) {
        return <div>No storage data available.</div>;
    }

    const labels = latestData.map((d) => d.dam_id);
    const storageVolumes = latestData.map((d) => d.storage_volume);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Storage Volume (ML)',
                data: storageVolumes,
                backgroundColor: '#5274EA',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Dam ID',
                    font: {
                        size: 18,
                    },
                },
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Storage Volume (ML)',
                    font: {
                        size: 18,
                    },
                },
                ticks: {
                    beginAtZero: true,
                    font: {
                        size: 14,
                    },
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Dam Storage Capacity',
                font: {
                    size: 24,
                },
            },
            legend: {
                display: true,
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="dam-storage-graph-container">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default DamStorageGraph;
