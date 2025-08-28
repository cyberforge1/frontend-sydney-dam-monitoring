// src/components/DamContent/DamContent.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchDamByIdThunk } from '../../features/dams/damsSlice';
import './DamContent.scss';

interface DamContentProps {
    damId: string; // Adjusted to take a damId to fetch dam-specific content
    children?: React.ReactNode;
}

const DamContent: React.FC<DamContentProps> = ({ damId, children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedDam, status, error } = useSelector((state: RootState) => state.dams);

    useEffect(() => {
        if (!selectedDam || selectedDam.dam_id !== damId) {
            dispatch(fetchDamByIdThunk(damId));
        }
    }, [dispatch, damId, selectedDam]);

    if (status === 'loading' && (!selectedDam || selectedDam.dam_id !== damId)) {
        return <div>Loading content...</div>;
    }

    if (error && (!selectedDam || selectedDam.dam_id !== damId)) {
        return <div>Error loading content: {error}</div>;
    }

    if (!selectedDam || selectedDam.dam_id !== damId) {
        return <div>No content available for Dam ID: {damId}</div>;
    }

    return (
        <div className="dam-content">
            <h3>{selectedDam.dam_name}</h3>
            <p>Dam ID: {selectedDam.dam_id}</p>
            {selectedDam.full_volume && <p>Full Volume: {selectedDam.full_volume} cubic meters</p>}
            {children}
        </div>
    );
};

export default DamContent;
