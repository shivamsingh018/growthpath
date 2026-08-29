export type UserRole = 'designer' | 'mentor' | 'admin';

export type StudentDomain = 
  | 'School (Class 1st-10th)' 
  | 'Senior Secondary (11th-12th)' 
  | 'Engineering & Tech' 
  | 'UI/UX Design' 
  | 'Architecture' 
  | 'Medical & Bio' 
  | 'Commerce & Business' 
  | 'Graphic & Arts';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  bio: string;
  domain: string;
  experienceLevel: string;
  location?: string;
  socialLinks?: {
    behance?: string;
    dribbble?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface MentorProfile extends UserProfile {
  company: string;
  title: string;
  yearsExperience: number;
  specialties: string[];
  reviewsCompleted: number;
  avgRating: number;
  responseTimeHours: number;
  availability: 'Available' | 'Busy' | 'Limited Slots';
  featuredReviews?: string[];
  hourlyRateDisclaimer?: string;
}

export interface BatchModule {
  id: string;
  title: string;
  classGrade: 'Class 1st-5th' | 'Class 6th-10th' | 'Class 11th' | 'Class 12th' | 'JEE / NEET Prep' | 'Engineering & Coding' | 'Creative & Design';
  subject: string;
  instructor: string;
  instructorAvatar: string;
  thumbnail: string;
  enrolledStudents: number;
  rating: number;
  priceTag: string;
  lectureNotes: string[];
  dppQuestions: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }[];
  overview: string;
}

export interface BookChapter {
  chapterNumber: number;
  title: string;
  summary: string;
  content: string;
  formulas?: string[];
  practiceQuestions?: string[];
}

export interface LearningResource {
  id: string;
  title: string;
  category: string;
  targetClass: string;
  readTime: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  author: string;
  link: string;
  iconName: string;
  coverImage?: string;
  chapters?: BookChapter[];
  fullGuideContent?: {
    overview: string;
    keyPoints: string[];
    studyMaterial: string;
  };
}

export interface PortfolioMedia {
  id: string;
  url: string;
  caption: string;
  type: 'image' | 'document';
}

export interface PortfolioProject {
  id: string;
  designerId: string;
  designerName: string;
  designerAvatar: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  media: PortfolioMedia[];
  tags: string[];
  createdAt: string;
  views: number;
  likes: number;
  isDraft?: boolean;
}

export interface PinAnnotation {
  id: string;
  mediaIndex: number;
  xPercentage: number;
  yPercentage: number;
  category: 'Layout' | 'Typography' | 'Color & Contrast' | 'Spatial Flow' | 'Usability' | 'General' | 'Formula & Logic';
  comment: string;
  createdAt: string;
}

export interface FeedbackScorecard {
  visualPolish: number;
  layoutHierarchy: number;
  storytelling: number;
  technicalSkill: number;
}

export interface ReviewFeedback {
  id: string;
  requestId: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  mentorTitle: string;
  submittedAt: string;
  summary: string;
  scorecard: FeedbackScorecard;
  annotations: PinAnnotation[];
  actionItems: string[];
  recommendedResources?: string[];
  studentRating?: number;
  studentReviewComment?: string;
}

export interface ReviewRequest {
  id: string;
  projectId: string;
  projectTitle: string;
  projectCategory: string;
  projectCoverImage: string;
  designerId: string;
  designerName: string;
  designerAvatar: string;
  targetMentorId?: string;
  targetMentorName?: string;
  requestedAt: string;
  status: 'Pending' | 'In Review' | 'Completed' | 'Declined';
  focusQuestions: string;
  feedback?: ReviewFeedback;
}
