import type { Dossier } from '../types'

/**
 * The spine of the page. Four things Sam does, in his own words.
 *
 * Every sentence here traces to a line on his resume. The writing is
 * new, the claims are not. `evidence` holds the resume's own wording
 * for each claim, shown beside the prose, so a reader can check one
 * against the other without leaving the card.
 */
export const DOSSIERS: Dossier[] = [
  {
    id: '01',
    title: 'Modernize what is already running',
    standfirst: "Platform work that doesn't show up in a demo.",
    body: [
      [
        "Citi's ",
        {
          text: 'loan application platform',
          href: 'https://online.citi.com/US/ag/lendingv2/ntc/application/loan',
        },
        ' was live with thousands of users, so every change had to go in without anyone noticing.',
      ],
      [
        'I moved the unit test suite from Karma to Jest, about 150 components. GitHub Copilot generated the boilerplate for each conversion and I reviewed every one before it merged. Test runtime dropped by roughly 40%, and the browser-dependent flaky tests went away with Karma.',
      ],
      [
        "I led the move to Module Federation so each team could deploy its own micro-frontend on demand instead of waiting for the biweekly release train. I also cleaned up the repo: over 200 stale branches removed and sensitive files purged from history to meet Citi's source control policy.",
      ],
      [
        "None of this was a feature. It's the kind of work that makes the next few years of a codebase cheaper.",
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
    standfirst: 'Full stack work on a platform with 5,000+ production users.',
    body: [
      [
        'Full stack feature work: Java Spring Boot microservice REST APIs on the backend, Angular and TypeScript on the frontend, shipped across 65+ monthly releases.',
      ],
      [
        "I built customer onboarding features, including Citi's Pre-Login Experience, which is what a new applicant goes through before they have an account. Every extra field there costs applicants, so the design mattered.",
      ],
      [
        "The mobile screens were responsive and built to ADA and WCAG 2.1, checked with AXE. If a screen reader can't get through the application, it isn't accessible, and for a bank that's a compliance problem as much as a usability one.",
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
    standfirst: 'Production support on distributed microservices.',
    body: [
      [
        'I owned production support across 45+ monthly releases. Most of that work happened in Splunk: tracing a failed application across service boundaries until I found the log line that explained it, then confirming that was the actual cause before fixing it.',
      ],
      [
        'Then the fix, the regression test, and the release. Over those years I resolved 200+ defects and incidents, and mean time to resolution came down by about 30%.',
      ],
      [
        "The approach comes from physics. Make a model of what's happening, work out what the logs should show if the model is right, and go check.",
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
    standfirst: 'Onboarding, grooming, documentation. Teaching before that.',
    body: [
      [
        'I onboarded six developers and worked with each of them until they could contribute on their own, which took about four weeks. I ran Agile grooming across three teams, and I wrote the internal documentation that nobody else wanted to.',
      ],
      [
        'Before software I taught math and physics: at Homewood-Flossmoor High School, online through ',
        { text: 'Brainfuse', href: 'http://home.brainfuse.com/' },
        ', and physics courses for international students through ',
        { text: 'IPERC', href: 'https://www.iperc.org/' },
        '.',
      ],
      [
        'With NextWaveSTEM I taught robotics and drone classes of 30+ K-12 students, in partnership with Chicago Public Schools. Teaching a room of middle schoolers and onboarding a junior developer have more in common than you would think.',
      ],
    ],
    evidence: [
      'Onboarded and trained 6 incoming developers, bringing each to independent contribution within 4 weeks.',
      'Led Agile grooming sessions coordinating work across 3 teams, raising sprint commitment completion to ~90%.',
      'Math & Physics Tutor / STEM Instructor: Masters Plus, Brainfuse, IPERC, NextWaveSTEM, 01/2019 to 11/2020. HS math/physics tutoring; K-12 robotics classes.',
    ],
    stack: ['Agile', 'Jira', 'Internal documentation', 'Mentoring'],
  },
]
