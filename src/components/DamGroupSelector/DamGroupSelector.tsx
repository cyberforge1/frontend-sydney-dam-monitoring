// src/components/DamGroupSelector/DamGroupSelector.tsx
import React from 'react';
import './DamGroupSelector.scss';
import { DamGroup } from '../../types/types';

interface DamGroupSelectorProps {
  groups: DamGroup[];
  value: string | null;
  onChange: (group: string) => void;
  disabled?: boolean;
}

const DamGroupSelector: React.FC<DamGroupSelectorProps> = ({ groups, value, onChange, disabled }) => {
  if (!groups.length) return <div className="dam-group-selector">No dam groups available</div>;

  return (
    <div className="dam-group-selector">
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="" disabled>Select a Group</option>
        {groups.map(g => (
          <option key={g.group_name} value={g.group_name}>
            {g.group_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DamGroupSelector;
