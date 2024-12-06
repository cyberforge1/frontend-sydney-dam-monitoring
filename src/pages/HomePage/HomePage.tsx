// # src/pages/HomePage/HomePage.tsx

import React, { useState, useEffect } from 'react';
import TopDamsPieCharts from '../../containers/TopDamsPieCharts/TopDamsPieCharts';
import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import SearchForDam from '../../components/SearchForDam/SearchForDam';
import OpenListOfDams from '../../components/OpenListOfDams/OpenListOfDams';
import { fetchDamsDataByGroup } from '../../services/api'; // Use the updated API
import './HomePage.scss';

// Define a type for the dam data
interface Dam {
    dam_id: string;
    dam_name: string;
    full_volume?: number;
    latitude?: number;
    longitude?: number;
    percentage_full?: number;
    storage_volume?: number;
}

// Define a stricter type for TopDamsPieCharts
interface DamData {
    dam_id: string;
    dam_name: string;
    percentage_full: number; // Strictly a number
}

const HomePage: React.FC = () => {
    // State to manage the selected group
    const [selectedGroup, setSelectedGroup] = useState<string>('sydney_dams');
    // State to hold dam data for the selected group
    const [damData, setDamData] = useState<Dam[]>([]);

    // Effect to fetch dam data whenever the selected group changes
    useEffect(() => {
        const fetchDamData = async () => {
            try {
                const data = await fetchDamsDataByGroup(selectedGroup); // Fetch dam data using the updated API
                setDamData(data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching dam data by group:', error); // Log any errors
            }
        };

        fetchDamData();
    }, [selectedGroup]);

    // Ensure damData conforms to DamData
    const validatedDamData: DamData[] = damData.map(dam => ({
        dam_id: dam.dam_id,
        dam_name: dam.dam_name,
        percentage_full: dam.percentage_full ?? 0, // Default to 0 if undefined
    }));

    // Render the component
    return (
        <div className="homepage">
            {/* Header section */}
            <div className="header">
                <h1>Sydney Dam Monitoring</h1>
                <p>This website tracks live and historic data from the dams across NSW, Australia</p>
            </div>
            {/* Controls section */}
            <div className="controls">
                <OpenListOfDams />
                <SearchForDam />
                <DamGroupSelector onSelectGroup={setSelectedGroup} />
            </div>
            {/* Charts section */}
            <div className="top-dams-pie-charts-container">
                <TopDamsPieCharts damData={validatedDamData} />
            </div>
        </div>
    );
};

export default HomePage;
