'use client';

import React, { useState } from 'react';
import { InfographicCanvas, UIAction } from './components/InfographicCanvas';
import { ChatInterface } from './components/ChatInterface';
import { TripleTabs } from './components/TripleTabs';
import { StateFilter } from './components/StateFilter';
import { EVMIcon } from './components/EVMIcon';
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

        <div className={styles.headerCenter}>
          <StateFilter selectedState={selectedState} onStateChange={setSelectedState} />
        </div>

        <nav className={styles.headerRight}>
          <button
            className={styles.navBtn}
            onClick={() => setCurrentAction({ action: 'show_evm' })}
          >🗳️ EVM Guide</button>
          <button
            className={styles.navBtn}
            onClick={() => setCurrentAction({ action: 'show_law' })}
          >⚖️ Law & ID</button>
          <button
            className={`${styles.navBtn} ${styles.resetBtn}`}
            onClick={() => setCurrentAction({ action: 'reset' })}
          >⟳ Reset View</button>
        </nav>
      </header>

      <main className={styles.main}>
        {/* Left Column - Tabbed Information Hub */}
        <aside className={styles.sidePanel}>
          <TripleTabs />
        </aside>

        {/* Center Column - Interactive Infographics */}
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

        {/* Right Column - Chat Assistant */}
        <aside className={`${styles.sidePanel} ${styles.chatPanel}`}>
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
