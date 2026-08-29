import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Compass, GraduationCap, Layers, Users, BookOpen, Briefcase, FileCheck, X, ArrowRight, Sparkles, Command } from 'lucide-react';

export const CmdKModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { setCurrentView, portfolios, allMentors } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const quickActions = [
    { label: 'Explore Home', view: 'landing', icon: Compass },
    { label: 'PW Batches & Courses', view: 'batches', icon: GraduationCap },
    { label: 'Project Lab & Challenges', view: 'project-lab', icon: Layers },
    { label: 'My Student Dashboard', view: 'dashboard', icon: Layers },
    { label: 'Find Industry Mentors', view: 'mentors', icon: Users },
    { label: 'ATS Resume Score Checker', view: 'ats', icon: FileCheck },
    { label: 'Job Portal & Careers', view: 'jobs', icon: Briefcase },
    { label: 'Recruiter Mode Dashboard', view: 'recruiter', icon: Sparkles }
  ];

  const filteredActions = quickActions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));
  const filteredPortfolios = portfolios.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  const filteredMentors = allMentors.filter(m => m.name.toLowerCase().includes(query.toLowerCase()) || m.domain.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 2000 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px', padding: 0, overflow: 'hidden', background: '#0e1017' }}>
        {/* Search Header */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={20} color="var(--accent-primary)" />
          <input 
            type="text" 
            autoFocus
            className="input-field" 
            placeholder="Type a command, search projects, mentors, or skills... (ESC to close)"
            style={{ border: 'none', background: 'transparent', fontSize: '1rem', padding: 0 }}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.08)', padding: '0.2rem 0.5rem', borderRadius: 4, color: 'var(--text-dim)' }}>
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '1rem' }}>
          {/* Quick Actions Section */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>
              Quick Navigation
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {filteredActions.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => { setCurrentView(act.view); onClose(); }}
                    style={{
                      padding: '0.75rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-surface-elevated)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Icon size={16} color="var(--accent-light)" />
                      <span>{act.label}</span>
                    </div>
                    <ArrowRight size={14} color="var(--text-dim)" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Portfolios Section */}
          {filteredPortfolios.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>
                Projects ({filteredPortfolios.length})
              </div>
              {filteredPortfolios.map(p => (
                <div
                  key={p.id}
                  onClick={() => { setCurrentView('dashboard'); onClose(); }}
                  style={{ padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.03)', marginBottom: '0.35rem', cursor: 'pointer', fontSize: '0.88rem' }}
                >
                  <div style={{ fontWeight: 600 }}>{p.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.category} • by {p.designerName}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
