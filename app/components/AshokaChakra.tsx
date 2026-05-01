import React from 'react';
import styles from './AshokaChakra.module.css';

export const AshokaChakra: React.FC<{ size?: number; animated?: boolean }> = ({ 
  size = 100, 
  animated = true 
}) => {
  return (
    <div 
      className={`${styles.chakraContainer} ${animated ? styles.animate : ''}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.chakraSvg}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#000080"
          strokeWidth="2"
        />
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="none"
          stroke="#000080"
          strokeWidth="1.5"
        />
        {[...Array(24)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 45 * Math.cos((i * 15 * Math.PI) / 180)}
            y2={50 + 45 * Math.sin((i * 15 * Math.PI) / 180)}
            stroke="#000080"
            strokeWidth="1.5"
          />
        ))}
        {[...Array(24)].map((_, i) => (
          <circle
            key={`dot-${i}`}
            cx={50 + 45 * Math.cos(((i * 15 + 7.5) * Math.PI) / 180)}
            cy={50 + 45 * Math.sin(((i * 15 + 7.5) * Math.PI) / 180)}
            r="1"
            fill="#000080"
          />
        ))}
      </svg>
    </div>
  );
};
