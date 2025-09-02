// src/pages/HomePage/HomePage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss';

const DEFAULT_DAM_ID = '203042'; // change this to any valid dam_id you like

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="HomePage">
      <div className="home-content">
        <h1>Home Page</h1>

        <div className="cta">
          <button
            type="button"
            className="btn"
            onClick={() => navigate('/dams')}
            aria-label="Go to Dam List"
          >
            View Dam List
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/dams/${DEFAULT_DAM_ID}`)}
            aria-label={`Go to Dam Detail for ${DEFAULT_DAM_ID}`}
          >
            View Example Dam ({DEFAULT_DAM_ID})
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
