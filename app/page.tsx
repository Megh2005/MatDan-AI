'use client';

import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { InfographicCanvas, UIAction } from './components/InfographicCanvas';
import styles from './page.module.css';

export default function Home() {
  const [currentAction, setCurrentAction] = useState<UIAction | null>(null);

  const handleMessage = (text: string) => {
    // Regex to find [UI_ACTION: { ... }]
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
        <div className={styles.gradientTop}></div>
        <div className={styles.gradientBottom}></div>
      </div>

      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Election <span className={styles.highlight}>Assistant</span></span>
        </div>
        <nav className={styles.nav}>
          <button onClick={() => setCurrentAction({ action: 'reset' })} className={styles.resetButton}>
            Reset View
          </button>
        </nav>
      </header>

      <main className={styles.content}>
        <div className={styles.canvasWrapper}>
          <InfographicCanvas currentAction={currentAction} />
        </div>
        <div className={styles.chatWrapper}>
          <ChatInterface onMessageReceived={handleMessage} />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 Indian Election Information Portal. Strengthening Democracy.</p>
      </footer>
    </div>
  );
}
