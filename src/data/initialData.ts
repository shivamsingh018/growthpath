import { MentorProfile, UserProfile, PortfolioProject, ReviewRequest, LearningResource, BatchModule } from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr_designer_1',
    name: 'Shivam Singh',
    email: 'shivam.singh@platform.com',
    avatar: '/shivam-singh.png',
    role: 'designer',
    bio: 'Platform Owner & Director. Mentoring students across all academic classes (Class 1st to 12th, Board/JEE/NEET Entrance, Engineering, Medical, Commerce & Design).',
    domain: 'All Classes & Disciplines',
    experienceLevel: 'Platform Owner & Lead Educator',
    location: 'San Francisco & New Delhi',
    socialLinks: {
      behance: 'https://behance.net/shivamsingh',
      dribbble: 'https://dribbble.net/shivamsingh',
      linkedin: 'https://linkedin.com/in/shivamsingh'
    }
  },
  {
    id: 'usr_designer_2',
    name: 'Shivam Singh (Academic Studio)',
    email: 'shivam.academic@platform.com',
    avatar: '/shivam-singh.png',
    role: 'designer',
    bio: 'Academic & STEM Projects Specialist at Shivam Learning Foundation.',
    domain: 'School & College STEM',
    experienceLevel: 'Senior Academic Advisor',
    location: 'New Delhi & London'
  },
  {
    id: 'usr_admin_1',
    name: 'Shivam Singh',
    email: 'admin@platform.com',
    avatar: '/shivam-singh.png',
    role: 'admin',
    bio: 'Platform Owner, Founder & Executive Operations Lead.',
    domain: 'Platform Operations',
    experienceLevel: 'Platform Owner'
  }
];

export const INITIAL_MENTORS: MentorProfile[] = [
  {
    id: 'usr_mentor_1',
    name: 'Shivam Singh',
    email: 'shivam.mentor@platform.com',
    avatar: '/shivam-singh.png',
    role: 'mentor',
    company: 'Shivam Education Platform',
    title: 'Platform Founder & Lead Mentor (All Classes)',
    yearsExperience: 12,
    bio: 'Founder & Lead Mentor. Guiding school students (Class 1st-12th) & college scholars across Mathematics, Science, Computer Science, Medical, UI/UX, and Architecture.',
    domain: 'All Classes (1st-12th & Higher Ed)',
    experienceLevel: 'Principal Educator',
    location: 'New Delhi & San Francisco',
    specialties: ['Class 1st-12th STEM', 'UI/UX & Design Systems', 'Physics & Mathematics', 'Career Guidance'],
    reviewsCompleted: 240,
    avgRating: 5.0,
    responseTimeHours: 12,
    availability: 'Available',
    hourlyRateDisclaimer: 'Free Academic Mentorship'
  },
  {
    id: 'usr_mentor_2',
    name: 'Shivam Singh (STEM & Science)',
    email: 'shivam.stem@platform.com',
    avatar: '/shivam-singh.png',
    role: 'mentor',
    company: 'Shivam Science Academy',
    title: 'Senior STEM & Mathematics Educator',
    yearsExperience: 14,
    bio: 'Specialist in Class 6th-12th NCERT foundations, Physics numericals, Chemistry, and Engineering Entrance Mathematics.',
    domain: 'School Education (6th-12th)',
    experienceLevel: 'Senior Educator',
    location: 'New Delhi',
    specialties: ['Class 9th-10th Science', 'Class 11th-12th Physics', 'CBSE & NCERT Prep', 'Mathematics'],
    reviewsCompleted: 180,
    avgRating: 4.9,
    responseTimeHours: 12,
    availability: 'Available'
  },
  {
    id: 'usr_mentor_3',
    name: 'Shivam Singh (Creative & Architecture)',
    email: 'shivam.design@platform.com',
    avatar: '/shivam-singh.png',
    role: 'mentor',
    company: 'Shivam Design & Arch Practice',
    title: 'Design Director & Academic Advisor',
    yearsExperience: 15,
    bio: 'Guiding design students, architects, and creative aspirants with portfolio reviews, sheet compositions, and brand identity systems.',
    domain: 'Architecture & Design',
    experienceLevel: 'Creative Director',
    location: 'London & New Delhi',
    specialties: ['Architectural Graphics', 'UI/UX Case Studies', 'COA Sheet Standards', 'Graphic Arts'],
    reviewsCompleted: 150,
    avgRating: 4.9,
    responseTimeHours: 24,
    availability: 'Available'
  }
];

