import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Target, Award, Code, BookOpen, Clock, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Company {
  id: string;
  name: string;
  roles: string[];
  difficulty: 'Moderate' | 'Challenging' | 'Hard';
  readinessScore: number;
  stages: string[];
  topSkills: string[];
  improvements: string[];
}

export const CompanyPrep: React.FC = () => {
  const { setCurrentView } = useApp();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const companies: Company[] = [
    {
      id: 'comp_google',
      name: 'Google',
      roles: ['Software Engineer', 'Frontend Engineer', 'SDE Intern'],
      difficulty: 'Hard',
      readinessScore: 71,
      stages: ['Resume & Recruiter Screen', 'Technical Phone Screen', 'Onsite Coding & Algorithms (4 Rounds)', 'Googleyness & Leadership'],
      topSkills: ['Data Structures & Algorithms', 'System Architecture', 'Problem Solving'],
      improvements: ['Advanced Graph Algorithms (Dijkstra, Tarjan)', 'Dynamic Programming Optimization', 'Code Cleanliness & Edge Cases']
    },
    {
      id: 'comp_accenture',
      name: 'Accenture',
      roles: ['Software Engineer', 'Associate Analyst', 'Data Analyst'],
      difficulty: 'Moderate',
      readinessScore: 78,
      stages: ['Application Screening', 'Cognitive & Technical Assessment', 'Coding Test', 'Interview Round', 'Offer Letter'],
      topSkills: ['Java / C++', 'SQL Queries', 'Pseudocode', 'Communication'],
      improvements: ['DSA Arrays & Strings', 'SQL Joins & Group By', 'STAR Method Behavioral Answers']
    },
    {
      id: 'comp_tcs',
      name: 'TCS (NQT / Digital)',
      roles: ['Ninja Software Developer', 'Digital Engineer'],
      difficulty: 'Moderate',
      readinessScore: 82,
      stages: ['NQT Registration', 'Quantitative & Reasoning Test', 'Coding Round', 'Technical & HR Interview'],
      topSkills: ['C Programming', 'Data Structures', 'Aptitude & Verbal'],
      improvements: ['Time & Work Aptitude Problems', 'Basic Recursion', 'Tell Me About Yourself Response']
    },
    {
      id: 'comp_infosys',
      name: 'Infosys (InfyTQ / HackWithInfy)',
      roles: ['Systems Engineer', 'Specialist Programmer'],
      difficulty: 'Moderate',
      readinessScore: 80,
      stages: ['Online Screening Test', 'Technical Coding Round', 'Technical & HR Interview'],
      topSkills: ['Python / Java', 'DBMS & SQL', 'Data Structures'],
      improvements: ['SQL Triggers & Stored Procedures', 'Matrix Manipulation', 'OOPS Concepts']
    },
    {
      id: 'comp_wipro',
      name: 'Wipro (NLTH)',
      roles: ['Project Engineer', 'Scholar Trainee'],
      difficulty: 'Moderate',
      readinessScore: 83,
      stages: ['Online Aptitude & Essay Writing', 'Coding Assessment', 'Technical & HR Interview'],
      topSkills: ['C / Java', 'Aptitude & Logical', 'Basic Web Tech'],
      improvements: ['Essay Writing Skills', 'String Parsing', 'Basic Pointer Arithmetic']
    },
    {
      id: 'comp_amazon',
      name: 'Amazon',
      roles: ['SDE-1', 'Frontend Engineer', 'Cloud Architect'],
      difficulty: 'Hard',
      readinessScore: 68,
      stages: ['Online Assessment (OA)', 'Coding & Work Simulation', 'Loop Technical Interviews (3 Rounds)', 'Bar Raiser Round'],
      topSkills: ['Trees & Dynamic Programming', 'System Design Basics', 'Amazon Leadership Principles'],
      improvements: ['Graph Traversal (BFS/DFS)', 'STAR Behavioral Storytelling', 'System Design Scalability']
    },
    {
      id: 'comp_microsoft',
      name: 'Microsoft',
      roles: ['Software Engineer', 'Data Engineer'],
      difficulty: 'Hard',
      readinessScore: 72,
      stages: ['Resume Screening', 'Codility OA', '3 Technical Interview Rounds', 'AA (Appropriate Asker) HR Round'],
      topSkills: ['Linked List & Trees', 'OOP Principles', 'OS & Memory Management'],
      improvements: ['Trie & Heap Data Structures', 'Operating Systems Paging', 'SQL Window Functions']
    },
    {
      id: 'comp_deloitte',
      name: 'Deloitte',
      roles: ['Analyst', 'Technology Consultant', 'Risk Analyst'],
      difficulty: 'Moderate',
      readinessScore: 79,
      stages: ['Aptitude & Versant Test', 'Case Study Assessment', 'Technical & Managerial Interview'],
      topSkills: ['SQL', 'Power BI / Tableau', 'Analytical Problem Solving'],
      improvements: ['Business Case Studies', 'Data Visualization', 'Group Discussion']
    },
    {
      id: 'comp_jpmorgan',
      name: 'JPMorgan Chase & Co.',
      roles: ['Software Engineer', 'Quant Developer'],
      difficulty: 'Challenging',
      readinessScore: 74,
      stages: ['Hackathon / CodeVue Assessment', 'Superday Interviews (2 Rounds)', 'HR Fitment'],
      topSkills: ['Algorithms', 'System Fundamentals', 'Financial Tech Interest'],
      improvements: ['Multi-threading', 'Algorithm Optimization', 'Database Indexing']
    },
    {
      id: 'comp_flipkart',
      name: 'Flipkart',
      roles: ['SDE-1', 'UI Engineer'],
      difficulty: 'Hard',
      readinessScore: 70,
      stages: ['Machine Coding Round', 'Problem Solving & DSA', 'System Design & Cultural Fit'],
      topSkills: ['Object Oriented Design', 'DSA', 'Frontend Performance'],
      improvements: ['Machine Coding Practices', 'LLD Design Patterns', 'Clean Code Structure']
    }
  ];

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '1rem', padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
          <Building2 size={16} /> Target Company Preparation & Placement Readiness Suite
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Company-Specific Placement Roadmaps
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Calculate your company readiness score (78+), inspect verified hiring round timelines, and solve targeted DSA problem sets.
        </p>
      </div>

      {/* Company Grid */}
      {!selectedCompany ? (
        <div className="grid-autofit-md">
          {companies.map(comp => (
            <div key={comp.id} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 800 }}>
                      {comp.name[0]}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem' }}>{comp.name}</h3>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{comp.difficulty}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Readiness</div>
                    <strong style={{ fontSize: '1.25rem', color: comp.readinessScore > 75 ? '#10b981' : '#f59e0b' }}>
                      {comp.readinessScore}%
                    </strong>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>Target Roles:</div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {comp.roles.map(r => (
                      <span key={r} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.15rem 0.5rem', borderRadius: 4 }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={() => { setSelectedCompany(comp); confetti({ particleCount: 35, origin: { y: 0.6 } }); }} className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                Prepare for {comp.name} <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Selected Company Detail View */
        <div className="glass-card" style={{ padding: '2.25rem', background: 'var(--bg-surface-elevated)' }}>
          <button onClick={() => setSelectedCompany(null)} className="btn btn-sm btn-outline" style={{ marginBottom: '1.5rem' }}>
            ← Back to Companies
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Verified Hiring Roadmap</span>
              <h2 style={{ fontSize: '2.2rem' }}>Prepare for {selectedCompany.name}</h2>
              <p style={{ color: 'var(--text-muted)' }}>Target Roles: {selectedCompany.roles.join(' • ')}</p>
            </div>

            <div className="glass-card" style={{ padding: '1rem 1.5rem', background: 'var(--bg-surface)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Your Readiness</div>
              <strong style={{ fontSize: '2rem', color: '#10b981' }}>{selectedCompany.readinessScore} / 100</strong>
            </div>
          </div>

          {/* Hiring Timeline */}
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Selection Stages Timeline</h3>
          <div style={{ display: 'flex', gap: '0.85rem', overflowX: 'auto', marginBottom: '2.5rem', paddingBottom: '0.5rem' }}>
            {selectedCompany.stages.map((stage, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1rem 1.25rem', minWidth: '180px', background: 'var(--bg-surface)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '0.2rem' }}>STAGE 0{idx + 1}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{stage}</div>
              </div>
            ))}
          </div>

          {/* Top 3 Improvements */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-surface)' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--accent-amber)', marginBottom: '0.85rem' }}>Top 3 Actionable Improvements</h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedCompany.improvements.map((imp, idx) => (
                  <li key={idx}><strong>{imp}</strong></li>
                ))}
              </ul>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>Start Targeted Prep</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Solve company DSA problems and practice behavioral STAR interview questions.
                </p>
              </div>
              <button onClick={() => setCurrentView('interview-studio')} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
                Start Company Mock Interview →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
