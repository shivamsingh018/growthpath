import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  ShieldCheck, 
  Key, 
  Bell, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Globe, 
  Phone, 
  Mail, 
  Save,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SettingsView: React.FC = () => {
  const { currentUser, setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'security' | 'connected' | 'privacy' | 'notifications'>('security');

  // Change password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Privacy State
  const [publicProfileEnabled, setPublicProfileEnabled] = useState(true);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    setPasswordError(null);
    setPasswordSuccess('Password updated successfully ✓');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem', maxWidth: '950px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button onClick={() => setCurrentView('dashboard')} className="btn btn-outline btn-sm">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Account & Platform Settings</h1>
        <span className="badge badge-indigo">Security Active</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2rem' }}>
        
        {/* Navigation Sidebar */}
        <div className="glass-card" style={{ padding: '0.75rem', height: 'fit-content' }}>
          <button 
            onClick={() => setActiveTab('security')}
            className={`btn btn-sm ${activeTab === 'security' ? 'btn-primary' : 'btn-outline'}`}
            style={{ width: '100%', justifyContent: 'flex-start', border: 'none', marginBottom: '0.35rem' }}
          >
            <Key size={16} /> Security
          </button>

          <button 
            onClick={() => setActiveTab('connected')}
            className={`btn btn-sm ${activeTab === 'connected' ? 'btn-primary' : 'btn-outline'}`}
            style={{ width: '100%', justifyContent: 'flex-start', border: 'none', marginBottom: '0.35rem' }}
          >
            <ShieldCheck size={16} /> Connected Accounts
          </button>

          <button 
            onClick={() => setActiveTab('privacy')}
            className={`btn btn-sm ${activeTab === 'privacy' ? 'btn-primary' : 'btn-outline'}`}
            style={{ width: '100%', justifyContent: 'flex-start', border: 'none', marginBottom: '0.35rem' }}
          >
            <Eye size={16} /> Privacy & Share
          </button>

          <button 
            onClick={() => setActiveTab('notifications')}
            className={`btn btn-sm ${activeTab === 'notifications' ? 'btn-primary' : 'btn-outline'}`}
            style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}
          >
            <Bell size={16} /> Notifications
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="glass-card" style={{ padding: '2rem', background: 'var(--bg-surface-elevated)' }}>
          
          {/* TAB 1: SECURITY */}
          {activeTab === 'security' && (
            <div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>Change Password</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Ensure your account is using a strong, unique password.
              </p>

              {passwordError && (
                <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', color: '#fda4af', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={18} /> {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', color: '#6ee7b7', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} /> {passwordSuccess}
                </div>
              )}

              <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '480px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Current Password</label>
                  <input type="password" className="input-field" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>New Password</label>
                  <input type="password" className="input-field" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Confirm New Password</label>
                  <input type="password" className="input-field" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                  <Save size={16} /> Update Password
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: CONNECTED ACCOUNTS */}
          {activeTab === 'connected' && (
            <div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>Authentication Methods</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Manage your verified login identities connected to GrowthPath.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Google Identity</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>shivam.google@growthpath.com</div>
                    </div>
                  </div>
                  <span className="badge badge-emerald">Connected ✓</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <Mail size={20} color="var(--accent-cyan)" />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Email Address</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{(currentUser as any)?.email || 'shivam@growthpath.com'}</div>
                    </div>
                  </div>
                  <span className="badge badge-emerald">Verified ✓</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <Phone size={20} color="var(--accent-primary)" />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Mobile OTP Number</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{(currentUser as any)?.phone || '+91 98765 43210'}</div>
                    </div>
                  </div>
                  <span className="badge badge-emerald">Verified ✓</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY & PUBLIC PROFILE */}
          {activeTab === 'privacy' && (
            <div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>Public Portfolio Visibility</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Control whether recruiters and mentors can view your public profile at <strong>/u/{(currentUser as any)?.username || 'shivam'}</strong>.
              </p>

              <div style={{ padding: '1.25rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Public Portfolio URL</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }}>http://localhost:3000/u/{(currentUser as any)?.username || 'shivam'}</div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={publicProfileEnabled} 
                    onChange={e => setPublicProfileEnabled(e.target.checked)} 
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                  />
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>
                  🔒 Private data like your email address, mobile number, private resumes, and job application pipeline are ALWAYS hidden from public view.
                </p>
              </div>

              <button onClick={() => setCurrentView('public-profile')} className="btn btn-outline">
                <Globe size={16} /> View My Public Profile →
              </button>
            </div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>Notification Preferences</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Manage how GrowthPath alerts you regarding mentor reviews and job status changes.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)' }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>Mentor Review Alerts</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>Notify when a mentor submits video/code feedback</div>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: 18, height: 18 }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)' }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>ATS Resume Optimization Tips</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>Receive AI advice when new job descriptions are added</div>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: 18, height: 18 }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
