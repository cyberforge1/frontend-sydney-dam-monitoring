// # src/pages/PageFour/PageFour.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllOverallDamAnalysesThunk } from '../../features/damResources/damResourcesSlice';
import FigureBox from '../../components/FigureBox/FigureBox';
import './PageFour.scss';

const PageFour: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { overallDamAnalysis, status, error } = useSelector((state: RootState) => state.damResources);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllOverallDamAnalysesThunk());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (overallDamAnalysis.length === 0) {
        return <div>No data available.</div>;
    }

    const avg12Months = overallDamAnalysis[0]?.avg_percentage_full_12_months?.toFixed(2) + '%' || null;
    const avg5Years = overallDamAnalysis[0]?.avg_percentage_full_5_years?.toFixed(2) + '%' || null;
    const avg20Years = overallDamAnalysis[0]?.avg_percentage_full_20_years?.toFixed(2) + '%' || null;

    return (
        <div className="page-four">
            <div className="figure-box-container">
                <FigureBox title="All Dams Average Percentage Full (12 Months)" data={avg12Months} />
                <FigureBox title="All Dams Average Percentage Full (5 Years)" data={avg5Years} />
                <FigureBox title="All Dams Average Percentage Full (20 Years)" data={avg20Years} />
            </div>
        </div>
    );
};

export default PageFour;