export const INITIAL_BATCHES: BatchModule[] = [
  {
    id: 'batch_12_physics',
    title: 'Lakshya Batch 2026 — Class 12th Physics, Board & JEE/NEET Qualification',
    classGrade: 'Class 12th',
    subject: 'Physics',
    instructor: 'Shivam Singh',
    instructorAvatar: '/shivam-singh.png',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    enrolledStudents: 1450,
    rating: 5.0,
    priceTag: 'Free Open Access',
    overview: 'Complete Class 12th Physics qualification program prepared by Shivam Singh. Covers Electrostatics, Current Electricity, Optics, Modern Physics, NCERT Derivations, and competitive JEE/NEET entrance numericals.',
    lectureNotes: [
      'Chapter 1: Electric Charges & Fields (Complete Formula Index)',
      'Chapter 2: Electrostatic Potential & Capacitance Notes',
      'Chapter 3: Current Electricity & Kirchhoff Laws Sheet',
      'Chapter 4: Ray & Wave Optics Visual Ray Diagrams'
    ],
    dppQuestions: [
      {
        question: 'What is the electric field intensity inside a hollow spherical conductor carrying charge Q?',
        options: ['Q / (4πε₀r²)', 'Zero', 'Q / (2πε₀r)', 'Infinite'],
        answer: 'Zero',
        explanation: 'According to Gauss\'s Law, the net enclosed charge inside a conducting hollow sphere is zero, resulting in zero internal electric field.'
      },
      {
        question: 'The unit of Electric Dipole Moment in SI system is:',
        options: ['Coulomb-meter (C·m)', 'Newton / Coulomb', 'Volt / meter', 'Joule / Coulomb'],
        answer: 'Coulomb-meter (C·m)',
        explanation: 'Electric dipole moment p = q · 2a, which has units of Charge (Coulomb) × Length (Meter).'
      }
    ]
  },
  {
    id: 'batch_11_chem_math',
    title: 'Arjuna Batch 2026 — Class 11th Chemistry & Math Foundation for Entrance Exams',
    classGrade: 'Class 11th',
    subject: 'Chemistry & Mathematics',
    instructor: 'Shivam Singh',
    instructorAvatar: '/shivam-singh.png',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
    enrolledStudents: 1280,
    rating: 4.9,
    priceTag: 'Free Open Access',
    overview: 'Class 11th foundational batch for Atomic Structure, Chemical Bonding, Calculus Limits, Trigonometric Functions, and Coordinate Geometry required to qualify for Board and Entrance exams.',
    lectureNotes: [
      'Module 1: Atomic Structure & Quantum Numbers Notes',
      'Module 2: Trigonometric Functions & Identity Derivations',
      'Module 3: Calculus Limits & Continuity Quick Sheet'
    ],
    dppQuestions: [
      {
        question: 'What is the value of limit lim (x→0) [sin(x) / x]?',
        options: ['0', '1', 'Undefined', 'Infinity'],
        answer: '1',
        explanation: 'Using L\'Hopital\'s Rule or standard trigonometric limit theorems, lim (x→0) [sin(x)/x] = cos(0)/1 = 1.'
      }
    ]
  },
  {
    id: 'batch_9_10_science',
    title: 'Prakhar Batch — Class 9th & 10th Foundation Science & Math Board Prep',
    classGrade: 'Class 6th-10th',
    subject: 'Science & Mathematics',
    instructor: 'Shivam Singh',
    instructorAvatar: '/shivam-singh.png',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    enrolledStudents: 1890,
    rating: 5.0,
    priceTag: 'Free Open Access',
    overview: 'High school foundation batch for Class 9th & 10th. Covers Light Reflection/Refraction, Carbon Compounds, Quadratic Equations, and Geometry theorems with NCERT solutions.',
    lectureNotes: [
      'Class 10th Light: Reflection & Refraction Mirror Formula',
      'Class 10th Carbon & Its Compounds Bonding Notes',
      'Class 9th Motion & Newton Laws Summary'
    ],
    dppQuestions: [
      {
        question: 'The focal length of a concave mirror having radius of curvature R = 20 cm is:',
        options: ['-10 cm', '+10 cm', '-20 cm', '+40 cm'],
        answer: '-10 cm',
        explanation: 'Focal length f = R / 2. By sign convention for a concave mirror, focal length is negative, hence f = -10 cm.'
      }
    ]
  },
  {
    id: 'batch_1_5_early',
    title: 'Early Bloom Batch — Class 1st to 5th Elementary Science & Math',
    classGrade: 'Class 1st-5th',
    subject: 'General Science & Arithmetic',
    instructor: 'Shivam Singh',
    instructorAvatar: '/shivam-singh.png',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    enrolledStudents: 950,
    rating: 5.0,
    priceTag: 'Free Open Access',
    overview: 'Fun, interactive elementary learning module for Class 1st to 5th kids. Covers basic arithmetic, solar system wonders, plant biology, and English grammar fundamentals.',
    lectureNotes: [
      'Fun Math: Addition, Subtraction & Multiplication Worksheets',
      'Solar System & Planets Visual Diagram Book',
      'Basic English Grammar & Story Reading'
    ],
    dppQuestions: [
      {
        question: 'Which planet is known as the Red Planet in our Solar System?',
        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        answer: 'Mars',
        explanation: 'Mars is called the Red Planet because of the iron oxide (rust) prevalent on its surface.'
      }
    ]
  },
  {
    id: 'batch_cs_engineering',
    title: 'Alpha Coding Batch — Computer Science, React & Software Job Qualification',
    classGrade: 'Engineering & Coding',
    subject: 'Computer Science',
    instructor: 'Shivam Singh',
    instructorAvatar: '/shivam-singh.png',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    enrolledStudents: 2100,
    rating: 5.0,
    priceTag: 'Free Open Access',
    overview: 'College software engineering batch covering Data Structures, Algorithms (C++/Java/JS), Fullstack React & Node.js, and System Design required to qualify for tech company interviews.',
    lectureNotes: [
      'Data Structures 101: Arrays, Linked Lists & Stacks Sheet',
      'React 18 State Management & Hooks Guide',
      'Fullstack Web Architecture Roadmap'
    ],
    dppQuestions: [
      {
        question: 'What is the worst-case time complexity of QuickSort algorithm?',
        options: ['O(N log N)', 'O(N²)', 'O(N)', 'O(1)'],
        answer: 'O(N²)',
        explanation: 'QuickSort has a worst-case time complexity of O(N²) when the pivot selected is consistently the smallest or largest element.'
      }
    ]
  },
  {
    id: 'batch_design_arch',
    title: 'Design & Architecture Mastery — Portfolio Qualification & COA Standards',
    classGrade: 'Creative & Design',
    subject: 'UI/UX & Architecture',
    instructor: 'Shivam Singh',
    instructorAvatar: '/shivam-singh.png',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    enrolledStudents: 1650,
    rating: 5.0,
    priceTag: 'Free Open Access',
    overview: 'Professional qualification batch for UI/UX case studies, design systems, and COA architectural presentation sheet compositions guided by Shivam Singh.',
    lectureNotes: [
      'UI/UX Case Study Structure Playbook',
      'COA Architectural Sheet Composition Standards',
      'Typography Grid & Hierarchy Rules'
    ],
    dppQuestions: [
      {
        question: 'What is the minimum recommended touch target height for accessible mobile CTA buttons?',
        options: ['24px', '32px', '48px', '64px'],
        answer: '48px',
        explanation: 'According to WCAG and Material Design accessibility guidelines, touch targets should be at least 48x48dp to ensure easy tapping.'
      }
    ]
  }
];

