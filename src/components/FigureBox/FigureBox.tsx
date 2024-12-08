// # src/components/FigureBox/FigureBox.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchLatestDataByIdThunk } from '../../features/damResources/damResourcesSlice';
import './FigureBox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface FigureBoxProps {
    title: string;
    damId: string;
    dataKey: keyof Omit<RootState['damResources']['latestData'][0], 'dam_id' | 'date'>; // Ensures dataKey is one of the valid resource fields
}

const FigureBox: React.FC<FigureBoxProps> = ({ title, damId, dataKey }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { latestData, status, error } = useSelector((state: RootState) => state.damResources);

    useEffect(() => {
        if (!latestData.find((data) => data.dam_id === damId)) {
            dispatch(fetchLatestDataByIdThunk(damId));
        }
    }, [dispatch, damId, latestData]);

    const damResource = latestData.find((data) => data.dam_id === damId);
    const dataValue = damResource ? damResource[dataKey] : null;

    if (status === 'loading') {
        return <div className="figure-box"><FontAwesomeIcon icon={faSpinner} spin /></div>;
    }

    if (error) {
        return <div className="figure-box">Error loading data</div>;
    }

    return (
        <div className="figure-box">
            <div className="figure-box-title">{title}</div>
            <div className="figure-box-data">
                {dataValue !== null ? dataValue : <FontAwesomeIcon icon={faSpinner} spin />}
            </div>
        </div>
    );
};

export default FigureBox;
