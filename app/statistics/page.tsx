import React from 'react';
import styles from '../page.module.css';
import { EVMIcon } from '../components/EVMIcon';
import Link from 'next/link';

export default function StatisticsPage() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <EVMIcon size={40} />
          <div className={styles.brandText}>
            <span className={styles.brandName}>Matdata <span className={styles.ai}>AI</span></span>
            <span className={styles.brandTag}>Election Insights</span>
          </div>
        </div>
        <nav className={styles.headerCenter}>
          <Link href="/" className={styles.navBtn}>🏠 Dashboard</Link>
          <Link href="/voter-education" className={styles.navBtn}>📚 Education</Link>
          <Link href="/statistics" className={styles.navBtn} style={{ borderColor: '#000080' }}>📊 Statistics</Link>
        </nav>
      </header>

      <main className={styles.main} style={{ display: 'block', overflowY: 'auto', padding: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ color: '#000080', marginBottom: '10px' }}>Election Data Dashboard</h1>
          <p style={{ color: '#666', marginBottom: '30px' }}>Visualizing the scale of the world's largest democratic exercise.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1.5px solid #eee' }}>
              <h3 style={{ color: '#FF9933' }}>Voter Turnout Trend</h3>
              <div style={{ height: '200px', background: '#f9f9ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
                [Chart: Turnout increased from 45% in 1951 to 67%+ in 2019]
              </div>
            </div>
            <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1.5px solid #eee' }}>
              <h3 style={{ color: '#138808' }}>Women Participation</h3>
              <div style={{ height: '200px', background: '#f9f9ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
                [Chart: Women turnout surpassed Men in 2019 for the first time]
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px', background: '#000080', color: 'white', padding: '30px', borderRadius: '16px' }}>
            <h2>Key Facts:</h2>
            <ul style={{ fontSize: '1.1rem' }}>
              <li>India has over 960 million registered voters.</li>
              <li>There are more than 1 million polling stations across the country.</li>
              <li>The 2019 election saw the highest ever turnout at 67.4%.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
