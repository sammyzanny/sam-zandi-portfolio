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
    name: 'ALS — loan tuner rebuild',
    context: 'Citi Personal Loan · full stack · in production',
    blurb:
      'The frontend and the backend each calculated the monthly payment, and they did not always agree. ALS made the backend the only source of truth and rebuilt the page around it.',
    points: [
      'A new backend call fires on every loan-amount change and returns the exact monthly payment for every available term.',
      'The frontend stopped calculating: the term cards, the AutoPay discount and the summary bar render straight from the response.',
      'The loan-term data arrived in a new shape, so the tuner page was redesigned and cleaned up around the new model rather than patched.',
    ],
    links: [{ label: 'See the page', href: '#samples' }],
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
  { group: 'Languages', items: ['Java', 'TypeScript', 'JavaScript', 'SQL', 'HTML', 'CSS'] },
  {
    group: 'Frameworks',
    items: ['Spring Boot', 'Angular', 'React', 'React Native', 'Redux', 'AEM'],
  },
  { group: 'Data & APIs', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'RESTful APIs'] },
  {
    group: 'Cloud & DevOps',
    items: [
      'AWS',
      'Google Cloud',
      'Docker',
      'Jenkins',
      'CI/CD',
      'Maven',
      'Artifactory',
      'Git',
      'Module Federation',
    ],
  },
  {
    group: 'Testing & Quality',
    items: [
      'JUnit',
      'Jest',
      'Karma',
      'Cucumber',
      'Selenium',
      'Zephyr',
      'SonarQube',
      'AXE',
      'Glassbox',
      'Splunk',
    ],
  },
  { group: 'Practice & Tools', items: ['Agile', 'Jira', 'Figma', 'GitHub Copilot', 'Devin AI', 'Claude'] },
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
