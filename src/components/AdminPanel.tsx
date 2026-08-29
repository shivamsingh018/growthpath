import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, 
  Users, 
  Award, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  BarChart3, 
  UserCheck,
  Search,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { allUsers, allMentors, portfolios, reviews, verifyUserOrMentor } = useApp();

  const completedReviews = reviews.filter(r => r.status === 'Completed');

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      {/* Admin Header */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2.5rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(99,102,241,0.1) 100%)', borderLeft: '4px solid var(--accent-amber)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Shield size={24} color="var(--accent-amber)" />
              <h1 style={{ fontSize: '1.8rem' }}>Admin Operations & Analytics Panel</h1>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Platform management dashboard for reviewing mentors, monitoring feedback quality, and auditing portfolio submissions.
            </p>
          </div>
          <span className="badge badge-amber" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
            System Status: Healthy & Online
          </span>
        </div>
      </div>

      {/* Analytics Counter Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
            Total Designers
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
            {allUsers.length}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
            Verified Mentors
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
            {allMentors.length}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
            Completed Reviews
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
            {completedReviews.length}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
            Avg Rating Score
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
            4.9 / 5
          </div>
        </div>
      </div>

      {/* Section 1: Mentor Verification & Roster Management */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <UserCheck size={20} color="var(--accent-emerald)" /> Verified Mentors Directory Management
        </h2>

        <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Mentor Name</th>
                <th style={{ padding: '0.75rem 1rem' }}>Company & Role</th>
                <th style={{ padding: '0.75rem 1rem' }}>Domain</th>
                <th style={{ padding: '0.75rem 1rem' }}>Reviews Given</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allMentors.map(mentor => (
                <tr key={mentor.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <img src={mentor.avatar} alt={mentor.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ display: 'block' }}>{mentor.name}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{mentor.email}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div>{mentor.title}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-light)' }}>{mentor.company}</span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className="badge badge-indigo">{mentor.domain}</span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                    {mentor.reviewsCompleted} reviews
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className={`badge ${mentor.availability === 'Available' ? 'badge-emerald' : 'badge-amber'}`}>
                      {mentor.availability}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <button 
                      onClick={() => verifyUserOrMentor(mentor.id, true)} 
                      className="btn btn-sm btn-outline"
                    >
                      <CheckCircle2 size={14} color="var(--accent-emerald)" /> Verified
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Portfolio Content Moderation & Quality Audit */}
      <section>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Shield size={20} color="var(--accent-primary)" /> Uploaded Portfolios Audit Queue
        </h2>

        <div className="glass-card" style={{ padding: '1rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Project Title</th>
                <th style={{ padding: '0.75rem 1rem' }}>Designer</th>
                <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                <th style={{ padding: '0.75rem 1rem' }}>Date Uploaded</th>
                <th style={{ padding: '0.75rem 1rem' }}>Moderation Status</th>
              </tr>
            </thead>
            <tbody>
              {portfolios.map(proj => (
                <tr key={proj.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <img src={proj.coverImage} alt={proj.title} style={{ width: 40, height: 30, borderRadius: 4, objectFit: 'cover' }} />
                    <strong style={{ fontSize: '0.9rem' }}>{proj.title}</strong>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    {proj.designerName}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className="badge badge-indigo">{proj.category}</span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {proj.createdAt}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className="badge badge-emerald">Approved</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
