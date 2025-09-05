// src/graphs/InflowGraph/InflowGraph.tsx

import React from 'react';
import './InflowGraph.scss';

type Props = {
  fullScreen?: boolean;
};

const InflowGraph: React.FC<Props> = ({ fullScreen = false }) => {
  return (
    <div className={`graphPlaceholder ${fullScreen ? 'is-fullscreen' : ''}`}>
      <div>
        <div className="graphPlaceholder__title">Inflow Graph</div>
        <div className="graphPlaceholder__sub">(graph goes here)</div>
      </div>
    </div>
  );
};

export default InflowGraph;
