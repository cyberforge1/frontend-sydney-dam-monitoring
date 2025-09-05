// src/graphs/Graph1/Graph1.tsx

import React from 'react';
import './Graph1.scss';

type Props = { fullScreen?: boolean };

const Graph1: React.FC<Props> = ({ fullScreen = false }) => (
  <div className={`graph1Placeholder ${fullScreen ? 'is-fullscreen' : ''}`}>
    <div>
      <div className="graph1Placeholder__title">Graph 1</div>
      <div className="graph1Placeholder__sub">(graph goes here)</div>
    </div>
  </div>
);

export default Graph1;
