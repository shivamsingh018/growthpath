import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { apiClient } from '../services/api';
import { 
  Sparkles, 
  Compass, 
  Users, 
  FolderGit2, 
  BookOpen, 
  Shield, 
  Sun, 
  Moon, 
  Layers,
  GraduationCap,
  Briefcase,
  FileCheck,
  Bell,
  ChevronDown,
  Menu,
  X,
  User,
  Edit3,
  Settings,
  LogOut,
  CheckCircle2,
  Check,
  Building2,
  Award,
  Target,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    currentUser, 
    setCurrentUser,
    openAuthModal,
    currentView, 
    setCurrentView,
    reviews
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(4);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProfileDropdownOpen(false);
        setNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getInitials = (n: string) => {
    if (!n) return 'SS';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return n.substring(0, 2).toUpperCase();
  };

  const navItems = [
    { id: 'landing', label: 'Explore', icon: Compass },
    { id: 'batches', label: 'Batches', icon: GraduationCap },
    { id: 'project-lab', label: 'Project Lab', icon: Layers },
    { id: 'dashboard', label: 'My Dashboard', icon: Layers },
    { id: 'company-prep', label: 'Company Prep', icon: Building2 },
    { id: 'interview-studio', label: 'Interview Studio', icon: Award },
    { id: 'job-tracker', label: 'Job Tracker', icon: Briefcase },
    { id: 'ats', label: 'ATS Score', icon: FileCheck },
    { id: 'jobs', label: 'Job Portal', icon: Briefcase },
    { id: 'recruiter', label: 'Recruiter', icon: Sparkles, accent: true }
  ];

  const notifications = [
    { id: 'n1', title: 'AI Project Review completed', text: 'Quality Score: 92/100 for your Fullstack Dashboard.', view: 'project-lab', time: '10m ago' },
    { id: 'n2', title: 'Mentor feedback received', text: 'Shivam Singh posted pin feedback on your COA sheet.', view: 'dashboard', time: '1h ago' },
    { id: 'n3', title: 'Resume score updated', text: 'ATS Score increased to 84/100 after keyword optimization.', view: 'ats', time: '2h ago' },
    { id: 'n4', title: 'New project recommendation', text: 'Eco-Pavilion Architectural Sheet is available in Project Lab.', view: 'project-lab', time: '1d ago' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 99999,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '0 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', gap: '1rem' }}>
        
        {/* Left Brand Logo */}
        <div 
          onClick={() => setCurrentView('landing')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', flexShrink: 0 }}
        >
          <img 
            src="/growthpath-logo.jpg" 
            alt="GrowthPath Logo" 
            style={{ 
              height: 38, 
              borderRadius: 'var(--radius-sm)', 
              boxShadow: '0 4px 18px rgba(99, 102, 241, 0.45)', 
              border: '1px solid rgba(255, 255, 255, 0.2)',
              objectFit: 'contain'
            }} 
          />
          <div>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.025em' }}>
              <span style={{ color: '#ffffff' }}>Growth</span>
              <span style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 50%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Path</span>
            </span>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.05em', marginTop: '-2px' }}>
              LEARN • BUILD • REVIEW • GET HIRED
            </div>
          </div>
        </div>

        {/* Center Navigation Pills (Compact, Flex-Shrinkable) */}
        <nav className="desktop-only" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.15rem', 
          background: 'var(--bg-surface)', 
          padding: '0.2rem 0.3rem', 
          borderRadius: 'var(--radius-full)', 
          border: '1px solid var(--border-subtle)',
          flexShrink: 1,
          overflowX: 'auto'
        }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button 
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
                style={{ 
                  border: 'none', 
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.76rem',
                  padding: '0.28rem 0.55rem',
                  whiteSpace: 'nowrap',
                  background: isActive 
                    ? item.accent 
                      ? 'var(--accent-emerald)' 
                      : 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)' 
                    : item.accent ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  color: isActive ? '#ffffff' : item.accent ? 'var(--accent-emerald)' : 'var(--text-muted)',
                  boxShadow: isActive ? '0 0 18px var(--accent-glow)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <Icon size={13} /> {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls (Guaranteed Unshrinkable flexShrink: 0) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
          {/* Notification Icon */}
          <div ref={notifRef} style={{ position: 'relative' }}>
            <button 
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="btn btn-sm btn-secondary"
              style={{ width: 36, height: 36, padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Bell size={16} color="var(--text-muted)" />
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-rose)', border: '2px solid var(--bg-base)' }} />
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {notificationOpen && (
              <div 
                className="glass-card" 
                style={{ 
                  position: 'absolute', 
                  top: '125%', 
                  right: 0, 
                  width: '320px', 
                  padding: '1rem', 
                  zIndex: 200, 
                  boxShadow: 'var(--shadow-md)' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Notifications</div>
                  {unreadCount > 0 && (
                    <button 
                      onClick={() => setUnreadCount(0)} 
                      style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {notifications.map(n => (
                    <div 
                      key={n.id}
                      onClick={() => { setCurrentView(n.view); setNotificationOpen(false); }}
                      style={{ 
                        padding: '0.65rem', 
                        borderRadius: 'var(--radius-sm)', 
                        background: 'var(--bg-surface)', 
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.15rem' }}>
                        <span>{n.title}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{n.time}</span>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{n.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme} 
            className="btn btn-sm btn-secondary" 
            title="Toggle light/dark theme"
            style={{ width: 36, height: 36, padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {theme === 'dark' ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#6366f1" />}
          </button>

          {/* Right User Profile Dropdown / Sign In Trigger */}
          {(() => {
            const displayUser = currentUser || {
              id: 'usr_shivam',
              name: 'Shivam Singh',
              username: 'shivam',
              email: 'shivam@growthpath.com',
              role: 'STUDENT',
              avatar: '/shivam-singh.png'
            };

            return (
              <div 
                ref={profileRef}
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  height: '44px',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  userSelect: 'none',
                  flexShrink: 0
                }}
              >
                {displayUser.avatar ? (
                  <img src={displayUser.avatar} alt={displayUser.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)', boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)' }} />
                ) : (
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)', color: '#fff', fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--accent-primary)', boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)' }}>
                    {getInitials(displayUser.name)}
                  </div>
                )}
                
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.15 }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>{displayUser.name}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-light)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    Me <ChevronDown size={11} />
                  </span>
                </div>

                {/* Profile Dropdown Menu (340px SaaS Card with zIndex 99999) */}
                {profileDropdownOpen && (
                  <div 
                    className="glass-card" 
                    onClick={e => e.stopPropagation()}
                    style={{ 
                      position: 'absolute', 
                      top: 'calc(100% + 8px)', 
                      right: 0, 
                      width: '340px', 
                      padding: '1.25rem', 
                      zIndex: 99999, 
                      background: '#080B14',
                      border: '1px solid rgba(99, 102, 241, 0.35)',
                      borderRadius: '18px',
                      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.9), 0 0 24px rgba(99, 102, 241, 0.3)',
                      animation: 'fadeIn 0.18s ease-out'
                    }}
                  >
                    {/* Header Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
                      {displayUser.avatar ? (
                        <img src={displayUser.avatar} alt={displayUser.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-primary)', marginBottom: '0.5rem' }} />
                      ) : (
                        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)', color: '#fff', fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                          {getInitials(displayUser.name)}
                        </div>
                      )}
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>{displayUser.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>@{(displayUser as any).username || 'shivam'}</div>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', marginBottom: '0.75rem' }}>{(displayUser as any).role || 'Student'}</span>

                      <button 
                        onClick={() => { setCurrentView('profile'); setProfileDropdownOpen(false); }}
                        className="btn btn-sm btn-primary" 
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        View Profile →
                      </button>
                    </div>

                    {/* Core Navigation Links */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.85rem' }}>
                      <button onClick={() => { setCurrentView('profile'); setProfileDropdownOpen(false); }} className="btn btn-sm btn-outline" style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}>
                        <User size={15} color="var(--accent-primary)" /> My Profile
                      </button>
                      <button onClick={() => { setCurrentView('dashboard'); setProfileDropdownOpen(false); }} className="btn btn-sm btn-outline" style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}>
                        <Layers size={15} color="#3b82f6" /> My Dashboard
                      </button>
                      <button onClick={() => { setCurrentView('ats'); setProfileDropdownOpen(false); }} className="btn btn-sm btn-outline" style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}>
                        <FileCheck size={15} color="var(--accent-emerald)" /> My Resume
                      </button>
                      <button onClick={() => { setCurrentView('job-tracker'); setProfileDropdownOpen(false); }} className="btn btn-sm btn-outline" style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}>
                        <Briefcase size={15} color="#f59e0b" /> My Applications
                      </button>
                      <button onClick={() => { setCurrentView('company-prep'); setProfileDropdownOpen(false); }} className="btn btn-sm btn-outline" style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}>
                        <Target size={15} color="#ec4899" /> Career Readiness
                      </button>
                    </div>

                    {/* Account & Settings Links */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.65rem', marginBottom: '0.85rem' }}>
                      <button onClick={() => { setCurrentView('profile-edit'); setProfileDropdownOpen(false); }} className="btn btn-sm btn-outline" style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}>
                        <Edit3 size={15} color="var(--accent-cyan)" /> Edit Profile
                      </button>
                      <button onClick={() => { setCurrentView('settings'); setProfileDropdownOpen(false); }} className="btn btn-sm btn-outline" style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}>
                        <Settings size={15} /> Settings
                      </button>
                      <button onClick={() => { setCurrentView('settings'); setProfileDropdownOpen(false); }} className="btn btn-sm btn-outline" style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}>
                        <ShieldCheck size={15} /> Security
                      </button>
                      <button onClick={() => { setNotificationOpen(true); setProfileDropdownOpen(false); }} className="btn btn-sm btn-outline" style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}>
                        <Bell size={15} /> Notifications
                      </button>
                    </div>

                    {/* Logout Footer */}
                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.65rem' }}>
                      <button 
                        onClick={() => { setProfileDropdownOpen(false); setShowLogoutConfirm(true); }}
                        className="btn btn-sm btn-outline" 
                        style={{ width: '100%', justifyContent: 'flex-start', border: 'none', color: 'var(--accent-rose)' }}
                      >
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', padding: '0.4rem' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="modal-overlay" onClick={() => setShowSettingsModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Platform Settings</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Manage notification preferences and platform display defaults for Shivam Singh.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Email Review Alerts</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Receive emails when mentor feedback is posted</div>
                </div>
                <input type="checkbox" defaultChecked style={{ width: 18, height: 18 }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>AI Auto-Audit</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Automatically score code repositories on submission</div>
                </div>
                <input type="checkbox" defaultChecked style={{ width: 18, height: 18 }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button onClick={() => setShowSettingsModal(false)} className="btn btn-primary">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="modal-content glass-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px', padding: '2rem', textAlign: 'center', background: 'var(--bg-surface-elevated)' }}>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(244, 63, 94, 0.15)', color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <LogOut size={24} />
            </div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Logout of GrowthPath?</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              You'll need to sign in again to access your career dashboard and personalized tools.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => setShowLogoutConfirm(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                Cancel
              </button>
              <button 
                onClick={async () => {
                  setShowLogoutConfirm(false);
                  try {
                    await apiClient.logout();
                  } catch (e) {}
                  setCurrentUser(null);
                  setCurrentView('login');
                }} 
                className="btn btn-primary" 
                style={{ flex: 1, background: 'var(--accent-rose)', borderColor: 'var(--accent-rose)' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="mobile-only glass-card" 
          style={{ 
            padding: '1.25rem', 
            margin: '0.5rem 1rem 1rem 1rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem' 
          }}
        >
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button 
                key={item.id}
                onClick={() => { setCurrentView(item.id); setMobileMenuOpen(false); }}
                className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
                style={{ width: '100%', justifyContent: 'flex-start', borderRadius: 'var(--radius-sm)' }}
              >
                <Icon size={16} /> {item.label}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </header>
  );
};
