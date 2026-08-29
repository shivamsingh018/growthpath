import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plus, 
  Folder, 
  MessageSquare, 
  Star, 
  Eye, 
  ThumbsUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Edit,
  Trash2,
  Sparkles,
  X
} from 'lucide-react';
import { PortfolioProject, ReviewRequest } from '../types';

export const DesignerDashboard: React.FC<{
  onOpenProject: (proj: PortfolioProject) => void;
  onOpenFeedback: (req: ReviewRequest) => void;
  onRequestReview: (projId?: string) => void;
}> = ({ onOpenProject, onOpenFeedback, onRequestReview }) => {
  const { currentUser, portfolios, reviews, addPortfolioProject } = useApp();
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Form State for new portfolio upload
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'UI/UX' | 'Architecture' | 'Graphic Design' | '3D & Motion' | 'Illustration'>('UI/UX');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Filter designer's own portfolios & reviews
  const myPortfolios = portfolios.filter(p => p.designerId === currentUser?.id);
  const myReviews = reviews.filter(r => r.designerId === currentUser?.id);

  const completedReviews = myReviews.filter(r => r.status === 'Completed');
  const pendingReviews = myReviews.filter(r => r.status === 'Pending' || r.status === 'In Review');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const defaultImages = {
      'UI/UX': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'Architecture': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'Graphic Design': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
      '3D & Motion': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'Illustration': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80'
    };

    const finalCover = coverImage.trim() ? coverImage : defaultImages[category];
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    addPortfolioProject({
      title,
      category,
      description,
      coverImage: finalCover,
      tags: tags.length ? tags : [category, 'Design'],
      media: [
        { id: `m_${Date.now()}_1`, url: finalCover, caption: 'Main Project Preview', type: 'image' }
      ]
    });

    // Reset Form & Close
    setTitle('');
    setDescription('');
    setCoverImage('');
    setTagsInput('');
    setShowUploadModal(false);
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img src={currentUser?.avatar || '/shivam-singh.png'} alt={currentUser?.name || 'Shivam Singh'} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-primary)' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h1 style={{ fontSize: '1.6rem' }}>Welcome back, {currentUser?.name || 'Shivam Singh'}!</h1>
              <span className="badge badge-indigo">{(currentUser as any)?.domain || 'Full Stack'}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px' }}>
              {currentUser?.bio || 'Senior Fullstack Software Engineer'}
            </p>
          </div>
        </div>

        <button onClick={() => setShowUploadModal(true)} className="btn btn-primary btn-lg">
          <Plus size={18} /> Upload Portfolio Project
        </button>
      </div>

      {/* Metric Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Folder size={22} color="var(--accent-primary)" />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{myPortfolios.length}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Uploaded Projects</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={22} color="var(--accent-amber)" />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{pendingReviews.length}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pending Reviews</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={22} color="var(--accent-emerald)" />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{completedReviews.length}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Completed Reviews</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={22} color="var(--accent-secondary)" />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>84 / 100</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Career Readiness</div>
          </div>
        </div>
      </div>

      {/* 7-Step Career Roadmap */}
      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '2.5rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-glow)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>My 7-Step Career Roadmap</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Galgotias University • B.Tech Computer Science Engineering (Class of 2027)</p>
          </div>
          <span className="badge badge-emerald" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
            78% Overall Progress
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.75rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>STEP 01</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, marginTop: '0.2rem' }}>Fundamentals</div>
            <span style={{ fontSize: '0.65rem', color: '#10b981' }}>✓ Completed</span>
          </div>

          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 700 }}>STEP 02</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, marginTop: '0.2rem' }}>Master DSA</div>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-primary)' }}>76% Solved</span>
          </div>

          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>STEP 03</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, marginTop: '0.2rem' }}>Build Projects</div>
            <span style={{ fontSize: '0.65rem', color: '#10b981' }}>8 Projects</span>
          </div>

          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>STEP 04</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, marginTop: '0.2rem' }}>ATS Resume</div>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)' }}>82/100 Score</span>
          </div>

          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700 }}>STEP 05</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, marginTop: '0.2rem' }}>Interviews</div>
            <span style={{ fontSize: '0.65rem', color: '#f59e0b' }}>Ready</span>
          </div>

          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(236, 72, 153, 0.12)', border: '1px solid rgba(236, 72, 153, 0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: '#ec4899', fontWeight: 700 }}>STEP 06</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, marginTop: '0.2rem' }}>Apply Jobs</div>
            <span style={{ fontSize: '0.65rem', color: '#ec4899' }}>12 Active</span>
          </div>

          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: '#a855f7', fontWeight: 700 }}>STEP 07</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, marginTop: '0.2rem' }}>Track App</div>
            <span style={{ fontSize: '0.65rem', color: '#a855f7' }}>Live Tracker</span>
          </div>
        </div>
      </div>

      {/* Section 1: My Portfolio Projects */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.4rem' }}>My Portfolio Projects</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Click any project to view details & submit for review</span>
        </div>

        {myPortfolios.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
            <Folder size={48} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Portfolios Uploaded Yet</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
              Upload your UI/UX case studies, architectural blueprints, or design work to receive feedback from expert mentors.
            </p>
            <button onClick={() => setShowUploadModal(true)} className="btn btn-primary">
              <Plus size={16} /> Upload First Project
            </button>
          </div>
        ) : (
          <div className="grid-autofit-md">
            {myPortfolios.map(proj => {
              // Check if project has an active review
              const projReview = myReviews.find(r => r.projectId === proj.id);

              return (
                <div key={proj.id} className="glass-card" style={{ overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: '180px', cursor: 'pointer' }} onClick={() => onOpenProject(proj)}>
                    <img src={proj.coverImage} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 10, left: 10 }}>
                      <span className="badge badge-indigo">{proj.category}</span>
                    </div>

                    {projReview && (
                      <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                        <span className={`badge ${projReview.status === 'Completed' ? 'badge-emerald' : 'badge-amber'}`}>
                          {projReview.status === 'Completed' ? 'Feedback Ready' : 'Review Pending'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', cursor: 'pointer' }} onClick={() => onOpenProject(proj)}>
                      {proj.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem' }}>
                      {proj.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Eye size={14} /> {proj.views}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <ThumbsUp size={14} /> {proj.likes}
                        </span>
                      </div>

                      {projReview && projReview.status === 'Completed' ? (
                        <button onClick={() => onOpenFeedback(projReview)} className="btn btn-sm btn-primary">
                          Inspect Feedback
                        </button>
                      ) : (
                        <button onClick={() => onRequestReview(proj.id)} className="btn btn-sm btn-outline">
                          Request Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Section 2: Review Requests & Mentor Feedback Tracker */}
      <section>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>My Review Requests & Feedback History</h2>

        {myReviews.length === 0 ? (
          <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            You have not requested any portfolio reviews yet. Select a project above to get started!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {myReviews.map(req => (
              <div key={req.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={req.projectCoverImage} alt={req.projectTitle} style={{ width: 64, height: 64, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <h4 style={{ fontSize: '1.05rem' }}>{req.projectTitle}</h4>
                      <span className={`badge ${req.status === 'Completed' ? 'badge-emerald' : 'badge-amber'}`}>
                        {req.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Assigned Mentor: <strong>{req.targetMentorName || 'Open Pool'}</strong> • Requested: {req.requestedAt}
                    </div>

                    {req.focusQuestions && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic', marginTop: '0.25rem' }}>
                        "{req.focusQuestions}"
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {req.status === 'Completed' && req.feedback ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Feedback Score</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                          {(req.feedback.scorecard.visualPolish + req.feedback.scorecard.layoutHierarchy + req.feedback.scorecard.storytelling + req.feedback.scorecard.technicalSkill) / 4} / 5
                        </div>
                      </div>
                      <button onClick={() => onOpenFeedback(req)} className="btn btn-primary btn-sm">
                        <Sparkles size={14} /> View Interactive Pins & Scorecard
                      </button>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={16} /> Mentor is reviewing your submission...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Upload Project Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.4rem' }}>Upload New Portfolio Project</h2>
              <button onClick={() => setShowUploadModal(false)} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Project Title *
                </label>
                <input 
                  type="text" 
                  className="input-field"
                  placeholder="e.g. NeoPay — Mobile Crypto Wallet & Case Study"
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Category *
                  </label>
                  <select 
                    className="input-field" 
                    value={category} 
                    onChange={e => setCategory(e.target.value as any)}
                  >
                    <option value="UI/UX">UI/UX Design</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="3D & Motion">3D & Motion</option>
                    <option value="Illustration">Illustration</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Cover Image URL (Optional)
                  </label>
                  <input 
                    type="url" 
                    className="input-field"
                    placeholder="https://images.unsplash.com/..." 
                    value={coverImage} 
                    onChange={e => setCoverImage(e.target.value)} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Project Description / Problem & Solution Summary *
                </label>
                <textarea 
                  className="input-field" 
                  rows={4} 
                  placeholder="Describe your design process, target users, tools used, and key challenges solved..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Tags (Comma separated)
                </label>
                <input 
                  type="text" 
                  className="input-field"
                  placeholder="e.g. Fintech, Figma, Design System, Mobile" 
                  value={tagsInput} 
                  onChange={e => setTagsInput(e.target.value)} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowUploadModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Upload & Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
