import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { apiClient } from '../services/api';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Github, 
  Linkedin, 
  Globe, 
  Sparkles, 
  Edit3, 
  Share2, 
  Settings, 
  Award, 
  FileCheck, 
  Code2, 
  Building2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { currentUser, setCurrentView } = useApp();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await apiClient.getProfile();
      if (res.success && res.profile) {
        setProfileData(res.profile);
      } else {
        setProfileData({
          name: currentUser?.name || 'Shivam Singh',
          username: (currentUser as any)?.username || 'shivam',
          email: (currentUser as any)?.email || 'shivam@growthpath.com',
          phone: (currentUser as any)?.phone || '+91 98765 43210',
          role: (currentUser as any)?.role || 'STUDENT',
          headline: 'Software Engineering Aspirant',
          bio: 'Computer Science Engineering student at Galgotias University focused on software development, problem solving, DSA, data analysis, and building real-world projects.',
          location: 'Gorakhpur, Uttar Pradesh',
          college: 'Galgotias University',
          degree: 'B.Tech Computer Science Engineering',
          graduation_year: 2027,
          target_role: 'Software Engineer',
          target_company: 'Accenture',
          skills: 'Java, Python, SQL, Data Analysis, Power BI, DSA, JavaScript, React, Node.js, Git, GitHub',
          github: 'https://github.com/shivamsingh',
          linkedin: 'https://linkedin.com/in/shivamsingh',
          portfolio: 'https://growthpath.com',
          avatar: currentUser?.avatar || '/shivam-singh.png',
          completionPercentage: 82,
          stats: {
            readinessScore: 84,
            atsScore: 82,
            dsaProgress: 76,
            projectsCount: 8,
            applicationsCount: 12
          }
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [currentUser]);

  if (loading || !profileData) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading profile data...
      </div>
    );
  }

  const getInitials = (n: string) => {
    if (!n) return 'SS';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return n.substring(0, 2).toUpperCase();
  };

  const skillsList = profileData.skills ? profileData.skills.split(',').map((s: string) => s.trim()) : ['React 18', 'TypeScript', 'Node.js'];

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem', maxWidth: '1050px' }}>
      
      {/* Top Banner Card */}
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-glow)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {profileData.avatar ? (
              <img src={profileData.avatar} alt={profileData.name} style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-primary)', boxShadow: 'var(--shadow-glow)' }} />
            ) : (
              <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)', color: '#fff', fontSize: '2.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {getInitials(profileData.name)}
              </div>
            )}

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{profileData.name}</h1>
                <span className="badge badge-indigo">@{profileData.username}</span>
                <span className="badge badge-emerald">{profileData.role}</span>
              </div>
              <p style={{ color: 'var(--accent-light)', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>{profileData.headline}</p>
              <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><MapPin size={14} color="var(--accent-primary)" /> {profileData.location}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><GraduationCap size={14} color="var(--accent-cyan)" /> {profileData.college}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Briefcase size={14} color="var(--accent-emerald)" /> {profileData.target_role}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setCurrentView('profile-edit')} className="btn btn-primary">
              <Edit3 size={16} /> Edit Profile
            </button>
            <button onClick={() => setCurrentView('public-profile')} className="btn btn-outline">
              <Share2 size={16} /> Share Profile
            </button>
            <button onClick={() => setCurrentView('settings')} className="btn btn-secondary" title="Settings">
              <Settings size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Completion Bar (72%) */}
      <div className="glass-card" style={{ padding: '1.5rem 2rem', marginBottom: '2rem', background: 'var(--bg-surface-elevated)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
          <div>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Profile Completion</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Complete your profile to unlock better career & recruiter recommendations.</p>
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{profileData.completionPercentage}%</span>
        </div>

        <div style={{ width: '100%', height: 10, background: 'rgba(255, 255, 255, 0.08)', borderRadius: 5, overflow: 'hidden', marginBottom: '1rem' }}>
          <div style={{ width: `${profileData.completionPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)', borderRadius: 5, transition: 'width 0.6s ease' }} />
        </div>

        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', color: 'var(--text-dim)', flexWrap: 'wrap' }}>
          <span style={{ color: '#10b981' }}>✓ Name & Email</span>
          <span style={{ color: '#10b981' }}>✓ Education</span>
          <span style={{ color: '#10b981' }}>✓ Skills</span>
          <span style={{ color: '#10b981' }}>✓ Resume Uploaded</span>
          <span style={{ color: 'var(--text-muted)' }}>○ Add GitHub & LinkedIn</span>
        </div>
      </div>

      {/* Career Readiness Scorecard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <Award size={20} color="var(--accent-primary)" style={{ margin: '0 auto 0.35rem auto' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{profileData.stats.readinessScore}/100</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Career Readiness</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <FileCheck size={20} color="var(--accent-cyan)" style={{ margin: '0 auto 0.35rem auto' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{profileData.stats.atsScore}/100</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ATS Score</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <Code2 size={20} color="var(--accent-emerald)" style={{ margin: '0 auto 0.35rem auto' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{profileData.stats.dsaProgress}%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>DSA Progress</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <Building2 size={20} color="#f59e0b" style={{ margin: '0 auto 0.35rem auto' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{profileData.stats.projectsCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Projects Built</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <Briefcase size={20} color="#ec4899" style={{ margin: '0 auto 0.35rem auto' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{profileData.stats.applicationsCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Applications</div>
        </div>
      </div>

      {/* Detailed Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
        
        {/* Left Column: Personal, Education, Career */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* About */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>About Me</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              {profileData.bio}
            </p>
          </div>

          {/* Personal Information */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Personal Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>FULL NAME</span>
                <div style={{ fontWeight: 700 }}>{profileData.name}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>USERNAME</span>
                <div style={{ fontWeight: 700 }}>@{profileData.username}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>EMAIL</span>
                <div style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{profileData.email}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>MOBILE</span>
                <div style={{ fontWeight: 700 }}>{profileData.phone}</div>
              </div>
            </div>
          </div>

          {/* Education & Career */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Education & Career Path</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>COLLEGE / UNIVERSITY</span>
                <div style={{ fontWeight: 700 }}>{profileData.college}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>DEGREE</span>
                <div style={{ fontWeight: 700 }}>{profileData.degree}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>GRADUATION YEAR</span>
                <div style={{ fontWeight: 700 }}>{profileData.graduation_year}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>TARGET COMPANIES</span>
                <div style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>{profileData.target_company}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skills & Social Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Technical Skills */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Technical Skills</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {skillsList.map((skill: string, idx: number) => (
                <span key={idx} className="badge badge-indigo" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Social & Portfolio</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <a href={profileData.github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem' }}>
                <Github size={18} color="var(--accent-primary)" /> {profileData.github}
              </a>
              <a href={profileData.linkedin} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem' }}>
                <Linkedin size={18} color="var(--accent-cyan)" /> {profileData.linkedin}
              </a>
              <a href={profileData.portfolio} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem' }}>
                <Globe size={18} color="var(--accent-emerald)" /> {profileData.portfolio}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
