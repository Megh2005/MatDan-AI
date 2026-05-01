'use client';

import React, { useState } from 'react';
import { InfographicCanvas, UIAction } from './components/InfographicCanvas';
import { ChatInterface } from './components/ChatInterface';
import { ProcessInfo } from './components/ProcessInfo';
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
      {/* ── Tricolor flag border stripes ── */}
      <div className={styles.flagStripe} data-color="saffron" />

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <EVMIcon size={40} />
          <div className={styles.brandText}>
            <span className={styles.brandName}>Matdata <span className={styles.ai}>AI</span></span>
            <span className={styles.brandTag}>India's Election Intelligence Portal</span>
          </div>
        </div>

        <div className={styles.headerCenter}>
          <StateFilter selectedState={selectedState} onStateChange={setSelectedState} />
        </div>

        <nav className={styles.headerRight}>
          <button
            className={styles.navBtn}
            onClick={() => setCurrentAction({ action: 'show_timeline', data: { activeStep: 0 } })}
          >📅 Timeline</button>
          <button
            className={styles.navBtn}
            onClick={() => setCurrentAction({ action: 'show_evm' })}
          >🗳️ EVM</button>
          <button
            className={styles.navBtn}
            onClick={() => setCurrentAction({ action: 'show_stats' })}
          >📊 Stats</button>
          <button
            className={`${styles.navBtn} ${styles.resetBtn}`}
            onClick={() => setCurrentAction({ action: 'reset' })}
          >⟳ Reset</button>
        </nav>
      </header>

      {/* ── Main 3-column grid ── */}
      <main className={styles.main}>

        {/* LEFT — Info panels stacked */}
        <aside className={styles.sideLeft}>
          <ProcessInfo type="voter" />
          <ProcessInfo type="mcc" />
        </aside>

        {/* CENTER — Infographic on top + Chat below */}
        <section className={styles.center}>
          <div className={styles.infographic}>
            <InfographicCanvas currentAction={currentAction} selectedState={selectedState} />
          </div>
          <div className={styles.chat}>
            <ChatInterface onMessageReceived={handleMessage} selectedState={selectedState} />
          </div>
        </section>

        {/* RIGHT — Info panels stacked */}
        <aside className={styles.sideRight}>
          <ProcessInfo type="candidate" />
          <ProcessInfo type="dates" />
        </aside>

      </main>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.saffron}>■</span>
          <span className={styles.white}>■</span>
          <span className={styles.green}>■</span>
          <span>Election Commission of India</span>
        </div>
        <div>© 2026 Matdata AI · All rights reserved</div>
        <div className={styles.footerRight}>Helpline: <strong>1950</strong> · cVIGIL App</div>
      </footer>

      <div className={styles.flagStripe} data-color="green" />
    </div>
  );
}
