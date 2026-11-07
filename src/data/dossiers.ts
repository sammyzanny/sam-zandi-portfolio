import type { Dossier } from '../types'

/**
 * The spine of the page. Four things Sam does, argued in his voice.
 *
 * Every sentence here traces to a line on his resume — the writing is
 * new, the claims are not. `evidence` holds the resume-literal version
 * of each claim, shown beside the prose, so a sceptical reader can check
 * the writing against the record without leaving the card.
 */
export const DOSSIERS: Dossier[] = [
  {
    id: '01',
    title: 'Modernize what is already running',
    standfirst: 'The work that never demos well and always pays off.',
    body: [
      [
        "Citi's ",
        {
          text: 'loan application platform',
          href: 'https://online.citi.com/US/ag/lendingv2/ntc/application/loan',
        },
        ' was live and serving thousands of production users, which meant every change had to land without anyone noticing it had.',
      ],
      [
        'I moved the unit test suite off Karma and onto Jest — around 150 components, one at a time. GitHub Copilot drafted each conversion; I read every one before it merged, because a test that passes for the wrong reason is worse than no test.',
      ],
      [
        'I changed our deployment strategy to Module Federation so teams could ship on their own cadence instead of queueing behind a shared release. Then I cleaned the repository itself: automated branch removal, sensitive files remediated.',
      ],
      [
        'None of that appears in a sprint demo. All of it is why the next five years of that codebase cost less than the last five.',
      ],
    ],
    evidence: [
      'Migrated Unit Testing Suite from Karma to Jest with the assistance of GitHub Copilot, modernizing ~150 components.',
      'Transitioned our deployment strategy to use Module Federation to increase deployment frequency.',
      'Performed large-scale repository cleanup including automated branch removal and sensitive file remediation.',
    ],
    stack: ['Jest', 'Karma', 'Module Federation', 'GitHub Copilot', 'Git'],
  },
  {
    id: '02',
    title: 'Build on systems that hold money',
    standfirst: 'Financial software has no forgiving path.',
    body: [
      [
        'Full-stack feature work against Java Spring Boot microservice REST APIs with an Angular and TypeScript frontend on top.',
      ],
      [
        "I built customer onboarding, including Citi's Pre-Login Experience — the stretch an applicant walks through before they have an account, where every extra field is a chance to lose them.",
      ],
      [
        'Mobile screens were responsive and built to ADA and WCAG standards. A loan application a screen reader cannot complete is not a loan application; it is a wall with a form printed on it.',
      ],
    ],
    evidence: [
      'Engineered full-stack features with Java Spring Boot Microservice REST APIs and Angular Frontend w/ Typescript.',
      "Developed customer onboarding features including Citi's Pre-Login Experience for new applicants.",
      'Maintained mobile screens with responsive design in compliance with ADA and WCAG accessibility standards.',
    ],
    stack: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'RESTful APIs', 'AXE'],
  },
  {
    id: '03',
    title: 'Find the thing that broke at 2am',
    standfirst: 'Distributed systems fail in ways that do not reproduce locally.',
    body: [
      [
        'I lived in Splunk. Tracing one failed application across service boundaries until the log line that actually mattered surfaced, and resisting the urge to fix the first plausible thing instead of the real one.',
      ],
      [
        'Then the fix, then the regression test, then the release. I resolved API and UI defects across multiple releases and the platform got measurably steadier for it.',
      ],
      [
        'Physics is where I learned this. You do not debug a system by staring harder at it. You form a model, predict what it would produce, and go check.',
      ],
    ],
    evidence: [
      'Investigate and resolve production issues through Splunk log analysis across distributed microservices.',
      'Resolved API/UI defects and improved platform stability across multiple releases.',
      'Tested code with Selenium automated scripts linked w/ Zephyr, JUnit, and Karma Unit Tests.',
    ],
    stack: ['Splunk', 'Selenium', 'JUnit', 'Zephyr', 'Cucumber', 'Glassbox'],
  },
  {
    id: '04',
    title: 'Make the next person faster',
    standfirst: 'I taught before I shipped, and it shows in how I ship.',
    body: [
      [
        'I trained incoming developers and stayed with them until they could contribute without anyone reading over their shoulder. I led Agile grooming so sprints stopped ending in surprises, and I wrote the internal documentation nobody volunteers for.',
      ],
      [
        'Before software I taught math and physics: Homewood-Flossmoor High School, online tutoring through ',
        { text: 'Brainfuse', href: 'http://home.brainfuse.com/' },
        ', and international physics courses for ',
        { text: 'IPERC', href: 'https://www.iperc.org/' },
        '.',
      ],
      [
        'With NextWaveSTEM I ran robotics and drone classes of thirty-plus K-12 students in partnership with Chicago Public Schools. Holding a room of thirty middle-schoolers and onboarding one nervous junior developer are the same skill wearing different clothes.',
      ],
    ],
    evidence: [
      'Train incoming developers and onboard them progressively until they are able to contribute independently.',
      'Lead Agile grooming sessions coordinating development work across teams to improve sprint delivery consistency.',
      'Led full-sized classes (30+ students K-12) teaching Robotics/Drone Technology.',
      'Inspired STEM careers in underserved communities (Partnered w/ CPS).',
    ],
    stack: ['Agile', 'Jira', 'Internal documentation', 'Mentoring'],
  },
]
