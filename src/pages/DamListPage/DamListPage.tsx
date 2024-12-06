// # src/pages/DamListPage/DamListPage.tsx

import React, { useEffect, useState } from 'react';
import { fetchDamNames } from '../../services/api'; // Use the updated `fetchDamNames` function
import { useNavigate } from 'react-router-dom';
import './DamListPage.scss';

const DamListPage: React.FC = () => {
    const [damNames, setDamNames] = useState<string[]>([]); // State for storing dam names
    const navigate = useNavigate(); // React Router navigation hook

    // Fetch dam names when the component is mounted
    useEffect(() => {
        const loadDamNames = async () => {
            try {
                const names = await fetchDamNames(); // Fetch dam names using updated API
                setDamNames(names); // Update state with fetched names
            } catch (error) {
                console.error('Error fetching dam names:', error); // Log any errors
            }
        };

        loadDamNames();
    }, []);

    // Navigate to the dam details page with the selected dam's name
    const handleDamClick = (damName: string) => {
        navigate('/dam', { state: { damName } });
    };

    // Navigate back to the homepage
    const handleBackClick = () => {
        navigate('/');
    };

    // Split dam names into three equal sections for display
    const splitDamNames = () => {
        const third = Math.ceil(damNames.length / 3);
        const firstSection = damNames.slice(0, third);
        const secondSection = damNames.slice(third, third * 2);
        const thirdSection = damNames.slice(third * 2, damNames.length);
        return [firstSection, secondSection, thirdSection];
    };

    // Destructure the three sections of dam names
    const [firstSection, secondSection, thirdSection] = splitDamNames();

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
                    {firstSection.map((dam, index) => (
                        <li key={index} onClick={() => handleDamClick(dam)}>
                            {dam}
                        </li>
                    ))}
                </ul>
                <ul>
                    {secondSection.map((dam, index) => (
                        <li key={index} onClick={() => handleDamClick(dam)}>
                            {dam}
                        </li>
                    ))}
                </ul>
                <ul>
                    {thirdSection.map((dam, index) => (
                        <li key={index} onClick={() => handleDamClick(dam)}>
                            {dam}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DamListPage;
