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
        'I moved the unit test suite off Karma and onto Jest — around 150 components, one at a time. GitHub Copilot drafted the boilerplate; I read every conversion before it merged, because a test that passes for the wrong reason is worse than no test. Test runtime dropped by about 40%, and the browser-dependent flaky tests went with it.',
      ],
      [
        'I led the move to Module Federation so teams could ship on demand instead of waiting for the biweekly release train. Then I cleaned the repository itself: two hundred-odd stale branches removed, sensitive files purged from history.',
      ],
      [
        'None of that appears in a sprint demo. All of it is why the next five years of that codebase cost less than the last five.',
      ],
    ],
    evidence: [
      'Migrated the unit test suite from Karma to Jest across ~150 components using GitHub Copilot to automate boilerplate conversion, cutting test runtime by ~40% and eliminating browser-dependent flaky tests.',
      "Led the platform's migration to Module Federation, enabling independent micro-frontend deployments and increasing deployment frequency from biweekly release trains to on-demand.",
      "Remediated repo security risks by removing 200+ stale branches and purging sensitive files from history to meet Citi's source-control policy.",
    ],
    stack: ['Jest', 'Karma', 'Module Federation', 'GitHub Copilot', 'Git'],
  },
  {
    id: '02',
    title: 'Build on systems that hold money',
    standfirst: 'Financial software has no forgiving path.',
    body: [
      [
        'Full-stack feature work on a platform serving more than five thousand production users, against Java Spring Boot microservice REST APIs with an Angular and TypeScript frontend on top.',
      ],
      [
        "I built customer onboarding, including Citi's Pre-Login Experience — the stretch an applicant walks through before they have an account, where every extra field is a chance to lose them.",
      ],
      [
        'Mobile screens were responsive and built to ADA and WCAG standards. A loan application a screen reader cannot complete is not a loan application; it is a wall with a form printed on it.',
      ],
    ],
    evidence: [
      "Built and maintained Citi's loan application platform serving 5,000+ production users across 65+ monthly releases, delivering full-stack features with Java Spring Boot microservice REST APIs and an Angular/TypeScript frontend.",
      "Developed customer onboarding features, including Citi's Pre-Login Experience for new loan applicants.",
      'Built and maintained responsive mobile screens compliant with ADA and WCAG 2.1 accessibility standards, validated with AXE.',
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
        'Then the fix, then the regression test, then the release. Over a few years of that, mean time to resolution came down by about 30%, and the platform got measurably steadier for it.',
      ],
      [
        'Physics is where I learned this. You do not debug a system by staring harder at it. You form a model, predict what it would produce, and go check.',
      ],
    ],
    evidence: [
      'Owned production support across 45+ monthly releases, resolving 200+ API/UI defects and incidents via Splunk log analysis across distributed microservices and cutting mean time to resolution by ~30%.',
      'Resolved 100+ API and UI defects across 20 monthly releases, improving platform stability and reducing production escapes.',
      'Wrote Selenium automation linked to Zephyr test cases, plus JUnit and Karma unit tests, expanding regression coverage.',
    ],
    stack: ['Splunk', 'Selenium', 'JUnit', 'Zephyr', 'Cucumber', 'Glassbox'],
  },
  {
    id: '04',
    title: 'Make the next person faster',
    standfirst: 'I taught before I shipped, and it shows in how I ship.',
    body: [
      [
        'I onboarded six incoming developers and stayed with each until they could contribute without anyone reading over their shoulder — about four weeks, as it turned out. I led Agile grooming across three teams so sprints stopped ending in surprises, and I wrote the internal documentation nobody volunteers for.',
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
      'Onboarded and trained 6 incoming developers, bringing each to independent contribution within 4 weeks.',
      'Led Agile grooming sessions coordinating work across 3 teams, raising sprint commitment completion to ~90%.',
      'Math & Physics Tutor / STEM Instructor — Masters Plus, Brainfuse, IPERC, NextWaveSTEM | 01/2019 – 11/2020. HS math/physics tutoring; K-12 robotics classes.',
    ],
    stack: ['Agile', 'Jira', 'Internal documentation', 'Mentoring'],
  },
]
