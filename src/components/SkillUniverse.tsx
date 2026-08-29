import React, { useState } from 'react';
import { Sparkles, Code, Layers, Database, Cloud, Cpu, MessageSquare, Target, CheckCircle2, Trophy } from 'lucide-react';

export const SkillUniverse: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState('All');

  const skills = [
    { name: 'UI/UX & Figma Systems', current: 92, target: 95, domain: 'Design', icon: Layers, color: '#6366f1' },
    { name: 'React 18 & TypeScript', current: 90, target: 95, domain: 'Web Dev', icon: Code, color: '#3b82f6' },
    { name: 'Python & Data Science', current: 88, target: 92, domain: 'Programming', icon: Cpu, color: '#06b6d4' },
    { name: 'Architecture & COA Sheets', current: 85, target: 90, domain: 'Architecture', icon: Layers, color: '#f59e0b' },
    { name: 'Case Study Storytelling', current: 84, target: 90, domain: 'Soft Skills', icon: MessageSquare, color: '#10b981' },
    { name: 'Java & OOP Architecture', current: 82, target: 88, domain: 'Programming', icon: Code, color: '#a5b4fc' },
    { name: 'Docker & Microservices', current: 78, target: 85, domain: 'Cloud & DevOps', icon: Cloud, color: '#38bdf8' },
    { name: 'PostgreSQL & SQL Indexing', current: 76, target: 85, domain: 'Database', icon: Database, color: '#c084fc' },
    { name: 'Data Structures & Algorithms', current: 72, target: 85, domain: 'DSA', icon: Target, color: '#f43f5e' }
  ];

  const domains = ['All', 'Design', 'Web Dev', 'Programming', 'Architecture', 'Cloud & DevOps', 'Database'];

  const filteredSkills = selectedDomain === 'All'
    ? skills
    : skills.filter(s => s.domain === selectedDomain);

  return (
    <div className="glass-card" style={{ padding: '2.25rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-glow)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-indigo" style={{ marginBottom: '0.45rem' }}>
            <Sparkles size={14} /> Interactive Skill Radar & Mastery Universe
          </span>
          <h2 style={{ fontSize: '1.8rem', letterSpacing: '-0.025em' }}>Your Skill Universe</h2>
        </div>

        {/* Domain Filters */}
        <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-surface)', padding: '0.3rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
          {domains.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDomain(d)}
              className={`btn btn-sm ${selectedDomain === d ? 'btn-primary' : 'btn-outline'}`}
              style={{ border: 'none', borderRadius: 'var(--radius-full)' }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.35rem' }}>
        {filteredSkills.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="glass-card" style={{ background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={16} color={s.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{s.domain}</div>
                  </div>
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: s.color }}>{s.current}%</span>
              </div>

              {/* Progress Bar with Glow */}
              <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden', marginBottom: '0.6rem' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    width: `${s.current}%`, 
                    background: `linear-gradient(90deg, ${s.color} 0%, #3b82f6 100%)`, 
                    borderRadius: 4,
                    boxShadow: `0 0 12px ${s.color}`
                  }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-dim)' }}>
                <span>Target: <strong>{s.target}%</strong></span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>Gap: {s.target - s.current}% to level up</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
