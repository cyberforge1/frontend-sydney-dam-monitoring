// # src/graphs/DamCapacityGraph/DamCapacityGraph.tsx

import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchSpecificDamAnalysisByIdThunk } from '../../features/damResources/damResourcesSlice';

Chart.register(...registerables);

interface DamCapacityGraphProps {
    damId: string;
}

const DamCapacityGraph: React.FC<DamCapacityGraphProps> = ({ damId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { specificDamAnalyses, status, error } = useSelector((state: RootState) => state.damResources);
    const { selectedDam } = useSelector((state: RootState) => state.dams);

    useEffect(() => {
        dispatch(fetchSpecificDamAnalysisByIdThunk(damId));
    }, [dispatch, damId]);

    if (status === 'loading') {
        return <div>Loading graph data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const damData = specificDamAnalyses;
    const damName = selectedDam?.dam_name || 'Dam';

    const labels = damData.map((d) => d.analysis_date);
    const percentages = damData.map((d) => d.avg_percentage_full_12_months || 0);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Dam Capacity Percentage',
                data: percentages,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>{damName} Capacity Percentage Over 12 Months</h2>
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
    );
};

export default DamCapacityGraph;
