import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  MentorProfile, 
  PortfolioProject, 
  ReviewRequest, 
  ReviewFeedback, 
  LearningResource,
  UserRole 
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_MENTORS, 
  INITIAL_PORTFOLIOS, 
  INITIAL_REVIEWS, 
  INITIAL_RESOURCES 
} from '../data/initialData';
import confetti from 'canvas-confetti';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currentUser: UserProfile | MentorProfile | null;
  setCurrentUser: (user: any) => void;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authRedirectView: string | undefined;
  openAuthModal: (redirect?: string) => void;
  allUsers: UserProfile[];
  allMentors: MentorProfile[];
  switchPersona: (userId: string) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  portfolios: PortfolioProject[];
  reviews: ReviewRequest[];
  resources: LearningResource[];
  selectedPortfolio: PortfolioProject | null;
  setSelectedPortfolio: (project: PortfolioProject | null) => void;
  selectedReviewRequest: ReviewRequest | null;
  setSelectedReviewRequest: (req: ReviewRequest | null) => void;
  
  // Actions
  addPortfolioProject: (project: Omit<PortfolioProject, 'id' | 'createdAt' | 'views' | 'likes' | 'designerId' | 'designerName' | 'designerAvatar'>) => void;
  createReviewRequest: (projectId: string, mentorId?: string, focusQuestions?: string) => void;
  submitMentorFeedback: (requestId: string, feedbackData: Omit<ReviewFeedback, 'id' | 'requestId' | 'submittedAt' | 'mentorId' | 'mentorName' | 'mentorAvatar' | 'mentorTitle'>) => void;
  rateMentorFeedback: (requestId: string, rating: number, comment?: string) => void;
  verifyUserOrMentor: (id: string, isMentor: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'portfolio_platform_state_v4';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  const [currentUser, setCurrentUserRaw] = useState<UserProfile | MentorProfile | null>(() => {
    try {
      const saved = localStorage.getItem('growthpath_active_user_v1');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const setCurrentUser = (user: UserProfile | MentorProfile | null) => {
    setCurrentUserRaw(user);
    if (user) {
      localStorage.setItem('growthpath_active_user_v1', JSON.stringify(user));
      setCurrentView((prev) => (prev === 'login' ? (authRedirectView || 'dashboard') : prev));
    } else {
      localStorage.removeItem('growthpath_active_user_v1');
      setCurrentView('login');
    }
  };

  const [currentView, setCurrentView] = useState<string>(() => {
    try {
      const savedUser = localStorage.getItem('growthpath_active_user_v1');
      return savedUser ? 'landing' : 'login';
    } catch (e) {
      return 'login';
    }
  });
  
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    localStorage.removeItem('auramentor_app_state_v1');
    localStorage.removeItem('portfolio_platform_state_v2');
    localStorage.removeItem('portfolio_platform_state_v3');
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).allUsers : INITIAL_USERS;
  });

  const [allMentors, setAllMentors] = useState<MentorProfile[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).allMentors : INITIAL_MENTORS;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectView, setAuthRedirectView] = useState<string | undefined>(undefined);

  const isAuthenticated = currentUser !== null;

  const openAuthModal = (redirect?: string) => {
    setAuthRedirectView(redirect);
    setIsAuthModalOpen(true);
  };

  const handleNavigateView = (targetView: string) => {
    if (!isAuthenticated && targetView !== 'login' && targetView !== 'signup') {
      setAuthRedirectView(targetView);
      setCurrentView('login');
      return;
    }
    setCurrentView(targetView);
  };

  const [portfolios, setPortfolios] = useState<PortfolioProject[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).portfolios : INITIAL_PORTFOLIOS;
  });

  const [reviews, setReviews] = useState<ReviewRequest[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).reviews : INITIAL_REVIEWS;
  });

  const [resources] = useState<LearningResource[]>(INITIAL_RESOURCES);

  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioProject | null>(null);
  const [selectedReviewRequest, setSelectedReviewRequest] = useState<ReviewRequest | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      allUsers,
      allMentors,
      portfolios,
      reviews
    }));
  }, [allUsers, allMentors, portfolios, reviews]);

  // Sync HTML theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const switchPersona = (userId: string) => {
    const foundUser = allUsers.find(u => u.id === userId);
    if (foundUser) {
      setCurrentUser(foundUser);
      return;
    }
    const foundMentor = allMentors.find(m => m.id === userId);
    if (foundMentor) {
      setCurrentUser(foundMentor);
    }
  };

  const addPortfolioProject = (projectData: Omit<PortfolioProject, 'id' | 'createdAt' | 'views' | 'likes' | 'designerId' | 'designerName' | 'designerAvatar'>) => {
    const newProject: PortfolioProject = {
      ...projectData,
      id: `proj_${Date.now()}`,
      designerId: currentUser?.id || 'usr_shivam',
      designerName: currentUser?.name || 'Shivam Singh',
      designerAvatar: currentUser?.avatar || '/shivam-singh.png',
      createdAt: new Date().toISOString().split('T')[0],
      views: 1,
      likes: 0
    };
    setPortfolios(prev => [newProject, ...prev]);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  const createReviewRequest = (projectId: string, mentorId?: string, focusQuestions: string = '') => {
    const project = portfolios.find(p => p.id === projectId);
    if (!project) return;

    const targetMentor = allMentors.find(m => m.id === mentorId);

    const newRequest: ReviewRequest = {
      id: `rev_${Date.now()}`,
      projectId: project.id,
      projectTitle: project.title,
      projectCategory: project.category,
      projectCoverImage: project.coverImage,
      designerId: currentUser?.id || 'usr_shivam',
      designerName: currentUser?.name || 'Shivam Singh',
      designerAvatar: currentUser?.avatar || '/shivam-singh.png',
      targetMentorId: targetMentor?.id,
      targetMentorName: targetMentor?.name,
      requestedAt: new Date().toISOString().split('T')[0],
      status: 'Pending',
      focusQuestions
    };

    setReviews(prev => [newRequest, ...prev]);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  const submitMentorFeedback = (
    requestId: string, 
    feedbackData: Omit<ReviewFeedback, 'id' | 'requestId' | 'submittedAt' | 'mentorId' | 'mentorName' | 'mentorAvatar' | 'mentorTitle'>
  ) => {
    const mentor = currentUser as MentorProfile;

    const newFeedback: ReviewFeedback = {
      ...feedbackData,
      id: `fb_${Date.now()}`,
      requestId,
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorAvatar: mentor.avatar,
      mentorTitle: mentor.title || mentor.domain,
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'Completed',
          feedback: newFeedback
        };
      }
      return req;
    }));

    // Increment mentor stats
    setAllMentors(prev => prev.map(m => {
      if (m.id === mentor.id) {
        return { ...m, reviewsCompleted: m.reviewsCompleted + 1 };
      }
      return m;
    }));

    confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
  };

  const rateMentorFeedback = (requestId: string, rating: number, comment?: string) => {
    setReviews(prev => prev.map(req => {
      if (req.id === requestId && req.feedback) {
        return {
          ...req,
          feedback: {
            ...req.feedback,
            studentRating: rating,
            studentReviewComment: comment
          }
        };
      }
      return req;
    }));
  };

  const verifyUserOrMentor = (id: string, isMentor: boolean) => {
    if (isMentor) {
      setAllMentors(prev => prev.map(m => m.id === id ? { ...m, availability: 'Available' } : m));
    } else {
      setAllUsers(prev => prev.map(u => u.id === id ? { ...u } : u));
    }
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      currentUser,
      setCurrentUser,
      isAuthenticated,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authRedirectView,
      openAuthModal,
      allUsers,
      allMentors,
      switchPersona,
      currentView,
      setCurrentView: handleNavigateView,
      portfolios,
      reviews,
      resources,
      selectedPortfolio,
      setSelectedPortfolio,
      selectedReviewRequest,
      setSelectedReviewRequest,
      addPortfolioProject,
      createReviewRequest,
      submitMentorFeedback,
      rateMentorFeedback,
      verifyUserOrMentor
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
