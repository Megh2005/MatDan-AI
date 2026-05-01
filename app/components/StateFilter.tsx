import React from 'react';
import styles from './StateFilter.module.css';
import { MapPin } from 'lucide-react';

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Puducherry", "J&K", "Ladakh"
];

interface StateFilterProps {
  onStateChange: (state: string) => void;
  selectedState: string;
}

export const StateFilter: React.FC<StateFilterProps> = ({ onStateChange, selectedState }) => {
  return (
    <div className={styles.filterContainer}>
      <label className={styles.label}>
        <MapPin size={16} />
        <span>Select State:</span>
      </label>
      <select 
        className={styles.select}
        value={selectedState}
        onChange={(e) => onStateChange(e.target.value)}
      >
        <option value="">All India</option>
        {STATES.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
};
