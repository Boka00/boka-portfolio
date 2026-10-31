import type { JourneyItem } from '../types/portfolio';

/**
 * [PERSONALIZE]:
 * Add your specific work roles, freelance engagements, university degree, or bootcamp dates below.
 * If you set `JOURNEY_ITEMS = []`, the Journey section and its navbar link hide automatically!
 */
export const JOURNEY_ITEMS: JourneyItem[] = [
  {
    id: 'typescript-react-architecture',
    code: 'PHASE // 03',
    period: 'Recent Focus',
    title: 'Type-Safe React & Production UI Engineering',
    organization: 'Independent Product Builds · Georgia',
    category: 'Specialization',
    description:
      'Focused on architecting modular React + TypeScript applications with schema-validated forms, predictable state flows, and accessible dual-theme design systems.',
    highlights: [
      'Engineered 10X Bookmark Manager using strict TypeScript interfaces, Tailwind CSS theming, and Formik + Yup validation.',
      'Standardized reusable UI primitives with keyboard accessibility, WCAG AA contrast, and motion-safe interactions.',
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Formik', 'Yup'],
  },
  {
    id: 'interactive-web-apps',
    code: 'PHASE // 02',
    period: 'Intensive Project Track',
    title: 'Full-Featured Front-End Application Development',
    organization: '10X Front-End Engineering Projects',
    category: 'Project Engineering',
    description:
      'Built data-driven single-page applications integrating external REST APIs, complex client-side filtering, Kanban drag-and-drop workflows, and real-time analytics.',
    highlights: [
      'Shipped 10X CRM with full CRUD operations, Kanban/List view switching, live KPI metrics, call timers, and CSV export.',
      'Created React Master Quiz (150 interactive questions with CSS Modules) and REST Countries Explorer with live geodata filtering.',
    ],
    tags: ['React', 'JavaScript (ES6+)', 'REST APIs', 'CSS Modules', 'SCSS'],
  },
  {
    id: 'web-foundations',
    code: 'PHASE // 01',
    period: 'Core Foundations',
    title: 'Semantic Markup, Responsive Layout & SCSS Systems',
    organization: 'Front-End Engineering Foundations',
    category: 'Foundations',
    description:
      'Established deep fluency in semantic HTML5, modern CSS Grid/Flexbox layouts, modular SCSS architecture, and Git/GitHub collaborative workflows.',
    highlights: [
      'Delivered multi-page responsive builds including 10x Markup & Rewind with clean mobile-first breakpoints (360px–1920px).',
      'Adopted disciplined Git branching and structured SCSS token/mixin patterns before scaling into React ecosystems.',
    ],
    tags: ['HTML5', 'CSS3', 'SCSS', 'JavaScript', 'Git & GitHub'],
  },
];

