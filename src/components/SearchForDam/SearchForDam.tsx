// src/components/SearchForDam/SearchForDam.tsx

import React, { useState, useEffect } from 'react';
import { fetchAllDams, fetchDamById } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './SearchForDam.scss';

interface Dam {
    dam_id: string;
    dam_name: string;
    full_volume?: number;
    latitude?: number;
    longitude?: number;
}

const SearchForDam: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [damNames, setDamNames] = useState<Dam[]>([]);
    const [filteredDams, setFilteredDams] = useState<Dam[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadDamNames = async () => {
            try {
                const dams = await fetchAllDams();
                setDamNames(dams);
            } catch (error) {
                console.error('Error fetching dams:', error);
            }
        };

        loadDamNames();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            // Filter dams based on the search query
            setFilteredDams(
                damNames.filter((dam) =>
                    dam.dam_name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredDams([]);
        }
    }, [searchQuery, damNames]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSuggestionClick = async (dam: Dam) => {
        try {
            // Fetch detailed dam data
            const damDetails = await fetchDamById(dam.dam_id);
            navigate('/dam', { state: { damData: damDetails } });
        } catch (error) {
            console.error('Error fetching dam details:', error);
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
                        {filteredDams.map((dam) => (
                            <li key={dam.dam_id} onClick={() => handleSuggestionClick(dam)}>
                                {dam.dam_name}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
};

export default SearchForDam;
