// src/components/ThemeSwitch/ThemeSwitch.tsx
import React from 'react';
import './ThemeSwitch.scss';

export type ThemeName =
  | 'theme-arctic'
  | 'theme-sky'
  | 'theme-powder'
  | 'theme-steel'
  | 'theme-cerulean'
  | 'theme-cyan'
  | 'theme-navy'
  | 'theme-indigo';

const LABELS: Record<ThemeName, string> = {
  'theme-arctic':   'Arctic (Light)',
  'theme-sky':      'Sky → Azure (Light)',
  'theme-powder':   'Powder Neutrals (Light)',
  'theme-steel':    'Steel Greys (Light)',
  'theme-cerulean': 'Cerulean Brand (Light)',
  'theme-cyan':     'Cyan Mist (Light)',
  'theme-navy':     'Deep Navy (Dark)',
  'theme-indigo':   'Indigo Glow (Dark)',
};

type Props = {
  value: ThemeName;
  onChange: (t: ThemeName) => void;
  className?: string;
};

const ThemeSwitch: React.FC<Props> = ({ value, onChange, className }) => {
  return (
    <div className={['ThemeSwitch', className].filter(Boolean).join(' ')}>
      <label htmlFor="theme-select" className="ts__label">Theme</label>
      <select
        id="theme-select"
        className="ts__select"
        value={value}
        onChange={(e) => onChange(e.target.value as ThemeName)}
        aria-label="Select theme"
      >
        {Object.entries(LABELS).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitch;
