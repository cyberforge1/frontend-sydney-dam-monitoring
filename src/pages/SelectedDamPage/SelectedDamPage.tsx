// # src/pages/SelectedDamPage/SelectedDamPage.tsx

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchDamByIdThunk } from '../../features/dams/damsSlice';
import { fetchSpecificDamAnalysisByIdThunk } from '../../features/damResources/damResourcesSlice';
import DamContent from '../../components/DamContent/DamContent';
import GoogleMapComponent from '../../components/GoogleMapComponent/GoogleMapComponent';
import DamCapacityGraph from '../../graphs/DamCapacityGraph/DamCapacityGraph';
import NetInflowReleaseGraph from '../../graphs/NetInflowReleaseGraph/NetInflowReleaseGraph';
import './SelectedDamPage.scss';

const SelectedDamPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { selectedDam, status: damStatus, error: damError } = useSelector((state: RootState) => state.dams);
    const { specificDamAnalyses, status: resourceStatus, error: resourceError } = useSelector((state: RootState) => state.damResources);

    const damId = location.state?.damData?.dam_id || location.state?.damId;

    useEffect(() => {
        if (damId && damStatus === 'idle') {
            dispatch(fetchDamByIdThunk(damId));
        }

        if (damId && resourceStatus === 'idle') {
            dispatch(fetchSpecificDamAnalysisByIdThunk(damId));
        }
    }, [damId, damStatus, resourceStatus, dispatch]);

    if (damStatus === 'loading' || resourceStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (damError || resourceError) {
        return <div>Error: {damError || resourceError}</div>;
    }

    if (!selectedDam) {
        return <div>No dam data available.</div>;
    }

    const damName = selectedDam.dam_name;
    const latitude = selectedDam.latitude ? selectedDam.latitude.toString() : '0';
    const longitude = selectedDam.longitude ? selectedDam.longitude.toString() : '0';

    const avgPercentageFull12Months = specificDamAnalyses[0]?.avg_percentage_full_12_months || null;
    const avgPercentageFull5Years = specificDamAnalyses[0]?.avg_percentage_full_5_years || null;
    const avgPercentageFull20Years = specificDamAnalyses[0]?.avg_percentage_full_20_years || null;

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <div className="selected-dam-page">
            <button className="back-button" onClick={handleBackClick}>Back</button>
            <div className="dam-header">
                <h1>{damName} Insights</h1>
            </div>
            <div className="content-row">
                <div className="dam-content">
                    <DamCapacityGraph damId={damId} />
                </div>
                <div className="dam-content">
                    <NetInflowReleaseGraph damId={damId} />
                </div>
            </div>
            <div className="content-row">
                <DamContent>
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        textAlign: 'center', 
                        height: '100%', 
                        width: '100%', 
                        fontSize: '1.5rem' 
                    }}>
                        <p style={{ width: '100%', marginBottom: '20px' }}>
                            <span style={{ marginRight: '0.5rem' }}>{damName} Average Percentage Full (12 Months):</span> 
                            {avgPercentageFull12Months !== null ? (
                                <span style={{ fontWeight: 'bold' }}>
                                    {avgPercentageFull12Months.toFixed(2) + '%'}
                                </span>
                            ) : (
                                <i className="fas fa-spinner fa-spin"></i>
                            )}
                        </p>
                        <p style={{ width: '100%', marginBottom: '20px' }}>
                            <span style={{ marginRight: '0.5rem' }}>{damName} Average Percentage Full (5 Years):</span>
                            {avgPercentageFull5Years !== null ? (
                                <span style={{ fontWeight: 'bold' }}>
                                    {avgPercentageFull5Years.toFixed(2) + '%'}
                                </span>
                            ) : (
                                <i className="fas fa-spinner fa-spin"></i>
                            )}
                        </p>
                        <p style={{ width: '100%' }}>
                            <span style={{ marginRight: '0.5rem' }}>{damName} Average Percentage Full (20 Years):</span>
                            {avgPercentageFull20Years !== null ? (
                                <span style={{ fontWeight: 'bold' }}>
                                    {avgPercentageFull20Years.toFixed(2) + '%'}
                                </span>
                            ) : (
                                <i className="fas fa-spinner fa-spin"></i>
                            )}
                        </p>
                    </div>
                </DamContent>
                <div className="dam-content">
                    <GoogleMapComponent lat={parseFloat(latitude)} lng={parseFloat(longitude)} />
                </div>
            </div>
        </div>
    );
};

export default SelectedDamPage;
