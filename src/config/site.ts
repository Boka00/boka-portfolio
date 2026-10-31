/**
 * Centralized site & personalization configuration.
 * Update CV path, Formspree endpoint, or social URLs in this single file.
 */
export const SITE_CONFIG = {
  fullName: 'Boris Mkrtichiani',
  nickname: 'Boka',
  role: 'Front-End / React Developer',
  rotatingRoles: [
    'Front-End Developer',
    'React Specialist',
    'TypeScript Enthusiast',
  ] as const,
  tagline:
    'I build clean, modular, and responsive web apps with strong component architecture, type safety, and intuitive interfaces.',
  location: 'Georgia',
  timezone: 'UTC+4 (GET)',
  coordinates: '41.7151° N, 44.8271° E',
  availability: {
    available: true,
    label: 'Available for work',
    modes: ['Full-Time', 'Freelance', 'Remote'],
  },
  email: 'boka.mkrtichiani@gmail.com',
  socials: {
    github: 'https://github.com/Boka00',
    githubHandle: '@Boka00',
    linkedin: 'https://www.linkedin.com/in/boris-mkrtichiani/',
    linkedinHandle: 'in/boris-mkrtichiani',
  },
  /**
   * [PERSONALIZE]: Drop your PDF resume into /public/Boris-Mkrtichiani-CV.pdf
   * or update this path to an external Google Drive / Notion resume URL.
   */
  cvUrl: '/Boris-Mkrtichiani-CV.pdf',
  /**
   * [PERSONALIZE]: Replace YOUR_FORMSPREE_ID below or set VITE_FORMSPREE_ENDPOINT in .env
   * Create a free endpoint in 30 seconds at https://formspree.io
   */
  formspreeEndpoint:
    import.meta.env.VITE_FORMSPREE_ENDPOINT ||
    'https://formspree.io/f/YOUR_FORMSPREE_ID',
} as const;

