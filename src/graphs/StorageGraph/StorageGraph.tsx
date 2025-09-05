// src/graphs/StorageGraph/StorageGraph.tsx

import React from 'react';
import './StorageGraph.scss';

type Props = {
  fullScreen?: boolean;
};

const StorageGraph: React.FC<Props> = ({ fullScreen = false }) => {
  return (
    <div className={`graphPlaceholder ${fullScreen ? 'is-fullscreen' : ''}`}>
      <div>
        <div className="graphPlaceholder__title">Storage Graph</div>
        <div className="graphPlaceholder__sub">(graph goes here)</div>
      </div>
    </div>
  );
};

export default StorageGraph;
