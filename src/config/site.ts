/**
 * Resolves the public Formspree form hashid from environment variables first,
 * falling back to the portfolio's public form ID ('xwllrpla').
 *
 * Security note: A Formspree form ID is a public client identifier (like an HTML form action),
 * NOT a private API key. Protect it in Formspree Settings -> Restrict to Domain (boka-portfolio.vercel.app).
 */
function resolveFormspreeFormId(): string {
  const explicitId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim();
  if (explicitId && explicitId !== 'YOUR_FORMSPREE_ID') {
    return explicitId;
  }

  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();
  if (endpoint && !endpoint.includes('YOUR_FORMSPREE_ID')) {
    const match = endpoint.match(/\/f\/([a-zA-Z0-9]+)\/?$/);
    if (match?.[1]) {
      return match[1];
    }
  }

  return 'xwllrpla';
}

const FORMSPREE_FORM_ID = resolveFormspreeFormId();

/**
 * Centralized site & personalization configuration.
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
   * Drop your final PDF resume into /public/Boris-Mkrtichiani-CV.pdf
   */
  cvUrl: '/Boris-Mkrtichiani-CV.pdf',
  formspreeFormId: FORMSPREE_FORM_ID,
  formspreeEndpoint: `https://formspree.io/f/${FORMSPREE_FORM_ID}`,
} as const;
