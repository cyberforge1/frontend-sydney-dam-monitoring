// src/components/DamGroupSelector/DamGroupSelector.tsx

import React, { useState, useEffect } from 'react';
import './DamGroupSelector.scss';
import { fetchAllDamGroups } from '../../services/api';

interface DamGroup {
    group_name: string;
}

interface DamGroupSelectorProps {
    onSelectGroup: (group: string) => void;
}

const DamGroupSelector: React.FC<DamGroupSelectorProps> = ({ onSelectGroup }) => {
    const [groups, setGroups] = useState<DamGroup[]>([]);
    const [currentGroup, setCurrentGroup] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadGroups = async () => {
            try {
                const fetchedGroups = await fetchAllDamGroups();
                setGroups(fetchedGroups);
                if (fetchedGroups.length > 0) {
                    setCurrentGroup(fetchedGroups[0].group_name);
                    onSelectGroup(fetchedGroups[0].group_name);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching dam groups:', err);
                setError('Failed to load dam groups.');
                setLoading(false);
            }
        };

        loadGroups();
    }, [onSelectGroup]);

    const handleClick = () => {
        if (groups.length === 0) return;

        const currentIndex = groups.findIndex(group => group.group_name === currentGroup);
        const nextIndex = (currentIndex + 1) % groups.length;
        const nextGroup = groups[nextIndex].group_name;
        setCurrentGroup(nextGroup);
        onSelectGroup(nextGroup);
    };

    const getLabel = (groupName: string): string => {
        // Convert snake_case to Title Case for display
        return groupName
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    if (loading) {
        return <div className="dam-group-selector">Loading groups...</div>;
    }

    if (error) {
        return <div className="dam-group-selector error">{error}</div>;
    }

    return (
        <div className="dam-group-selector">
            <button onClick={handleClick}>{getLabel(currentGroup)}</button>
        </div>
    );
};

export default DamGroupSelector;
