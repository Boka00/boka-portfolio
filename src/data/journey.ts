import type { CertificationItem, JourneyItem } from '../types/portfolio';

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'algouni-ethical-hacking',
    title: 'Ethical Hacking Program',
    issuer: 'AlgoUni',
    date: 'May 2025',
    credentialId: 'ALGO-2025-033',
    distinction: 'Outstanding Performance',
    skills: ['OWASP Top 10', 'XSS & SQLi Defense', 'SSL/TLS & Network Security', 'Burp Suite & Kali Linux'],
  },
  {
    id: 'cisco-intro-cybersecurity',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'Oct 2023',
    credentialId: 'Verified Credential',
    skills: ['Cyber Threat Analysis', 'Vulnerability Assessment', 'Operational Defense'],
  },
  {
    id: 'step-it-frontend',
    title: 'Front-End Web Programming Course',
    issuer: 'STEP IT Academy',
    date: '2022',
    credentialId: 'Certified Graduate',
    skills: ['Semantic HTML5', 'CSS3 & Modular SCSS', 'JavaScript (ES6+)', 'Responsive Design'],
  },
];

export const JOURNEY_ITEMS: JourneyItem[] = [
  {
    id: 'gtu-information-technology',
    code: 'EDU // 01',
    period: 'University Degree Track',
    title: 'Information Technology',
    organization: 'Georgian Technical University · Tbilisi, Georgia',
    category: 'Education',
    description:
      'Academic foundation in software engineering, data structures, computer networks, and systems architecture.',
    highlights: [
      'Applying structured software engineering principles and algorithmic problem-solving to modern web applications.',
      'Combining university computer science fundamentals with practical front-end product engineering.',
    ],
    tags: ['Information Technology', 'Software Engineering', 'Algorithms', 'Networking'],
  },
  {
    id: '10x-college-frontend',
    code: 'SPEC // 02',
    period: 'Intensive Engineering Track',
    title: 'Front-End Web Development',
    organization: '10X College · Tbilisi, Georgia',
    category: 'Specialization',
    description:
      'Built production-style B2B SaaS dashboards, data explorers, and schema-validated React + TypeScript applications.',
    highlights: [
      'Architected 10X CRM (Kanban DnD, list view, live KPIs, call timers, CSV export) and 10X Bookmark Manager (TypeScript, Formik, Yup).',
      'Delivered Interactive React Master Quiz (150 questions, CSS Modules) and REST Countries Explorer (250+ nations geodata filtering).',
    ],
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Formik & Yup', 'RESTful APIs'],
  },
  {
    id: 'algouni-security-training',
    code: 'SEC // 03',
    period: 'Completed May 2025 · Cert No. ALGO-2025-033',
    title: 'Ethical Hacking & Web Application Security',
    organization: 'AlgoUni · Recognized for Outstanding Performance',
    category: 'Certification',
    description:
      'Comprehensive hands-on security program covering offensive and defensive web security, network protocols, and cryptography.',
    highlights: [
      'Trained in OWASP Top 10 vulnerabilities, SQL/XSS injection analysis, Burp Suite web pentesting, and SSL/TLS inspection.',
      'Directly informs my front-end engineering workflow: strict Content-Security-Policy headers, input sanitization, and DevSecOps CI gates.',
    ],
    tags: ['OWASP Top 10', 'Web Security', 'SSL/TLS', 'Kali Linux', 'Cryptography'],
  },
  {
    id: 'cisco-and-step-foundations',
    code: 'FOUND // 04',
    period: '2022 – Oct 2023',
    title: 'Front-End Programming & Cybersecurity Foundations',
    organization: 'STEP IT Academy (2022) & Cisco Networking Academy (2023)',
    category: 'Certification',
    description:
      'Completed certified training in responsive front-end web development followed by Cisco Networking Academy’s verified cybersecurity credential.',
    highlights: [
      'Mastered semantic HTML5, BEM/SCSS modular styling, and mobile-first layouts across 360px–1920px viewports at STEP IT Academy.',
      'Earned Cisco Networking Academy’s Introduction to Cybersecurity credential covering threat landscapes and organizational defense.',
    ],
    tags: ['HTML5', 'SCSS / BEM', 'JavaScript', 'Cisco Verified', 'Cybersecurity'],
  },
];