export const INITIAL_PORTFOLIOS: PortfolioProject[] = [
  {
    id: 'proj_1',
    designerId: 'usr_designer_1',
    designerName: 'Shivam Singh',
    designerAvatar: '/shivam-singh.png',
    title: 'Interactive Math & Physics Visual Learning Kit (Class 9th-12th)',
    category: 'School Education (1st-12th)',
    description: 'Visual study guide and problem-solving framework for Class 9th to 12th students covering Physics kinematics, calculus basics, and NCERT exemplars prepared by Shivam Singh.',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    media: [
      {
        id: 'm_101',
        url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Physics Kinematics Formula & Diagram Sheet',
        type: 'image'
      },
      {
        id: 'm_102',
        url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
        caption: 'Calculus & Geometry Theorem Visualization',
        type: 'image'
      }
    ],
    tags: ['Class 9th-12th', 'Physics', 'Mathematics', 'NCERT', 'STEM'],
    createdAt: '2026-08-15',
    views: 680,
    likes: 54
  },
  {
    id: 'proj_2',
    designerId: 'usr_designer_1',
    designerName: 'Shivam Singh',
    designerAvatar: '/shivam-singh.png',
    title: 'Nexus Wealth — AI Financial Mobile App & Design System',
    category: 'UI/UX Design',
    description: 'Comprehensive UX case study designed by Shivam Singh for an investment platform. Features dark-mode color system, accessible data visualization, mobile wireframes, and component hierarchy.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    media: [
      {
        id: 'm_1',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        caption: 'Financial Analytics Dashboard - Dark UI Overview',
        type: 'image'
      },
      {
        id: 'm_2',
        url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mobile App Wireframes & Component Specs',
        type: 'image'
      }
    ],
    tags: ['Fintech', 'Mobile UX', 'Design System', 'College Level'],
    createdAt: '2026-08-10',
    views: 540,
    likes: 48
  },
  {
    id: 'proj_3',
    designerId: 'usr_designer_2',
    designerName: 'Shivam Singh (Studio)',
    designerAvatar: '/shivam-singh.png',
    title: 'Pavilion of Light & Timber — Climate-Adaptive Civic Space',
    category: 'Architecture',
    description: 'Eco-friendly civic pavilion concept designed by Shivam Singh conforming to COA guidelines. Built using cross-laminated timber (CLT) and passive solar shading.',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    media: [
      {
        id: 'm_201',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Exterior Render during Golden Hour',
        type: 'image'
      }
    ],
    tags: ['Architecture', 'Timber Construction', 'Civic Pavilion'],
    createdAt: '2026-08-12',
    views: 310,
    likes: 32
  }
];

