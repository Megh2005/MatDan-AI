import React, { useState } from 'react';
import styles from './TripleTabs.module.css';
import { ProcessInfo } from './ProcessInfo';
import { User, ClipboardList, Scale } from 'lucide-react';

export const TripleTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { 
      label: 'Voter Hub', 
      icon: <User size={18} />, 
      content: (
        <div className={styles.tabContent}>
          <ProcessInfo type="voter_guide" />
          <ProcessInfo type="voting_day" />
          <ProcessInfo type="voter_slip" />
        </div>
      )
    },
    { 
      label: 'Election Law', 
      icon: <Scale size={18} />, 
      content: (
        <div className={styles.tabContent}>
          <ProcessInfo type="election_laws" />
          <ProcessInfo type="eligible_docs" />
        </div>
      )
    },
    { 
      label: 'Candidates', 
      icon: <ClipboardList size={18} />, 
      content: (
        <div className={styles.tabContent}>
          <ProcessInfo type="candidate_rules" />
          <ProcessInfo type="code_of_conduct" />
        </div>
      )
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        {tabs.map((tab, i) => (
          <button 
            key={i} 
            className={`${styles.tabButton} ${activeTab === i ? styles.active : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.contentArea}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};
