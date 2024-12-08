// src/pages/DamListPage/DamListPage.tsx

import React, { useEffect, useState } from 'react';
import { fetchAllDams } from '../../services/api'; // Use the updated API function
import { useNavigate } from 'react-router-dom';
import './DamListPage.scss';

interface Dam {
    dam_id: string;
    dam_name: string;
    full_volume?: number;
    latitude?: number;
    longitude?: number;
}

const DamListPage: React.FC = () => {
    const [dams, setDams] = useState<Dam[]>([]); // State for storing dam objects
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // React Router navigation hook

    // Fetch dams when the component is mounted
    useEffect(() => {
        const loadDams = async () => {
            try {
                const fetchedDams = await fetchAllDams(); // Fetch dams using updated API
                setDams(fetchedDams); // Update state with fetched dams
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dams:', error); // Log any errors
                setError('Failed to load dam data.');
                setLoading(false);
            }
        };

        loadDams();
    }, []);

    // Navigate to the dam details page with the selected dam's data
    const handleDamClick = (dam: Dam) => {
        navigate('/dam', { state: { damData: dam } });
    };

    // Navigate back to the homepage
    const handleBackClick = () => {
        navigate('/');
    };

    // Split dams into three equal sections for display
    const splitDams = () => {
        const third = Math.ceil(dams.length / 3);
        const firstSection = dams.slice(0, third);
        const secondSection = dams.slice(third, third * 2);
        const thirdSection = dams.slice(third * 2, dams.length);
        return [firstSection, secondSection, thirdSection];
    };

    // Destructure the three sections of dams
    const [firstSection, secondSection, thirdSection] = splitDams();

    if (loading) {
        return <div className="dam-list-page">Loading dams...</div>;
    }

    if (error) {
        return <div className="dam-list-page error">{error}</div>;
    }

    // Render the component
    return (
        <div className="dam-list-page">
            {/* Back button */}
            <button className="back-button" onClick={handleBackClick}>Back</button>
            {/* Page title */}
            <h1>List of Dams</h1>
            {/* Display dam names in three sections */}
            <div className="dam-list-sections">
                <ul>
                    {firstSection.map((dam) => (
                        <li key={dam.dam_id} onClick={() => handleDamClick(dam)}>
                            {dam.dam_name}
                        </li>
                    ))}
                </ul>
                <ul>
                    {secondSection.map((dam) => (
                        <li key={dam.dam_id} onClick={() => handleDamClick(dam)}>
                            {dam.dam_name}
                        </li>
                    ))}
                </ul>
                <ul>
                    {thirdSection.map((dam) => (
                        <li key={dam.dam_id} onClick={() => handleDamClick(dam)}>
                            {dam.dam_name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DamListPage;
