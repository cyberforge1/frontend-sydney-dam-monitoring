// # src/components/SearchForDam/SearchForDam.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllDamsThunk } from '../../features/dams/damsSlice';
import { useNavigate } from 'react-router-dom';
import './SearchForDam.scss';

const SearchForDam: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDams, setFilteredDams] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
    const suggestionsRef = useRef<HTMLUListElement>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { dams, status, error } = useSelector((state: RootState) => state.dams);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllDamsThunk());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (searchQuery && dams.length > 0) {
            setFilteredDams(
                dams
                    .map((dam) => dam.dam_name)
                    .filter((name) =>
                        name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
            );
        } else {
            setFilteredDams([]);
        }
    }, [searchQuery, dams]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSearchQuery('');
                setFilteredDams([]);
                setActiveSuggestionIndex(-1);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setActiveSuggestionIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (filteredDams.length > 0) {
            if (e.key === 'ArrowDown') {
                setActiveSuggestionIndex((prevIndex) =>
                    prevIndex < filteredDams.length - 1 ? prevIndex + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                setActiveSuggestionIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : filteredDams.length - 1
                );
            } else if (e.key === 'Enter') {
                if (activeSuggestionIndex >= 0) {
                    const selectedDam = filteredDams[activeSuggestionIndex];
                    handleSuggestionClick(selectedDam);
                } else {
                    handleSubmit(e);
                }
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (searchQuery) {
            const selectedDam = dams.find((dam) => dam.dam_name.toLowerCase() === searchQuery.toLowerCase());
            if (selectedDam) {
                navigate('/dam', { state: { damData: selectedDam } });
            } else {
                console.error('No dam found with the given name:', searchQuery);
            }
        }
    };

    const handleSuggestionClick = (damName: string) => {
        const selectedDam = dams.find((dam) => dam.dam_name === damName);
        if (selectedDam) {
            navigate('/dam', { state: { damData: selectedDam } });
        } else {
            console.error('No dam found with the given name:', damName);
        }
    };

    if (status === 'loading') {
        return <div className="search-for-dam">Loading...</div>;
    }

    if (error) {
        return <div className="search-for-dam">Error: {error}</div>;
    }

    return (
        <div className="search-for-dam">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for a Dam"
                />
                <button type="submit">Search</button>
            </form>
            {filteredDams.length > 0 && (
                <ul className="suggestions-list" ref={suggestionsRef}>
                    {filteredDams.map((dam, index) => (
                        <li
                            key={index}
                            className={index === activeSuggestionIndex ? 'active' : ''}
                            onClick={() => handleSuggestionClick(dam)}
                        >
                            {dam}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchForDam;
