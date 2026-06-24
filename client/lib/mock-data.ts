import { Job, User, DashboardStats } from '@/types';

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    jobLink: 'https://linkedin.com/jobs/view/1234567890',
    source: 'LinkedIn',
    company: {
      name: 'Vercel',
      industry: 'Cloud Infrastructure',
      scale: 'Scale-up',
      logo: '🚀',
    },
    role: {
      title: 'Senior Frontend Engineer',
      level: 'Senior',
      workMode: 'Remote',
      department: 'Engineering',
    },
    compensation: {
      min: 180000,
      max: 240000,
      currency: 'USD',
      equity: '0.1-0.5%',
      bonus: '10-20%',
    },
    timeline: {
      detectedDate: new Date('2024-06-15'),
      deadline: new Date('2024-07-15'),
    },
    status: 'Applied',
    statusHistory: [
      {
        status: 'Bookmarked',
        changedAt: new Date('2024-06-15'),
      },
      {
        status: 'Applied',
        changedAt: new Date('2024-06-18'),
        notes: 'Application submitted via LinkedIn',
      },
    ],
    description:
      'We are looking for a Senior Frontend Engineer to join our growing team. You will work on Next.js applications at scale.',
    technicalRequirements: {
      stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      keywords: [
        'React',
        'Next.js',
        'Server Components',
        'Performance Optimization',
        'TypeScript',
      ],
      requiredSkills: ['5+ years frontend experience', 'React expertise', 'Next.js proficiency'],
      niceToHave: ['Open source contributions', 'DevTools knowledge'],
    },
    aiInsights: {
      matchScore: 92,
      matchedSkills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      missingSkills: ['GraphQL'],
      tailoredMaterials: {
        coverLetter:
          'I am a Senior Frontend Engineer with 7 years of experience building scalable React applications...',
        resumeEdits: [
          'Emphasize Next.js and Server Components experience',
          'Highlight performance optimization achievements',
        ],
      },
    },
    notes: 'Strong fit for the role. Follow up if no response in 5 days.',
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-06-18'),
  },
  {
    id: 'job-2',
    jobLink: 'https://indeed.com/jobs/view/9876543210',
    source: 'Indeed',
    company: {
      name: 'Stripe',
      industry: 'Fintech / Payments',
      scale: 'Mid-market',
      logo: '💳',
    },
    role: {
      title: 'Full Stack Engineer',
      level: 'Mid',
      workMode: 'Hybrid',
      department: 'Platform',
    },
    compensation: {
      min: 160000,
      max: 200000,
      currency: 'USD',
      equity: '0.05-0.2%',
    },
    timeline: {
      detectedDate: new Date('2024-06-20'),
      deadline: new Date('2024-08-01'),
    },
    status: 'Bookmarked',
    statusHistory: [
      {
        status: 'Bookmarked',
        changedAt: new Date('2024-06-20'),
      },
    ],
    description: 'Build payment infrastructure with a world-class team. Work across frontend and backend.',
    technicalRequirements: {
      stack: ['Node.js', 'PostgreSQL', 'React', 'Go'],
      keywords: ['APIs', 'Database Design', 'System Design', 'Payment Processing'],
      requiredSkills: ['Full stack development', 'JavaScript/TypeScript', 'SQL'],
    },
    aiInsights: {
      matchScore: 78,
      matchedSkills: ['JavaScript', 'React', 'PostgreSQL'],
      missingSkills: ['Go experience', 'Payment processing experience'],
    },
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date('2024-06-20'),
  },
  {
    id: 'job-3',
    jobLink: 'https://glassdoor.com/job-listing/3456789012',
    source: 'Glassdoor',
    company: {
      name: 'Anthropic',
      industry: 'AI Research',
      scale: 'Scale-up',
      logo: '🤖',
    },
    role: {
      title: 'AI Research Engineer',
      level: 'Senior',
      workMode: 'On-site',
      department: 'Research',
    },
    compensation: {
      min: 200000,
      max: 280000,
      currency: 'USD',
      equity: '0.2-1%',
    },
    timeline: {
      detectedDate: new Date('2024-06-10'),
      appliedDate: new Date('2024-06-12'),
      interviewDate: new Date('2024-07-05'),
      deadline: new Date('2024-08-15'),
    },
    status: 'Interviewing',
    statusHistory: [
      { status: 'Bookmarked', changedAt: new Date('2024-06-10') },
      { status: 'Applied', changedAt: new Date('2024-06-12') },
      {
        status: 'Interviewing',
        changedAt: new Date('2024-06-25'),
        notes: 'First round completed successfully',
      },
    ],
    description: 'Join our team to advance the state-of-the-art in AI safety and alignment.',
    technicalRequirements: {
      stack: ['Python', 'PyTorch', 'CUDA', 'Rust'],
      keywords: [
        'Machine Learning',
        'AI Safety',
        'Model Training',
        'Large Language Models',
      ],
      requiredSkills: ['PhD in ML or 8+ years industry experience', 'Deep learning expertise'],
    },
    aiInsights: {
      matchScore: 85,
      matchedSkills: ['Python', 'Machine Learning', 'Deep Learning'],
      missingSkills: ['CUDA optimization', 'Rust'],
      tailoredMaterials: {
        coverLetter: 'With a background in machine learning and passion for AI safety...',
        resumeEdits: [
          'Highlight ML publications and conferences',
          'Emphasize model training experience',
        ],
      },
    },
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-25'),
  },
  {
    id: 'job-4',
    jobLink: undefined,
    source: 'Smart Paste',
    company: {
      name: 'Figma',
      industry: 'Design Tools / Saas',
      scale: 'Scale-up',
    },
    role: {
      title: 'Product Engineer',
      level: 'Mid',
      workMode: 'Remote',
    },
    compensation: {
      min: 170000,
      max: 220000,
      currency: 'USD',
    },
    timeline: {
      detectedDate: new Date('2024-06-22'),
      deadline: new Date('2024-07-30'),
    },
    status: 'Applied',
    statusHistory: [
      { status: 'Bookmarked', changedAt: new Date('2024-06-22') },
      {
        status: 'Applied',
        changedAt: new Date('2024-06-23'),
        notes: 'Pasted from company careers page',
      },
    ],
    description: 'Help us build the next generation of design tools. Work with a talented product and design team.',
    technicalRequirements: {
      stack: ['React', 'TypeScript', 'WebGL', 'Node.js'],
      keywords: ['Performance', 'Real-time Collaboration', 'Graphics'],
    },
    aiInsights: {
      matchScore: 88,
      matchedSkills: ['React', 'TypeScript', 'Performance'],
      missingSkills: ['WebGL', 'Real-time collaboration patterns'],
    },
    createdAt: new Date('2024-06-22'),
    updatedAt: new Date('2024-06-23'),
  },
];

