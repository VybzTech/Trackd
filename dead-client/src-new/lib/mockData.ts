import { JobOpportunity } from '../store/appStore'

const COMPANIES = [
  'Google', 'Meta', 'Apple', 'Microsoft', 'Amazon', 'Netflix', 'Stripe', 'Shopify',
  'Airbnb', 'Uber', 'Twitter', 'Notion', 'Figma', 'Vercel', 'OpenAI'
]

const ROLES = [
  'Senior Frontend Engineer',
  'Full Stack Engineer',
  'Backend Engineer',
  'Data Scientist',
  'Product Manager',
  'DevOps Engineer',
  'ML Engineer',
  'Solutions Architect'
]

const STACKS = [
  ['React', 'TypeScript', 'Node.js'],
  ['Python', 'FastAPI', 'PostgreSQL'],
  ['Go', 'Kubernetes', 'Docker'],
  ['Rust', 'WebAssembly'],
  ['Java', 'Spring Boot', 'AWS'],
  ['Vue.js', 'Nuxt', 'Firebase'],
  ['Next.js', 'Tailwind', 'Supabase'],
  ['React', 'GraphQL', 'PostgreSQL']
]

const KEYWORDS = {
  frontend: ['React', 'TypeScript', 'CSS', 'Accessibility', 'Performance'],
  backend: ['API Design', 'Database', 'Scalability', 'Security', 'Testing'],
  data: ['Python', 'SQL', 'Machine Learning', 'Statistical Analysis', 'Data Visualization'],
  pm: ['Roadmapping', 'User Research', 'Analytics', 'Cross-functional Leadership', 'Strategy']
}

export function generateMockJob(): JobOpportunity {
  const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)]
  const role = ROLES[Math.floor(Math.random() * ROLES.length)]
  const stack = STACKS[Math.floor(Math.random() * STACKS.length)]
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    company,
    role,
    status: 'saved',
    compensation: {
      min: 120 + Math.floor(Math.random() * 80),
      max: 200 + Math.floor(Math.random() * 100),
      currency: 'USD'
    },
    stack,
    atsKeywords: Object.values(KEYWORDS).flat().sort(() => Math.random() - 0.5).slice(0, 5),
    applicationDeadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    matchScore: Math.floor(60 + Math.random() * 40),
    notes: 'Promising opportunity in the market'
  }
}

export const MOCK_RESUME = `
John Doe
Senior Frontend Engineer | San Francisco, CA
john@example.com | (555) 123-4567

PROFESSIONAL SUMMARY
Experienced frontend engineer with 5+ years building scalable web applications.
Specializing in React, TypeScript, and modern web technologies.

EXPERIENCE
Senior Frontend Engineer | TechCorp Inc. (2021 - Present)
- Led redesign of core dashboard, improving performance by 40%
- Mentored team of 4 junior engineers
- Implemented CI/CD pipelines, reducing deploy time by 60%

Frontend Engineer | WebServices LLC (2019 - 2021)
- Built responsive web applications using React and Redux
- Improved code quality with comprehensive testing strategy
- Collaborated with UX team on user experience improvements

SKILLS
Languages: JavaScript, TypeScript, Python
Frontend: React, Next.js, Vue.js, Tailwind CSS
Backend: Node.js, Express, FastAPI
Tools: Git, Docker, Webpack, Vitest
`

export const MOCK_COVER_LETTER_TEMPLATES = {
  professional: `Dear [Company],

I am writing to express my strong interest in the {role} position at {company}.

With {years}+ years of experience in software development, I have developed a deep expertise in
the technologies and practices that align perfectly with your team's needs.

My background includes significant experience with {stack}, which I believe will enable me to make
immediate contributions to your engineering team.

I am particularly drawn to {company}'s commitment to {mission} and would welcome the opportunity
to contribute to your mission.

Best regards,
John Doe`,

  confident: `Hi {company} Team,

I'm excited about the {role} opportunity and believe I'm an excellent fit.

Throughout my career, I've consistently delivered high-impact solutions:
- Built {achievement1}
- Led {achievement2}
- Improved {achievement3}

My expertise with {stack} directly aligns with your technical requirements, and I'm confident
I can drive significant value from day one.

Looking forward to discussing how I can contribute to your success.

Cheers,
John Doe`,

  conversational: `Hey there,

I came across the {role} role at {company} and immediately thought this could be a great fit for both of us.

Here's why: I've spent the last several years working with {stack}, shipping products that users love.
Most recently, I {achievement1}, which really showed me the impact of {learning}.

I'm genuinely excited about {company}'s work in {mission}, and I think my experience in {domain}
could add real value to your team.

Would love to chat more about this opportunity!

All the best,
John Doe`
}
