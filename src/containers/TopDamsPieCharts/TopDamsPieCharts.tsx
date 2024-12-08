// src/containers/TopDamsPieCharts/TopDamsPieCharts.tsx

import React, { useState, useEffect } from 'react';
import IndividualDamCard from '../../components/IndividualDamCard/IndividualDamCard';
import './TopDamsPieCharts.scss';
import { fetchAllDams, fetchLatestDataById } from '../../services/api';

interface DamData {
    dam_id: string;
    dam_name: string;
    percentage_full: number; // Ensure this is strictly a number
}

const TopDamsPieCharts: React.FC = () => {
    const [damData, setDamData] = useState<DamData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDamData = async () => {
            try {
                const dams = await fetchAllDams();
                const damDataPromises = dams.map(async (dam) => {
                    try {
                        const latestData = await fetchLatestDataById(dam.dam_id);
                        return {
                            dam_id: dam.dam_id,
                            dam_name: dam.dam_name,
                            percentage_full: latestData.percentage_full ?? 0,
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
                setDamData(combinedDamData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching dams:', err);
                setError('Failed to load dam data.');
                setLoading(false);
            }
        };

        loadDamData();
    }, []);

    if (loading) {
        return <div className="top-dams-pie-charts">Loading top dams...</div>;
    }

    if (error) {
        return <div className="top-dams-pie-charts error">{error}</div>;
    }

    return (
        <div className="top-dams-pie-charts">
            {damData.map((dam) => (
                <IndividualDamCard key={dam.dam_id} damData={dam} />
            ))}
        </div>
    );
};

export default TopDamsPieCharts;