export const INITIAL_REVIEWS: ReviewRequest[] = [
  {
    id: 'rev_1',
    projectId: 'proj_1',
    projectTitle: 'Interactive Math & Physics Visual Learning Kit (Class 9th-12th)',
    projectCategory: 'School Education (1st-12th)',
    projectCoverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    designerId: 'usr_designer_1',
    designerName: 'Shivam Singh',
    designerAvatar: '/shivam-singh.png',
    targetMentorId: 'usr_mentor_2',
    targetMentorName: 'Shivam Singh (STEM)',
    requestedAt: '2026-08-16',
    status: 'Completed',
    focusQuestions: 'Reviewing formula representation and concept clarity for Class 10th and 12th board exam aspirants.',
    feedback: {
      id: 'fb_1',
      requestId: 'rev_1',
      mentorId: 'usr_mentor_2',
      mentorName: 'Shivam Singh',
      mentorAvatar: '/shivam-singh.png',
      mentorTitle: 'Senior STEM & Mathematics Educator',
      submittedAt: '2026-08-16',
      summary: 'Outstanding study material layout! The formula diagrams and step-by-step calculus derivations are exceptionally clear for students preparing for Class 10th & 12th exams.',
      scorecard: {
        visualPolish: 5,
        layoutHierarchy: 5,
        storytelling: 5,
        technicalSkill: 5
      },
      annotations: [
        {
          id: 'pin_1',
          mediaIndex: 0,
          xPercentage: 30,
          yPercentage: 40,
          category: 'Formula & Logic',
          comment: 'Kinematics formulas are neatly color-coded. Ideal for Class 11th Physics revision.',
          createdAt: '2026-08-16'
        }
      ],
      actionItems: [
        'Add quick summary flashcards at the end of each chapter',
        'Include previous year NCERT exam questions'
      ],
      recommendedResources: ['NCERT Science Guide by Shivam Singh'],
      studentRating: 5,
      studentReviewComment: 'Extremely helpful for board exam preparation!'
    }
  }
];

