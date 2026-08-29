import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FolderGit2, 
  MapPin, 
  Plus, 
  Trash2, 
  Star, 
  CheckSquare, 
  Send, 
  Sparkles, 
  Layers, 
  AlertCircle,
  HelpCircle,
  X
} from 'lucide-react';
import { ReviewRequest, PinAnnotation, FeedbackScorecard, PortfolioProject } from '../types';

export const MentorStudio: React.FC<{
  onInspectCompletedFeedback?: (req: ReviewRequest) => void;
}> = ({ onInspectCompletedFeedback }) => {
  const { currentUser, reviews, portfolios, submitMentorFeedback } = useApp();

  // Selected request to review in studio
  const [activeRequest, setActiveRequest] = useState<ReviewRequest | null>(() => {
    // Pick first pending request or first request available
    return reviews.find(r => r.status === 'Pending' || r.status === 'In Review') || reviews[0] || null;
  });

  // Target project being reviewed
  const targetProject = activeRequest 
    ? portfolios.find(p => p.id === activeRequest.projectId) 
    : null;

  // Active media image index
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);

  // Pin annotation state being created
  const [annotations, setAnnotations] = useState<PinAnnotation[]>(() => {
    return activeRequest?.feedback?.annotations || [];
  });

  // Pin popup state when clicking on canvas
  const [newPinCoords, setNewPinCoords] = useState<{ x: number; y: number } | null>(null);
  const [pinCategory, setPinCategory] = useState<PinAnnotation['category']>('Layout');
  const [pinComment, setPinComment] = useState('');
  const [activePinId, setActivePinId] = useState<string | null>(null);

  // Scorecard state
  const [scorecard, setScorecard] = useState<FeedbackScorecard>({
    visualPolish: activeRequest?.feedback?.scorecard.visualPolish || 4,
    layoutHierarchy: activeRequest?.feedback?.scorecard.layoutHierarchy || 4,
    storytelling: activeRequest?.feedback?.scorecard.storytelling || 4,
    technicalSkill: activeRequest?.feedback?.scorecard.technicalSkill || 4
  });

  // Action items state
  const [actionItems, setActionItems] = useState<string[]>(
    activeRequest?.feedback?.actionItems || [
      'Refine typography weight hierarchy on secondary card headers',
      'Increase color contrast for graph background grids'
    ]
  );
  const [newItemInput, setNewItemInput] = useState('');

  // Summary state
  const [summary, setSummary] = useState(
    activeRequest?.feedback?.summary || 
    'Solid portfolio presentation! Focus on polishing secondary element contrast and spacing consistency to elevate visual hierarchy and overall polish.'
  );

  // Switch active request
  const handleSelectRequest = (req: ReviewRequest) => {
    setActiveRequest(req);
    setActiveMediaIdx(0);
    setAnnotations(req.feedback?.annotations || []);
    if (req.feedback) {
      setScorecard(req.feedback.scorecard);
      setActionItems(req.feedback.actionItems);
      setSummary(req.feedback.summary);
    }
  };

  // Click on Canvas to place pin
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setNewPinCoords({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
    setPinComment('');
  };

  const handleSavePin = () => {
    if (!newPinCoords || !pinComment.trim()) return;

    const newPin: PinAnnotation = {
      id: `pin_${Date.now()}`,
      mediaIndex: activeMediaIdx,
      xPercentage: newPinCoords.x,
      yPercentage: newPinCoords.y,
      category: pinCategory,
      comment: pinComment.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAnnotations(prev => [...prev, newPin]);
    setNewPinCoords(null);
    setPinComment('');
  };

  const handleDeletePin = (pinId: string) => {
    setAnnotations(prev => prev.filter(p => p.id !== pinId));
  };

  const handleAddActionItem = () => {
    if (!newItemInput.trim()) return;
    setActionItems(prev => [...prev, newItemInput.trim()]);
    setNewItemInput('');
  };

  const handleSubmitFeedback = () => {
    if (!activeRequest) return;

    submitMentorFeedback(activeRequest.id, {
      summary,
      scorecard,
      annotations,
      actionItems,
      recommendedResources: ['Material Design Guidelines', 'AuraMentor Portfolio Toolkit']
    });
  };

  const activeImage = targetProject?.media[activeMediaIdx]?.url || activeRequest?.projectCoverImage;

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem 1.5rem' }}>
      {/* Studio Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <h1 style={{ fontSize: '2rem' }}>Interactive Mentor Review Studio</h1>
            <span className="badge badge-emerald">Live Workspace</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Click anywhere on portfolio previews to place pin markers, assign rating scorecards, and publish structured feedback.
          </p>
        </div>

        {activeRequest && (
          <button onClick={handleSubmitFeedback} className="btn btn-primary btn-lg">
            <Send size={18} /> Publish Mentor Feedback
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.75rem', alignItems: 'start' }}>
        {/* Left Column: Review Request Selector Queue */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FolderGit2 size={18} color="var(--accent-primary)" /> Submission Queue
            </span>
            <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>{reviews.length}</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {reviews.map(req => (
              <div
                key={req.id}
                onClick={() => handleSelectRequest(req)}
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: activeRequest?.id === req.id ? 'var(--accent-glow)' : 'var(--bg-surface-elevated)',
                  border: activeRequest?.id === req.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <img src={req.projectCoverImage} alt={req.projectTitle} style={{ width: 44, height: 44, borderRadius: 4, objectFit: 'cover' }} />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {req.projectTitle}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      By {req.designerName}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span className={`badge ${req.status === 'Completed' ? 'badge-emerald' : 'badge-amber'}`}>
                    {req.status}
                  </span>
                  <span style={{ color: 'var(--text-dim)' }}>{req.requestedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Main Column: Canvas Annotator & Scorecard Studio */}
        {!activeRequest ? (
          <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Select a review request from the queue to start reviewing.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Student Request Info Bar */}
            <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <img src={activeRequest.designerAvatar} alt={activeRequest.designerName} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <strong style={{ fontSize: '0.95rem' }}>{activeRequest.designerName}'s Review Prompt</strong>
                  <span className="badge badge-indigo" style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}>{activeRequest.projectCategory}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontStyle: 'italic', background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                "{activeRequest.focusQuestions}"
              </p>
            </div>

            {/* Interactive Canvas Stage */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={18} color="var(--accent-primary)" /> Interactive Visual Pin Annotator
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    🎯 <strong>Click anywhere on the image</strong> to place a pinned comment for the student.
                  </span>
                </div>

                <span className="badge badge-indigo">
                  {annotations.filter(a => a.mediaIndex === activeMediaIdx).length} Pins Placed
                </span>
              </div>

              {/* Media Tabs if multiple */}
              {targetProject && targetProject.media.length > 1 && (
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  {targetProject.media.map((med, idx) => (
                    <button
                      key={med.id}
                      onClick={() => setActiveMediaIdx(idx)}
                      className={`btn btn-sm ${activeMediaIdx === idx ? 'btn-primary' : 'btn-outline'}`}
                    >
                      Image #{idx + 1}
                    </button>
                  ))}
                </div>
              )}

              {/* The Image Canvas Container */}
              <div 
                onClick={handleCanvasClick}
                style={{
                  position: 'relative',
                  width: '100%',
                  background: '#050608',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  cursor: 'crosshair',
                  userSelect: 'none',
                  minHeight: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {activeImage ? (
                  <img 
                    src={activeImage} 
                    alt="Portfolio Preview" 
                    style={{ width: '100%', maxHeight: '550px', objectFit: 'contain', display: 'block' }} 
                  />
                ) : (
                  <div style={{ color: 'var(--text-dim)', padding: '4rem' }}>No image media available</div>
                )}

                {/* Render Existing Pins */}
                {annotations
                  .filter(pin => pin.mediaIndex === activeMediaIdx)
                  .map((pin, idx) => (
                    <div
                      key={pin.id}
                      className={`pin-marker ${activePinId === pin.id ? 'active' : ''}`}
                      style={{ left: `${pin.xPercentage}%`, top: `${pin.yPercentage}%` }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePinId(pin.id === activePinId ? null : pin.id);
                      }}
                      title={`${pin.category}: ${pin.comment}`}
                    >
                      <div className="pin-pulse" />
                      {idx + 1}
                    </div>
                ))}

                {/* Render Temporary New Pin Form Overlay */}
                {newPinCoords && (
                  <div 
                    onClick={e => e.stopPropagation()}
                    style={{
                      position: 'absolute',
                      left: `${Math.min(newPinCoords.x, 70)}%`,
                      top: `${Math.min(newPinCoords.y, 65)}%`,
                      background: 'var(--bg-surface-elevated)',
                      border: '2px solid var(--accent-primary)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      width: '280px',
                      boxShadow: 'var(--shadow-lg)',
                      zIndex: 100,
                      animation: 'fadeIn 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--accent-light)' }}>Add Pin Comment</strong>
                      <button onClick={() => setNewPinCoords(null)} style={{ color: 'var(--text-muted)' }}><X size={14} /></button>
                    </div>

                    <div style={{ marginBottom: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Category</label>
                      <select 
                        className="input-field" 
                        style={{ padding: '0.35rem', fontSize: '0.8rem' }}
                        value={pinCategory}
                        onChange={e => setPinCategory(e.target.value as any)}
                      >
                        <option value="Layout">Layout & Alignment</option>
                        <option value="Typography">Typography & Font Scale</option>
                        <option value="Color & Contrast">Color & Contrast (WCAG)</option>
                        <option value="Spatial Flow">Spatial Flow & Padding</option>
                        <option value="Usability">Usability & UX</option>
                        <option value="General">General Remark</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <textarea 
                        className="input-field" 
                        rows={3}
                        style={{ fontSize: '0.8rem', padding: '0.5rem' }}
                        placeholder="Write specific feedback for this exact spot..."
                        value={pinComment}
                        onChange={e => setPinComment(e.target.value)}
                        autoFocus
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      <button onClick={() => setNewPinCoords(null)} className="btn btn-secondary btn-sm">Cancel</button>
                      <button onClick={handleSavePin} className="btn btn-primary btn-sm">Save Pin</button>
                    </div>
                  </div>
                )}
              </div>

              {/* List of Placed Pins */}
              {annotations.length > 0 && (
                <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Placed Pin Feedback List</h4>
                  {annotations.map((pin, idx) => (
                    <div 
                      key={pin.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        background: 'var(--bg-surface-elevated)',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '0.65rem' }}>
                        <span className="badge badge-indigo" style={{ height: 'fit-content' }}>
                          #{idx + 1} {pin.category}
                        </span>
                        <div>
                          <p style={{ color: 'var(--text-main)', margin: 0 }}>{pin.comment}</p>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Location: X:{pin.xPercentage}% Y:{pin.yPercentage}%</span>
                        </div>
                      </div>

                      <button onClick={() => handleDeletePin(pin.id)} style={{ color: 'var(--accent-rose)', cursor: 'pointer' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Scorecard Rating Form */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Star size={18} color="var(--accent-amber)" /> Evaluation Scorecard (1 to 5 Stars)
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                {[
                  { label: 'Visual Polish & Aesthetics', key: 'visualPolish' },
                  { label: 'Layout & Hierarchy', key: 'layoutHierarchy' },
                  { label: 'Storytelling & Case Study Flow', key: 'storytelling' },
                  { label: 'Technical Execution Skill', key: 'technicalSkill' }
                ].map(dim => (
                  <div key={dim.key} style={{ background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>{dim.label}</div>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {[1, 2, 3, 4, 5].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setScorecard(prev => ({ ...prev, [dim.key]: val }))}
                          style={{
                            flex: 1,
                            padding: '0.35rem 0',
                            borderRadius: 4,
                            background: scorecard[dim.key as keyof FeedbackScorecard] === val ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                            color: scorecard[dim.key as keyof FeedbackScorecard] === val ? '#fff' : 'var(--text-muted)',
                            fontWeight: 700,
                            fontSize: '0.85rem'
                          }}
                        >
                          {val} ★
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items Checklist & Summary */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckSquare size={18} color="var(--accent-emerald)" /> Student Action Items & Overall Executive Summary
              </h3>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Executive Feedback Summary
                </label>
                <textarea 
                  className="input-field" 
                  rows={4}
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Specific Action Items Checklist
                </label>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Add an actionable improvement item for designer..."
                    value={newItemInput}
                    onChange={e => setNewItemInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddActionItem(); } }}
                  />
                  <button type="button" onClick={handleAddActionItem} className="btn btn-secondary btn-sm">
                    <Plus size={16} /> Add Item
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {actionItems.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface-elevated)', padding: '0.5rem 0.85rem', borderRadius: 4, fontSize: '0.85rem' }}>
                      <span>✓ {item}</span>
                      <button onClick={() => setActionItems(prev => prev.filter((_, i) => i !== idx))} style={{ color: 'var(--accent-rose)', cursor: 'pointer' }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
