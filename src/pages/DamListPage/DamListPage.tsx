// # src/pages/DamListPage/DamListPage.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllDamsThunk } from '../../features/dams/damsSlice';
import './DamListPage.scss';

const DamListPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { dams, status, error } = useSelector((state: RootState) => state.dams);
    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllDamsThunk());
        }
    }, [dispatch, status]);

    const handleDamClick = (damId: string) => {
        navigate('/dam', { state: { damId } });
    };

    const handleBackClick = () => {
        navigate('/');
    };

    const splitDamList = () => {
        const third = Math.ceil(dams.length / 3);
        const firstSection = dams.slice(0, third);
        const secondSection = dams.slice(third, third * 2);
        const thirdSection = dams.slice(third * 2, dams.length);
        return [firstSection, secondSection, thirdSection];
    };

    const [firstSection, secondSection, thirdSection] = splitDamList();

    if (status === 'loading') {
        return <div>Loading list of dams...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (dams.length === 0) {
        return <div>No dams available.</div>;
    }

    return (
        <div className="dam-list-page">
            <button className="back-button" onClick={handleBackClick}>Back</button>
            <h1>List of Dams</h1>
            <div className="dam-list-sections">
                <ul>
                    {firstSection.map((dam) => (
                        <li key={dam.dam_id} onClick={() => handleDamClick(dam.dam_id)}>
                            {dam.dam_name}
                        </li>
                    ))}
                </ul>
                <ul>
                    {secondSection.map((dam) => (
                        <li key={dam.dam_id} onClick={() => handleDamClick(dam.dam_id)}>
                            {dam.dam_name}
                        </li>
                    ))}
                </ul>
                <ul>
                    {thirdSection.map((dam) => (
                        <li key={dam.dam_id} onClick={() => handleDamClick(dam.dam_id)}>
                            {dam.dam_name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DamListPage;
