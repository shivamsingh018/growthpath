import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DesignerDashboard } from './components/DesignerDashboard';
import { MentorDirectory } from './components/MentorDirectory';
import { ReviewRequestModal } from './components/ReviewRequestModal';
import { MentorStudio } from './components/MentorStudio';
import { FeedbackViewer } from './components/FeedbackViewer';
import { AdminPanel } from './components/AdminPanel';
import { LearningResources } from './components/LearningResources';
import { BatchesView } from './components/BatchesView';
import { JobPortal } from './components/JobPortal';
import { ATSChecker } from './components/ATSChecker';
import { ProjectLab } from './components/ProjectLab';
import { RecruiterDashboard } from './components/RecruiterDashboard';
import { CompanyPrep } from './components/CompanyPrep';
import { InterviewStudio } from './components/InterviewStudio';
import { JobTracker } from './components/JobTracker';
import { CmdKModal } from './components/CmdKModal';
import { AuthModal } from './components/AuthModal';
import { LoginPage } from './components/LoginPage';
import { ProfileView } from './components/ProfileView';
import { ProfileEdit } from './components/ProfileEdit';
import { SettingsView } from './components/SettingsView';
import { PublicProfile } from './components/PublicProfile';
import { PortfolioDetailModal } from './components/PortfolioDetailModal';
import { ChatWidget } from './components/ChatWidget';
import { PortfolioProject, MentorProfile, ReviewRequest } from './types';
import { X, Star, Briefcase, MapPin, Clock, Award, Sparkles } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { 
    currentView, 
    setCurrentView,
    isAuthenticated,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authRedirectView,
    selectedPortfolio, 
    setSelectedPortfolio, 
    selectedReviewRequest, 
    setSelectedReviewRequest 
  } = useApp();

  // Review request modal states
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewModalProjId, setReviewModalProjId] = useState<string | undefined>(undefined);
  const [reviewModalMentorId, setReviewModalMentorId] = useState<string | undefined>(undefined);

  // Mentor Detail Modal state
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);

  const handleOpenReviewModal = (projId?: string, mentorId?: string) => {
    setReviewModalProjId(projId);
    setReviewModalMentorId(mentorId);
    setShowReviewModal(true);
  };

  // Command Palette Cmd+K state
  const [showCmdK, setShowCmdK] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCmdK(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isAuthenticated || currentView === 'login') {
    return <LoginPage />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {currentView === 'landing' && (
          <LandingPage 
            onOpenProject={(proj) => setSelectedPortfolio(proj)}
            onOpenMentor={(m) => setSelectedMentor(m)}
            onRequestReview={(projId) => handleOpenReviewModal(projId)}
          />
        )}

        {currentView === 'batches' && (
          <BatchesView />
        )}

        {currentView === 'project-lab' && (
          <ProjectLab />
        )}

        {currentView === 'dashboard' && (
          <DesignerDashboard 
            onOpenProject={(proj) => setSelectedPortfolio(proj)}
            onOpenFeedback={(req) => setSelectedReviewRequest(req)}
            onRequestReview={(projId) => handleOpenReviewModal(projId)}
          />
        )}

        {currentView === 'mentors' && (
          <MentorDirectory 
            onOpenMentorModal={(m) => setSelectedMentor(m)}
            onRequestReviewWithMentor={(mId) => handleOpenReviewModal(undefined, mId)}
          />
        )}

        {currentView === 'mentor-studio' && (
          <MentorStudio 
            onInspectCompletedFeedback={(req) => setSelectedReviewRequest(req)}
          />
        )}

        {currentView === 'resources' && (
          <LearningResources />
        )}

        {currentView === 'jobs' && (
          <JobPortal />
        )}

        {currentView === 'ats' && (
          <ATSChecker />
        )}

        {currentView === 'company-prep' && (
          <CompanyPrep />
        )}

        {currentView === 'interview-studio' && (
          <InterviewStudio />
        )}

        {currentView === 'job-tracker' && (
          <JobTracker />
        )}

        {currentView === 'recruiter' && (
          <RecruiterDashboard />
        )}

        {currentView === 'profile' && (
          <ProfileView />
        )}

        {currentView === 'profile-edit' && (
          <ProfileEdit />
        )}

        {currentView === 'settings' && (
          <SettingsView />
        )}

        {currentView === 'public-profile' && (
          <PublicProfile />
        )}

        {currentView === 'admin' && (
          <AdminPanel />
        )}
      </main>

      {showCmdK && <CmdKModal onClose={() => setShowCmdK(false)} />}

      {/* Global Startup Footer */}
      <footer style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '3.5rem 0 2rem 0',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
            <div>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem', display: 'block', marginBottom: '1rem' }}>Platform</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <span onClick={() => setCurrentView('landing')} style={{ cursor: 'pointer' }}>Explore</span>
                <span onClick={() => setCurrentView('batches')} style={{ cursor: 'pointer' }}>Batches</span>
                <span onClick={() => setCurrentView('mentors')} style={{ cursor: 'pointer' }}>Mentors</span>
                <span onClick={() => setCurrentView('dashboard')} style={{ cursor: 'pointer' }}>Dashboard</span>
              </div>
            </div>

            <div>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem', display: 'block', marginBottom: '1rem' }}>Learning</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <span onClick={() => setCurrentView('batches')} style={{ cursor: 'pointer' }}>Study Kits</span>
                <span onClick={() => setCurrentView('dashboard')} style={{ cursor: 'pointer' }}>Projects</span>
                <span onClick={() => setCurrentView('resources')} style={{ cursor: 'pointer' }}>Library</span>
                <span onClick={() => setCurrentView('resources')} style={{ cursor: 'pointer' }}>Resources</span>
              </div>
            </div>

            <div>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem', display: 'block', marginBottom: '1rem' }}>Career</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <span onClick={() => setCurrentView('jobs')} style={{ cursor: 'pointer' }}>Job Portal</span>
                <span onClick={() => setCurrentView('ats')} style={{ cursor: 'pointer' }}>ATS Resume Score</span>
                <span onClick={() => setCurrentView('ats')} style={{ cursor: 'pointer' }}>Resume Review</span>
                <span onClick={() => setCurrentView('mentors')} style={{ cursor: 'pointer' }}>Mentorship</span>
              </div>
            </div>

            <div>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem', display: 'block', marginBottom: '1rem' }}>Company</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <span>About Shivam Singh</span>
                <span>Contact Lead Educator</span>
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            <div>© 2026 Portfolio Review & Mentorship. All rights reserved. Founded & Directed by Shivam Singh.</div>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <span>NID Education</span>
              <span>COA Standards</span>
              <span>Unified Mentor Network</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Microsoft Copilot Style AI Assistant */}
      <ChatWidget />

      {/* Portfolio Detail Modal */}
      {selectedPortfolio && (
        <PortfolioDetailModal 
          project={selectedPortfolio}
          onClose={() => setSelectedPortfolio(null)}
          onRequestReview={(projId) => {
            setSelectedPortfolio(null);
            handleOpenReviewModal(projId);
          }}
        />
      )}

      {/* Review Request Modal */}
      {showReviewModal && (
        <ReviewRequestModal 
          initialProjectId={reviewModalProjId}
          initialMentorId={reviewModalMentorId}
          onClose={() => setShowReviewModal(false)}
        />
      )}

      {/* Feedback Inspector Modal */}
      {selectedReviewRequest && (
        <FeedbackViewer 
          reviewRequest={selectedReviewRequest}
          onClose={() => setSelectedReviewRequest(null)}
        />
      )}

      {/* Mentor Detail Modal */}
      {selectedMentor && (
        <div className="modal-overlay" onClick={() => setSelectedMentor(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <img src={selectedMentor.avatar} alt={selectedMentor.name} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-primary)' }} />
                <div>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '0.15rem' }}>{selectedMentor.name}</h2>
                  <div style={{ fontSize: '0.9rem', color: 'var(--accent-light)', fontWeight: 600 }}>{selectedMentor.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedMentor.company} • {selectedMentor.location}</div>
                </div>
              </div>
              <button onClick={() => setSelectedMentor(null)} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1.5rem', background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              "{selectedMentor.bio}"
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Specialties & Domains</h4>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {selectedMentor.specialties.map(s => (
                  <span key={s} className="badge badge-indigo">{s}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Star size={18} color="#f59e0b" fill="#f59e0b" />
                <strong style={{ fontSize: '1.1rem' }}>{selectedMentor.avgRating}</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>({selectedMentor.reviewsCompleted} completed reviews)</span>
              </div>

              <button 
                onClick={() => {
                  const mId = selectedMentor.id;
                  setSelectedMentor(null);
                  handleOpenReviewModal(undefined, mId);
                }} 
                className="btn btn-primary"
              >
                <Sparkles size={16} /> Request Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        redirectView={authRedirectView} 
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
