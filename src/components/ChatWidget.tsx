import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, X, Send, Bot, User, RefreshCw, FileCheck, Layers, Award, Calendar, Users } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const ChatWidget: React.FC = () => {
  const { setCurrentView } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Hello Shivam! I am your AI Career & Education Assistant. How can I help you today with study kits, portfolio reviews, or ATS resume scoring?',
      timestamp: 'Just now'
    }
  ]);

  const quickActions = [
    { label: 'Review my resume', icon: FileCheck, action: () => handleQuickAction('How can I optimize my ATS resume score to 90%+?', 'ats') },
    { label: 'Review my project', icon: Layers, action: () => handleQuickAction('Run an automated AI audit on my latest fullstack project.', 'project-lab') },
    { label: 'Prepare for interview', icon: Award, action: () => handleQuickAction('Give me 3 technical interview practice questions for React & Data Structures.', null) },
    { label: 'Create learning plan', icon: Calendar, action: () => handleQuickAction('Create a 4-week structured study roadmap for Class 11th-12th & Engineering.', null) },
    { label: 'Find a mentor', icon: Users, action: () => handleQuickAction('Connect me with lead educator Shivam Singh for direct portfolio review.', 'mentors') }
  ];

  const handleQuickAction = (promptText: string, targetView: string | null) => {
    sendMessage(promptText);
    if (targetView) {
      setTimeout(() => setCurrentView(targetView), 600);
    }
  };

  const sendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "I am analyzing your request! You can explore PW-style batches, run instant project quality scorecards in Project Lab, or check your ATS resume match under Shivam Singh's mentorship.";

      const query = textToSend.toLowerCase();
      if (query.includes('resume') || query.includes('ats')) {
        replyText = "Your resume score is currently 82/100! To reach 90%+, add quantitative metric achievements (e.g., 'reduced API latency by 40%') and include Docker & PostgreSQL keywords. Navigating to ATS Checker...";
      } else if (query.includes('project') || query.includes('audit')) {
        replyText = "Navigating to Project Lab! Paste your GitHub or Figma link to generate an instant score for Code Quality, UI/UX Polish, and README Documentation.";
      } else if (query.includes('interview')) {
        replyText = "Here is your practice question: 1. Explain the difference between React virtual DOM reconciliation and direct DOM manipulation. How would you optimize re-renders in a large app?";
      } else if (query.includes('roadmap') || query.includes('plan')) {
        replyText = "Here is your 4-Week Study Plan: Week 1: Data Structures & Arrays. Week 2: React Component Design Systems. Week 3: REST & PostgreSQL APIs. Week 4: Case Study Portfolio & ATS Resume.";
      } else if (query.includes('mentor')) {
        replyText = "Connecting to Mentors Directory! Shivam Singh (Executive Creative Director & Founder) is available for coordinate-pinned portfolio feedback.";
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 999,
            background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: 'var(--radius-full)',
            padding: '0.75rem 1.25rem',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.45), 0 0 24px var(--accent-glow)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.9rem',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
            animation: 'pulseGlowSlow 4s infinite ease-in-out'
          }}
          className="float-gentle"
        >
          <Sparkles size={18} />
          <span>✦ Ask AI Assistant</span>
          <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '0.1rem 0.45rem', color: '#ffffff', background: 'rgba(255,255,255,0.25)' }}>
            Copilot
          </span>
        </button>
      )}

      {/* Sliding AI Panel */}
      {isOpen && (
        <div 
          className="glass-card" 
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '380px',
            height: '520px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px var(--accent-glow)',
            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Panel Header */}
          <div style={{ padding: '1rem 1.25rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={18} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>AI Career Copilot</div>
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>● Online & Ready</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
          </div>

          {/* Quick Actions Pills */}
          <div style={{ padding: '0.65rem 0.85rem', background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '0.4rem', overflowX: 'auto' }}>
            {quickActions.map((qa, idx) => {
              const Icon = qa.icon;
              return (
                <button
                  key={idx}
                  onClick={qa.action}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.74rem',
                    color: 'var(--text-main)',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                >
                  <Icon size={12} color="var(--accent-primary)" /> {qa.label}
                </button>
              );
            })}
          </div>

          {/* Chat Messages Body */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {messages.map(m => (
              <div 
                key={m.id} 
                style={{ 
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.sender === 'user' ? 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)' : 'var(--bg-surface)',
                  color: '#ffffff',
                  padding: '0.75rem 1rem',
                  borderRadius: '14px',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  boxShadow: 'var(--shadow-sm)',
                  border: m.sender === 'ai' ? '1px solid var(--border-subtle)' : 'none'
                }}
              >
                {m.text}
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: 'var(--bg-surface)', color: 'var(--accent-light)', padding: '0.5rem 0.85rem', borderRadius: 12, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <RefreshCw size={14} className="spin" /> ● AI is thinking...
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} style={{ padding: '0.75rem', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Ask Copilot anything..."
              style={{ fontSize: '0.85rem', padding: '0.5rem 0.85rem' }}
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0.5rem 0.85rem' }}>
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
