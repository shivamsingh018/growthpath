import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

export const ReviewRequestModal: React.FC<{
  initialProjectId?: string;
  initialMentorId?: string;
  onClose: () => void;
}> = ({ initialProjectId, initialMentorId, onClose }) => {
  const { currentUser, portfolios, allMentors, createReviewRequest } = useApp();

  const myPortfolios = portfolios.filter(p => p.designerId === currentUser?.id);

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProjectId || (myPortfolios[0]?.id || '')
  );
  const [selectedMentorId, setSelectedMentorId] = useState<string>(
    initialMentorId || ''
  );
  const [focusQuestions, setFocusQuestions] = useState<string>(
    'I would appreciate your detailed feedback on visual hierarchy, typography scaling, color accessibility, and how clearly my design story comes across.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) return;

    createReviewRequest(selectedProjectId, selectedMentorId, focusQuestions);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} color="var(--accent-light)" />
            </div>
            <h2 style={{ fontSize: '1.35rem' }}>Submit Portfolio Review Request</h2>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
        </div>

        {myPortfolios.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <AlertCircle size={40} color="var(--accent-amber)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No Uploaded Portfolios Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              You need to upload a portfolio project to your dashboard before requesting a mentor review.
            </p>
            <button onClick={onClose} className="btn btn-secondary btn-sm">
              Close & Upload Project
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Select Portfolio Project *
              </label>
              <select 
                className="input-field" 
                value={selectedProjectId}
                onChange={e => setSelectedProjectId(e.target.value)}
                required
              >
                {myPortfolios.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Select Target Mentor (Optional)
              </label>
              <select 
                className="input-field"
                value={selectedMentorId}
                onChange={e => setSelectedMentorId(e.target.value)}
              >
                <option value="">-- Open Pool (Auto-match available mentor) --</option>
                {allMentors.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.title} @ {m.company})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Specific Feedback Areas & Questions for Mentor
              </label>
              <textarea 
                className="input-field" 
                rows={4} 
                value={focusQuestions}
                onChange={e => setFocusQuestions(e.target.value)}
                placeholder="What specific aspects do you want the mentor to evaluate? (e.g. typography hierarchy, spatial flow, case study story format)"
                required
              />
            </div>

            <div style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              💡 <strong>Pro Tip:</strong> Specific questions help mentors deliver actionable pin annotations and personalized improvement steps.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Sparkles size={16} /> Submit Review Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
