import type { Project, Role, SkillGroup } from '../types'

/**
 * The chronological record. Deliberately compact and placed late in the
 * page: it is the receipt for the argument the dossiers make, not the
 * argument itself.
 */
export const ROLES: Role[] = [
  {
    title: 'Senior Software Engineer',
    org: 'Citibank (Citigroup Credit Services Inc.)',
    place: 'Schaumburg, IL',
    start: '09/2022',
    end: '06/2026',
    summary:
      'Loan application platform. Spring Boot APIs, Angular frontend, the Jest migration, Module Federation, Splunk triage, and onboarding the team behind me.',
  },
  {
    title: 'Intermediate Software Engineer',
    org: 'Citibank (Citigroup Credit Services Inc.)',
    place: 'Schaumburg, IL',
    start: '01/2021',
    end: '09/2022',
    summary:
      'Owned the loan tuner page. Customer onboarding and the Pre-Login Experience, accessible responsive mobile screens, Selenium coverage, and defect work across releases.',
  },
  {
    title: 'Math and Physics Tutor',
    org: 'Contracting Tutoring Services',
    place: 'Homewood, IL',
    start: '05/2019',
    end: '11/2020',
    summary:
      'Homewood-Flossmoor High School through Masters Plus Tutoring, online tutoring with Brainfuse, and international physics courses for IPERC.',
  },
  {
    title: 'Instructor / Mentor',
    org: 'NextWaveSTEM',
    place: 'Chicago, IL',
    start: '01/2019',
    end: '09/2019',
    summary:
      'Robotics and drone technology for classes of 30+ K-12 students, partnered with Chicago Public Schools.',
  },
]

export const PROJECTS: Project[] = [
  {
    name: 'TownCert',
    context: 'Founder · municipal compliance SaaS · live, 2026',
    blurb:
      'Illinois has no statewide contractor license, so every south-suburban village sets its own registration rules. TownCert tracks all 37 of them so a contractor never loses a permit to a lapsed certificate.',
    points: [
      'Multi-tenant subscription SaaS: Next.js 16 and TypeScript, Tailwind, PostgreSQL on Neon with Drizzle ORM, Clerk auth, Stripe Billing, Cloudflare R2 and Resend, deployed on Vercel with daily cron jobs.',
      'A rules engine encoding each municipality\'s fees, bonds, insurance minimums and expiry pattern — fixed, calendar, or rolling — that computes every renewal date and runs a 60/30/14/0-day reminder ladder.',
      'Flags insurance or bond documents that will lapse before a renewal; Stripe Checkout with idempotent webhook sync and trial carry-over; org and role-based access; an admin console for rule verification.',
      '47 Vitest and Playwright tests across unit, integration and end to end.',
    ],
    links: [
      { label: 'Live app', href: 'https://towncert.com/' },
      { label: 'GitHub', href: 'https://github.com/sammyzanny/permitpath' },
    ],
  },
  {
    name: 'The Crack App',
    context: 'Areawide Waterproofing · shipped MVP with live customers',
    blurb:
      'A business app with real customers on it, built so a homeowner can request a waterproofing consultation without a phone call.',
    points: [
      'React Native frontend with a Ruby on Rails backend, supporting live customer operations.',
      'AWS S3 storage and automated email workflows through Action Mailer.',
      'Secure authentication using Bcrypt encryption and token-based sessions.',
    ],
    links: [
      { label: 'Backend', href: 'https://github.com/sammyzanny/area-wide-mobile-backend' },
      { label: 'Frontend', href: 'https://github.com/sammyzanny/areawide-mobile-fe' },
      { label: 'MVP shots', href: 'https://ibb.co/album/qF72jV' },
    ],
  },
  {
    name: 'Animal Swapping',
    context: 'Animal Crossing: New Horizons · community trading',
    blurb:
      'A trading platform for a Nintendo Switch community, which is a matching problem wearing a very cheerful hat.',
    points: [
      'React frontend with a Ruby on Rails backend.',
      'A matching algorithm that pairs users for optimized item trading.',
      'Application state managed with Redux.',
    ],
    links: [
      { label: 'Backend', href: 'https://github.com/sammyzanny/animal-swapping-backend' },
      { label: 'Frontend', href: 'https://github.com/sammyzanny/animal-swapping-frontend' },
      { label: 'Demo', href: 'https://youtu.be/Gc27jCrZiR4' },
    ],
  },
]

export const SKILLS: SkillGroup[] = [
  { group: 'Languages', items: ['Java', 'TypeScript', 'JavaScript', 'SQL', 'Ruby', 'HTML', 'CSS'] },
  {
    group: 'Backend',
    items: [
      'Spring Boot',
      'RESTful APIs',
      'Microservices',
      'Node.js',
      'Next.js',
      'Stripe Billing',
      'Clerk',
      'Maven',
      'Ruby on Rails',
      'Kafka',
      'Airflow',
    ],
  },
  {
    group: 'Frontend',
    items: [
      'Angular',
      'Module Federation',
      'React',
      'React Native',
      'Redux',
      'Tailwind CSS',
      'AEM',
      'Figma',
    ],
  },
  { group: 'Data', items: ['PostgreSQL', 'Drizzle ORM', 'MySQL', 'MongoDB'] },
  {
    group: 'Cloud & DevOps',
    items: [
      'AWS (S3)',
      'Vercel',
      'Cloudflare R2',
      'Neon',
      'Google Cloud',
      'Docker',
      'Jenkins',
      'CI/CD',
      'Artifactory',
      'Git',
      'SonarQube',
    ],
  },
  {
    group: 'Testing & Quality',
    items: [
      'JUnit',
      'Jest',
      'Vitest',
      'Playwright',
      'Karma',
      'Selenium',
      'Cucumber',
      'Zephyr',
      'AXE (accessibility)',
      'Glassbox',
    ],
  },
  {
    group: 'AI & Process',
    items: [
      'GitHub Copilot',
      'Devin AI',
      'Claude Code',
      'AI-assisted development',
      'Splunk',
      'Jira',
      'Agile/Scrum',
      'WCAG/ADA compliance',
    ],
  },
]

export const EDUCATION = {
  degree: 'B.S. Engineering Physics',
  school: 'University of Illinois at Urbana-Champaign',
  place: 'Champaign-Urbana, IL',
  gpa: '3.7 / 4.0',
  conferred: '12/2018',
  research: {
    label: 'Exceptional Bobo Numbers',
    href: 'https://oeis.org/A277603',
    professor: 'Dr. Kifowit',
    line: 'Discovered underlying patterns of',
  },
} as const
