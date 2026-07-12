// src/lib/mockData.ts
//
// CHANGELOG vs. the original mock file — read this before wiring it up:
// 1. mockJobs expanded from 5 to 15 entries — enough volume to test overflowing
//    Kanban columns, table pagination/sorting, and monthly buckets on the
//    Applications Over Time chart across Feb–Jul 2026.
// 2. `historyLog` renamed to `statusHistory` to match the PRD's own terminology
//    (§5.4, "recorded in the statusHistory log") — update any code that
//    currently references `historyLog`.
// 3. UserProfile rebuilt from a flat resumeBullets array into a structured
//    resume: summary / experience / education / skills — this is what the
//    Resume Canvas's four tabs (§8.1) actually need to render against.
// 4. mockAnalyticsSummary now covers all 5 PRD charts (§6.2), not just 2 —
//    added `bySource`, `topRoles`, and `avgTimeInStage`, which were previously
//    unmocked entirely.
// 5. Added `mockIngestionPreview` — a single example of an unsaved, freshly
//    parsed job with per-field confidence indicators, for building the
//    Smart Paste side panel (§4.3) without a live Gemini call.
// 6. Added `mockCoverLetterSamples` — one pre-written letter so the Cover
//    Letter Generator screen (§8.2) has real content to render before the
//    live Gemini integration exists.
// 7. Added `profile.tier` ("Free" | "Pro") and `profile.profileCompleteness`
//    — both referenced directly in the PRD (US-11 ProGate, §7.3 profile
//    completeness score) but absent from the original mock.

// ─────────────────────────────────────────────────────────────────────────
// Job Applications
// ─────────────────────────────────────────────────────────────────────────

export interface StatusHistoryEntry {
  timestamp: string;
  statusFrom: string;
  statusTo: string;
}

export interface JobApplication {
  id: string;
  jobTitle: string;
  companyName: string;
  companyLogoUrl: string;
  department: string;
  seniorityLevel: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Executive';
  workMode: 'Remote' | 'Hybrid' | 'Onsite';
  industry: string;
  companySize: string;
  compensation: {
    min: number;
    max: number;
    currency: string;
    payType: 'Salary' | 'Hourly';
    equity?: string;
    benefits: string[];
  };
  status: 'Saved' | 'Applied' | 'Interviewing' | 'Offer Received' | 'Rejected/Closed';
  source: 'LinkedIn' | 'Indeed' | 'Referral' | 'Company Site' | 'Paste';
  appliedDate: string;
  deadline: string;
  techStack: string[];
  atsKeywords: { keyword: string; matched: boolean; priority: 'Required' | 'Preferred' }[];
  matchScore: number;
  statusHistory: StatusHistoryEntry[];
}

