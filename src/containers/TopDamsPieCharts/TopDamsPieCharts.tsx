// # src/containers/TopDamsPieCharts/TopDamsPieCharts.tsx

import React from 'react';
import IndividualDamCard from '../../components/IndividualDamCard/IndividualDamCard';
import { DamGroupMember } from '../../types/types'; // Import the correct type
import './TopDamsPieCharts.scss';

interface TopDamsPieChartsProps {
    damData: DamGroupMember[]; // Define the type for damData
}

const TopDamsPieCharts: React.FC<TopDamsPieChartsProps> = ({ damData }) => {
    return (
        <div className="top-dams-pie-charts">
            {damData.map((dam) => (
                <IndividualDamCard key={dam.dam_id} damId={dam.dam_id} />
            ))}
        </div>
    );
};

export default TopDamsPieCharts;
