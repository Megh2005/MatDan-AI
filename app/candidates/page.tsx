'use client';

import React, { useState } from 'react';
import styles from '../page.module.css';
import { EVMIcon } from '../components/EVMIcon';
import { ProcessInfo } from '../components/ProcessInfo';
import { ModalAI } from '../components/ModalAI';
import Link from 'next/link';

export default function CandidatesPage() {
  const [modalData, setModalData] = useState<{ isOpen: boolean; topic: string; detail: string }>({
    isOpen: false,
    topic: '',
    detail: ''
  });

  const openModal = (topic: string, detail: string) => {
    setModalData({ isOpen: true, topic, detail });
  };

  const closeModal = () => {
    setModalData(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <EVMIcon size={40} />
          <div className={styles.brandText}>
            <span className={styles.brandName}>Matdata <span className={styles.ai}>AI</span></span>
            <span className={styles.brandTag}>Candidate Resources</span>
          </div>
        </div>
        <nav className={styles.headerCenter}>
          <Link href="/" className={styles.navBtn}>🏠 Home</Link>
          <Link href="/voters" className={styles.navBtn}>👥 Voters</Link>
          <Link href="/law" className={styles.navBtn}>⚖️ Law</Link>
          <Link href="/candidates" className={styles.navBtn} style={{ borderColor: '#000080' }}>📋 Candidates</Link>
        </nav>
      </header>

      <main className={styles.main} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '30px', overflowY: 'auto' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <h1 style={{ color: '#000080' }}>Candidates & Ethics</h1>
          <p style={{ color: '#666' }}>Click any rule or code to see how it ensures fair play.</p>
        </div>
        <ProcessInfo type="candidate_rules" onItemClick={openModal} />
        <ProcessInfo type="code_of_conduct" onItemClick={openModal} />
      </main>

      <ModalAI 
        isOpen={modalData.isOpen} 
        onClose={closeModal} 
        topic={modalData.topic} 
        detail={modalData.detail} 
      />
    </div>
  );
}
