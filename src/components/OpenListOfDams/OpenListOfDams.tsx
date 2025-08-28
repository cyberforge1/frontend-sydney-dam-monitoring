// # src/components/OpenListOfDams/OpenListOfDams.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OpenListOfDams.scss';

const OpenListOfDams: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Navigating to dam list...');
    navigate('/damlist');
  };

  return (
    <div className="open-list-of-dams">
      <button type="button" onClick={handleClick} aria-label="Open list of dams">
        Open list of Dams
      </button>
    </div>
  );
};

export default OpenListOfDams;
