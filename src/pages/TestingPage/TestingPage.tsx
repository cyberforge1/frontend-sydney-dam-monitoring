// src/pages/TestingPage/TestingPage.tsx

import React from 'react';
import IndividualDamCard from '../../components/IndividualDamCard/IndividualDamCard';
import './TestingPage.scss';

const TestingPage: React.FC = () => {
    return (
        <div className="testing-page">
            {/* Replace 'dam-id-1' with an actual dam ID from your dataset */}
            <IndividualDamCard damId="210102" />
        </div>
    );
};

export default TestingPage;
