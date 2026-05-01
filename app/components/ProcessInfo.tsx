import React from 'react';
import styles from './ProcessInfo.module.css';
import { 
  UserCheck, 
  Search, 
  MapPin, 
  Fingerprint, 
  ShieldCheck, 
  Scale, 
  FileText, 
  Calculator,
  Calendar,
  Building2,
  AlertTriangle,
  Gavel,
  BookOpen,
  CreditCard,
} from 'lucide-react';

export type PanelType = 
  | 'voter_guide' 
  | 'voting_day' 
  | 'candidate_rules' 
  | 'election_laws' 
  | 'eligible_docs' 
  | 'voter_slip' 
  | 'code_of_conduct';

interface ProcessInfoProps {
  type: PanelType;
  onItemClick?: (topic: string, detail: string) => void;
}

const PANELS: Record<PanelType, { title: string; color: string; bg: string; items: { label: string; detail: string; icon: React.ReactNode }[] }> = {
  voter_guide: {
    title: 'New Voter? Start Here',
    color: '#138808',
    bg: 'rgba(19, 136, 8, 0.08)',
    items: [
      { label: 'Register', detail: 'Fill Form 6 on Voter Portal', icon: <UserCheck size={16} /> },
      { label: 'Check Name', detail: 'Verify name in electoral roll', icon: <Search size={16} /> },
      { label: 'Voter ID', detail: 'Download e-EPIC or carry ID', icon: <FileText size={16} /> },
      { label: 'Find Booth', detail: 'Locate your polling station', icon: <MapPin size={16} /> },
    ]
  },
  voting_day: {
    title: 'Voting Day Steps',
    color: '#000080',
    bg: 'rgba(0, 0, 128, 0.08)',
    items: [
      { label: '1. Identification', detail: 'Show your ID to the 1st Polling Officer', icon: <Search size={16} /> },
      { label: '2. Marking', detail: '2nd Officer marks finger with ink', icon: <Fingerprint size={16} /> },
      { label: '3. Ballot', detail: 'Press button on EVM behind the screen', icon: <ShieldCheck size={16} /> },
      { label: '4. Verify', detail: 'Watch the VVPAT slip for 7 seconds', icon: <Calculator size={16} /> },
    ]
  },
  candidate_rules: {
    title: 'For Candidates',
    color: '#FF9933',
    bg: 'rgba(255, 153, 51, 0.08)',
    items: [
      { label: 'Eligibility', detail: 'Must be 25+ years old', icon: <UserCheck size={16} /> },
      { label: 'Affidavit', detail: 'Declare assets and criminal records', icon: <FileText size={16} /> },
      { label: 'Expenses', detail: 'Strict limits on campaign spending', icon: <Calculator size={16} /> },
      { label: 'Symbols', detail: 'ECI assigns unique party symbols', icon: <Scale size={16} /> },
    ]
  },
  election_laws: {
    title: '5 Core Election Laws',
    color: '#1a1a1a',
    bg: 'rgba(0, 0, 0, 0.05)',
    items: [
      { label: 'Article 324', detail: 'Gives ECI power to control elections', icon: <Gavel size={16} /> },
      { label: 'RP Act 1950', detail: 'Rules for voter registration & seats', icon: <BookOpen size={16} /> },
      { label: 'RP Act 1951', detail: 'Conduct of polls & disqualification', icon: <Scale size={16} /> },
      { label: 'Anti-Defection', detail: 'Prevents switching parties after winning', icon: <ShieldCheck size={16} /> },
      { label: 'Election Rules', detail: '1961 rules for EVMs and counting', icon: <FileText size={16} /> },
    ]
  },
  eligible_docs: {
    title: 'Valid Photo IDs',
    color: '#000080',
    bg: 'rgba(0, 0, 128, 0.08)',
    items: [
      { label: 'Voter ID (EPIC)', detail: 'The primary document for voting', icon: <CreditCard size={16} /> },
      { label: 'Aadhaar Card', detail: 'Widely accepted alternative ID', icon: <CreditCard size={16} /> },
      { label: 'PAN/Passport', detail: 'Valid government-issued photo IDs', icon: <CreditCard size={16} /> },
      { label: 'Driving License', detail: 'State-issued valid photo ID', icon: <CreditCard size={16} /> },
    ]
  },
  voter_slip: {
    title: 'Voter Info Slip (VIS)',
    color: '#FF9933',
    bg: 'rgba(255, 153, 51, 0.08)',
    items: [
      { label: 'Distribution', detail: 'Handed to you by ECI before polls', icon: <FileText size={16} /> },
      { label: 'Purpose', detail: 'Shows your serial number and booth', icon: <MapPin size={16} /> },
      { label: 'Not an ID', detail: 'Cannot be used as ID proof alone', icon: <AlertTriangle size={16} /> },
      { label: 'QR Code', detail: 'Scanned at booth for quick entry', icon: <Search size={16} /> },
    ]
  },
  code_of_conduct: {
    title: 'Model Code (MCC)',
    color: '#e63946',
    bg: 'rgba(230, 57, 70, 0.08)',
    items: [
      { label: 'Neutrality', detail: 'No use of Govt. assets for ads', icon: <AlertTriangle size={16} /> },
      { label: 'No Gifts', detail: 'Strict ban on liquor or cash', icon: <AlertTriangle size={16} /> },
      { label: 'Fair Play', detail: 'No hate speech or divisive appeals', icon: <Scale size={16} /> },
      { label: 'cVIGIL', detail: 'App to report MCC violations', icon: <ShieldCheck size={16} /> },
    ]
  }
};

export const ProcessInfo: React.FC<ProcessInfoProps> = ({ type, onItemClick }) => {
  const p = PANELS[type];
  if (!p) return null;

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader} style={{ background: p.bg }}>
        <div className={styles.panelTitle} style={{ color: p.color }}>{p.title}</div>
      </div>
      <div className={styles.panelBody}>
        {p.items.map((item, i) => (
          <div 
            key={i} 
            className={styles.item} 
            style={{ borderLeftColor: p.color }}
            onClick={() => onItemClick?.(item.label, item.detail)}
          >
            <div className={styles.itemHeader}>
              <span className={styles.itemIcon} style={{ color: p.color }}>{item.icon}</span>
              <strong style={{ color: p.color }}>{item.label}</strong>
            </div>
            <div className={styles.itemDetail}>{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