export const INITIAL_RESOURCES: LearningResource[] = [
  {
    id: 'res_school_1',
    title: 'NCERT Class 6th to 10th Science & Math Exemplar Textbook',
    category: 'School Education (Class 1st-10th)',
    targetClass: 'Class 1st-10th',
    readTime: '15 min per chapter',
    level: 'Beginner',
    description: 'Complete academic digital textbook authored by Shivam Singh covering Science, Mathematics, Algebra, Geometry, and Physics for Class 6th to 10th students.',
    author: 'Shivam Singh, Platform Founder',
    link: '#',
    iconName: 'BookOpen',
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Light: Reflection & Refraction (Class 10th Physics)',
        summary: 'Comprehensive analysis of spherical mirrors, concave & convex mirror ray diagrams, Snell\'s law of refraction, and lens power calculations.',
        content: 'Reflection of light follows two fundamental laws: 1. The incident ray, reflected ray, and normal lie in the same plane. 2. Angle of incidence equals angle of reflection (i = r). For concave mirrors, when an object is placed at infinity, the image is formed at focus (F) and is real and inverted. The mirror formula relates object distance u, image distance v, and focal length f as 1/f = 1/v + 1/u.',
        formulas: ['Mirror Formula: 1/f = 1/v + 1/u', 'Snell\'s Law: sin(i) / sin(r) = n₂ / n₁', 'Lens Power: P = 1 / f (in meters)'],
        practiceQuestions: [
          'Calculate focal length of a concave mirror with radius of curvature R = 30 cm.',
          'An object is placed 20 cm in front of a convex lens of focal length 10 cm. Find image distance.'
        ]
      },
      {
        chapterNumber: 2,
        title: 'Carbon & Its Compounds (Class 10th Chemistry)',
        summary: 'Covalent bonding in carbon compounds, tetravalency, catenation, alkanes, alkenes, alkynes, functional groups, and esterification.',
        content: 'Carbon has an atomic number of 6 with electronic configuration 2,4. To achieve noble gas stability, carbon shares electrons forming covalent bonds. Catenation allows carbon to form long chains and rings. Hydrocarbons are classified into saturated (alkanes, C_n H_{2n+2}) and unsaturated (alkenes C_n H_{2n}, alkynes C_n H_{2n-2}).',
        formulas: ['Alkanes: C_n H_{2n+2}', 'Alkenes: C_n H_{2n}', 'Alkynes: C_n H_{2n-2}'],
        practiceQuestions: [
          'Write structural formulas for propane and butane.',
          'Explain why carbon forms covalent bonds instead of ionic bonds.'
        ]
      }
    ],
    fullGuideContent: {
      overview: 'Essential foundation digital textbook for Class 1st to 10th students focusing on core Science, Mathematics, and logical reasoning.',
      keyPoints: [
        'NCERT Chapter Breakdown & Key Definitions',
        'Step-by-step Algebra & Geometry Solved Examples',
        'Scientific Method & Daily Practical Applications',
        'Effective Memory & Revision Techniques'
      ],
      studyMaterial: 'Study daily for 45 minutes on core fundamentals before tackling advanced textbook problems.'
    }
  },
  {
    id: 'res_school_2',
    title: 'Class 11th & 12th Physics, Chemistry & Math Board & Entrance Master Reference Book',
    category: 'Senior Secondary (11th-12th)',
    targetClass: 'Class 11th-12th',
    readTime: '20 min per chapter',
    level: 'Intermediate',
    description: 'Complete reference textbook for CBSE Board Exams & Entrance Exams (JEE/NEET). Authored by Shivam Singh.',
    author: 'Shivam Singh (STEM Academy)',
    link: '#',
    iconName: 'BookOpen',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Electrostatics & Gauss\'s Law (Class 12th Physics)',
        summary: 'Electric field vectors, Coulomb\'s Law, electric dipoles, Gaussian surfaces, and flux calculation.',
        content: 'Coulomb\'s Law states that electrostatic force between two point charges is directly proportional to the product of charges and inversely proportional to the square of distance between them: F = (1/4πε₀) (q₁ q₂ / r²). Gauss\'s Law states that net electric flux through any closed surface equals 1/ε₀ times net enclosed charge: ∮ E · dA = Q_enc / ε₀.',
        formulas: ['Coulomb\'s Law: F = (1/4πε₀) (q₁ q₂ / r²)', 'Gauss\'s Law: ∮ E · dA = Q_enc / ε₀', 'Dipole Moment: p = q · 2a'],
        practiceQuestions: [
          'Derive electric field intensity at a distance r from an infinitely long straight charged wire using Gauss Law.',
          'Two point charges +3 μC and -3 μC are separated by 0.1 m. Calculate electric dipole moment.'
        ]
      },
      {
        chapterNumber: 2,
        title: 'Calculus Limits & Derivations (Class 11th & 12th Math)',
        summary: 'Limits of trigonometric functions, L\'Hopital\'s rule, differentiation, and integration by parts.',
        content: 'A limit describes the value a function approaches as input approaches a specified point. The standard trigonometric limit states lim (x→0) [sin x / x] = 1. L\'Hopital\'s Rule states that for indeterminate forms 0/0 or ∞/∞, lim [f(x)/g(x)] = lim [f\'(x)/g\'(x)].',
        formulas: ['lim (x→0) [sin x / x] = 1', 'd/dx [x^n] = n x^(n-1)', '∫ sin x dx = -cos x + C'],
        practiceQuestions: [
          'Evaluate lim (x→0) [(1 - cos x) / x²].',
          'Find derivative of f(x) = x² sin x using product rule.'
        ]
      }
    ],
    fullGuideContent: {
      overview: 'Comprehensive preparation textbook designed by Shivam Singh for Class 11th & 12th board exams and competitive entrance preparation.',
      keyPoints: [
        'Physics & Chemistry Formula Index',
        'Calculus & Coordinate Geometry Problem Solving',
        'Time Management & Exam Writing Presentation',
        'Mock Test Analysis & Weak Area Identification'
      ],
      studyMaterial: 'Focus on NCERT conceptual clarity first, followed by solving past 10 years question papers.'
    }
  },
  {
    id: 'res_eng_1',
    title: 'Computer Science, Data Structures & React Fullstack Engineering Textbook',
    category: 'Engineering & Tech',
    targetClass: 'College / Engineering',
    readTime: '25 min per chapter',
    level: 'Intermediate',
    description: 'Engineering textbook on Data Structures, Algorithms, React 18 frontend architecture, and Node.js microservices. Authored by Shivam Singh.',
    author: 'Shivam Singh (Tech Lead)',
    link: '#',
    iconName: 'BookOpen',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Data Structures 101: Arrays, Linked Lists & Stacks',
        summary: 'Contiguous vs non-contiguous memory, pointer operations, stack LIFO queues, and dynamic array resizing.',
        content: 'An array is a linear data structure storing elements in contiguous memory locations, allowing O(1) random access via index. A Linked List consists of nodes where each node stores a data value and a pointer to the next node. Stacks operate on Last-In-First-Out (LIFO) order with O(1) push and pop operations.',
        formulas: ['Array Address: Base + (i × ElementSize)', 'Stack Push/Pop: O(1)', 'Linked List Search: O(N)'],
        practiceQuestions: [
          'Reverse a singly linked list in-place using iterative approach.',
          'Implement a stack using two queues.'
        ]
      }
    ],
    fullGuideContent: {
      overview: 'Software engineering textbook covering core Data Structures, Web Development with React/Node, and System Design concepts.',
      keyPoints: [
        'Arrays, Linked Lists, Trees & Graph Algorithms',
        'Frontend & Backend Architecture Basics',
        'Git & Clean Code Best Practices',
        'Technical Interview Preparation'
      ],
      studyMaterial: 'Build real-world projects and practice problem-solving daily on coding platforms.'
    }
  },
  {
    id: 'res_design_1',
    title: 'The Product Design Bible & UX Case Study Textbook',
    category: 'UI/UX & Design',
    targetClass: 'College / Design Professionals',
    readTime: '15 min read',
    level: 'Beginner',
    description: 'Learn how to structure problem statements, wireframes, and visual case studies for tech and design studios. Authored by Shivam Singh.',
    author: 'Shivam Singh, Platform Owner & Lead Designer',
    link: '#',
    iconName: 'BookOpen',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    chapters: [
      {
        chapterNumber: 1,
        title: 'UX Case Study Structure & Executive Summary',
        summary: 'Structuring problem statements, user persona validation, and business metrics.',
        content: 'A high-impact UX case study begins with an Executive Problem Statement defining target user pain points and quantifiable business metrics. Next, showcase user research insights, wireframe iterations, and visual Figma component hierarchies.',
        formulas: ['WCAG AA Contrast Minimum: 4.5:1 for body text', 'Touch Target Minimum: 48px × 48px'],
        practiceQuestions: [
          'Draft a 2-sentence executive summary for a financial app case study.',
          'Explain how WCAG accessibility guidelines influence color palette choices.'
        ]
      }
    ],
    fullGuideContent: {
      overview: 'Design masterclass textbook on crafting impactful portfolio case studies, wireframing, and WCAG accessibility standards.',
      keyPoints: [
        'Executive Problem Statement & Business Goals',
        'User Research & Persona Validation',
        'Wireframing & Interactive Prototyping',
        'Visual Typography & Color Hierarchy'
      ],
      studyMaterial: 'Keep case study write-ups concise, readable, and focused on user-centered outcomes.'
    }
  },
  {
    id: 'res_arch_1',
    title: 'Architectural Graphic Standards & COA Presentation Sheet Handbook',
    category: 'Architecture',
    targetClass: 'Architecture & Civil',
    readTime: '20 min read',
    level: 'Intermediate',
    description: 'How to curate floorplans, 3D renders, and construction joinery details per Council of Architecture (COA) standards.',
    author: 'Shivam Singh (Architectural Practice)',
    link: '#',
    iconName: 'Layers',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    chapters: [
      {
        chapterNumber: 1,
        title: 'COA 3-Zone Sheet Composition Rules',
        summary: 'Site plan positioning, floorplan line-weights, 3D render placement, and structural joinery details.',
        content: 'Professional architectural presentation sheets follow a strict 3-zone layout grid. Zone 1 (Top Left) contains Site Location & Solar Orientation. Zone 2 (Center) features scaled floorplans and cross-sections. Zone 3 (Right) showcases high-resolution 3D renders and joinery details.',
        formulas: ['Standard Floorplan Scale: 1:100 or 1:50', 'Site Plan Scale: 1:500'],
        practiceQuestions: [
          'Explain line-weight differentiation between structural walls and furniture symbols.',
          'Draw a timber joint detail conforming to COA guidelines.'
        ]
      }
    ],
    fullGuideContent: {
      overview: 'COA-aligned architectural presentation sheet composition handbook for architecture students and practitioners.',
      keyPoints: [
        '3-Zone Sheet Layout Hierarchy',
        'Floorplan Scale & Line Weight Standards',
        'Structural Joinery & Sectional Details',
        'Sustainable Material Legend Placement'
      ],
      studyMaterial: 'Maintain clear visual margins and hierarchy between 2D technical drawings and 3D renders.'
    }
  }
];
