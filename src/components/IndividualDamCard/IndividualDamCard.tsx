// src/components/IndividualDamCard/IndividualDamCard.tsx

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './IndividualDamCard.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DamData {
  dam_id: string;
  dam_name: string;
  percentage_full: number;
}

interface IndividualDamCardProps {
  damData: DamData;
}

const IndividualDamCard: React.FC<IndividualDamCardProps> = ({ damData }) => {
  const navigate = useNavigate();

  const pieData = {
    labels: ['Full', 'Empty'],
    datasets: [
      {
        data: [damData.percentage_full, 100 - damData.percentage_full],
        backgroundColor: ['#5274EA', '#E63C74'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleDamNameClick = () => {
    navigate('/dam', { state: { damId: damData.dam_id } });
  };

  return (
    <div className="individual-dam-card">
      <h2 onClick={handleDamNameClick} style={{ cursor: 'pointer', color: '#007bff' }}>
        {damData.dam_name}
      </h2>
      <p>Percentage Full: {damData.percentage_full}%</p>
      <div className="pie-chart-container">
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default IndividualDamCard;
