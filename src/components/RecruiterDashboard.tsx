import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Search, Filter, Star, Briefcase, FileCheck, CheckCircle2, Send, Award, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RecruiterDashboard: React.FC = () => {
  const { portfolios, setCurrentView } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);
  const [contactingCandidate, setContactingCandidate] = useState<any>(null);

  const candidates = [
    {
      id: 'cand_1',
      name: 'Shivam Singh',
      avatar: '/shivam-singh.png',
      headline: 'Senior UI/UX & Fullstack Software Engineer',
      domain: 'UI/UX & Software Engineering',
      readinessScore: 84,
      atsScore: 88,
      skills: ['React 18', 'TypeScript', 'Figma Design Systems', 'WCAG 2.1', 'Node.js', 'PostgreSQL'],
      portfolioCount: portfolios.length,
      location: 'San Francisco, CA & New Delhi',
      verifiedStatus: 'Verified Candidate ✓'
    },
    {
      id: 'cand_2',
      name: 'Shivam Singh (Architectural Practice)',
      avatar: '/shivam-singh.png',
      headline: 'COA Licensed Architectural Project Designer',
      domain: 'Architecture',
      readinessScore: 86,
      atsScore: 90,
      skills: ['Rhino 3D', 'Revit', 'COA Presentation Sheets', 'Sustainable Timber', 'V-Ray'],
      portfolioCount: 2,
      location: 'London, UK & New Delhi',
      verifiedStatus: 'Verified Candidate ✓'
    }
  ];

  const filteredCandidates = candidates.filter(c => {
    const matchesDomain = selectedDomain === 'All' || c.domain.includes(selectedDomain);
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.headline.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const toggleShortlist = (id: string) => {
    const isSaved = shortlistedIds.includes(id);
    setShortlistedIds(prev => isSaved ? prev.filter(i => i !== id) : [...prev, id]);
    if (!isSaved) {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '1rem', padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
          <ShieldCheck size={16} /> Recruiter Talent Discovery Portal — Founded by Shivam Singh
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Discover Verified Candidates & ATS-Audited Portfolios
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Hiring teams and tech studios can evaluate candidate Career Readiness Scores (84+), inspect live case studies, and directly contact top talents.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search candidates by skill, domain, or candidate name..."
            style={{ paddingLeft: '2.5rem' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['All', 'UI/UX', 'Architecture', 'Software Engineering'].map(d => (
            <button
              key={d}
              onClick={() => setSelectedDomain(d)}
              className={`btn btn-sm ${selectedDomain === d ? 'btn-primary' : 'btn-outline'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {filteredCandidates.map(c => {
          const isShortlisted = shortlistedIds.includes(c.id);

          return (
            <div key={c.id} className="glass-card" style={{ padding: '1.75rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ flex: 1, minWidth: '320px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <img src={c.avatar} alt={c.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.3rem' }}>{c.name}</h3>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{c.verifiedStatus}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--accent-light)', fontWeight: 600 }}>{c.headline}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{c.location}</div>
                  </div>
                </div>

                {/* Score Pills */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Career Readiness Score</span>
                    <strong style={{ fontSize: '1.1rem', color: '#10b981' }}>{c.readinessScore} / 100</strong>
                  </div>

                  <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>ATS Resume Match</span>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--accent-primary)' }}>{c.atsScore}% Match</strong>
                  </div>
                </div>

                {/* Skill Badges */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {c.skills.map(s => (
                    <span key={s} className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '180px' }}>
                <button 
                  onClick={() => toggleShortlist(c.id)} 
                  className={`btn btn-sm ${isShortlisted ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%' }}
                >
                  {isShortlisted ? '✓ Shortlisted' : 'Shortlist Candidate'}
                </button>

                <button 
                  onClick={() => setContactingCandidate(c)} 
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                >
                  <Send size={14} /> Contact Candidate
                </button>

                <button 
                  onClick={() => setCurrentView('dashboard')} 
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%' }}
                >
                  View Portfolios ({c.portfolioCount})
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recruiter Contact Modal */}
      {contactingCandidate && (
        <div className="modal-overlay" onClick={() => setContactingCandidate(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '550px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Contact {contactingCandidate.name}</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Send a direct interview inquiry or offer for {contactingCandidate.headline}.
            </p>

            <form onSubmit={e => {
              e.preventDefault();
              alert(`Interview message sent to ${contactingCandidate.name}!`);
              setContactingCandidate(null);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Recruiter Company Name *
                </label>
                <input type="text" className="input-field" placeholder="e.g. Google Design / Vercel Labs" required />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Inquiry Message *
                </label>
                <textarea className="input-field" rows={4} defaultValue={`Hello ${contactingCandidate.name},\n\nWe were impressed by your Career Readiness Score (${contactingCandidate.readinessScore}/100) and verified portfolio projects. We would love to discuss potential senior roles at our company.`} required />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setContactingCandidate(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Send Interview Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
