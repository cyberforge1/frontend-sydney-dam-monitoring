// src/pages/DamListPage/DamListPage.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAllDamsThunk } from '../../features/dams/damsSlice';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { dams, status, error } = useAppSelector((state) => state.dams);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllDamsThunk());
    }
  }, [status, dispatch]);

  const handleDamClick = (dam: Dam) => {
    navigate('/dam', { state: { damId: dam.dam_id } });
  };

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

  const [firstSection, secondSection, thirdSection] = splitDams();

  if (status === 'loading') {
    return <div className="dam-list-page">Loading dams...</div>;
  }

  if (status === 'failed') {
    return <div className="dam-list-page error">{error}</div>;
  }

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
