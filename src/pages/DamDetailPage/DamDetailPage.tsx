// src/pages/DamDetailPage/DamDetailPage.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import './DamDetailPage.scss';

const DamDetailPage: React.FC = () => {
  // Grab the :damId route param
  const { damId } = useParams<{ damId: string }>();

  return (
    <div className="DamDetailPage">
      <h1>Dam Detail Page</h1>
      <p>Dam ID: {damId}</p>
    </div>
  );
};

export default DamDetailPage;
