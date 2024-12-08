// src/pages/PageThree/PageThree.tsx

import React, { useState, useEffect } from 'react';
import { fetchDamsByGroupName, fetchSpecificDamAnalysisById } from '../../services/api'; // Use existing API functions
import DamCapacityPercentageGraph from '../../graphs/DamCapacityPercentageGraph/DamCapacityPercentageGraph';
import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import './PageThree.scss';

interface DamAnalysis {
    dam_id: string;
    dam_name: string;
    date: string;
    percentage_full: number;
}

const PageThree: React.FC = () => {
    const [groupDamData, setGroupDamData] = useState<DamAnalysis[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string>('sydney_dams');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadGroupDamData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch dams by group
                const dams = await fetchDamsByGroupName(selectedGroup); // Fetch dams by group
                // For each dam, fetch specific dam analysis
                const damAnalysisPromises = dams.map(async (dam) => {
                    try {
                        const analysisData = await fetchSpecificDamAnalysisById(dam.dam_id);
                        // Assuming analysisData is an array with analysis entries
                        // Get the latest analysis or specific period
                        const latestAnalysis = analysisData[analysisData.length - 1]; // Example: get the latest
                        return {
                            dam_id: dam.dam_id,
                            dam_name: dam.dam_name,
                            date: latestAnalysis.analysis_date,
                            percentage_full: latestAnalysis.avg_percentage_full_12_months ?? 0,
                        };
                    } catch (err) {
                        console.error(`Error fetching analysis for dam ${dam.dam_id}:`, err);
                        return {
                            dam_id: dam.dam_id,
                            dam_name: dam.dam_name,
                            date: '',
                            percentage_full: 0,
                        };
                    }
                });

                const combinedDamAnalysis = await Promise.all(damAnalysisPromises);
                setGroupDamData(combinedDamAnalysis);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching dam analysis data:', err);
                setError('Failed to load dam analysis data.');
                setLoading(false);
            }
        };

        loadGroupDamData();
    }, [selectedGroup]);

    // Transform API data to match the type expected by the graph
    const transformedData: DamAnalysis[] = groupDamData.map(dam => ({
        dam_id: dam.dam_id,
        dam_name: dam.dam_name,
        date: dam.date,
        percentage_full: dam.percentage_full,
    }));

    // Render the component
    return (
        <div className="page-three">
            <div className="header">
                <DamGroupSelector onSelectGroup={setSelectedGroup} />
            </div>
            <div className="content">
                {loading ? (
                    <div>Loading dam analysis data...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <DamCapacityPercentageGraph data={transformedData} />
                )}
            </div>
        </div>
    );
};

export default PageThree;
