import React from 'react';
import styles from './ProcessInfo.module.css';
import { Info, HelpCircle, ShieldCheck } from 'lucide-react';

export const ProcessInfo: React.FC<{ type: 'voter' | 'candidate' | 'rules' }> = ({ type }) => {
  const content = {
    voter: {
      title: 'Voter Guide',
      icon: <HelpCircle size={18} />,
      items: ['Check Voter List', 'Know your Polling Booth', 'Carry Valid ID', 'Ink on Finger']
    },
    candidate: {
      title: 'Candidate Info',
      icon: <ShieldCheck size={18} />,
      items: ['Nomination Rules', 'Affidavit Submission', 'Expenditure Limits', 'MCC Compliance']
    },
    rules: {
      title: 'Quick Rules',
      icon: <Info size={18} />,
      items: ['No Campaigning 48h before', 'Electronic Voting', 'VVPAT Verification', 'Model Code of Conduct']
    }
  };

  const data = content[type];

  return (
    <div className={styles.infoCard}>
      <div className={styles.infoTitle}>
        {data.icon}
        <h4>{data.title}</h4>
      </div>
      <ul className={styles.infoList}>
        {data.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
