import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './InfographicCanvas.module.css';
import { AshokaChakra } from './AshokaChakra';
import { CheckCircle2, Users, Vote, ClipboardList, Megaphone, BarChart3 } from 'lucide-react';

export type UIAction = {
  action: 'show_timeline' | 'show_evm' | 'show_stats' | 'reset';
  data?: any;
};

interface InfographicCanvasProps {
  currentAction: UIAction | null;
}

export const InfographicCanvas: React.FC<InfographicCanvasProps> = ({ currentAction }) => {
  return (
    <div className={styles.canvasContainer}>
      <AnimatePresence mode="wait">
        {!currentAction || currentAction.action === 'reset' ? (
          <motion.div
            key="branding"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className={styles.brandingView}
          >
            <AshokaChakra size={200} />
            <h2 className={styles.brandingTitle}>Elections in India</h2>
            <p className={styles.brandingSubtitle}>The World's Largest Democratic Exercise</p>
          </motion.div>
        ) : currentAction.action === 'show_timeline' ? (
          <TimelineView key="timeline" activeStep={currentAction.data?.activeStep || 0} />
        ) : currentAction.action === 'show_evm' ? (
          <EVMView key="evm" highlight={currentAction.data?.highlight} />
        ) : currentAction.action === 'show_stats' ? (
          <StatsView key="stats" topic={currentAction.data?.topic} />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const TimelineView: React.FC<{ activeStep: number }> = ({ activeStep }) => {
  const steps = [
    { title: 'Notification', icon: <Megaphone />, desc: 'Election Commission issues formal notification.' },
    { title: 'Nominations', icon: <ClipboardList />, desc: 'Candidates file nomination papers.' },
    { title: 'Campaigning', icon: <Users />, desc: 'Parties reach out to voters.' },
    { title: 'Polling', icon: <Vote />, desc: 'Voters cast their ballots.' },
    { title: 'Counting', icon: <BarChart3 />, desc: 'Votes are counted securely.' },
    { title: 'Results', icon: <CheckCircle2 />, desc: 'Winners are announced.' },
  ];

  return (
    <motion.div 
      className={styles.timelineContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3>Election Timeline</h3>
      <div className={styles.timelineGrid}>
        {steps.map((step, i) => (
          <div 
            key={i} 
            className={`${styles.stepCard} ${i === activeStep ? styles.activeStep : ''} ${i < activeStep ? styles.completedStep : ''}`}
          >
            <div className={styles.stepIcon}>{step.icon}</div>
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const EVMView: React.FC<{ highlight?: string }> = ({ highlight }) => {
  return (
    <motion.div 
      className={styles.evmContainer}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h3>EVM & VVPAT System</h3>
      <div className={styles.evmGrid}>
        <div className={`${styles.evmPart} ${highlight === 'control_unit' ? styles.highlight : ''}`}>
          <div className={styles.partLabel}>Control Unit</div>
          <div className={styles.partBox}>CU</div>
          <p>Managed by the Presiding Officer.</p>
        </div>
        <div className={`${styles.evmPart} ${highlight === 'ballot_unit' ? styles.highlight : ''}`}>
          <div className={styles.partLabel}>Ballot Unit</div>
          <div className={styles.partBox}>BU</div>
          <p>Where the voter presses the button.</p>
        </div>
        <div className={`${styles.evmPart} ${highlight === 'vvpat' ? styles.highlight : ''}`}>
          <div className={styles.partLabel}>VVPAT</div>
          <div className={styles.partBox}>VVPAT</div>
          <p>Verification slip for the voter.</p>
        </div>
      </div>
    </motion.div>
  );
};

const StatsView: React.FC<{ topic?: string }> = ({ topic }) => {
  return (
    <motion.div 
      className={styles.statsContainer}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h3>Election Insights: {topic || 'General'}</h3>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>960M+</div>
          <div className={styles.statLabel}>Registered Voters</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>1M+</div>
          <div className={styles.statLabel}>Polling Stations</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>543</div>
          <div className={styles.statLabel}>Lok Sabha Seats</div>
        </div>
      </div>
    </motion.div>
  );
};
