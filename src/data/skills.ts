import type { SkillGroup } from '../types/portfolio';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    code: 'MOD // 01',
    title: 'Core Languages',
    subtitle: 'Type-safe application logic, semantic document structure, and scalable styling layers.',
    items: [
      {
        name: 'TypeScript',
        context: 'Strict interfaces, generics & discriminated unions',
        iconKey: 'typescript',
      },
      {
        name: 'JavaScript (ES6+)',
        context: 'Async workflows, closures & modular state logic',
        iconKey: 'javascript',
      },
      {
        name: 'HTML5',
        context: 'Semantic landmarks & WCAG AA accessibility',
        iconKey: 'html5',
      },
      {
        name: 'CSS3',
        context: 'Grid, Flexbox, custom properties & fluid layouts',
        iconKey: 'css3',
      },
      {
        name: 'SCSS',
        context: 'Modular partials, mixins, tokens & BEM architecture',
        iconKey: 'scss',
      },
    ],
  },
  {
    id: 'frameworks',
    code: 'MOD // 02',
    title: 'Frameworks & Styling',
    subtitle: 'Composable React UI systems, schema-driven forms, and utility or scoped styling.',
    items: [
      {
        name: 'React',
        context: 'Custom hooks, context architecture & state composition',
        iconKey: 'react',
      },
      {
        name: 'Tailwind CSS',
        context: 'Design-token theming, dark/light systems & responsive UI',
        iconKey: 'tailwind',
      },
      {
        name: 'CSS Modules',
        context: 'Zero-collision component-scoped styles',
        iconKey: 'cssmodules',
      },
      {
        name: 'Formik',
        context: 'Controlled form state, touched tracking & async submission',
        iconKey: 'formik',
      },
      {
        name: 'Yup',
        context: 'Declarative schema validation & custom error feedback',
        iconKey: 'yup',
      },
    ],
  },
  {
    id: 'workflow',
    code: 'MOD // 03',
    title: 'Workflow & Integration',
    subtitle: 'Version-controlled engineering workflows and resilient REST API integration.',
    items: [
      {
        name: 'Git',
        context: 'Clean commit history, feature branching & conflict resolution',
        iconKey: 'git',
      },
      {
        name: 'GitHub',
        context: 'Repository management, code reviews & deployment pipelines',
        iconKey: 'github',
      },
      {
        name: 'REST APIs',
        context: 'Async fetching, error/loading states, filtering & CRUD sync',
        iconKey: 'restapi',
      },
    ],
  },
];

