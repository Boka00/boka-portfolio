import type { SkillGroup } from '../types/portfolio';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    code: 'MOD // 01',
    title: 'Languages & Core',
    subtitle: 'Type-safe application logic, semantic HTML5 markup, and scalable CSS/SCSS architecture.',
    items: [
      {
        name: 'TypeScript',
        context: 'Strict interfaces, generics & discriminated unions',
        iconKey: 'typescript',
      },
      {
        name: 'JavaScript (ES6+)',
        context: 'Async/await workflows, state normalization & closures',
        iconKey: 'javascript',
      },
      {
        name: 'HTML5',
        context: 'Semantic landmarks & WCAG AA accessibility (a11y)',
        iconKey: 'html5',
      },
      {
        name: 'CSS3',
        context: 'Grid, Flexbox, custom properties & fluid responsive UI',
        iconKey: 'css3',
      },
      {
        name: 'SASS / SCSS',
        context: 'Modular partials, mixins, BEM & Bootstrap systems',
        iconKey: 'scss',
      },
    ],
  },
  {
    id: 'frameworks',
    code: 'MOD // 02',
    title: 'Frameworks & UI Systems',
    subtitle: 'Composable React interfaces, schema-driven forms, and dark/light design tokens.',
    items: [
      {
        name: 'React.js',
        context: 'Hooks, custom hooks, Context API & feature architecture',
        iconKey: 'react',
      },
      {
        name: 'Tailwind CSS',
        context: 'Tokenized theming, persistent dark/light modes & B2B UI',
        iconKey: 'tailwind',
      },
      {
        name: 'CSS Modules',
        context: 'Zero-collision component-scoped style encapsulation',
        iconKey: 'cssmodules',
      },
      {
        name: 'Formik',
        context: 'Controlled form lifecycles, touched state & async submit',
        iconKey: 'formik',
      },
      {
        name: 'Yup',
        context: 'Declarative schema validation & accessible error states',
        iconKey: 'yup',
      },
    ],
  },
  {
    id: 'workflow',
    code: 'MOD // 03',
    title: 'Workflow, APIs & Security',
    subtitle: 'Modern Vite tooling, RESTful CRUD integration, and OWASP-informed web security.',
    items: [
      {
        name: 'RESTful APIs',
        context: 'Full CRUD sync, async filtering, CSV export & error guards',
        iconKey: 'restapi',
      },
      {
        name: 'Git & GitHub',
        context: 'Branching workflows, CI/CodeQL gates & Agile/Scrum collaboration',
        iconKey: 'github',
      },
      {
        name: 'Vite & NPM',
        context: 'Fast ESM bundling, chunk splitting & deterministic lockfiles',
        iconKey: 'vite',
      },
      {
        name: 'Web Security (OWASP)',
        context: 'XSS/injection defense, strict CSP/HSTS headers & SSL/TLS',
        iconKey: 'security',
      },
      {
        name: 'Git CLI',
        context: 'Clean atomic commits, rebasing & version hygiene',
        iconKey: 'git',
      },
    ],
  },
];
