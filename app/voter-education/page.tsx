import React from 'react';
import styles from '../page.module.css';
import { EVMIcon } from '../components/EVMIcon';
import Link from 'next/link';

export default function VoterEducation() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <EVMIcon size={40} />
          <div className={styles.brandText}>
            <span className={styles.brandName}>Matdata <span className={styles.ai}>AI</span></span>
            <span className={styles.brandTag}>Voter Education Hub</span>
          </div>
        </div>
        <nav className={styles.headerCenter}>
          <Link href="/" className={styles.navBtn}>🏠 Dashboard</Link>
          <Link href="/voter-education" className={styles.navBtn} style={{ borderColor: '#000080' }}>📚 Education</Link>
          <Link href="/statistics" className={styles.navBtn}>📊 Statistics</Link>
        </nav>
      </header>

      <main className={styles.main} style={{ display: 'block', overflowY: 'auto', padding: '40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: '#000080', marginBottom: '20px' }}>Your Vote is Your Voice</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#444' }}>
            Voting is the cornerstone of democracy. In India, every citizen above 18 years of age (with some exceptions) 
            has the right to vote. This page provides a deep dive into why your vote matters and how you can be an 
            informed voter.
          </p>

          <section style={{ marginTop: '40px' }}>
            <h2 style={{ color: '#FF9933' }}>1. Why Vote?</h2>
            <p>Elections are the way you choose the people who will make laws and govern the country. By voting, you participate in the decision-making process.</p>
          </section>

          <section style={{ marginTop: '30px' }}>
            <h2 style={{ color: '#138808' }}>2. How to be an Informed Voter?</h2>
            <p>Before you vote, research the candidates. Look at their past performance, their education, and their vision for your constituency. Matdata AI can help you find candidate affidavits!</p>
          </section>

          <div style={{ marginTop: '50px', padding: '20px', background: '#f0f0ff', borderRadius: '12px' }}>
            <h3>Quick Check:</h3>
            <ul>
              <li>Is your name in the Electoral Roll?</li>
              <li>Do you have a valid Photo ID?</li>
              <li>Do you know your Polling Booth?</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
