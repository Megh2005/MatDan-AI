import React from 'react';
import styles from './ProcessInfo.module.css';

type PanelType = 'voter' | 'candidate' | 'rules' | 'dates' | 'mcc';

interface ProcessInfoProps {
  type: PanelType;
}

const PANELS: Record<PanelType, { title: string; color: string; bg: string; emoji: string; items: { label: string; detail: string }[] }> = {
  voter: {
    title: 'Voter Guide',
    color: '#138808',
    bg: 'rgba(19,136,8,0.1)',
    emoji: '🗳️',
    items: [
      { label: 'Eligibility', detail: 'Must be 18+ Indian citizen' },
      { label: 'Voter ID (EPIC)', detail: 'Carry your Elector Photo ID Card' },
      { label: 'Voter Helpline', detail: 'Call 1950 for voter issues' },
      { label: 'Ink Mark', detail: 'Left index finger marked after voting' },
      { label: 'Secret Ballot', detail: 'Your vote is 100% confidential' },
    ]
  },
  candidate: {
    title: 'Candidate Rules',
    color: '#FF9933',
    bg: 'rgba(255,153,51,0.1)',
    emoji: '📋',
    items: [
      { label: 'Age Limit', detail: 'Min. 25 years for Lok Sabha' },
      { label: 'Nomination', detail: 'File Form 2A with affidavit & deposit' },
      { label: 'Security Deposit', detail: '₹25,000 (General) / ₹12,500 (SC/ST)' },
      { label: 'Expense Limit', detail: 'Max ₹95 lakh per constituency' },
      { label: 'Criminal Records', detail: 'Must disclose all pending cases' },
    ]
  },
  rules: {
    title: 'Key Dates & Phases',
    color: '#000080',
    bg: 'rgba(0,0,128,0.07)',
    emoji: '📅',
    items: [
      { label: 'Notification', detail: '1st step: Official gazette notice' },
      { label: 'Last date of Nom.', detail: 'Typically 7 days after notification' },
      { label: 'Scrutiny', detail: '1 day after nomination deadline' },
      { label: 'Campaigning Ends', detail: '48 hrs before polling day' },
      { label: 'Result Day', detail: '4 weeks after last polling phase' },
    ]
  },
  dates: {
    title: 'Important Bodies',
    color: '#c96f00',
    bg: 'rgba(255,153,51,0.1)',
    emoji: '🏛️',
    items: [
      { label: 'ECI', detail: 'Election Commission of India — conducts elections' },
      { label: 'CEC', detail: 'Chief Election Commissioner heads the ECI' },
      { label: 'RO', detail: 'Returning Officer oversees each constituency' },
      { label: 'DEO', detail: 'District Election Officer manages districts' },
      { label: 'BLO', detail: 'Booth Level Officer updates voter lists' },
    ]
  },
  mcc: {
    title: 'Model Code of Conduct',
    color: '#138808',
    bg: 'rgba(19,136,8,0.08)',
    emoji: '⚖️',
    items: [
      { label: 'Applies', detail: 'From announcement till result day' },
      { label: 'No new schemes', detail: 'Govt. cannot announce new policies' },
      { label: 'No use of govt. vehicles', detail: 'Candidates cannot misuse state assets' },
      { label: 'Hate speech banned', detail: 'No religion/caste based appeals' },
      { label: 'Complaint no.', detail: 'cVIGIL App for real-time reporting' },
    ]
  }
};

export const ProcessInfo: React.FC<ProcessInfoProps> = ({ type }) => {
  const p = PANELS[type];
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader} style={{ background: p.bg }}>
        <div className={styles.icon} style={{ background: p.color + '20' }}>
          <span style={{ fontSize: '1rem' }}>{p.emoji}</span>
        </div>
        <div className={styles.panelTitle} style={{ color: p.color }}>{p.title}</div>
      </div>
      <div className={styles.panelBody}>
        {p.items.map((item, i) => (
          <div
            key={i}
            className={styles.item}
            style={{ borderLeftColor: p.color }}
          >
            <strong style={{ color: p.color }}>{item.label}:</strong>{' '}
            <span>{item.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
