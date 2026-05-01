'use client';

import React, { useState, useEffect } from 'react';
import styles from './ModalAI.module.css';
import { X, Loader2, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import toast from 'react-hot-toast';

interface ModalAIProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  detail: string;
}

export const ModalAI: React.FC<ModalAIProps> = ({ isOpen, onClose, topic, detail }) => {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && topic) {
      fetchAIInfo();
    } else {
      setResponse('');
    }
  }, [isOpen, topic]);

  const fetchAIInfo = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, detail }),
      });
      const data = await res.json();
      if (data.text) {
        setResponse(data.text);
      } else {
        toast.error("Failed to fetch election details.");
        onClose();
      }
    } catch (err) {
      toast.error("ECI Database connection failed.");
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <h2>Matdata AI: {topic}</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <div className={styles.content}>
          {isLoading ? (
            <div className={styles.loaderArea}>
              <Loader2 size={32} className={styles.spin} />
              <p>Fetching from ECI Database...</p>
            </div>
          ) : (
            <div className={styles.responseArea}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {response}
              </ReactMarkdown>
              <div className={styles.verifiedTag}>
                <ShieldCheck size={14} />
                <span>Verified by Matdata AI · Based on Indian Constitution</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.doneBtn} onClick={onClose}>Got it!</button>
        </div>
      </div>
    </div>
  );
};
