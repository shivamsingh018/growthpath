import React, { useState } from 'react';
import { PortfolioProject } from '../types';
import { X, Eye, ThumbsUp, Sparkles, Share2, Tag, Calendar } from 'lucide-react';

export const PortfolioDetailModal: React.FC<{
  project: PortfolioProject;
  onClose: () => void;
  onRequestReview: (projId: string) => void;
}> = ({ project, onClose, onRequestReview }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const activeMedia = project.media[activeMediaIndex] || { url: project.coverImage, caption: project.title };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '950px', padding: 0, overflow: 'hidden' }}>
        {/* Header bar */}
        <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface-elevated)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <img src={project.designerAvatar} alt={project.designerName} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.1rem' }}>{project.title}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                By <strong>{project.designerName}</strong> • {project.category}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={() => onRequestReview(project.id)} className="btn btn-primary btn-sm">
              <Sparkles size={14} /> Request Review
            </button>
            <button onClick={onClose} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
          </div>
        </div>

        {/* Media Preview Stage */}
        <div style={{ background: '#050608', padding: '1.5rem', textAlign: 'center', position: 'relative', minHeight: '380px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={activeMedia.url} 
            alt={activeMedia.caption} 
            style={{ maxHeight: '460px', maxWidth: '100%', objectFit: 'contain', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-md)' }} 
          />
          {activeMedia.caption && (
            <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {activeMedia.caption}
            </div>
          )}
        </div>

        {/* Thumbnails list if multiple media */}
        {project.media.length > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)', overflowX: 'auto' }}>
            {project.media.map((med, idx) => (
              <img 
                key={med.id} 
                src={med.url} 
                alt={med.caption}
                onClick={() => setActiveMediaIndex(idx)}
                style={{
                  width: 64,
                  height: 44,
                  objectFit: 'cover',
                  borderRadius: 4,
                  cursor: 'pointer',
                  border: activeMediaIndex === idx ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  opacity: activeMediaIndex === idx ? 1 : 0.6
                }} 
              />
            ))}
          </div>
        )}

        {/* Project Content Breakdown */}
        <div style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--accent-light)' }}>Project Overview</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {project.description}
              </p>

              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Tags & Skills</h4>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {project.tags.map(t => (
                    <span key={t} className="badge badge-indigo">
                      <Tag size={12} /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div style={{ width: '240px', background: 'var(--bg-surface-elevated)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Published</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                    <Calendar size={14} color="var(--accent-primary)" /> {project.createdAt}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Engagement</div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.2rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Eye size={14} color="var(--accent-secondary)" /> {project.views} views
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <ThumbsUp size={14} color="var(--accent-emerald)" /> {project.likes} likes
                    </span>
                  </div>
                </div>

                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <button onClick={() => onRequestReview(project.id)} className="btn btn-primary" style={{ width: '100%', marginBottom: '0.5rem' }}>
                    Request Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
