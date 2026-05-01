import React from 'react';

// EVMIcon — Indian Electronic Voting Machine stylized icon
export const EVMIcon: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer body of EVM control unit */}
    <rect x="4" y="10" width="56" height="44" rx="6" fill="#1a1a2e" />
    <rect x="4" y="10" width="56" height="44" rx="6" stroke="#000080" strokeWidth="1.5" />

    {/* Screen panel */}
    <rect x="8" y="14" width="48" height="18" rx="3" fill="#0f3460" />
    {/* Screen text lines */}
    <rect x="12" y="18" width="20" height="2.5" rx="1" fill="#FF9933" />
    <rect x="12" y="23" width="28" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
    <rect x="12" y="27" width="20" height="2" rx="1" fill="rgba(255,255,255,0.2)" />

    {/* Saffron stripe on top of EVM */}
    <rect x="4" y="10" width="56" height="5" rx="6" fill="#FF9933" />
    {/* Green stripe at bottom of EVM */}
    <rect x="4" y="49" width="56" height="5" rx="6" fill="#138808" />

    {/* Button row */}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <circle cx={14 + i * 12} cy={42} r="4" fill="#243b6e" stroke="#000080" strokeWidth="1" />
        <circle cx={14 + i * 12} cy={42} r="2" fill={i === 0 ? '#FF9933' : i === 3 ? '#138808' : '#ffffff'} opacity="0.7" />
      </g>
    ))}

    {/* Ashoka Chakra small watermark on control unit */}
    <circle cx="52" cy="42" r="4" fill="none" stroke="#000080" strokeWidth="1" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <line
        key={i}
        x1="52"
        y1="42"
        x2={52 + 4 * Math.cos((i * 45 * Math.PI) / 180)}
        y2={42 + 4 * Math.sin((i * 45 * Math.PI) / 180)}
        stroke="#000080"
        strokeWidth="0.8"
      />
    ))}

    {/* Voted checkmark badge */}
    <circle cx="52" cy="14" r="8" fill="#138808" />
    <polyline
      points="48.5,14 51,16.5 55.5,11"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
