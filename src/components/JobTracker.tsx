import React, { useState } from 'react';
import { Briefcase, Plus, Calendar, CheckCircle2, Clock, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Application {
  id: string;
  company: string;
  role: string;
  appliedDate: string;
  status: 'Wishlist' | 'Applied' | 'Assessment' | 'Interview' | 'Offer' | 'Rejected';
  notes: string;
}

export const JobTracker: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([
    { id: 'app_1', company: 'Google', role: 'Software Engineering Associate', appliedDate: '2026-08-10', status: 'Interview', notes: 'Technical round scheduled with lead engineer on Aug 20.' },
    { id: 'app_2', company: 'Accenture', role: 'Data Analyst', appliedDate: '2026-08-12', status: 'Assessment', notes: 'Completed cognitive test. Waiting for coding round.' },
    { id: 'app_3', company: 'Vercel', role: 'UI/UX Product Designer', appliedDate: '2026-08-15', status: 'Applied', notes: 'Submitted verified portfolio case study link.' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newComp, setNewComp] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newStatus, setNewStatus] = useState<Application['status']>('Applied');
  const [newNotes, setNewNotes] = useState('');

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComp.trim() || !newRole.trim()) return;

    const item: Application = {
      id: Date.now().toString(),
      company: newComp,
      role: newRole,
      appliedDate: new Date().toISOString().split('T')[0],
      status: newStatus,
      notes: newNotes
    };

    setApplications(prev => [item, ...prev]);
    setShowAddModal(false);
    setNewComp('');
    setNewRole('');
    setNewNotes('');
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
  };

  const updateStatus = (id: string, status: Application['status']) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const deleteApp = (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-indigo" style={{ marginBottom: '0.45rem' }}>
            <Briefcase size={14} /> Career Application Pipeline
          </span>
          <h1 style={{ fontSize: '2.2rem', letterSpacing: '-0.02em' }}>Job Application Tracker</h1>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <Plus size={18} /> Add New Application
        </button>
      </div>

      {/* Applications Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {applications.map(app => (
          <div key={app.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <h3 style={{ fontSize: '1.2rem' }}>{app.company}</h3>
                <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>{app.role}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{app.notes}</p>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Applied on: {app.appliedDate}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <select 
                className="input-field" 
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.75rem', width: 'auto' }}
                value={app.status}
                onChange={e => updateStatus(app.id, e.target.value as Application['status'])}
              >
                <option value="Wishlist">Wishlist</option>
                <option value="Applied">Applied</option>
                <option value="Assessment">Assessment</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>

              <button onClick={() => deleteApp(app.id)} style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: '0.4rem' }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Add Job Application</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Track target companies and interview dates.</p>

            <form onSubmit={handleAddApplication} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Company Name *</label>
                <input type="text" className="input-field" placeholder="e.g. Google / Accenture" value={newComp} onChange={e => setNewComp(e.target.value)} required />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Role Title *</label>
                <input type="text" className="input-field" placeholder="e.g. Software Engineer" value={newRole} onChange={e => setNewRole(e.target.value)} required />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Notes / Assessment Date</label>
                <textarea className="input-field" rows={3} placeholder="Add interview notes or test date..." value={newNotes} onChange={e => setNewNotes(e.target.value)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
