// # src/components/FigureBox/FigureBox.tsx

import React from 'react';
import './FigureBox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface FigureBoxProps {
    title: string;
    data: string | number | null; // Accepts strings, numbers, or null values
}

const FigureBox: React.FC<FigureBoxProps> = ({ title, data }) => {
    return (
        <div className="figure-box">
            <div className="figure-box-title">{title}</div>
            <div className="figure-box-data">
                {data !== null ? data : <FontAwesomeIcon icon={faSpinner} spin />}
            </div>
        </div>
    );
};

export default FigureBox;
