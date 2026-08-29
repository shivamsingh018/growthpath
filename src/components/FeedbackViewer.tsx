import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ReviewRequest, 
  PinAnnotation 
} from '../types';
import { 
  X, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Award, 
  Send, 
  ThumbsUp, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FeedbackViewer: React.FC<{
  reviewRequest: ReviewRequest;
  onClose: () => void;
}> = ({ reviewRequest, onClose }) => {
  const { rateMentorFeedback, portfolios } = useApp();
  const feedback = reviewRequest.feedback;

  const targetProject = portfolios.find(p => p.id === reviewRequest.projectId);
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

  // Student rating state
  const [ratingVal, setRatingVal] = useState<number>(feedback?.studentRating || 5);
  const [ratingComment, setRatingComment] = useState<string>(feedback?.studentReviewComment || '');
  const [hasRated, setHasRated] = useState<boolean>(!!feedback?.studentRating);

  if (!feedback) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" style={{ padding: '2rem', textAlign: 'center' }}>
          No feedback available yet.
        </div>
      </div>
    );
  }

  const activeImage = targetProject?.media[activeMediaIdx]?.url || reviewRequest.projectCoverImage;

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rateMentorFeedback(reviewRequest.id, ratingVal, ratingComment);
    setHasRated(true);
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
  };

  const avgScore = (
    (feedback.scorecard.visualPolish +
    feedback.scorecard.layoutHierarchy +
    feedback.scorecard.storytelling +
    feedback.scorecard.technicalSkill) / 4
  ).toFixed(1);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '1000px', padding: 0, overflow: 'hidden' }}>
        {/* Header Bar */}
        <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface-elevated)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <img src={feedback.mentorAvatar} alt={feedback.mentorName} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem' }}>Feedback by {feedback.mentorName}</h3>
                <span className="badge badge-emerald">Verified Mentor</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {feedback.mentorTitle} • Submitted on {feedback.submittedAt}
              </div>
            </div>
          </div>

          <button onClick={onClose} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
        </div>

        <div style={{ padding: '1.75rem', maxHeight: '80vh', overflowY: 'auto' }}>
          {/* Top Scorecard & Executive Summary Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Scorecard box */}
            <div className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-surface-elevated)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Overall Evaluation</div>
                <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--accent-primary)', lineHeight: 1.1 }}>
                  {avgScore} <span style={{ fontSize: '1.2rem', color: 'var(--text-dim)' }}>/ 5</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Visual Polish:</span>
                  <strong style={{ color: 'var(--accent-light)' }}>{feedback.scorecard.visualPolish} / 5 ★</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Layout & Hierarchy:</span>
                  <strong style={{ color: 'var(--accent-light)' }}>{feedback.scorecard.layoutHierarchy} / 5 ★</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Storytelling Flow:</span>
                  <strong style={{ color: 'var(--accent-light)' }}>{feedback.scorecard.storytelling} / 5 ★</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Technical Skill:</span>
                  <strong style={{ color: 'var(--accent-light)' }}>{feedback.scorecard.technicalSkill} / 5 ★</strong>
                </div>
              </div>
            </div>

            {/* Executive Summary & Action Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-card" style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--accent-secondary)', marginBottom: '0.5rem' }}>Executive Mentor Summary</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  "{feedback.summary}"
                </p>
              </div>

              {feedback.actionItems && feedback.actionItems.length > 0 && (
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-emerald)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle2 size={16} /> Recommended Action Items
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                    {feedback.actionItems.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                        <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Pin Annotation Canvas View */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={18} color="var(--accent-primary)" /> Interactive Pin Annotations on Canvas
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Click numbered pins on the image below to view exact mentor remarks.
              </span>
            </div>

            {targetProject && targetProject.media.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {targetProject.media.map((med, idx) => (
                  <button
                    key={med.id}
                    onClick={() => setActiveMediaIdx(idx)}
                    className={`btn btn-sm ${activeMediaIdx === idx ? 'btn-primary' : 'btn-outline'}`}
                  >
                    Preview Image #{idx + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Canvas Stage */}
            <div style={{ position: 'relative', width: '100%', background: '#050608', borderRadius: 'var(--radius-md)', overflow: 'hidden', textAlign: 'center', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={activeImage} alt="Project Media" style={{ width: '100%', maxHeight: '550px', objectFit: 'contain' }} />

              {/* Render Pins */}
              {feedback.annotations
                .filter(pin => pin.mediaIndex === activeMediaIdx)
                .map((pin, idx) => (
                  <div
                    key={pin.id}
                    className={`pin-marker ${selectedPinId === pin.id ? 'active' : ''}`}
                    style={{ left: `${pin.xPercentage}%`, top: `${pin.yPercentage}%` }}
                    onClick={() => setSelectedPinId(selectedPinId === pin.id ? null : pin.id)}
                  >
                    <div className="pin-pulse" />
                    {idx + 1}
                  </div>
              ))}
            </div>

            {/* Pin Details list */}
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Pin Remarks breakdown:</h4>
              {feedback.annotations.map((pin, idx) => (
                <div 
                  key={pin.id} 
                  onClick={() => setSelectedPinId(pin.id)}
                  style={{
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: selectedPinId === pin.id ? 'var(--accent-glow)' : 'var(--bg-surface-elevated)',
                    border: selectedPinId === pin.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span className="badge badge-indigo">Pin #{idx + 1}</span>
                    <span className="badge badge-emerald">{pin.category}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.5 }}>
                    "{pin.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Rate Mentor Feedback Widget */}
          <div className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-surface-elevated)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Star size={18} color="#f59e0b" fill="#f59e0b" /> Rate Feedback Quality & Mentor Response
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Your rating helps ensure high quality mentorship standards across the platform.
            </p>

            {hasRated ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1rem', borderRadius: 'var(--radius-sm)', color: '#6ee7b7', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} /> Thank you for rating mentor feedback! Your score of {ratingVal}/5 stars was recorded.
              </div>
            ) : (
              <form onSubmit={handleRatingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Score:</span>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingVal(star)}
                      style={{ background: 'none', cursor: 'pointer', padding: 2 }}
                    >
                      <Star size={24} color="#f59e0b" fill={star <= ratingVal ? '#f59e0b' : 'transparent'} />
                    </button>
                  ))}
                  <strong style={{ fontSize: '1.1rem', marginLeft: '0.5rem' }}>{ratingVal} / 5</strong>
                </div>

                <div>
                  <input 
                    type="text" 
                    className="input-field"
                    placeholder="Leave a short thank you note or comment for the mentor..."
                    value={ratingComment}
                    onChange={e => setRatingComment(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Submit Mentor Rating
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
