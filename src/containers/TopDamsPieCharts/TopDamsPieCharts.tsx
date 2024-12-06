// # src/containers/TopDamsPieCharts/TopDamsPieCharts.tsx

import React from 'react';
import IndividualDamCard from '../../components/IndividualDamCard/IndividualDamCard';
import './TopDamsPieCharts.scss';

interface DamData {
    dam_id: string;
    dam_name: string;
    percentage_full: number; // Ensure this is strictly a number
}

interface TopDamsPieChartsProps {
    damData: DamData[]; // Updated to use the stricter DamData type
}

const TopDamsPieCharts: React.FC<TopDamsPieChartsProps> = ({ damData }) => {
    // Ensure all items in damData have a valid percentage_full
    const validatedDamData = damData.map((dam) => ({
        ...dam,
        percentage_full: dam.percentage_full ?? 0, // Default to 0 if undefined
    }));

    return (
        <div className="top-dams-pie-charts">
            {validatedDamData.map((dam) => (
                <IndividualDamCard key={dam.dam_id} damData={dam} />
            ))}
        </div>
    );
};

export default TopDamsPieCharts;
