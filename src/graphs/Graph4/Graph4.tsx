// src/graphs/Graph4/Graph4.tsx
import React from 'react';
import './Graph4.scss';

type Props = { fullScreen?: boolean };

const Graph4: React.FC<Props> = ({ fullScreen = false }) => (
  <div className={`graph4Placeholder ${fullScreen ? 'is-fullscreen' : ''}`}>
    <div>
      <div className="graph4Placeholder__title">Graph 4</div>
      <div className="graph4Placeholder__sub">(graph goes here)</div>
    </div>
  </div>
);

export default Graph4;
