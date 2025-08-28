// src/components/IndividualDamCard/IndividualDamCard.tsx

import React, { useMemo } from 'react';
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
  const damsSlice = useSelector((s: RootState) => s.dams.dams);
  const latestSlice = useSelector((s: RootState) => s.damResources.latestData);

  const damArray = Array.isArray(damsSlice) ? damsSlice : [];
  const latestArray = Array.isArray(latestSlice) ? latestSlice : [];

  const damName = useMemo(
    () => damArray.find(d => d.dam_id === damId)?.dam_name,
    [damArray, damId]
  );

  const latest = useMemo(
    () => latestArray.find(d => d.dam_id === damId),
    [latestArray, damId]
  );

  const loading = !damName || !latest || typeof latest.percentage_full !== 'number';

  if (loading) {
    return <div>Loading…</div>;
  }

  const pct = Number(latest.percentage_full);
  const pieData = {
    labels: ['Full', 'Empty'],
    datasets: [
      {
        data: [pct, Math.max(0, 100 - pct)],
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
      <p>Percentage Full: {pct}%</p>
      <div className="pie-chart-container">
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default IndividualDamCard;
