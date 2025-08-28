// src/graphs/TopDamsPieCharts/TopDamsPieCharts.tsx

import React from 'react';
import IndividualDamCard from '../../components/IndividualDamCard/IndividualDamCard';
import { DamGroupMember } from '../../types/types';
import './TopDamsPieCharts.scss';

interface TopDamsPieChartsProps {
  damData: DamGroupMember[];
}

const TopDamsPieCharts: React.FC<TopDamsPieChartsProps> = ({ damData }) => {
  if (!damData || damData.length === 0) {
    return <div className="top-dams-pie-charts">No data available for the selected group.</div>;
  }

  return (
    <div className="top-dams-pie-charts">
      {damData.map((dam) => (
        <IndividualDamCard key={dam.dam_id} damId={dam.dam_id} />
      ))}
    </div>
  );
};

export default TopDamsPieCharts;
