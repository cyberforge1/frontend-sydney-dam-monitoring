// src/components/SearchForDam/SearchForDam.tsx

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllDamsThunk } from '../../features/dams/damsSlice';
import { useNavigate } from 'react-router-dom';
import './SearchForDam.scss';

const DEBOUNCE_MS = 120;

const SearchForDam: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDams, setFilteredDams] = useState<string[]>([]);
  const debounceRef = useRef<number | undefined>(undefined);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { dams, status, error } = useSelector((state: RootState) => state.dams);
  const damNames = useMemo(() => (Array.isArray(dams) ? dams.map(d => d.dam_name) : []), [dams]);

  useEffect(() => {
    if (status === 'idle') {
      // Fetch list once if needed
      dispatch(fetchAllDamsThunk());
    }
  }, [dispatch, status]);

  useEffect(() => {
    // debounce filtering to avoid extra renders while typing
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      if (searchQuery && damNames.length > 0) {
        const filtered = damNames.filter((name) =>
          name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDams(filtered);
      } else {
        setFilteredDams([]);
      }
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(debounceRef.current);
  }, [searchQuery, damNames]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (damName: string) => {
    const selectedDam = (Array.isArray(dams) ? dams : []).find((dam) => dam.dam_name === damName);
    if (selectedDam) {
      navigate('/dam', { state: { damData: selectedDam } });
    }
  };

  return (
    <div className="search-for-dam">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for a Dam"
          aria-label="Search for a Dam"
        />
        {error && <div className="error-message">{error}</div>}
        {filteredDams.length > 0 && (
          <ul className="suggestions-list" ref={undefined}>
            {filteredDams.map((dam, index) => (
              <li
                key={`${dam}-${index}`}
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
