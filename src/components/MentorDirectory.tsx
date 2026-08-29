import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Briefcase, 
  Award,
  Sparkles,
  MapPin
} from 'lucide-react';
import { MentorProfile } from '../types';

export const MentorDirectory: React.FC<{
  onOpenMentorModal: (mentor: MentorProfile) => void;
  onRequestReviewWithMentor: (mentorId: string) => void;
}> = ({ onOpenMentorModal, onRequestReviewWithMentor }) => {
  const { allMentors } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  const domains = ['All', 'UI/UX Design', 'Architecture', 'Graphic Design', '3D & Motion'];

  const filteredMentors = allMentors.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDomain = selectedDomain === 'All' || m.domain === selectedDomain;

    return matchesSearch && matchesDomain;
  });

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Industry Mentors Catalog</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Connect with seasoned creative directors, lead architects, and product design leaders for 1-on-1 portfolio feedback.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search by mentor name, company, or specialty (e.g. Google, Typography, Timber)..."
            style={{ paddingLeft: '2.5rem' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {domains.map(dom => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`btn btn-sm ${selectedDomain === dom ? 'btn-primary' : 'btn-outline'}`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Mentor Cards Grid */}
      {filteredMentors.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No mentors match your search filter. Try searching for "UI/UX" or clearing your query.
        </div>
      ) : (
        <div className="grid-autofit-md">
          {filteredMentors.map(mentor => (
            <div key={mentor.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Profile Header */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={mentor.avatar} alt={mentor.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, background: '#10b981', width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--bg-surface)' }} title="Available for review" />
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.15rem' }}>{mentor.name}</h3>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-light)' }}>{mentor.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Briefcase size={12} /> {mentor.company} • {mentor.yearsExperience} yrs exp
                    </div>
                  </div>
                </div>

                {/* Bio & Specialties */}
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {mentor.bio}
                </p>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  {mentor.specialties.map(spec => (
                    <span key={spec} className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Stats & Actions */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Star size={16} color="#f59e0b" fill="#f59e0b" />
                    <strong>{mentor.avgRating}</strong>
                    <span style={{ color: 'var(--text-dim)' }}>({mentor.reviewsCompleted} reviews)</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    <Clock size={14} /> ~{mentor.responseTimeHours}h response
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button onClick={() => onOpenMentorModal(mentor)} className="btn btn-outline btn-sm">
                    View Profile
                  </button>

                  <button onClick={() => onRequestReviewWithMentor(mentor.id)} className="btn btn-primary btn-sm">
                    <Sparkles size={14} /> Request Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
