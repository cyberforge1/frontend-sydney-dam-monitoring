// # src/pages/DamListPage/DamListPage.tsx

import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllDamsThunk } from '../../features/dams/damsSlice';
import './DamListPage.scss';

const DamListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dams, status, error } = useSelector((state: RootState) => state.dams);
  const navigate = useNavigate();

  // Fetch only if we have never fetched before and list is empty
  useEffect(() => {
    if (status === 'idle' && dams.length === 0) {
      dispatch(fetchAllDamsThunk());
    }
  }, [dispatch, status, dams.length]);

  const handleDamClick = (damId: string) => {
    // Use param route so deep links and refreshes work
    navigate(`/dam/${damId}`);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  // Stable split of the list into three columns
  const [firstSection, secondSection, thirdSection] = useMemo(() => {
    const third = Math.ceil(dams.length / 3);
    const first = dams.slice(0, third);
    const second = dams.slice(third, third * 2);
    const thirdArr = dams.slice(third * 2);
    return [first, second, thirdArr];
  }, [dams]);

  if (status === 'loading' && dams.length === 0) {
    return <div>Loading list of dams...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (dams.length === 0) {
    return <div>No dams available.</div>;
  }

  return (
    <div className="dam-list-page">
      <button className="back-button" onClick={handleBackClick} type="button">Back</button>
      <h1>List of Dams</h1>
      <div className="dam-list-sections">
        <ul>
          {firstSection.map((dam) => (
            <li key={dam.dam_id}>
              <button type="button" onClick={() => handleDamClick(dam.dam_id)}>
                {dam.dam_name}
              </button>
            </li>
          ))}
        </ul>
        <ul>
          {secondSection.map((dam) => (
            <li key={dam.dam_id}>
              <button type="button" onClick={() => handleDamClick(dam.dam_id)}>
                {dam.dam_name}
              </button>
            </li>
          ))}
        </ul>
        <ul>
          {thirdSection.map((dam) => (
            <li key={dam.dam_id}>
              <button type="button" onClick={() => handleDamClick(dam.dam_id)}>
                {dam.dam_name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DamListPage;