export const mockJobs: JobApplication[] = [
  {
    id: "job-001",
    jobTitle: "Senior Product Engineer",
    companyName: "VybzTech Inc.",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=VybzTech",
    department: "Core Platform",
    seniorityLevel: "Senior",
    workMode: "Remote",
    industry: "SaaS / HRTech",
    companySize: "50-100 employees",
    compensation: { min: 120000, max: 150000, currency: "USD", payType: "Salary", equity: "0.25%", benefits: ["Health", "401k Match", "Remote Allowance"] },
    status: "Interviewing",
    source: "LinkedIn",
    appliedDate: "2026-05-18",
    deadline: "2026-07-25",
    techStack: ["React", "Next.js", "Tailwind CSS", "Go", "PostgreSQL"],
    atsKeywords: [
      { keyword: "Product Architecture", matched: true, priority: "Required" },
      { keyword: "Full-Stack Optimization", matched: true, priority: "Required" },
      { keyword: "Headless Chrome Automation", matched: false, priority: "Preferred" }
    ],
    matchScore: 88,
    statusHistory: [
      { timestamp: "2026-05-18T09:00:00Z", statusFrom: "Saved", statusTo: "Applied" },
      { timestamp: "2026-06-02T14:00:00Z", statusFrom: "Applied", statusTo: "Interviewing" }
    ]
  },
  {
    id: "job-002",
    jobTitle: "Full Stack Developer",
    companyName: "Krestkore",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Krestkore",
    department: "Engineering",
    seniorityLevel: "Mid",
    workMode: "Hybrid",
    industry: "Fintech",
    companySize: "11-50 employees",
    compensation: { min: 90000, max: 110000, currency: "USD", payType: "Salary", benefits: ["Gym Access", "Flexible Work Hours"] },
    status: "Saved",
    source: "Paste",
    appliedDate: "2026-07-02",
    deadline: "2026-07-28",
    techStack: ["React Native", "Node.js", "Express", "MySQL"],
    atsKeywords: [
      { keyword: "USSD Implementations", matched: false, priority: "Required" },
      { keyword: "Payment Gateway Integration", matched: true, priority: "Required" }
    ],
    matchScore: 52,
    statusHistory: []
  },
  {
    id: "job-003",
    jobTitle: "Lead Frontend Engineer",
    companyName: "PayStream",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=PayStream",
    department: "UI Foundation",
    seniorityLevel: "Lead",
    workMode: "Remote",
    industry: "Fintech",
    companySize: "500-1000 employees",
    compensation: { min: 140000, max: 175000, currency: "USD", payType: "Salary", equity: "0.5%", benefits: ["Unlimited PTO", "Health / Dental"] },
    status: "Applied",
    source: "Company Site",
    appliedDate: "2026-06-05",
    deadline: "2026-07-15",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    atsKeywords: [
      { keyword: "Design System Scaling", matched: true, priority: "Required" },
      { keyword: "Component Libraries", matched: true, priority: "Required" },
      { keyword: "Framer Motion", matched: true, priority: "Preferred" }
    ],
    matchScore: 95,
    statusHistory: [
      { timestamp: "2026-06-05T10:00:00Z", statusFrom: "Saved", statusTo: "Applied" }
    ]
  },
  {
    id: "job-004",
    jobTitle: "Software Developer (Python/React)",
    companyName: "SolarPulse",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=SolarPulse",
    department: "Data Platforms",
    seniorityLevel: "Mid",
    workMode: "Onsite",
    industry: "Renewable Energy",
    companySize: "100-200 employees",
    compensation: { min: 95000, max: 120000, currency: "USD", payType: "Salary", benefits: ["Commuter Subsidies", "Learning Budget"] },
    status: "Offer Received",
    source: "Referral",
    appliedDate: "2026-04-10",
    deadline: "2026-05-05",
    techStack: ["Python", "FastAPI", "React", "Pandas"],
    atsKeywords: [
      { keyword: "Modbus TCP Data Logging", matched: true, priority: "Required" },
      { keyword: "Inverter Hardware Integration", matched: false, priority: "Preferred" }
    ],
    matchScore: 74,
    statusHistory: [
      { timestamp: "2026-04-10T09:00:00Z", statusFrom: "Saved", statusTo: "Applied" },
      { timestamp: "2026-04-22T11:00:00Z", statusFrom: "Applied", statusTo: "Interviewing" },
      { timestamp: "2026-05-10T15:00:00Z", statusFrom: "Interviewing", statusTo: "Offer Received" }
    ]
  },
  {
    id: "job-005",
    jobTitle: "Product Engineer",
    companyName: "NexusLabs",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=NexusLabs",
    department: "Growth Engineering",
    seniorityLevel: "Mid",
    workMode: "Remote",
    industry: "Web3 / SaaS",
    companySize: "20-50 employees",
    compensation: { min: 110000, max: 135000, currency: "USD", payType: "Salary", equity: "1.0%", benefits: ["Work anywhere", "Home office budget"] },
    status: "Rejected/Closed",
    source: "Indeed",
    appliedDate: "2026-03-02",
    deadline: "2026-03-15",
    techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
    atsKeywords: [
      { keyword: "Rapid Prototyping", matched: true, priority: "Required" },
      { keyword: "A/B Testing Implementations", matched: false, priority: "Required" }
    ],
    matchScore: 61,
    statusHistory: [
      { timestamp: "2026-03-02T14:00:00Z", statusFrom: "Saved", statusTo: "Applied" },
      { timestamp: "2026-03-20T09:00:00Z", statusFrom: "Applied", statusTo: "Rejected/Closed" }
    ]
  },
  {
    id: "job-006",
    jobTitle: "UX Engineer",
    companyName: "Lumen Labs",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Lumen%20Labs",
    department: "Design Systems",
    seniorityLevel: "Mid",
    workMode: "Remote",
    industry: "SaaS / Productivity",
    companySize: "20-50 employees",
    compensation: { min: 95000, max: 115000, currency: "USD", payType: "Salary", equity: "0.15%", benefits: ["Health", "Remote Stipend"] },
    status: "Saved",
    source: "LinkedIn",
    appliedDate: "2026-07-05",
    deadline: "2026-08-01",
    techStack: ["React", "Storybook", "Figma Tokens", "Tailwind CSS"],
    atsKeywords: [
      { keyword: "Design Systems", matched: true, priority: "Required" },
      { keyword: "Accessibility Auditing", matched: false, priority: "Preferred" }
    ],
    matchScore: 79,
    statusHistory: []
  },
  {
    id: "job-007",
    jobTitle: "DevOps Engineer",
    companyName: "CloudForge",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=CloudForge",
    department: "Infrastructure",
    seniorityLevel: "Mid",
    workMode: "Remote",
    industry: "Cloud Infrastructure",
    companySize: "100-200 employees",
    compensation: { min: 100000, max: 130000, currency: "USD", payType: "Salary", benefits: ["Health", "401k Match", "Home Office Budget"] },
    status: "Applied",
    source: "Indeed",
    appliedDate: "2026-06-20",
    deadline: "2026-07-10",
    techStack: ["Terraform", "Kubernetes", "AWS", "Go"],
    atsKeywords: [
      { keyword: "Infrastructure as Code", matched: true, priority: "Required" },
      { keyword: "Kubernetes Administration", matched: true, priority: "Required" },
      { keyword: "Cost Optimization", matched: false, priority: "Preferred" }
    ],
    matchScore: 65,
    statusHistory: [
      { timestamp: "2026-06-20T10:00:00Z", statusFrom: "Saved", statusTo: "Applied" }
    ]
  },
  {
    id: "job-008",
    jobTitle: "Senior Frontend Engineer",
    companyName: "Wavelength",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Wavelength",
    department: "Consumer Product",
    seniorityLevel: "Senior",
    workMode: "Hybrid",
    industry: "Media / Streaming",
    companySize: "200-500 employees",
    compensation: { min: 130000, max: 160000, currency: "USD", payType: "Salary", equity: "0.2%", benefits: ["Health / Dental / Vision", "Unlimited PTO"] },
    status: "Interviewing",
    source: "Referral",
    appliedDate: "2026-05-01",
    deadline: "2026-07-12",
    techStack: ["React", "TypeScript", "GraphQL", "Tailwind CSS"],
    atsKeywords: [
      { keyword: "Component Architecture", matched: true, priority: "Required" },
      { keyword: "Performance Profiling", matched: true, priority: "Preferred" },
      { keyword: "GraphQL", matched: false, priority: "Preferred" }
    ],
    matchScore: 84,
    statusHistory: [
      { timestamp: "2026-05-01T09:00:00Z", statusFrom: "Saved", statusTo: "Applied" },
      { timestamp: "2026-05-20T13:00:00Z", statusFrom: "Applied", statusTo: "Interviewing" }
    ]
  },
  {
    id: "job-009",
    jobTitle: "Product Engineer",
    companyName: "Fernwood",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Fernwood",
    department: "Platform",
    seniorityLevel: "Mid",
    workMode: "Remote",
    industry: "Climate Tech",
    companySize: "50-100 employees",
    compensation: { min: 110000, max: 135000, currency: "USD", payType: "Salary", equity: "0.3%", benefits: ["Health", "Climate Impact Bonus"] },
    status: "Offer Received",
    source: "Company Site",
    appliedDate: "2026-03-15",
    deadline: "2026-04-10",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    atsKeywords: [
      { keyword: "Full-Stack Delivery", matched: true, priority: "Required" },
      { keyword: "Data Visualization", matched: true, priority: "Preferred" }
    ],
    matchScore: 91,
    statusHistory: [
      { timestamp: "2026-03-15T09:00:00Z", statusFrom: "Saved", statusTo: "Applied" },
      { timestamp: "2026-03-28T10:00:00Z", statusFrom: "Applied", statusTo: "Interviewing" },
      { timestamp: "2026-04-15T16:00:00Z", statusFrom: "Interviewing", statusTo: "Offer Received" }
    ]
  },
  {
    id: "job-010",
    jobTitle: "Backend Engineer",
    companyName: "HarborData",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=HarborData",
    department: "Data Platform",
    seniorityLevel: "Mid",
    workMode: "Onsite",
    industry: "Data Infrastructure",
    companySize: "50-100 employees",
    compensation: { min: 105000, max: 125000, currency: "USD", payType: "Salary", benefits: ["Health", "401k"] },
    status: "Saved",
    source: "Paste",
    appliedDate: "2026-06-28",
    deadline: "2026-07-30",
    techStack: ["Go", "gRPC", "PostgreSQL", "Kafka"],
    atsKeywords: [
      { keyword: "Distributed Systems", matched: false, priority: "Required" },
      { keyword: "Event-Driven Architecture", matched: false, priority: "Preferred" }
    ],
    matchScore: 38,
    statusHistory: []
  },
  {
    id: "job-011",
    jobTitle: "Full Stack Developer",
    companyName: "Brightline",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Brightline",
    department: "Growth Engineering",
    seniorityLevel: "Mid",
    workMode: "Remote",
    industry: "EdTech",
    companySize: "20-50 employees",
    compensation: { min: 95000, max: 115000, currency: "USD", payType: "Salary", equity: "0.1%", benefits: ["Health", "Learning Budget"] },
    status: "Applied",
    source: "LinkedIn",
    appliedDate: "2026-06-10",
    deadline: "2026-07-22",
    techStack: ["React", "Express", "MongoDB"],
    atsKeywords: [
      { keyword: "Rapid Iteration", matched: true, priority: "Required" },
      { keyword: "A/B Testing", matched: false, priority: "Preferred" }
    ],
    matchScore: 70,
    statusHistory: [
      { timestamp: "2026-06-10T09:00:00Z", statusFrom: "Saved", statusTo: "Applied" }
    ]
  },
  {
    id: "job-012",
    jobTitle: "Platform Engineer",
    companyName: "Northbeam",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Northbeam",
    department: "Core Infrastructure",
    seniorityLevel: "Senior",
    workMode: "Remote",
    industry: "Fintech",
    companySize: "100-200 employees",
    compensation: { min: 140000, max: 165000, currency: "USD", payType: "Salary", equity: "0.4%", benefits: ["Health", "401k Match", "Remote Stipend"] },
    status: "Interviewing",
    source: "Referral",
    appliedDate: "2026-04-25",
    deadline: "2026-07-18",
    techStack: ["Go", "Kubernetes", "PostgreSQL", "gRPC"],
    atsKeywords: [
      { keyword: "Platform Reliability", matched: true, priority: "Required" },
      { keyword: "On-call Ownership", matched: true, priority: "Preferred" }
    ],
    matchScore: 82,
    statusHistory: [
      { timestamp: "2026-04-25T09:00:00Z", statusFrom: "Saved", statusTo: "Applied" },
      { timestamp: "2026-05-12T14:00:00Z", statusFrom: "Applied", statusTo: "Interviewing" }
    ]
  },
  {
    id: "job-013",
    jobTitle: "Data Platform Engineer",
    companyName: "Ridgeline Analytics",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Ridgeline%20Analytics",
    department: "Analytics Engineering",
    seniorityLevel: "Mid",
    workMode: "Hybrid",
    industry: "Data / Analytics",
    companySize: "50-100 employees",
    compensation: { min: 55, max: 70, currency: "USD", payType: "Hourly", benefits: ["Contract — no benefits package"] },
    status: "Rejected/Closed",
    source: "Indeed",
    appliedDate: "2026-02-20",
    deadline: "2026-03-05",
    techStack: ["Python", "Airflow", "BigQuery"],
    atsKeywords: [
      { keyword: "ETL Pipeline Design", matched: true, priority: "Required" },
      { keyword: "BigQuery Optimization", matched: false, priority: "Preferred" }
    ],
    matchScore: 44,
    statusHistory: [
      { timestamp: "2026-02-20T09:00:00Z", statusFrom: "Saved", statusTo: "Applied" },
      { timestamp: "2026-03-01T09:00:00Z", statusFrom: "Applied", statusTo: "Rejected/Closed" }
    ]
  },
  {
    id: "job-014",
    jobTitle: "Platform Engineer",
    companyName: "Meridian Health",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Meridian%20Health",
    department: "Health Data Platform",
    seniorityLevel: "Mid",
    workMode: "Onsite",
    industry: "HealthTech",
    companySize: "200-500 employees",
    compensation: { min: 110000, max: 135000, currency: "USD", payType: "Salary", benefits: ["Health", "Dental", "401k"] },
    status: "Saved",
    source: "Company Site",
    appliedDate: "2026-07-06",
    deadline: "2026-08-10",
    techStack: ["Go", "React", "PostgreSQL"],
    atsKeywords: [
      { keyword: "HIPAA-Compliant Systems", matched: true, priority: "Required" },
      { keyword: "Healthcare Interoperability", matched: false, priority: "Preferred" }
    ],
    matchScore: 67,
    statusHistory: []
  },
  {
    id: "job-015",
    jobTitle: "Software Engineer",
    companyName: "Anchorpoint",
    companyLogoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Anchorpoint",
    department: "Core Product",
    seniorityLevel: "Junior",
    workMode: "Remote",
    industry: "SaaS",
    companySize: "11-50 employees",
    compensation: { min: 85000, max: 100000, currency: "USD", payType: "Salary", benefits: ["Health", "Flexible Hours"] },
    status: "Applied",
    source: "LinkedIn",
    appliedDate: "2026-06-25",
    deadline: "2026-07-09",
    techStack: ["React", "Node.js", "TypeScript"],
    atsKeywords: [
      { keyword: "Full-Stack Fundamentals", matched: true, priority: "Required" },
      { keyword: "Testing Discipline", matched: false, priority: "Preferred" }
    ],
    matchScore: 73,
    statusHistory: [
      { timestamp: "2026-06-25T09:00:00Z", statusFrom: "Saved", statusTo: "Applied" }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────
// User Profile — structured for the Resume Canvas's four tabs (§8.1):
// Summary, Experience, Skills, Education.
// ─────────────────────────────────────────────────────────────────────────

export interface ResumeBullet {
  id: string;
  text: string;
  suggestion: string;
  accepted: boolean;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  startDate: string; // "YYYY-MM"
  endDate: string;    // "YYYY-MM" or "Present"
  location: string;
  bullets: ResumeBullet[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface UserProfile {
  fullName: string;
  email: string;
  avatarUrl: string;
  currentTitle: string;
  location: string;
  tier: 'Free' | 'Pro';
  profileCompleteness: number; // 0–100, drives onboarding nudge prompts (§7.3)
  onboardingCompleted: boolean;
  summary: string;
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  resumeFileName: string;
  resumeUploadedAt: string;
}

export const mockProfile: UserProfile = {
  fullName: "David Adeboyejo",
  email: "david.adeboyejo@gmail.com",
  avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=David%20Adeboyejo",
  currentTitle: "Full Stack Developer & Product Engineer",
  location: "Lagos, Nigeria (Remote)",
  tier: "Pro",
  profileCompleteness: 82,
  onboardingCompleted: true,
  summary: "Full-stack engineer with 5+ years building product-facing web applications across fintech, SaaS, and renewable energy. Comfortable owning a feature from database schema to shipped UI, with a growing focus on AI-assisted developer tooling.",
  skills: [
    { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "Go"] },
    { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Express", "FastAPI", "REST APIs"] },
    { category: "Data & Infra", items: ["PostgreSQL", "MongoDB", "Firebase", "GCP Cloud Run"] }
  ],
  experience: [
    {
      id: "exp-1",
      company: "SolarPulse",
      title: "Software Developer",
      startDate: "2024-08",
      endDate: "Present",
      location: "Remote",
      bullets: [
        {
          id: "b1",
          text: "Built responsive tracking dashboards using React and managed complex backends with Python.",
          suggestion: "Architected analytical dashboards utilizing React, Vite, and Tailwind CSS, speeding up cross-platform render cycles by 200ms.",
          accepted: false
        },
        {
          id: "b2",
          text: "Handled product development workflows and USSD integration steps.",
          suggestion: "Spearheaded core feature implementations for financial products, orchestrating payment gateway webhooks and dynamic USSD logic flows.",
          accepted: false
        }
      ]
    },
    {
      id: "exp-2",
      company: "Krestkore",
      title: "Frontend Developer",
      startDate: "2022-06",
      endDate: "2024-07",
      location: "Lagos, Nigeria",
      bullets: [
        {
          id: "b3",
          text: "Worked on the mobile banking app's React Native codebase.",
          suggestion: "Delivered core screens for a React Native banking app used by 40,000+ monthly active users, reducing crash rate by 18%.",
          accepted: false
        },
        {
          id: "b4",
          text: "Fixed bugs and reviewed pull requests from other developers.",
          suggestion: "Led code review process across a 6-person frontend team, cutting average PR turnaround from 3 days to 1.",
          accepted: false
        }
      ]
    }
  ],
  education: [
    { id: "edu-1", institution: "University of Lagos", degree: "B.Sc.", field: "Computer Science", startYear: 2017, endYear: 2021 }
  ],
  resumeFileName: "David_Adeboyejo_Resume_2026.pdf",
  resumeUploadedAt: "2026-06-30T18:22:00Z"
};

// ─────────────────────────────────────────────────────────────────────────
// Analytics — all 5 chart datasets from §6.2, plus the 4 KPI cards from §6.1.
// Computed from the 15-job dataset above as of 2026-07-07.
// ─────────────────────────────────────────────────────────────────────────

export const mockAnalyticsSummary = {
  kpis: {
    totalApplications: 15,                 // all tracked jobs, any status
    responseRate: 45.5,                    // (Interviewing + Offer) / (all non-Saved) x 100 = 5/11
    offerRate: 18.2,                       // Offer / (all non-Saved) x 100 = 2/11
    avgTimeToResponseDays: 15.2             // mean days, Applied -> first Interviewing entry
  },
  applicationsOverTime: [
    { period: "Feb 2026", count: 1 },
    { period: "Mar 2026", count: 2 },
    { period: "Apr 2026", count: 2 },
    { period: "May 2026", count: 2 },
    { period: "Jun 2026", count: 5 },
    { period: "Jul 2026", count: 3 }
  ],
  pipelineDistribution: [
    { status: "Saved", value: 4, color: "#1d4ed8" },
    { status: "Applied", value: 4, color: "#06b6d4" },
    { status: "Interviewing", value: 3, color: "#f59e0b" },
    { status: "Offer Received", value: 2, color: "#10b981" },
    { status: "Rejected/Closed", value: 2, color: "#ef4444" }
  ],
  bySource: [
    { source: "LinkedIn", count: 4 },
    { source: "Indeed", count: 3 },
    { source: "Referral", count: 3 },
    { source: "Company Site", count: 3 },
    { source: "Paste", count: 2 }
  ],
  topRoles: [
    { title: "Full Stack Developer", count: 2 },
    { title: "Product Engineer", count: 2 },
    { title: "Platform Engineer", count: 2 },
    { title: "Senior Product Engineer", count: 1 },
    { title: "Senior Frontend Engineer", count: 1 }
  ],
  // Active stages (Saved/Applied/Interviewing): average CURRENT dwell time for
  // jobs presently sitting in that column — a standard Kanban "age in stage"
  // metric. Terminal stages (Offer/Rejected): average CYCLE TIME from Applied
  // to reaching that terminal status, since "current dwell" isn't meaningful
  // once a job is done moving. The real backend should compute both live from
  // statusHistory rather than storing this snapshot.
  avgTimeInStage: [
    { status: "Saved", avgDays: 4.3 },
    { status: "Applied", avgDays: 22.0 },
    { status: "Interviewing", avgDays: 46.3 },
    { status: "Offer Received", avgDays: 30.5 },
    { status: "Rejected/Closed", avgDays: 13.5 }
  ]
};

// ─────────────────────────────────────────────────────────────────────────
// Ingestion preview — one example of a freshly parsed, NOT-yet-committed job,
// with per-field confidence indicators (§4.3). Use this to build the Smart
// Paste side panel UI without a live Gemini call.
// ─────────────────────────────────────────────────────────────────────────

export interface FieldConfidence<T> {
  value: T;
  confidence: 'high' | 'medium' | 'low';
}

export interface IngestionPreview {
  sourceType: 'paste' | 'url';
  rawSourceExcerpt: string;
  parsedAt: string;
  fields: {
    companyName: FieldConfidence<string>;
    jobTitle: FieldConfidence<string>;
    department: FieldConfidence<string>;
    seniorityLevel: FieldConfidence<string>;
    workMode: FieldConfidence<string>;
    compensationMin: FieldConfidence<number | null>;
    compensationMax: FieldConfidence<number | null>;
    currency: FieldConfidence<string>;
    deadline: FieldConfidence<string | null>;
    techStack: FieldConfidence<string[]>;
  };
}

export const mockIngestionPreview: IngestionPreview = {
  sourceType: "paste",
  rawSourceExcerpt: "We're looking for a Senior Backend Engineer to join our Platform team, building the systems that power real-time settlement across our core banking rails...",
  parsedAt: "2026-07-07T09:14:00Z",
  fields: {
    companyName: { value: "Northlight Systems", confidence: "high" },
    jobTitle: { value: "Senior Backend Engineer", confidence: "high" },
    department: { value: "Platform", confidence: "medium" },
    seniorityLevel: { value: "Senior", confidence: "high" },
    workMode: { value: "Remote", confidence: "medium" },
    compensationMin: { value: 130000, confidence: "low" },
    compensationMax: { value: null, confidence: "low" },
    currency: { value: "USD", confidence: "medium" },
    deadline: { value: null, confidence: "low" },
    techStack: { value: ["Go", "Kubernetes", "PostgreSQL"], confidence: "medium" }
  }
};

// ─────────────────────────────────────────────────────────────────────────
// Cover letter sample — one pre-written example so the Cover Letter
// Generator screen (§8.2) has real content before the live Gemini
// integration exists.
// ─────────────────────────────────────────────────────────────────────────

export interface CoverLetterSample {
  jobId: string;
  tone: 'Professional' | 'Confident' | 'Conversational';
  content: string;
}

export const mockCoverLetterSamples: CoverLetterSample[] = [
  {
    jobId: "job-001",
    tone: "Confident",
    content:
      "Dear Hiring Team,\n\n" +
      "I'm writing to apply for the Senior Product Engineer role on VybzTech's Core Platform team. Over the last two years I've shipped full-stack features end to end — from schema design through to the interfaces people actually use — and I've done it fastest when the product spans both a polished frontend and a backend that has to hold up under real load, which is exactly the shape of this role.\n\n" +
      "Most recently, I rebuilt a set of tracking dashboards in React that cut cross-platform render time meaningfully, while also owning the Python services feeding them. I'd bring the same instinct here: build the part the user sees and the part that makes it reliable, without treating either as someone else's problem.\n\n" +
      "I'd welcome the chance to talk through how I could contribute to Core Platform.\n\n" +
      "Best,\nDavid Adeboyejo"
  }
];
