// src/containers/TopDamsPieCharts/TopDamsPieCharts.tsx

import React from 'react';
import IndividualDamCard from '../../components/IndividualDamCard/IndividualDamCard';
import './TopDamsPieCharts.scss';

interface DamData {
  dam_id: string;
  dam_name: string;
  percentage_full: number;
}

interface TopDamsPieChartsProps {
  damData: DamData[];
}

const TopDamsPieCharts: React.FC<TopDamsPieChartsProps> = ({ damData }) => {
  return (
    <div className="top-dams-pie-charts">
      {damData.map((dam) => (
        <IndividualDamCard key={dam.dam_id} damData={dam} />
      ))}
    </div>
  );
};

export default TopDamsPieCharts;