export const mockUser: User = {
  id: 'user-1',
  email: 'alex@example.com',
  name: 'Alex Chen',
  targetRoles: ['Frontend Engineer', 'Senior Frontend Engineer', 'Full Stack Engineer'],
  targetIndustries: ['Tech', 'Fintech', 'AI'],
  skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', 'Tailwind', 'Node.js'],
  experienceLevel: 'Senior',
  createdAt: new Date('2024-06-01'),
  updatedAt: new Date('2024-06-22'),
};

export const mockStats: DashboardStats = {
  totalApplications: 4,
  applied: 2,
  interviewing: 1,
  offers: 0,
  rejected: 0,
  bookmarked: 1,
};

export const mockResume = `ALEX CHEN
Senior Frontend Engineer | San Francisco, CA
alex@example.com | linkedin.com/in/alexchen | github.com/alexchen

PROFESSIONAL SUMMARY
Senior Frontend Engineer with 7+ years of experience building scalable web applications using React and Next.js. 
Expert in performance optimization, TypeScript, and modern web technologies. Proven track record of leading 
cross-functional teams and delivering high-impact products.

EXPERIENCE
Senior Frontend Engineer | TechCorp Inc. | San Francisco, CA | 2022 - Present
• Led migration of legacy codebase to Next.js 13 with Server Components, improving page load time by 45%
• Mentored 3 junior engineers on React best practices and architectural patterns
• Implemented component library with 50+ reusable components using TypeScript and Tailwind CSS
• Reduced bundle size by 30% through code splitting and lazy loading strategies

Frontend Engineer | StartupXYZ | Remote | 2019 - 2022
• Built responsive web applications serving 100K+ users using React and Redux
• Implemented real-time features using WebSockets, improving user engagement by 25%
• Owned the design system and component library, standardizing UI patterns across products
• Collaborated with product and design teams to translate mockups into pixel-perfect implementations

Junior Frontend Developer | WebAgency Co. | 2018 - 2019
• Developed client-facing websites using React and Vue.js
• Implemented responsive designs for 20+ projects
• Optimized website performance and accessibility compliance

TECHNICAL SKILLS
Frontend: React, Next.js, Vue.js, TypeScript, JavaScript, HTML, CSS
Styling: Tailwind CSS, Styled Components, SCSS, Bootstrap
Tools & Platforms: Webpack, Vite, Git, GitHub, Docker, Vercel, Netlify
Databases: PostgreSQL, MongoDB, Firebase
Performance: Web Vitals optimization, Code splitting, Asset optimization

EDUCATION
Bachelor of Science in Computer Science | State University | 2018

CERTIFICATIONS
• Certified in Advanced React Patterns | Frontend Masters | 2023
• AWS Certified Cloud Practitioner | Amazon | 2022`;
