'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
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
      content: `नमस्ते! I'm **Matdata**, your AI guide to India's democratic process. ${selectedState ? `I see you're interested in **${selectedState}**! ` : ''}Ask me anything about elections, voting rights, timelines, or the constitution. I can also update the info panel on the left with live infographics! 🇮🇳`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (selectedState) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `📍 Switched to **${selectedState}**. You can now ask me about Lok Sabha & Vidhan Sabha seats, past election results, and voter turnout specific to ${selectedState}!`
        }
      ]);
    }
  }, [selectedState]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMessage = text.trim();
    setInput('');
    const updatedMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const payload = selectedState
        ? updatedMessages.map(m =>
            m === updatedMessages[0]
              ? m
              : m.role === 'user' && m === updatedMessages[updatedMessages.length - 1]
              ? { ...m, content: `[State context: ${selectedState}] ${m.content}` }
              : m
          )
        : updatedMessages;

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

  // Helper to clean message content
  const getCleanContent = (text: string) => {
    return text.replace(/\[UI_ACTION:.*?\]/g, '').trim();
  };

  return (
    <div className={styles.chatWrapper}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.botIdentity}>
          <div className={styles.botIconWrap}>
            <EVMIcon size={36} />
          </div>
          <div>
            <div className={styles.botName}>Matdata AI</div>
            <div className={styles.botStatus}>
              <span className={styles.dot}></span> Online · India's Election Guide
            </div>
          </div>
        </div>
        {selectedState && (
          <div className={styles.stateTag}>📍 {selectedState}</div>
        )}
      </div>

      {/* Quick prompts */}
      <div className={styles.quickPrompts}>
        {QUICK_PROMPTS.map((p, i) => (
          <button key={i} className={styles.quickBtn} onClick={() => sendMessage(p)}>
            {p}
          </button>
        ))}
      </div>

      {/* Messages */}
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

      {/* Input */}
      <form className={styles.inputRow} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Matdata about Indian elections..."
          disabled={isLoading}
        />
        <button type="submit" className={styles.sendBtn} disabled={isLoading || !input.trim()}>
          {isLoading ? <Loader2 size={18} className={styles.spin} /> : <Send size={18} />}
        </button>
      </form>
    </div>
  );
};
