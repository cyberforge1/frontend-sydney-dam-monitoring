// src/graphs/ReleaseGraph/ReleaseGraph.tsx

import React from 'react';
import './ReleaseGraph.scss';

type Props = {
  fullScreen?: boolean;
};

const ReleaseGraph: React.FC<Props> = ({ fullScreen = false }) => {
  return (
    <div className={`graphPlaceholder ${fullScreen ? 'is-fullscreen' : ''}`}>
      <div>
        <div className="graphPlaceholder__title">Release Graph</div>
        <div className="graphPlaceholder__sub">(graph goes here)</div>
      </div>
    </div>
  );
};

export default ReleaseGraph;
