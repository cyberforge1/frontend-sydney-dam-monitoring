// # src/graphs/DamCapacityPercentageGraph/DamCapacityPercentageGraph.tsx

import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllLatestDataThunk } from '../../features/damResources/damResourcesSlice';
import { fetchAllDamsThunk } from '../../features/dams/damsSlice';
import './DamCapacityPercentageGraph.scss';

Chart.register(...registerables);

const getColor = (index: number) => {
    const colors = [
        '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
    ];
    return colors[index % colors.length];
};

const DamCapacityPercentageGraph: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { latestData, status: resourcesStatus, error: resourcesError } = useSelector((state: RootState) => state.damResources);
    const { dams, status: damsStatus, error: damsError } = useSelector((state: RootState) => state.dams);

    useEffect(() => {
        if (resourcesStatus === 'idle') {
            dispatch(fetchAllLatestDataThunk());
        }
        if (damsStatus === 'idle') {
            dispatch(fetchAllDamsThunk());
        }
    }, [dispatch, resourcesStatus, damsStatus]);

    if (resourcesStatus === 'loading' || damsStatus === 'loading') {
        return <div>Loading dam capacity percentage data...</div>;
    }

    if (resourcesError || damsError) {
        return <div>Error: {resourcesError || damsError}</div>;
    }

    const labels = Array.from(new Set(latestData.map((d) => d.date))).sort();
    const damsMap = dams.reduce((acc, dam) => {
        acc[dam.dam_id] = dam.dam_name;
        return acc;
    }, {} as Record<string, string>);

    const datasets = latestData.reduce((acc, entry) => {
        const damName = damsMap[entry.dam_id] || `Dam ${entry.dam_id}`;
        const dataset = acc.find((ds) => ds.label === damName);

        if (!dataset) {
            acc.push({
                label: damName,
                data: [],
                fill: false,
                borderColor: getColor(acc.length),
                backgroundColor: getColor(acc.length),
                tension: 0.1,
            });
        }

        acc.find((ds) => ds.label === damName)?.data.push(entry.percentage_full);

        return acc;
    }, [] as { label: string; data: (number | null)[]; fill: boolean; borderColor: string; backgroundColor: string; tension: number }[]);

    const chartData = {
        labels,
        datasets,
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
                    text: 'Percentage Full',
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
                text: 'Dam Capacity Percentage Over Last 12 Months',
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
        <div className="dam-capacity-percentage-graph-container">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default DamCapacityPercentageGraph;
