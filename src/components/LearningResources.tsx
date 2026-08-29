import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  Sparkles,
  X,
  CheckCircle2,
  Bookmark,
  Printer,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  FileText,
  BookmarkCheck,
  Award,
  BookMarked
} from 'lucide-react';
import { LearningResource } from '../types';
import confetti from 'canvas-confetti';

export const LearningResources: React.FC = () => {
  const { resources } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeResource, setActiveResource] = useState<LearningResource | null>(null);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(0);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [completedChapters, setCompletedChapters] = useState<{ [key: string]: boolean }>({});

  const categories = [
    'All', 
    'School Education (Class 1st-10th)', 
    'Senior Secondary (11th-12th)', 
    'Engineering & Tech', 
    'UI/UX & Design', 
    'Architecture'
  ];

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleChapterDone = (resId: string, chIdx: number) => {
    const key = `${resId}_ch_${chIdx}`;
    const next = !completedChapters[key];
    setCompletedChapters(prev => ({ ...prev, [key]: next }));
    if (next) {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '1rem', padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
          <BookMarked size={16} /> Premium Digital Textbook Reader — Founded by Shivam Singh
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Digital Textbooks & Exam Reference Library
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Complete academic textbooks, chapter notes, formulas, and solved practice problems for Class 1st to 12th, Engineering, and Design.
        </p>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search digital textbooks by title, subject, or class..."
            style={{ paddingLeft: '2.5rem' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Digital Book Cover Cards */}
      <div className="grid-autofit-md">
        {filteredResources.map(res => {
          const isBookmarked = bookmarkedIds.includes(res.id);

          return (
            <div key={res.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
              <div>
                {/* Book Header Badges */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
                  <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>{res.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{res.level}</span>
                    <button 
                      onClick={() => toggleBookmark(res.id)} 
                      style={{ color: isBookmarked ? 'var(--accent-amber)' : 'var(--text-dim)', cursor: 'pointer', background: 'none', border: 'none', padding: 2 }}
                    >
                      <Bookmark size={18} fill={isBookmarked ? 'var(--accent-amber)' : 'transparent'} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: 52,
                    height: 68,
                    borderRadius: 6,
                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px var(--accent-glow)',
                    flexShrink: 0
                  }}>
                    <BookOpen size={24} color="#ffffff" />
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem', lineHeight: 1.3 }}>{res.title}</h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--accent-light)', fontWeight: 600 }}>
                      Authored by {res.author}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {res.description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <FileText size={14} /> {res.chapters?.length || 1} Chapters
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={14} /> {res.readTime}
                  </span>
                </div>

                <button 
                  onClick={() => {
                    setActiveResource(res);
                    setSelectedChapterIdx(0);
                  }}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                >
                  <BookOpen size={14} /> Read Digital Textbook
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Split-Pane E-Reader Modal Format */}
      {activeResource && (
        <div className="modal-overlay" onClick={() => setActiveResource(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '960px', padding: 0, overflow: 'hidden', height: '85vh', display: 'flex', flexDirection: 'column' }}>
            
            {/* Modal Header Bar */}
            <div style={{ padding: '1.1rem 1.75rem', background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={20} color="var(--accent-light)" />
                </div>
                <div>
                  <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>{activeResource.category} • {activeResource.targetClass}</span>
                  <h2 style={{ fontSize: '1.25rem', lineHeight: 1.2 }}>{activeResource.title}</h2>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <button onClick={() => window.print()} className="btn btn-sm btn-secondary" title="Print or Save PDF">
                  <Printer size={14} /> Print PDF
                </button>
                <button onClick={() => setActiveResource(null)} style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}><X size={22} /></button>
              </div>
            </div>

            {/* Split-Pane Content Area */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              
              {/* Left Sidebar: Chapter Table of Contents */}
              <div style={{ width: '280px', background: 'var(--bg-surface)', borderRight: '1px solid var(--border-subtle)', padding: '1.25rem', overflowY: 'auto', flexShrink: 0 }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: '1rem' }}>
                  Table of Contents
                </div>

                {activeResource.chapters && activeResource.chapters.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {activeResource.chapters.map((ch, cIdx) => {
                      const isDone = completedChapters[`${activeResource.id}_ch_${cIdx}`];
                      const isSelected = selectedChapterIdx === cIdx;

                      return (
                        <button
                          key={cIdx}
                          onClick={() => setSelectedChapterIdx(cIdx)}
                          style={{
                            textAlign: 'left',
                            padding: '0.85rem',
                            borderRadius: 'var(--radius-sm)',
                            border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                            background: isSelected ? 'var(--bg-surface-elevated)' : 'transparent',
                            color: isSelected ? 'var(--accent-light)' : 'var(--text-main)',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--accent-secondary)' }}>Chapter {ch.chapterNumber}</span>
                            {isDone && <span style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 700 }}>✓ Done</span>}
                          </div>
                          <div style={{ fontWeight: 600, lineHeight: 1.3 }}>{ch.title.split('(')[0]}</div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Full Reference Book
                  </div>
                )}
              </div>

              {/* Right Reading Canvas */}
              <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: 'var(--bg-base)' }}>
                {activeResource.chapters && activeResource.chapters[selectedChapterIdx] ? (
                  (() => {
                    const ch = activeResource.chapters[selectedChapterIdx];
                    const isDone = completedChapters[`${activeResource.id}_ch_${selectedChapterIdx}`];

                    return (
                      <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        
                        {/* Chapter Banner */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                          <div>
                            <span className="badge badge-emerald" style={{ fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                              Chapter {ch.chapterNumber} of {activeResource.chapters.length}
                            </span>
                            <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-light)', lineHeight: 1.3 }}>{ch.title}</h2>
                          </div>

                          <button
                            onClick={() => toggleChapterDone(activeResource.id, selectedChapterIdx)}
                            className={`btn btn-sm ${isDone ? 'btn-primary' : 'btn-outline'}`}
                          >
                            {isDone ? '✓ Chapter Completed' : 'Mark as Read'}
                          </button>
                        </div>

                        {/* Executive Summary Quote */}
                        <div style={{ background: 'var(--bg-surface-elevated)', padding: '1.1rem 1.35rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--accent-primary)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
                          "{ch.summary}"
                        </div>

                        {/* Main Theory Text */}
                        <div className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-surface-elevated)' }}>
                          <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <FileText size={18} /> Detailed Theory & Explanation
                          </h4>
                          <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.85, letterSpacing: '0.01em' }}>
                            {ch.content}
                          </div>
                        </div>

                        {/* Formulas & Derivations Block */}
                        {ch.formulas && ch.formulas.length > 0 && (
                          <div className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-surface-elevated)' }}>
                            <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-emerald)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <Sparkles size={18} /> Key Formulas & Equations
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                              {ch.formulas.map((f, fIdx) => (
                                <div key={fIdx} style={{ background: 'var(--bg-surface)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '0.92rem', color: 'var(--text-main)', border: '1px solid var(--border-subtle)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)' }}>
                                  {f}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Practice Exercises Block */}
                        {ch.practiceQuestions && ch.practiceQuestions.length > 0 && (
                          <div className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-surface-elevated)', borderLeft: '4px solid var(--accent-amber)' }}>
                            <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-amber)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <HelpCircle size={18} /> Solved Exam Practice Questions
                            </h4>
                            <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.92rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                              {ch.practiceQuestions.map((q, qIdx) => (
                                <li key={qIdx} style={{ lineHeight: 1.5 }}>{q}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Chapter Bottom Navigation */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                          <button
                            disabled={selectedChapterIdx === 0}
                            onClick={() => setSelectedChapterIdx(prev => prev - 1)}
                            className="btn btn-sm btn-outline"
                          >
                            <ChevronLeft size={16} /> Previous Chapter
                          </button>

                          <button
                            disabled={selectedChapterIdx === (activeResource.chapters.length - 1)}
                            onClick={() => setSelectedChapterIdx(prev => prev + 1)}
                            className="btn btn-sm btn-primary"
                          >
                            Next Chapter <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  /* Fallback Guide View */
                  <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-light)' }}>{activeResource.title}</h2>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-main)' }}>{activeResource.description}</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
