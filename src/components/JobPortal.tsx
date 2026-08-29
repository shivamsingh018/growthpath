import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, MapPin, DollarSign, Clock, Search, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { apiClient } from '../services/api';
import confetti from 'canvas-confetti';

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote';
  salary: string;
  category: string;
  postedDate: string;
  description: string;
  requirements: string[];
}

export const JobPortal: React.FC = () => {
  const { portfolios, currentUser, setCurrentView } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeApplyingJob, setActiveApplyingJob] = useState<JobListing | null>(null);
  const [selectedProjId, setSelectedProjId] = useState<string>(portfolios[0]?.id || '');
  const [appliedJobs, setAppliedJobs] = useState<{ [id: string]: boolean }>({});

  const jobs: JobListing[] = [
    {
      id: 'job_1',
      title: 'Senior UI/UX & Product Designer',
      company: 'Shivam Design Systems',
      location: 'San Francisco, CA (Remote Option)',
      type: 'Full-time',
      salary: '$120,000 - $150,000 / yr',
      category: 'UI/UX Design',
      postedDate: '2 days ago',
      description: 'We are seeking a talented UI/UX Product Designer to lead design system architecture and complex financial dashboard workflows.',
      requirements: ['Strong portfolio with end-to-end case studies', 'Proficiency in Figma and WCAG accessibility standards', '3+ years product design experience']
    },
    {
      id: 'job_2',
      title: 'Architectural Project Designer',
      company: 'Shivam Architectural Practice',
      location: 'London, UK & New Delhi',
      type: 'Full-time',
      salary: '£45,000 - £60,000 / yr',
      category: 'Architecture',
      postedDate: '1 day ago',
      description: 'Looking for a licensed or graduate architect skilled in timber construction, 3D Rhino rendering, and COA presentation sheet drafting.',
      requirements: ['B.Arch or M.Arch degree', 'Proficiency in Rhino, Revit & V-Ray', 'Clean presentation portfolio']
    },
    {
      id: 'job_3',
      title: 'Fullstack Software Engineer (React / Node.js)',
      company: 'Shivam Learning Platform',
      location: 'New Delhi & Remote',
      type: 'Full-time',
      salary: '₹18,000,000 - ₹28,000,000 / yr',
      category: 'Engineering & Tech',
      postedDate: 'Just now',
      description: 'Join our core platform engineering team building interactive learning tools, canvas annotators, and quiz engines.',
      requirements: ['Strong React 18 & TypeScript background', 'Node.js backend API architecture', 'Good problem solving skills']
    }
  ];

  const categories = ['All', 'UI/UX Design', 'Architecture', 'Engineering & Tech'];

  const filteredJobs = jobs.filter(j => {
    const matchesCategory = selectedCategory === 'All' || j.category === selectedCategory;
    const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          j.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApplyingJob) return;

    try {
      await apiClient.createApplication({
        company: activeApplyingJob.company,
        role: activeApplyingJob.title,
        status: 'Applied',
        notes: `Applied for ${activeApplyingJob.title} with project ID: ${selectedProjId}`
      });
    } catch (err) {
      console.error('Application submit error:', err);
    }

    setAppliedJobs(prev => ({ ...prev, [activeApplyingJob.id]: true }));
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    
    alert(`Application submitted successfully for ${activeApplyingJob.title} at ${activeApplyingJob.company}! Saved to your Job Application Tracker.`);
    setActiveApplyingJob(null);
    setCurrentView('job-tracker');
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '1rem', padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
          <Briefcase size={16} /> Career Readiness & Job Opportunities Portal — Founded by Shivam Singh
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Apply for Roles with Your Portfolio</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
          Direct hiring portal connecting verified candidates to UI/UX, Architecture, and Software Engineering opportunities.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search job roles, companies, or keywords..."
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

      {/* Job Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredJobs.map(job => {
          const isApplied = appliedJobs[job.id];

          return (
            <div key={job.id} className="glass-card" style={{ padding: '1.75rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.3rem' }}>{job.title}</h3>
                  <span className="badge badge-indigo">{job.category}</span>
                </div>

                <div style={{ fontSize: '0.9rem', color: 'var(--accent-light)', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {job.company}
                </div>

                <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} color="var(--accent-secondary)" /> {job.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <DollarSign size={14} color="var(--accent-emerald)" /> {job.salary}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={14} /> Posted {job.postedDate}
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {job.description}
                </p>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {job.requirements.map((req, rIdx) => (
                    <span key={rIdx} className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>
                      ✓ {req}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ minWidth: '180px' }}>
                {isApplied ? (
                  <button className="btn btn-secondary" disabled style={{ width: '100%', opacity: 0.8, color: '#6ee7b7' }}>
                    <CheckCircle2 size={16} /> Application Sent
                  </button>
                ) : (
                  <button 
                    onClick={() => setActiveApplyingJob(job)} 
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    <Send size={16} /> Apply with Portfolio
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Apply Modal */}
      {activeApplyingJob && (
        <div className="modal-overlay" onClick={() => setActiveApplyingJob(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', padding: '2rem' }}>
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <span className="badge badge-indigo" style={{ marginBottom: '0.35rem' }}>{activeApplyingJob.company}</span>
              <h2 style={{ fontSize: '1.35rem' }}>Apply for {activeApplyingJob.title}</h2>
            </div>

            <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Select Portfolio Project to Submit *
                </label>
                <select 
                  className="input-field"
                  value={selectedProjId}
                  onChange={e => setSelectedProjId(e.target.value)}
                  required
                >
                  {portfolios.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Cover Note for Hiring Lead (Shivam Singh)
                </label>
                <textarea 
                  className="input-field"
                  rows={4}
                  defaultValue={`Dear Hiring Team at ${activeApplyingJob.company},\n\nI am excited to submit my portfolio project for the ${activeApplyingJob.title} position. My work includes end-to-end user research, visual hierarchy polish, and accessible component design.`}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setActiveApplyingJob(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Sparkles size={16} /> Submit Job Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
