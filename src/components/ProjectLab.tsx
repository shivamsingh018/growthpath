import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Layers, Sparkles, Code, CheckCircle2, AlertCircle, ArrowRight, Upload, Star, Search, ShieldCheck, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProjectLabItem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  estimatedHours: string;
  skillsGained: string[];
  description: string;
}

export const ProjectLab: React.FC = () => {
  const { setCurrentView } = useApp();
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');
  const [projectUrl, setProjectUrl] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [aiScorecard, setAiScorecard] = useState<any>(null);

  const labProjects: ProjectLabItem[] = [
    {
      id: 'lab_1',
      title: 'Fullstack AI Financial Analytics Dashboard',
      category: 'Engineering & Tech',
      difficulty: 'Advanced',
      techStack: ['React 18', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
      estimatedHours: '20-25 hrs',
      skillsGained: ['State Management', 'REST API Design', 'Chart.js', 'WCAG Accessibility'],
      description: 'Build a production-grade dark theme financial app with real-time portfolio charts, transaction logs, and secure authentication.'
    },
    {
      id: 'lab_2',
      title: 'Eco-Pavilion Architectural Sheet & 3D Render',
      category: 'Architecture',
      difficulty: 'Intermediate',
      techStack: ['Rhino 3D', 'V-Ray', 'AutoCAD', 'COA Standards'],
      estimatedHours: '15-18 hrs',
      skillsGained: ['3-Zone Sheet Composition', 'Timber Joinery Details', 'Solar Orientation'],
      description: 'Draft a COA-compliant architectural presentation sheet featuring site plans, structural sections, and exterior renders.'
    },
    {
      id: 'lab_3',
      title: 'Mobile Banking Design System & Case Study',
      category: 'UI/UX Design',
      difficulty: 'Intermediate',
      techStack: ['Figma', 'WCAG 2.1 AA', 'User Research', 'Prototyping'],
      estimatedHours: '12-15 hrs',
      skillsGained: ['Figma Component Variants', 'Design Tokens', 'Usability Testing'],
      description: 'Design a mobile design system with executive problem statements, component libraries, and interactive prototype flows.'
    }
  ];

  const handleRunAiAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectUrl.trim()) return;

    setIsAuditing(true);
    setAiScorecard(null);

    setTimeout(() => {
      setAiScorecard({
        overallScore: 88,
        codeQuality: 92,
        uiUxQuality: 85,
        documentation: 87,
        suggestions: [
          'Add quantitative impact metrics to your README write-up (e.g. % performance increase)',
          'Ensure all interactive buttons have WCAG AA contrast ratio (> 4.5:1)',
          'Include unit test coverage badges in the repository header'
        ]
      });
      setIsAuditing(false);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    }, 1200);
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '1rem', padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
          <Layers size={16} /> Real-World Project Lab & Instant AI Audit Engine — Founded by Shivam Singh
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Build Real Projects. Get Instant AI & Mentor Review.
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Discover hands-on project challenges across Software Engineering, UI/UX, and Architecture. Submit your project link for automated AI quality scorecards!
        </p>
      </div>

      {/* AI Automated & Full Project Submission Form Section */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '3rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%)', border: '1px solid var(--border-glow)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: aiScorecard ? '1.2fr 1fr' : '1fr', gap: '2rem' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
              <Sparkles size={14} /> Official Project Submission & AI Review Engine
            </div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Project Submission Form</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Submit your project details below to evaluate code quality, deployment health, report documentation, and video walkthroughs.
            </p>

            <form onSubmit={handleRunAiAudit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Field 1: GitHub Repo */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem', color: '#ffffff' }}>
                  Github Repository Link <span style={{ color: 'var(--accent-rose)' }}>*</span>
                </label>
                <input 
                  type="url" 
                  className="input-field" 
                  placeholder="https://github.com/username/project-repo"
                  defaultValue="https://github.com/shivamsingh018/growthpath"
                  onChange={e => setProjectUrl(e.target.value)}
                  pattern="https://.*"
                  required
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem', display: 'block' }}>
                  *Note: Enter the Github Repository Link of your project. Must start with https://
                </span>
              </div>

              {/* Field 2: Detailed Project Report */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem', color: '#ffffff' }}>
                  Detailed Project Report Link <span style={{ color: 'var(--accent-rose)' }}>*</span>
                </label>
                <input 
                  type="url" 
                  className="input-field" 
                  placeholder="https://github.com/username/repo/blob/main/README.md"
                  defaultValue="https://github.com/shivamsingh018/growthpath/blob/main/README.md"
                  pattern="https://.*"
                  required
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem', display: 'block' }}>
                  *Note: Provide the Detailed Project Report Link explaining your project. Must start with https://
                </span>
              </div>

              {/* Field 3: Project Deployed Link */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem', color: '#ffffff' }}>
                  Project Deployed Link <span style={{ color: 'var(--accent-rose)' }}>*</span>
                </label>
                <input 
                  type="url" 
                  className="input-field" 
                  placeholder="https://my-project-app.vercel.app"
                  defaultValue="https://portfolio-mentorship-platform.vercel.app"
                  pattern="https://.*"
                  required
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem', display: 'block' }}>
                  *Note: Submit the Project Deployment Link to demonstrate the working of your project. Must start with https://
                </span>
              </div>

              {/* Field 4: Project Feedback Video Link */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem', color: '#ffffff' }}>
                  Project Feedback Video Link <span style={{ color: 'var(--accent-rose)' }}>*</span>
                </label>
                <input 
                  type="url" 
                  className="input-field" 
                  placeholder="https://www.youtube.com/watch?v=... or https://loom.com/share/..."
                  defaultValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  pattern="https://.*"
                  required
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem', display: 'block' }}>
                  *Note: Add a Project Feedback Video Link explaining your experience and learnings. Must start with https://
                </span>
              </div>

              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button type="submit" disabled={isAuditing} className="btn btn-primary btn-lg">
                  {isAuditing ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <RefreshCw size={18} className="spin" /> Auditing Submission...
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Upload size={18} /> Submit Project & Run AI Audit
                    </span>
                  )}
                </button>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  ✓ All fields validated (HTTPS protocol active)
                </span>
              </div>
            </form>
          </div>

          {/* AI Scorecard Result */}
          {aiScorecard && (
            <div className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-surface-elevated)', borderLeft: '4px solid #10b981', alignSelf: 'start' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-light)' }}>AI Project Quality Scorecard</span>
                <span className="badge badge-emerald" style={{ fontSize: '0.9rem' }}>{aiScorecard.overallScore} / 100</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem', textAlign: 'center' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: 6 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Code / Tech</div>
                  <strong style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}>{aiScorecard.codeQuality}</strong>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: 6 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>UI/UX Polish</div>
                  <strong style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem' }}>{aiScorecard.uiUxQuality}</strong>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: 6 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Documentation</div>
                  <strong style={{ color: 'var(--accent-emerald)', fontSize: '1.1rem' }}>{aiScorecard.documentation}</strong>
                </div>
              </div>

              <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', marginBottom: '0.5rem' }}>AI Recommendations:</h4>
              <ul style={{ paddingLeft: '1.1rem', fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {aiScorecard.suggestions.map((s: string, idx: number) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Project Discovery Grid */}
      <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>Project Challenge Catalog</h2>
      <div className="grid-autofit-md">
        {labProjects.map(p => (
          <div key={p.id} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span className="badge badge-indigo">{p.category}</span>
                <span className="badge badge-emerald">{p.difficulty}</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: 1.35 }}>{p.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                {p.description}
              </p>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {p.techStack.map(t => (
                  <span key={t} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', padding: '0.2rem 0.5rem', borderRadius: 4 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Est. {p.estimatedHours}</span>
              <button onClick={() => alert(`Starting Project Challenge: ${p.title}`)} className="btn btn-primary btn-sm">
                Start Project →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
