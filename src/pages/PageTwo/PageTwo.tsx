// src/pages/PageTwo/PageTwo.tsx

import React, { useState, useEffect } from 'react';
import { fetchDamsByGroupName } from '../../services/api'; // Use the updated API function
import DamStorageGraph from '../../graphs/DamStorageGraph/DamStorageGraph';
import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import './PageTwo.scss';

// Type returned by the API
interface Dam {
    dam_id: string;
    dam_name: string;
    full_volume?: number;
    latitude?: number;
    longitude?: number;
    storage_volume?: number;
    percentage_full?: number;
}

// Type expected by DamStorageGraph
interface GraphDam {
    dam_id: string;
    dam_name: string;
    storage_volume: number; // Must be a number, no undefined allowed
}

const PageTwo: React.FC = () => {
    const [groupDamData, setGroupDamData] = useState<Dam[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string>('sydney_dams');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadGroupDamData = async () => {
            setLoading(true);
            setError(null);
            try {
                const dams = await fetchDamsByGroupName(selectedGroup); // Fetch dams by group
                setGroupDamData(dams);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching group dam data:', error);
                setError('Failed to load dam data.');
                setLoading(false);
            }
        };

        loadGroupDamData();
    }, [selectedGroup]);

    // Transform API data to match the type expected by DamStorageGraph
    const transformedData: GraphDam[] = groupDamData
        .filter(dam => dam.storage_volume !== undefined) // Filter out dams with undefined storage_volume
        .map(dam => ({
            dam_id: dam.dam_id,
            dam_name: dam.dam_name,
            storage_volume: dam.storage_volume as number, // Cast to number since we filtered undefined
        }));

    // Render the component
    return (
        <div className="page-two">
            <div className="header">
                <DamGroupSelector onSelectGroup={setSelectedGroup} />
            </div>
            <div className="content">
                {loading ? (
                    <div>Loading dam storage data...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <DamStorageGraph data={transformedData} />
                )}
            </div>
        </div>
    );
};

export default PageTwo;
