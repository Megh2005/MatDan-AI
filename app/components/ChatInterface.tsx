'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MapPin } from 'lucide-react';
import { EVMIcon } from './EVMIcon';
import styles from './ChatInterface.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onMessageReceived: (text: string) => void;
  selectedState: string;
}

const QUICK_PROMPTS = [
  "Show election timeline",
  "How does EVM work?",
  "What is Model Code of Conduct?",
  "Who is eligible to vote?",
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onMessageReceived, selectedState }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `नमस्ते! I'm **Matdata**, your AI guide to India's democratic process. Ask me anything about elections, voting rights, or the constitution. I've automatically detected your location to provide local results! 🇮🇳`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, (error) => {
        console.error("Location access denied or failed", error);
      });
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMessage = text.trim();
    setInput('');
    const updatedMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Inject coordinates into the latest message context
      const contextPrefix = coords 
        ? `[Location: Lat ${coords.lat.toFixed(4)}, Lng ${coords.lng.toFixed(4)}] ` 
        : (selectedState ? `[State: ${selectedState}] ` : '');
      
      const payload = updatedMessages.map((m, i) => 
        (i === updatedMessages.length - 1 && m.role === 'user')
          ? { ...m, content: contextPrefix + m.content }
          : m
      );

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
      });
      const data = await res.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
        onMessageReceived(data.text);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const getCleanContent = (text: string) => {
    return text.replace(/\[UI_ACTION:.*?\]/g, '').trim();
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatHeader}>
        <div className={styles.botIdentity}>
          <div className={styles.botIconWrap}>
            <EVMIcon size={36} />
          </div>
          <div>
            <div className={styles.botName}>Matdata AI</div>
            <div className={styles.botStatus}>
              <span className={styles.dot}></span> {coords ? 'Location Detected' : 'Online'}
            </div>
          </div>
        </div>
        {coords && (
          <div className={styles.stateTag} title={`${coords.lat}, ${coords.lng}`}>
            Active
          </div>
        )}
      </div>

      <div className={styles.quickPrompts}>
        {QUICK_PROMPTS.map((p, i) => (
          <button key={i} className={styles.quickBtn} onClick={() => sendMessage(p)}>
            {p}
          </button>
        ))}
      </div>

      <div className={styles.messages} ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`${styles.message} ${m.role === 'user' ? styles.userMsg : styles.botMsg}`}>
            {m.role === 'assistant' && (
              <div className={styles.msgAvatar}><EVMIcon size={22} /></div>
            )}
            <div className={styles.msgBubble}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {getCleanContent(m.content)}
              </ReactMarkdown>
            </div>
            {m.role === 'user' && (
              <div className={styles.userAvatar}>You</div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.botMsg}`}>
            <div className={styles.msgAvatar}><EVMIcon size={22} /></div>
            <div className={`${styles.msgBubble} ${styles.typing}`}>
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      <form className={styles.inputRow} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Matdata about local elections..."
          disabled={isLoading}
        />
        <button type="submit" className={styles.sendBtn} disabled={isLoading || !input.trim()}>
          {isLoading ? <Loader2 size={18} className={styles.spin} /> : <Send size={18} />}
        </button>
      </form>
    </div>
  );
};
