import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Github, 
  Linkedin, 
  Globe, 
  Sparkles, 
  ArrowLeft,
  Award,
  CheckCircle2
} from 'lucide-react';

export const PublicProfile: React.FC = () => {
  const { currentUser, setCurrentView } = useApp();

  const name = currentUser?.name || 'Shivam Singh';
  const username = (currentUser as any)?.username || 'shivam';
  const role = (currentUser as any)?.role || 'STUDENT';
  const headline = (currentUser as any)?.headline || 'Software Engineering Aspirant';
  const bio = (currentUser as any)?.bio || 'Computer Science Engineering student at Galgotias University focused on software development, problem solving, DSA, data analysis, and building real-world projects.';
  const avatar = currentUser?.avatar || '/shivam-singh.png';

  const getInitials = (n: string) => {
    if (!n) return 'SS';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return n.substring(0, 2).toUpperCase();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', padding: '3rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <button onClick={() => setCurrentView('profile')} className="btn btn-outline btn-sm">
            <ArrowLeft size={16} /> Return to Dashboard
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--accent-emerald)' }}>
            <CheckCircle2 size={16} /> Public Career Profile Verified
          </div>
        </div>

        {/* Public Card */}
        <div className="glass-card" style={{ padding: '3rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-glow)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {avatar ? (
              <img src={avatar} alt={name} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-primary)', boxShadow: 'var(--shadow-glow)' }} />
            ) : (
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)', color: '#fff', fontSize: '2.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {getInitials(name)}
              </div>
            )}

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{name}</h1>
                <span className="badge badge-indigo">@{username}</span>
                <span className="badge badge-emerald">{role}</span>
              </div>
              <p style={{ color: 'var(--accent-light)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.65rem' }}>{headline}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{bio}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>EDUCATION</div>
              <div style={{ fontSize: '1rem', fontWeight: 700 }}>Galgotias University</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>B.Tech Computer Science Engineering (Class of 2027)</div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>TARGET CAREER</div>
              <div style={{ fontSize: '1rem', fontWeight: 700 }}>Software Engineer</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target Companies: Accenture, TCS, Amazon, Google</div>
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="glass-card" style={{ padding: '2rem', background: 'var(--bg-surface-elevated)', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Technical Skills & Competencies</h3>
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            {['Java', 'Python', 'SQL', 'Data Analysis', 'Power BI', 'DSA', 'JavaScript', 'React', 'Node.js', 'Git', 'GitHub'].map((s, idx) => (
              <span key={idx} className="badge badge-indigo" style={{ padding: '0.4rem 0.85rem', fontSize: '0.88rem' }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Public Badges */}
        <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.82rem' }}>
          🔒 Private information (email, mobile, private resumes) is protected & hidden from public view.
        </div>
      </div>
    </div>
  );
};
