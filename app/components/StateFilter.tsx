import React from 'react';
import { MapPin } from 'lucide-react';
import styles from './StateFilter.module.css';

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
  "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Delhi (NCT)","Puducherry","Jammu & Kashmir","Ladakh",
];

interface StateFilterProps {
  selectedState: string;
  onStateChange: (s: string) => void;
}

export const StateFilter: React.FC<StateFilterProps> = ({ selectedState, onStateChange }) => (
  <div className={styles.filterWrap}>
    <label className={styles.label}>
      <MapPin size={13} />
      State:
    </label>
    <select
      className={styles.select}
      value={selectedState}
      onChange={e => onStateChange(e.target.value)}
    >
      <option value="">All India</option>
      {STATES.map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  </div>
);
