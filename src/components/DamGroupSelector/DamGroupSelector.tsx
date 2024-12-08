// src/components/DamGroupSelector/DamGroupSelector.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAllDamGroupsThunk } from '../../features/damGroups/damGroupsSlice';
import './DamGroupSelector.scss';

interface DamGroupSelectorProps {
  onSelectGroup: (group: string) => void;
}

const DamGroupSelector: React.FC<DamGroupSelectorProps> = ({ onSelectGroup }) => {
  const dispatch = useAppDispatch();
  const { groups, status, error } = useAppSelector((state) => state.damGroups);
  const [currentGroup, setCurrentGroup] = React.useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllDamGroupsThunk());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (groups.length > 0 && currentGroup === '') {
      setCurrentGroup(groups[0].group_name);
      onSelectGroup(groups[0].group_name);
    }
  }, [groups, currentGroup, onSelectGroup]);

  const handleClick = () => {
    if (groups.length === 0) return;

    const currentIndex = groups.findIndex(group => group.group_name === currentGroup);
    const nextIndex = (currentIndex + 1) % groups.length;
    const nextGroup = groups[nextIndex].group_name;
    setCurrentGroup(nextGroup);
    onSelectGroup(nextGroup);
  };

  const getLabel = (groupName: string): string =>
    groupName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  if (status === 'loading') {
    return <div className="dam-group-selector">Loading groups...</div>;
  }

  if (status === 'failed') {
    return <div className="dam-group-selector error">{error}</div>;
  }

  return (
    <div className="dam-group-selector">
      <button onClick={handleClick}>{getLabel(currentGroup)}</button>
    </div>
  );
};

export default DamGroupSelector;
