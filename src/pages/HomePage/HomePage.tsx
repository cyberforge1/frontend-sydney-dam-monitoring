// src/pages/HomePage/HomePage.tsx

import React, { useState, useEffect } from 'react';
import TopDamsPieCharts from '../../containers/TopDamsPieCharts/TopDamsPieCharts';
import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import SearchForDam from '../../components/SearchForDam/SearchForDam';
import OpenListOfDams from '../../components/OpenListOfDams/OpenListOfDams';
import { fetchDamsByGroupName, fetchLatestDataById } from '../../services/api'; // Ensure these functions are correctly implemented
import './HomePage.scss';

interface DamData {
    dam_id: string;
    dam_name: string;
    percentage_full: number;
}

const HomePage: React.FC = () => {
    // State to manage the selected group
    const [selectedGroup, setSelectedGroup] = useState<string>('sydney_dams');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [damData, setDamData] = useState<DamData[]>([]); // State to store fetched dam data

    // Effect to fetch dam data whenever the selected group changes
    useEffect(() => {
        const fetchDamData = async () => {
            setLoading(true);
            setError(null);
            try {
                const dams = await fetchDamsByGroupName(selectedGroup); // Fetch dams using the updated API

                // For each dam, fetch latest data
                const damDataPromises = dams.map(async (dam) => {
                    try {
                        const latestData = await fetchLatestDataById(dam.dam_id);
                        return {
                            dam_id: dam.dam_id,
                            dam_name: dam.dam_name,
                            percentage_full: latestData.percentage_full ?? 0, // Default to 0 if undefined
                        };
                    } catch (err) {
                        console.error(`Error fetching latest data for dam ${dam.dam_id}:`, err);
                        return {
                            dam_id: dam.dam_id,
                            dam_name: dam.dam_name,
                            percentage_full: 0,
                        };
                    }
                });

                const combinedDamData = await Promise.all(damDataPromises);
                setDamData(combinedDamData); // Utilize damData by setting it here
                setLoading(false);
            } catch (err) {
                console.error('Error fetching dams by group:', err);
                setError('Failed to load dam data.');
                setLoading(false);
            }
        };

        fetchDamData();
    }, [selectedGroup]);

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
                {loading ? (
                    <div>Loading top dams...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    /* Pass damData as a prop */
                    <TopDamsPieCharts damData={damData} />
                )}
            </div>
        </div>
    );
};

export default HomePage;
