// # src/components/SearchForDam/SearchForDam.tsx

import React, { useState, useEffect } from 'react';
import { fetchDamNames, fetchDamDataByName } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './SearchForDam.scss';

const SearchForDam: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [damNames, setDamNames] = useState<string[]>([]); // Now utilized
    const [filteredDams, setFilteredDams] = useState<string[]>([]); // Now utilized
    const navigate = useNavigate();

    useEffect(() => {
        const loadDamNames = async () => {
            try {
                const names = await fetchDamNames();
                setDamNames(names);
            } catch (error) {
                console.error('Error fetching dam names:', error);
            }
        };

        loadDamNames();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            // Use `damNames` to filter results based on the search query
            setFilteredDams(
                damNames.filter((dam) =>
                    dam.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredDams([]);
        }
    }, [searchQuery, damNames]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSuggestionClick = async (damName: string) => {
        try {
            const data = await fetchDamDataByName(damName);
            navigate('/dam', { state: { damData: data[0] } });
        } catch (error) {
            console.error('Error fetching dam data:', error);
        }
    };

    return (
        <div className="search-for-dam">
            <form>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Search for a Dam"
                />
                {filteredDams.length > 0 && (
                    <ul className="suggestions-list">
                        {filteredDams.map((dam, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(dam)}>
                                {dam}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
};

export default SearchForDam;
