// src/components/SearchForDam/SearchForDam.tsx

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllDamsThunk } from '../../features/dams/damsSlice';
import { useNavigate } from 'react-router-dom';
import './SearchForDam.scss';

const SearchForDam: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDams, setFilteredDams] = useState<string[]>([]);
    const suggestionsRef = useRef<HTMLUListElement>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { dams, status, error } = useSelector((state: RootState) => state.dams);

    useEffect(() => {
        if (status === 'idle') {
            console.log('Fetching all dams...');
            dispatch(fetchAllDamsThunk());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (searchQuery && dams.length > 0) {
            const filtered = dams
                .map((dam) => dam.dam_name)
                .filter((name) =>
                    name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            setFilteredDams(filtered);
            console.log('Filtered dams:', filtered);
        } else {
            setFilteredDams([]);
        }
    }, [searchQuery, dams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSuggestionClick = (damName: string) => {
        const selectedDam = dams.find((dam) => dam.dam_name === damName);
        if (selectedDam) {
            navigate('/dam', { state: { damData: selectedDam } });
        } else {
            console.error('No dam found with the given name:', damName);
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
                {error && <div className="error-message">{error}</div>}
                {filteredDams.length > 0 && (
                    <ul className="suggestions-list" ref={suggestionsRef}>
                        {filteredDams.map((dam, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(dam)}
                                className="suggestion-item"
                            >
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
