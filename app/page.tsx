'use client';

import React, { useState } from 'react';
import { InfographicCanvas, UIAction } from './components/InfographicCanvas';
import { ChatInterface } from './components/ChatInterface';
import { StateFilter } from './components/StateFilter';
import { EVMIcon } from './components/EVMIcon';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const [currentAction, setCurrentAction] = useState<UIAction | null>(null);
  const [selectedState, setSelectedState] = useState('');

  const handleMessage = (text: string) => {
    const match = text.match(/\[UI_ACTION:\s*({.*?})\]/);
    if (match?.[1]) {
      try {
        setCurrentAction(JSON.parse(match[1]) as UIAction);
      } catch {}
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.flagStripe} data-color="saffron" />

      <header className={styles.header}>
        <div className={styles.brand}>
          <EVMIcon size={40} />
          <div className={styles.brandText}>
            <span className={styles.brandName}>Matdata <span className={styles.ai}>AI</span></span>
            <span className={styles.brandTag}>Democratic Intelligence Portal</span>
          </div>
        </div>

        <nav className={styles.headerCenter}>
          <Link href="/" className={styles.navBtn} style={{ borderColor: '#000080' }}>🏠 Home</Link>
          <Link href="/voters" className={styles.navBtn}>👥 Voters</Link>
          <Link href="/law" className={styles.navBtn}>⚖️ Law</Link>
          <Link href="/candidates" className={styles.navBtn}>📋 Candidates</Link>
          <Link href="/voter-education" className={styles.navBtn}>📚 Education</Link>
        </nav>

        <nav className={styles.headerRight}>
          <button
            className={`${styles.navBtn} ${styles.resetBtn}`}
            onClick={() => setCurrentAction({ action: 'reset' })}
          >⟳ Reset View</button>
        </nav>
      </header>

      <main className={styles.mainClear}>
        {/* Main Section - Interactive Infographics */}
        <section className={styles.centerPanel}>
          <div className={styles.infographicBox}>
            <InfographicCanvas currentAction={currentAction} selectedState={selectedState} />
          </div>
          <div className={styles.statsQuickView}>
            <div className={styles.quickStat}>
              <span>Total Seats</span>
              <strong>543</strong>
            </div>
            <div className={styles.quickStat}>
              <span>Voters</span>
              <strong>960M+</strong>
            </div>
            <div className={styles.quickStat}>
              <span>Stations</span>
              <strong>1M+</strong>
            </div>
          </div>
        </section>

        {/* Chat Assistant */}
        <aside className={styles.chatAside}>
          <ChatInterface onMessageReceived={handleMessage} selectedState={selectedState} />
        </aside>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.saffron}>■</span>
          <span className={styles.white}>■</span>
          <span className={styles.green}>■</span>
          <span>Knowledge is Power · Every Vote Counts</span>
        </div>
        <div className={styles.footerRight}>
          Helpline: <strong>1950</strong> · Use <strong>cVIGIL</strong> for violations
        </div>
      </footer>

      <div className={styles.flagStripe} data-color="green" />
    </div>
  );
}
