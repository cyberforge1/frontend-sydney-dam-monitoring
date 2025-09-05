// src/graphs/Graph3/Graph3.tsx
import React from 'react';
import './Graph3.scss';

type Props = { fullScreen?: boolean };

const Graph3: React.FC<Props> = ({ fullScreen = false }) => (
  <div className={`graph3Placeholder ${fullScreen ? 'is-fullscreen' : ''}`}>
    <div>
      <div className="graph3Placeholder__title">Graph 3</div>
      <div className="graph3Placeholder__sub">(graph goes here)</div>
    </div>
  </div>
);

export default Graph3;
