// src/graphs/Graph2/Graph2.tsx
import React from 'react';
import './Graph2.scss';

type Props = { fullScreen?: boolean };

const Graph2: React.FC<Props> = ({ fullScreen = false }) => (
  <div className={`graph2Placeholder ${fullScreen ? 'is-fullscreen' : ''}`}>
    <div>
      <div className="graph2Placeholder__title">Graph 2</div>
      <div className="graph2Placeholder__sub">(graph goes here)</div>
    </div>
  </div>
);

export default Graph2;
