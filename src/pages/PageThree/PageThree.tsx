// # src/pages/PageThree/PageThree.tsx

import React, { useState, useEffect } from 'react';
import { fetchDamData12Months } from '../../services/api';
import DamCapacityPercentageGraph from '../../graphs/DamCapacityPercentageGraph/DamCapacityPercentageGraph';
import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import './PageThree.scss';

// Type for the data returned by the API
interface ApiDamAnalysis {
    dam_id: string;
    analysis_date: string;
    avg_percentage_full_12_months?: number;
}

// Type expected by DamCapacityPercentageGraph
interface GraphDamAnalysis {
    dam_id: string;
    dam_name: string;
    date: string;
    percentage_full: number;
}

const PageThree: React.FC = () => {
    const [groupDamData, setGroupDamData] = useState<ApiDamAnalysis[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string>('sydney_dams');

    useEffect(() => {
        const loadGroupDamData = async () => {
            try {
                const data = await fetchDamData12Months(selectedGroup);
                setGroupDamData(data);
            } catch (error) {
                console.error('Error fetching group dam data:', error);
            }
        };

        loadGroupDamData();
    }, [selectedGroup]);

    // Transform API data to match the type expected by the graph
    const transformedData: GraphDamAnalysis[] = groupDamData.map(dam => ({
        dam_id: dam.dam_id,
        dam_name: `Dam ${dam.dam_id}`, // Replace with real dam names if available
        date: dam.analysis_date,
        percentage_full: dam.avg_percentage_full_12_months ?? 0, // Default to 0 if undefined
    }));

    return (
        <div className="page-three">
            <div className="header">
                <DamGroupSelector onSelectGroup={setSelectedGroup} />
            </div>
            <div className="content">
                <DamCapacityPercentageGraph data={transformedData} />
            </div>
        </div>
    );
};

export default PageThree;
