// src/pages/PageFive/PageFive.tsx

import React from 'react';
import TextBox from '../../components/TextBox/TextBox';
import './PageFive.scss';

const PageFive: React.FC = () => {
    return (
        <div className="page-five">
            <div className="content">
                <h1 className="header-fixed-height">Project Details</h1>
                <TextBox />
            </div>
        </div>
    );
};

export default PageFive;
