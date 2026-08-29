import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  TrendingUp, 
  BookOpen,
  GraduationCap,
  Microscope,
  Calculator,
  Code,
  Users,
  Briefcase,
  Layers,
  Bookmark,
  Award,
  Lightbulb,
  Target,
  Compass,
  Zap,
  Flame,
  CheckSquare,
  FileCheck,
  Send,
  Bot,
  User,
  Search,
  Rocket,
  FolderGit2
} from 'lucide-react';
import { PortfolioProject, MentorProfile } from '../types';
import { SkillUniverse } from './SkillUniverse';

export const LandingPage: React.FC<{ 
  onOpenProject: (proj: PortfolioProject) => void;
  onOpenMentor: (mentor: MentorProfile) => void;
  onRequestReview: (projId?: string) => void;
}> = ({ onOpenProject, onOpenMentor, onRequestReview }) => {
  const { portfolios, allMentors, setCurrentView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Glow Movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = [
    'All', 
    'School Education (1st–12th)', 
    'Engineering & Tech', 
    'UI/UX Design', 
    'Architecture'
  ];

  const filteredPortfolios = selectedCategory === 'All' 
    ? portfolios 
    : portfolios.filter(p => p.category === selectedCategory || p.tags.includes(selectedCategory));

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ position: 'relative', paddingBottom: '4rem' }}>
      {/* Subtle Mouse Following Ambient Glow */}
      <div 
        style={{
          position: 'fixed',
          top: mousePos.y - 200,
          left: mousePos.x - 200,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'top 0.15s ease-out, left 0.15s ease-out',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}
      />

      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        padding: '5.5rem 0 4.5rem 0',
        background: 'radial-gradient(ellipse at 50% -10%, rgba(99, 102, 241, 0.22) 0%, rgba(5, 8, 22, 0) 75%)',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Hero Left Composition */}
          <div>
            {/* Shimmery Eyebrow Badge */}
            <div className="badge shimmer-badge float-gentle" style={{ marginBottom: '1.25rem', padding: '0.45rem 1.1rem', fontSize: '0.8rem', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
              <Zap size={14} color="var(--accent-primary)" /> ✦ AI-POWERED LEARNING & CAREER PLATFORM
            </div>
            
            {/* Headline */}
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', 
              fontWeight: 800, 
              letterSpacing: '-0.03em', 
              marginBottom: '1.25rem',
              lineHeight: 1.15
            }}>
              <div>Learn.</div>
              <div>Build.</div>
              <div>Get Reviewed.</div>
              <div style={{ 
                background: 'linear-gradient(135deg, #a5b4fc 0%, #6366f1 50%, #3b82f6 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>
                Get Career Ready.
              </div>
            </h1>

            <p style={{ 
              fontSize: '1.1rem', 
              color: 'var(--text-muted)', 
              marginBottom: '2.25rem', 
              lineHeight: 1.6,
              maxWidth: '560px'
            }}>
              One AI-powered platform to learn skills, build projects, optimize your resume, prepare for interviews, and get career ready.
            </p>

            {/* CTAs with Working Routes */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => setCurrentView('batches')} className="btn btn-primary btn-lg">
                Start Learning <ArrowRight size={18} />
              </button>

              <button onClick={() => setCurrentView('company-prep')} className="btn btn-secondary btn-lg">
                Explore Career Paths
              </button>

              <button onClick={() => setCurrentView('ats')} className="btn btn-outline btn-lg">
                Check ATS Score
              </button>
            </div>
          </div>

          {/* Hero Right Floating Product Preview Deck */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Ambient Backglow */}
            <div style={{
              position: 'absolute',
              width: '360px',
              height: '360px',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 75%)',
              filter: 'blur(60px)',
              top: '0%',
              zIndex: 0
            }} />

            {/* Main Product Card */}
            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '440px' }}>
              <div className="glass-card" style={{ padding: '1.75rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-glow)' }}>
                {/* GrowthPath Official Logo Showcase */}
                <div style={{ marginBottom: '1.25rem', overflow: 'hidden', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: '#000' }}>
                  <img src="/growthpath-logo.jpg" alt="GrowthPath Platform" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>

                {/* Header Profile Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src="/shivam-singh.png" alt="Shivam Singh" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }} />
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>Shivam Singh 👋</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--accent-light)', fontWeight: 600 }}>B.Tech CSE • Galgotias University</div>
                    </div>
                  </div>
                  <span className="badge badge-indigo" onClick={() => setCurrentView('ats')} style={{ cursor: 'pointer' }}>
                    Readiness 84/100
                  </span>
                </div>

                {/* Dashboard Metric Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div onClick={() => setCurrentView('batches')} style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Learning Progress</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>78%</div>
                  </div>

                  <div onClick={() => setCurrentView('ats')} style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>ATS Resume Score</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>82 / 100</div>
                  </div>

                  <div onClick={() => setCurrentView('project-lab')} style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Projects Built</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>8 Projects</div>
                  </div>

                  <div onClick={() => setCurrentView('company-prep')} style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>DSA Progress</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b' }}>76%</div>
                  </div>
                </div>

                {/* Recent Activity Pill */}
                <div onClick={() => setCurrentView('project-lab')} style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <CheckCircle2 size={16} /> AI Project Audit Complete • 92% Score
                </div>
              </div>

              {/* Floating Micro Cards */}
              <div onClick={() => setCurrentView('project-lab')} className="glass-card float-gentle" style={{ position: 'absolute', top: '-15px', right: '-25px', padding: '0.45rem 0.85rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.18)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 'var(--radius-full)', zIndex: 2, cursor: 'pointer' }}>
                AI Review Complete ✓
              </div>

              <div onClick={() => setCurrentView('batches')} className="glass-card float-gentle-alt" style={{ position: 'absolute', bottom: '-15px', left: '-25px', padding: '0.45rem 0.85rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-amber)', background: 'rgba(245, 158, 11, 0.18)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: 'var(--radius-full)', zIndex: 2, cursor: 'pointer' }}>
                +12 XP Completed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 5-STEP GROWTH JOURNEY WITH WORKING ROUTES */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>
              <Compass size={14} /> Proven Growth Methodology
            </span>
            <h2 style={{ fontSize: '2.2rem', letterSpacing: '-0.02em' }}>The 5-Step Growth Journey</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', position: 'relative' }}>
            {[
              { step: '01', name: 'LEARN', desc: 'Study structured resources and curated learning kits.', icon: BookOpen, color: '#6366f1', view: 'batches' },
              { step: '02', name: 'BUILD', desc: 'Create real-world projects and strengthen your portfolio.', icon: Code, color: '#3b82f6', view: 'project-lab' },
              { step: '03', name: 'REVIEW', desc: 'Get feedback from mentors and AI.', icon: ShieldCheck, color: '#06b6d4', view: 'dashboard' },
              { step: '04', name: 'IMPROVE', desc: 'Identify skill gaps and improve your work.', icon: TrendingUp, color: '#10b981', view: 'ats' },
              { step: '05', name: 'CAREER', desc: 'Prepare for interviews, jobs and placements.', icon: Rocket, color: '#f59e0b', view: 'jobs' }
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="glass-card" onClick={() => setCurrentView(s.view)} style={{ padding: '1.75rem', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '2.2rem', fontWeight: 800, color: s.color, opacity: 0.8, lineHeight: 1 }}>{s.step}</div>
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} color={s.color} />
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', color: 'var(--accent-light)' }}>{s.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. EVERYTHING YOU NEED TO GROW (WHY THIS PLATFORM) */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
              <ShieldCheck size={14} /> Comprehensive Platform Features
            </span>
            <h2 style={{ fontSize: '2.2rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Everything You Need to Grow</h2>
            <p style={{ color: 'var(--text-muted)' }}>Tools designed to elevate your skills from learning to top company placements.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: 'AI Career Copilot', desc: 'Instant resume auditing, code scoring, and automated study roadmaps.', icon: Bot, color: '#6366f1', view: 'ats' },
              { title: 'Expert Mentorship', desc: 'Direct 1-on-1 feedback and coordinate-pinned annotations from lead educator Shivam Singh.', icon: Users, color: '#3b82f6', view: 'mentors' },
              { title: 'Real-World Projects', desc: 'Build case studies, code labs, and architectural presentation sheets.', icon: Layers, color: '#06b6d4', view: 'project-lab' },
              { title: 'Portfolio Reviews', desc: 'Submit work for live pin annotations and structural design feedback.', icon: FolderGit2, color: '#10b981', view: 'dashboard' },
              { title: 'ATS Resume Optimization', desc: 'Audit resume keyword matches and qualify for top hiring teams.', icon: FileCheck, color: '#f59e0b', view: 'ats' },
              { title: 'Interview Preparation', desc: 'Simulated technical & behavioral interview practice with AI scoring.', icon: Award, color: '#f43f5e', view: 'jobs' }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="glass-card" onClick={() => setCurrentView(card.view)} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Icon size={22} color={card.color} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{card.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{card.desc}</p>
                  </div>
                  <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: card.color, fontWeight: 700 }}>
                    Explore Feature <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CAREER READINESS SCORE CARD */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '2.5rem', background: 'var(--bg-surface-elevated)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
                  <Award size={14} /> Key Hiring Metric
                </span>
                <h2 style={{ fontSize: '2rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Career Readiness Score</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Our AI evaluates your technical code projects, portfolio case studies, ATS resume match, and communication skills into one recruiter-ready benchmark score.
                </p>

                <button onClick={() => setCurrentView('ats')} className="btn btn-primary">
                  Audit My Career Readiness Score →
                </button>
              </div>

              {/* Score breakdown */}
              <div className="glass-card" onClick={() => setCurrentView('ats')} style={{ padding: '1.75rem', background: 'var(--bg-surface)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Overall Candidate Score</span>
                  <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>84 <span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>/ 100</span></span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <span>Technical Skills</span>
                      <strong style={{ color: 'var(--accent-primary)' }}>87%</strong>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                      <div style={{ height: '100%', width: '87%', background: 'var(--accent-primary)', borderRadius: 3 }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <span>Projects</span>
                      <strong style={{ color: 'var(--accent-secondary)' }}>79%</strong>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                      <div style={{ height: '100%', width: '79%', background: 'var(--accent-secondary)', borderRadius: 3 }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <span>Resume Match</span>
                      <strong style={{ color: 'var(--accent-cyan)' }}>82%</strong>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                      <div style={{ height: '100%', width: '82%', background: 'var(--accent-cyan)', borderRadius: 3 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SMART SKILL GRAPH / UNIVERSE */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <SkillUniverse />
        </div>
      </section>

      {/* 6. FEATURED PROJECTS SHOWCASE */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>Featured Study Kits & Project Showcase</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Explore learning kits, case studies, and academic projects across classes.</p>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-surface-elevated)', padding: '0.3rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                  style={{ border: 'none', borderRadius: 'var(--radius-full)' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-autofit-md">
            {filteredPortfolios.map(proj => {
              const isBookmarked = bookmarkedIds.includes(proj.id);

              return (
                <div key={proj.id} className="glass-card" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => onOpenProject(proj)}>
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img src={proj.coverImage} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                    <div style={{ position: 'absolute', top: 12, left: 12 }}>
                      <span className="badge badge-indigo">{proj.category}</span>
                    </div>

                    <button 
                      onClick={(e) => toggleBookmark(proj.id, e)}
                      style={{ 
                        position: 'absolute', 
                        top: 12, 
                        right: 12, 
                        background: 'rgba(9, 10, 15, 0.65)', 
                        backdropFilter: 'blur(8px)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isBookmarked ? 'var(--accent-amber)' : 'var(--text-main)',
                        cursor: 'pointer'
                      }}
                    >
                      <Bookmark size={15} fill={isBookmarked ? 'var(--accent-amber)' : 'transparent'} />
                    </button>
                  </div>

                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src={proj.designerAvatar} alt={proj.designerName} style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{proj.designerName}</span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: 1.35 }}>{proj.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem' }}>
                      {proj.description}
                    </p>

                    <button 
                      onClick={(e) => { e.stopPropagation(); onRequestReview(proj.id); }}
                      className="btn btn-sm btn-outline"
                      style={{ width: '100%' }}
                    >
                      Request Mentor Review
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
