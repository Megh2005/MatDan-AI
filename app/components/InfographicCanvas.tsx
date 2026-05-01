'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Users, Vote, ClipboardList, Megaphone, BarChart3, Gavel, Shield } from 'lucide-react';
import styles from './InfographicCanvas.module.css';

export type UIAction = {
  action: 'show_timeline' | 'show_evm' | 'show_stats' | 'show_law' | 'reset';
  data?: Record<string, unknown>;
};

interface Props {
  currentAction: UIAction | null;
  selectedState: string;
}

export const InfographicCanvas: React.FC<Props> = ({ currentAction, selectedState }) => {
  const isReset = !currentAction || currentAction.action === 'reset';

  return (
    <div className={styles.canvas}>
      <AnimatePresence mode="wait">
        {isReset && <HomeView key="home" selectedState={selectedState} />}
        {currentAction?.action === 'show_timeline' && (
          <TimelineView key="timeline" activeStep={(currentAction.data?.activeStep as number) ?? 0} />
        )}
        {currentAction?.action === 'show_evm' && (
          <EVMView key="evm" highlight={currentAction.data?.highlight as string} />
        )}
        {currentAction?.action === 'show_stats' && (
          <StatsView key="stats" state={selectedState} />
        )}
        {currentAction?.action === 'show_law' && (
          <LawView key="law" />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Home / Branding ── */
const HomeView: React.FC<{ selectedState: string }> = ({ selectedState }) => (
  <motion.div
    className={styles.homeView}
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.03 }}
    transition={{ duration: 0.3 }}
  >
    <div className={styles.chakraWrap}>
      <svg viewBox="0 0 120 120" width={120} height={120}>
        <circle cx="60" cy="60" r="56" fill="none" stroke="#000080" strokeWidth="3" />
        <circle cx="60" cy="60" r="10" fill="none" stroke="#000080" strokeWidth="2" />
        {[...Array(24)].map((_, i) => (
          <line
            key={i}
            x1="60" y1="60"
            x2={60 + 56 * Math.cos((i * 15 * Math.PI) / 180)}
            y2={60 + 56 * Math.sin((i * 15 * Math.PI) / 180)}
            stroke="#000080" strokeWidth="1.5"
          />
        ))}
      </svg>
    </div>
    <h2 className={styles.homeTitle}>लोकतंत्र की शक्ति</h2>
    <p className={styles.homeSubtitle}>The Power of Democracy</p>
    {selectedState && (
      <div className={styles.stateLabel}>📍 Viewing: <strong>{selectedState}</strong></div>
    )}
    <div className={styles.homePills}>
      <span className={styles.pill} style={{ background: 'rgba(255,153,51,0.1)', color: '#c96f00', border: '1px solid #FF9933' }}>543 Lok Sabha Seats</span>
      <span className={styles.pill} style={{ background: 'rgba(0,0,128,0.07)', color: '#000080', border: '1px solid #000080' }}>960M+ Voters</span>
      <span className={styles.pill} style={{ background: 'rgba(19,136,8,0.08)', color: '#0a5e04', border: '1px solid #138808' }}>1M+ Polling Booths</span>
    </div>
  </motion.div>
);

/* ── Timeline ── */
const STEPS = [
  { title: 'Notification', icon: <Megaphone size={18} />, desc: 'ECI issues formal gazette notification announcing elections.' },
  { title: 'Nominations', icon: <ClipboardList size={18} />, desc: 'Candidates file nomination papers & affidavits.' },
  { title: 'Campaigning', icon: <Users size={18} />, desc: 'Political parties campaign across constituencies.' },
  { title: 'Polling', icon: <Vote size={18} />, desc: 'Voters cast ballots on EVM machines.' },
  { title: 'Counting', icon: <BarChart3 size={18} />, desc: 'Votes counted under strict EC supervision.' },
  { title: 'Results', icon: <CheckCircle2 size={18} />, desc: 'Winners declared and government formation begins.' },
];

const TimelineView: React.FC<{ activeStep: number }> = ({ activeStep }) => (
  <motion.div
    className={styles.timelineView}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
  >
    <h3 className={styles.viewTitle}>Election Process Timeline</h3>
    <div className={styles.timeline}>
      {STEPS.map((s, i) => (
        <React.Fragment key={i}>
          <div className={`${styles.step} ${i === activeStep ? styles.activeStep : ''} ${i < activeStep ? styles.doneStep : ''}`}>
            <div className={styles.stepCircle}>
              {i < activeStep ? <CheckCircle2 size={16} /> : s.icon}
            </div>
            <div className={styles.stepBody}>
              <div className={styles.stepTitle}>{s.title}</div>
              <div className={styles.stepDesc}>{s.desc}</div>
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`${styles.connector} ${i < activeStep ? styles.connectorDone : ''}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  </motion.div>
);

/* ── EVM ── */
const EVMView: React.FC<{ highlight?: string }> = ({ highlight }) => (
  <motion.div
    className={styles.evmView}
    initial={{ opacity: 0, x: 16 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -16 }}
  >
    <h3 className={styles.viewTitle}>Electronic Voting Machine (EVM)</h3>
    <div className={styles.evmRow}>
      {[
        { key: 'control_unit', label: 'Control Unit', abbr: 'CU', color: '#000080', desc: 'Operated by Presiding Officer. Enables voting.' },
        { key: 'ballot_unit', label: 'Ballot Unit', abbr: 'BU', color: '#FF9933', desc: 'Voters press candidate button here.' },
        { key: 'vvpat', label: 'VVPAT', abbr: 'VV', color: '#138808', desc: 'Paper slip visible for 7 seconds. Voter verification.' },
      ].map(({ key, label, abbr, color, desc }) => (
        <div
          key={key}
          className={`${styles.evmCard} ${highlight === key ? styles.evmHighlight : ''}`}
          style={{ '--accent': color } as React.CSSProperties}
        >
          <div className={styles.evmBox} style={{ background: color }}>{abbr}</div>
          <div className={styles.evmLabel}>{label}</div>
          <p className={styles.evmDesc}>{desc}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

/* ── Stats ── */
const StatsView: React.FC<{ state?: string }> = ({ state }) => (
  <motion.div
    className={styles.statsView}
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
  >
    <h3 className={styles.viewTitle}>Election Statistics {state ? `— ${state}` : '(India)'}</h3>
    <div className={styles.statsGrid}>
      {[
        { val: '960M+', label: 'Registered Voters', color: '#FF9933' },
        { val: '543', label: 'Lok Sabha Seats', color: '#000080' },
        { val: '4,120+', label: 'Vidhan Sabha Seats', color: '#138808' },
        { val: '1M+', label: 'Polling Stations', color: '#FF9933' },
      ].map((s, i) => (
        <div key={i} className={styles.statCard} style={{ borderTopColor: s.color }}>
          <div className={styles.statVal} style={{ color: s.color }}>{s.val}</div>
          <div className={styles.statLabel}>{s.label}</div>
        </div>
      ))}
    </div>
  </motion.div>
);

/* ── Law View ── */
const LawView: React.FC = () => (
  <motion.div
    className={styles.lawView}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <h3 className={styles.viewTitle}>Legal & Identification Framework</h3>
    <div className={styles.lawGrid}>
      <div className={styles.lawColumn}>
        <h4><Gavel size={18} /> Important Laws</h4>
        <ul>
          <li><strong>RP Act 1951:</strong> The Bible of Indian elections.</li>
          <li><strong>Article 324:</strong> Constitutional power of ECI.</li>
          <li><strong>MCC:</strong> Rules for fair campaigning.</li>
        </ul>
      </div>
      <div className={styles.lawColumn}>
        <h4><Shield size={18} /> Valid IDs</h4>
        <ul>
          <li>Voter ID (EPIC)</li>
          <li>Aadhaar / PAN Card</li>
          <li>Passport / Driving License</li>
        </ul>
      </div>
    </div>
    <div className={styles.voterSlipNote}>
      <strong>Note on Voter Slip:</strong> The Voter Information Slip (VIS) helps you find your booth but is <u>not</u> a valid ID on its own.
    </div>
  </motion.div>
);
