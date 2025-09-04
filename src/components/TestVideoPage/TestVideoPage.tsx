// src/components/TestVideoPage/TestVideoPage.tsx

import React from 'react';
import droneVideo from '../../assets/drone-footage-1.mp4';

const TestVideoPage: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#000' }}>
        <video
        src={droneVideo}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        controls={false}
        onContextMenu={(e) => e.preventDefault()}  // disables right-click menu
        onPlay={(e) => e.currentTarget.play()}     // force resume if paused
        >
        Your browser does not support the video tag.
        </video>
    </div>
  );
};

export default TestVideoPage;
