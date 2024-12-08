// src/components/SearchForDam/SearchForDam.tsx

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAllDamsThunk, fetchDamByIdThunk } from '../../features/dams/damsSlice';
import { useNavigate } from 'react-router-dom';
import './SearchForDam.scss';
import { Dam } from '../../types/types';

const SearchForDam: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { dams, status } = useAppSelector((state) => state.dams);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredDams, setFilteredDams] = useState<Dam[]>([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllDamsThunk());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredDams(
        dams.filter((dam) =>
          dam.dam_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredDams([]);
    }
  }, [searchQuery, dams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (dam: Dam) => {
    dispatch(fetchDamByIdThunk(dam.dam_id)).then(() => {
      navigate('/dam', { state: { damId: dam.dam_id } });
    });
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
