// src/pages/HomePage/HomePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/dams/${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="HomePage">
      <div className="home-content">
        {/* Title section */}
        <h1 className="homepage-title">Water Dashboard NSW</h1>
        <p className="homepage-subtitle">
          This website provides recent and historical data on dams across NSW, Australia
        </p>

        {/* Search bar + View Dam List button */}
        <div className="search-row">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a Dam..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search for a Dam"
            />
            <button type="button" onClick={handleSearch}>
              Search
            </button>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/dams')}
            aria-label="Go to Dam List"
          >
            View Dam List
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
