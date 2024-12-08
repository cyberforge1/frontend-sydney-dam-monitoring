// # src/components/IndividualDamCard/IndividualDamCard.tsx

import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchLatestDataByIdThunk } from '../../features/damResources/damResourcesSlice';
import { fetchDamByIdThunk } from '../../features/dams/damsSlice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './IndividualDamCard.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IndividualDamCardProps {
    damId: string;
}

const IndividualDamCard: React.FC<IndividualDamCardProps> = ({ damId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { latestData, status: resourceStatus, error: resourceError } = useSelector((state: RootState) => state.damResources);
    const { selectedDam, status: damStatus, error: damError } = useSelector((state: RootState) => state.dams);

    useEffect(() => {
        if (!latestData.find((data) => data.dam_id === damId)) {
            dispatch(fetchLatestDataByIdThunk(damId));
        }

        if (!selectedDam || selectedDam.dam_id !== damId) {
            dispatch(fetchDamByIdThunk(damId));
        }
    }, [dispatch, damId, latestData, selectedDam]);

    const damData = latestData.find((data) => data.dam_id === damId);
    const damName = selectedDam?.dam_name;

    if (resourceStatus === 'loading' || damStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (resourceError || damError) {
        return <div>Error: {resourceError || damError}</div>;
    }

    if (!damData || !damName) {
        return <div>Data not found for Dam ID: {damId}</div>;
    }

    const pieData = {
        labels: ['Full', 'Empty'],
        datasets: [
            {
                data: [Number(damData.percentage_full), 100 - Number(damData.percentage_full)],
                backgroundColor: ['#5274EA', '#E63C74'],
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const handleDamNameClick = () => {
        navigate('/dam', { state: { damData, damName } });
    };

    return (
        <div className="individual-dam-card">
            <h2 onClick={handleDamNameClick} style={{ cursor: 'pointer', color: '#007bff' }}>
                {damName}
            </h2>
            <p>Percentage Full: {damData.percentage_full}%</p>
            <div className="pie-chart-container">
                <Pie data={pieData} options={pieOptions} />
            </div>
        </div>
    );
};

export default IndividualDamCard;
