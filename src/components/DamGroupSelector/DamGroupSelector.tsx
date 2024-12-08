// # src/components/DamGroupSelector/DamGroupSelector.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllDamGroupsThunk } from '../../features/damGroups/damGroupsSlice';
import './DamGroupSelector.scss';

interface DamGroupSelectorProps {
    onSelectGroup: (group: string) => void;
}

const DamGroupSelector: React.FC<DamGroupSelectorProps> = ({ onSelectGroup }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { groups, status, error } = useSelector((state: RootState) => state.damGroups);
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllDamGroupsThunk());
        }
    }, [dispatch, status]);

    const handleClick = () => {
        if (groups.length === 0) return;

        const nextIndex = (currentGroupIndex + 1) % groups.length;
        setCurrentGroupIndex(nextIndex);
        onSelectGroup(groups[nextIndex].group_name);
    };

    if (status === 'loading') {
        return <div className="dam-group-selector">Loading groups...</div>;
    }

    if (error) {
        return <div className="dam-group-selector">Error loading groups: {error}</div>;
    }

    if (groups.length === 0) {
        return <div className="dam-group-selector">No dam groups available</div>;
    }

    return (
        <div className="dam-group-selector">
            <button onClick={handleClick}>
                {groups[currentGroupIndex]?.group_name || 'Select a Group'}
            </button>
        </div>
    );
};

export default DamGroupSelector;
