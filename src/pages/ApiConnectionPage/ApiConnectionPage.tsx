// #src/pages/ApiConnectionPage/ApiConnectionPage.tsx

import React from 'react';
import TestingApiCalls from '../../components/TestingApiCalls/TestingApiCalls';
import './ApiConnectionPage.scss';

const ApiConnectionPage: React.FC = () => {
  return (
    <div className="api-connection-page">
      <h1>API Connection Page</h1>
      <TestingApiCalls />
    </div>
  );
};

export default ApiConnectionPage;
