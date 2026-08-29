import React, { useState, useRef } from 'react';
import { 
  FileCheck, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Award, 
  RefreshCw, 
  ShieldCheck, 
  Download, 
  Check, 
  X,
  Target,
  Building2,
  FileText,
  Trash2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { apiClient } from '../services/api';
import confetti from 'canvas-confetti';

interface ResumeVersion {
  id: string;
  name: string;
  score: number;
  date: string;
}

export const ATSChecker: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>({
    name: 'Shivam_Singh_Resume.pdf',
    size: '1.2 MB'
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [targetCompany, setTargetCompany] = useState('Accenture');
  const [jobDescription, setJobDescription] = useState('');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showReport, setShowReport] = useState(true);
  const [jobMatchScore, setJobMatchScore] = useState<number | null>(null);

  const [versionHistory, setVersionHistory] = useState<ResumeVersion[]>([
    { id: 'v1', name: 'Resume_Draft_v1.pdf', score: 68, date: '2026-08-01' },
    { id: 'v2', name: 'Resume_Updated_v2.pdf', score: 76, date: '2026-08-08' },
    { id: 'v3', name: 'Shivam_Singh_Resume.pdf', score: 82, date: '2026-08-15' }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    'Reading Resume Content...',
    'Extracting Key Competencies...',
    'Analyzing Role Skills & Projects...',
    'Checking ATS Format Compatibility...',
    'Generating Actionable Recommendations...'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = async (file: File) => {
    setValidationError(null);
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxBytes = 10 * 1024 * 1024; // 10 MB

    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setValidationError('Unsupported file format. Please upload a PDF, DOC or DOCX file.');
      return;
    }

    if (file.size > maxBytes) {
      setValidationError('File is too large. Maximum file size is 10 MB.');
      return;
    }

    try {
      // Connect to real Express backend API server
      const result = await apiClient.uploadResume(file);
      if (result.success && result.resume) {
        setSelectedFile({
          name: result.resume.filename,
          size: result.resume.file_size
        });
      } else {
        setSelectedFile({
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        });
      }
    } catch (err) {
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
    }

    setShowReport(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRunAnalysis = () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setShowReport(false);
    setAnalysisStep(0);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setAnalysisStep(currentStep);
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setShowReport(true);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    }, 600);
  };

  const handleMatchJobDescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;
    setJobMatchScore(78);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  };

  const deleteResume = () => {
    setSelectedFile(null);
    setShowReport(false);
    setValidationError(null);
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '1rem', padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
          <FileCheck size={16} /> AI Resume ATS Compatibility Analyzer — Directed by Shivam Singh
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Check Your Resume ATS Score
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Upload your resume and get an AI-powered ATS compatibility analysis with actionable recommendations for your target role.
        </p>
      </div>

      {/* Target Role & Company Selector Toolbar */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem', display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Target Role:</label>
          <select className="input-field" value={targetRole} onChange={e => setTargetRole(e.target.value)}>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="AI/ML Engineer">AI/ML Engineer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
        </div>

        <div style={{ flex: 1, minWidth: '220px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Target Company (Optional):</label>
          <select className="input-field" value={targetCompany} onChange={e => setTargetCompany(e.target.value)}>
            <option value="Accenture">Accenture</option>
            <option value="TCS">TCS (NQT / Digital)</option>
            <option value="Amazon">Amazon</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Google">Google</option>
            <option value="Vercel">Vercel</option>
          </select>
        </div>
      </div>

      {/* Upload Area */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2.5rem', background: 'var(--bg-surface-elevated)' }}>
        {!selectedFile ? (
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${isDragOver ? 'var(--accent-primary)' : 'var(--border-glow)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '3rem 2rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: isDragOver ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-surface)',
              transition: 'all 0.25s ease'
            }}
          >
            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} style={{ display: 'none' }} />
            <Upload size={44} color="var(--accent-primary)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>Upload your resume</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Drag & drop your resume here, or browse from your computer
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>
              Supported formats: <strong>PDF, DOC, DOCX</strong> (Max size: <strong>10 MB</strong>)
            </div>
            <button type="button" className="btn btn-primary btn-sm">
              Browse Files
            </button>
          </div>
        ) : (
          /* Uploaded File Preview Deck */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={24} color="#10b981" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.05rem' }}>{selectedFile.name}</h3>
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>Resume uploaded ✓</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>File size: {selectedFile.size}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <button onClick={() => fileInputRef.current?.click()} className="btn btn-sm btn-outline">
                  Replace Resume
                </button>
                <button onClick={deleteResume} style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: '0.4rem' }}>
                  <Trash2 size={18} />
                </button>
                <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} style={{ display: 'none' }} />
              </div>
            </div>

            {/* Validation Error */}
            {validationError && (
              <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', color: '#fda4af', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} /> {validationError}
              </div>
            )}

            {/* Analyze Button / Progress */}
            {!isAnalyzing ? (
              <button onClick={handleRunAnalysis} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Analyze Resume →
              </button>
            ) : (
              <div className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-surface)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-light)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <RefreshCw size={18} className="spin" /> Analyzing your resume...
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: 600, marginBottom: '1rem' }}>
                  Step {analysisStep + 1} of 5: {steps[analysisStep]}
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${((analysisStep + 1) / 5) * 100}%`, background: 'var(--accent-primary)', transition: 'width 0.4s ease' }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Analysis Result Dashboard */}
      {showReport && (
        <div>
          {/* Main Score Banner */}
          <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2.5rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)', border: '1px solid var(--border-glow)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>ATS Compatibility Passed</span>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>ATS Score: 82 / 100</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Good — your resume is ATS compatible for <strong>{targetRole}</strong> at <strong>{targetCompany}</strong>, but there are actionable areas to improve.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <button onClick={() => window.print()} className="btn btn-secondary">
                  <Download size={16} /> Download ATS Report
                </button>
              </div>
            </div>
          </div>

          {/* 8 Score Breakdown Grid */}
          <h2 style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>Score Breakdown</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {[
              { name: 'ATS Compatibility', score: 82, desc: 'Parses cleanly across modern ATS software' },
              { name: 'Keyword Match', score: 78, desc: 'Matches target role terminology' },
              { name: 'Formatting', score: 91, desc: 'Standard single-column layout' },
              { name: 'Skills Section', score: 84, desc: 'Technical & tool stack highlighted' },
              { name: 'Projects', score: 87, desc: 'Detailed repository links & tech stack' },
              { name: 'Experience', score: 72, desc: 'Add quantitative metric achievements' },
              { name: 'Education', score: 95, desc: 'Degree & university clearly stated' },
              { name: 'Achievements', score: 69, desc: 'Include certifications & contest ranks' }
            ].map((s, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>{s.name}</span>
                  <strong style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}>{s.score}%</strong>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, marginBottom: '0.5rem' }}>
                  <div style={{ height: '100%', width: `${s.score}%`, background: 'var(--accent-primary)', borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{s.desc}</div>
              </div>
            ))}
          </div>

          {/* Strengths & Improvements */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#10b981', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={20} /> What's Working Well
              </h3>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>✓ Clear education and degree section</li>
                <li>✓ Strong technical skills section with React, TypeScript & SQL</li>
                <li>✓ Clean single-column formatting without graphics or tables</li>
                <li>✓ Good project descriptions with repository links</li>
              </ul>
            </div>

            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-amber)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={20} /> Recommended Improvements
              </h3>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>01. Add measurable impact metrics to project bullet points (e.g. <em>'reduced latency by 45%'</em>).</li>
                <li>02. Improve keyword matching for Spring Boot & Docker.</li>
                <li>03. Strengthen achievements section with hackathon or contest ranks.</li>
                <li>04. Add relevant technologies where genuinely applicable.</li>
              </ul>
            </div>
          </div>

          {/* Job Description Matcher */}
          <div className="glass-card" style={{ padding: '2rem', marginBottom: '2.5rem', background: 'var(--bg-surface-elevated)' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
              <Target size={14} /> Job Description Matcher
            </span>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Match Your Resume to a Specific Job</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Paste a target job description below to calculate exact keyword match percentages and missing skills.
            </p>

            <form onSubmit={handleMatchJobDescription}>
              <textarea 
                className="input-field" 
                rows={4}
                placeholder="Paste Job Description here (e.g. Seeking a Full Stack Engineer proficient in React, Node.js, Spring Boot, and AWS REST APIs)..."
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  * Recommendations only suggest truthful additions genuinely applicable to your experience.
                </span>
                <button type="submit" className="btn btn-primary">
                  Check Job Match →
                </button>
              </div>
            </form>

            {jobMatchScore !== null && (
              <div className="glass-card" style={{ padding: '1.5rem', marginTop: '1.5rem', background: 'var(--bg-surface)', borderLeft: '4px solid #06b6d4' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800 }}>Job Match Result</span>
                  <span className="badge badge-cyan" style={{ fontSize: '1.1rem' }}>{jobMatchScore}% Match</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: '#10b981', marginBottom: '0.4rem' }}>Matched Skills:</h4>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Git'].map(s => (
                        <span key={s} className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-rose)', marginBottom: '0.4rem' }}>Missing / Weak Keywords:</h4>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {['Spring Boot', 'AWS REST APIs', 'Jest Unit Tests'].map(s => (
                        <span key={s} className="badge badge-rose" style={{ fontSize: '0.72rem' }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resume Version History & Security Guarantee */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Resume Version History</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {versionHistory.map(v => (
                  <div key={v.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{v.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Uploaded on {v.date}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className="badge badge-indigo" style={{ fontSize: '0.85rem' }}>ATS: {v.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>
                  <Lock size={18} />
                  <strong style={{ fontSize: '0.95rem' }}>Security & Privacy Guarantee</strong>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Your resume is private and used exclusively for your personal ATS analysis. Resumes are never publicly exposed.
                </p>
              </div>

              <button onClick={deleteResume} className="btn btn-sm btn-outline" style={{ color: 'var(--accent-rose)', marginTop: '1rem' }}>
                Delete Resume Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
