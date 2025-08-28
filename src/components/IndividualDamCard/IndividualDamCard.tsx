// src/components/IndividualDamCard/IndividualDamCard.tsx

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './IndividualDamCard.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IndividualDamCardProps {
  damId: string;
}

const IndividualDamCard: React.FC<IndividualDamCardProps> = ({ damId }) => {
  const navigate = useNavigate();

  // Read-only data: NO dispatches here (keeps the card pure)
  const damName = useSelector((s: RootState) =>
    s.dams.dams.find(d => d.dam_id === damId)?.dam_name
  );
  const latest = useSelector((s: RootState) =>
    s.damResources.latestData.find(d => d.dam_id === damId)
  );

  const loading = !damName || !latest || typeof latest.percentage_full !== 'number';

  if (loading) {
    return <div>Loading…</div>;
  }

  const pieData = {
    labels: ['Full', 'Empty'],
    datasets: [
      {
        data: [Number(latest.percentage_full), 100 - Number(latest.percentage_full)],
        backgroundColor: ['#5274EA', '#E63C74'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleDamNameClick = () => {
    // Works if /dam/:damId route is enabled; harmless otherwise
    navigate(`/dam/${damId}`);
  };

  return (
    <div className="individual-dam-card">
      <h2 onClick={handleDamNameClick} style={{ cursor: 'pointer', color: '#007bff' }}>
        {damName}
      </h2>
      <p>Percentage Full: {latest.percentage_full}%</p>
      <div className="pie-chart-container">
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default IndividualDamCard;
