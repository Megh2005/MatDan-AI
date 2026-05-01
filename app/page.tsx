'use client';

import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { InfographicCanvas, UIAction } from './components/InfographicCanvas';
import { StateFilter } from './components/StateFilter';
import { ProcessInfo } from './components/ProcessInfo';
import styles from './page.module.css';

export default function Home() {
  const [currentAction, setCurrentAction] = useState<UIAction | null>(null);
  const [selectedState, setSelectedState] = useState('');

  const handleMessage = (text: string) => {
    const actionMatch = text.match(/\[UI_ACTION:\s*({.*?})\]/);
    if (actionMatch && actionMatch[1]) {
      try {
        const actionData = JSON.parse(actionMatch[1]);
        setCurrentAction(actionData as UIAction);
      } catch (e) {
        console.error('Failed to parse UI action:', e);
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.backgroundPatterns}>
        <div className={styles.flagStripeSaffron}></div>
        <div className={styles.flagStripeGreen}></div>
      </div>

      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Digital <span className={styles.highlight}>Democracy</span> India</span>
        </div>
        <div className={styles.filterArea}>
          <StateFilter selectedState={selectedState} onStateChange={setSelectedState} />
        </div>
        <nav className={styles.nav}>
          <button onClick={() => setCurrentAction({ action: 'reset' })} className={styles.resetButton}>
            Reset
          </button>
        </nav>
      </header>

      <main className={styles.content}>
        {/* Infographic Area */}
        <section className={styles.canvasSection}>
          <InfographicCanvas currentAction={currentAction} />
        </section>

        {/* Chatbot with surrounding info panels */}
        <section className={styles.chatSection}>
          <div className={styles.chatGrid}>
            <aside className={styles.chatSidebarLeft}>
              <ProcessInfo type="voter" />
            </aside>
            
            <div className={styles.chatCenter}>
              <div className={styles.chatTopInfo}>
                <ProcessInfo type="rules" />
              </div>
              <div className={styles.chatContainer}>
                <ChatInterface onMessageReceived={handleMessage} />
              </div>
            </div>

            <aside className={styles.chatSidebarRight}>
              <ProcessInfo type="candidate" />
            </aside>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 ECI Information Portal. All India Voter Assistance Service.</p>
      </footer>
    </div>
  );
}
