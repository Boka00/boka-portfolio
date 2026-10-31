import type { ProjectItem } from '../types/portfolio';

/**
 * [PERSONALIZE]:
 * - Add `liveUrl: 'https://...'` to any project once deployed — the "Live Demo" button renders automatically.
 * - Drop project screenshots into `/public/projects/` and set `imageUrl: '/projects/your-shot.webp'`
 *   to swap the interactive UI schematic for a lazy-loaded screenshot.
 * - Confirm exact GitHub repository slugs under https://github.com/Boka00
 */
export const PROJECTS: ProjectItem[] = [
  {
    id: '10x-bookmark-manager',
    indexCode: 'FLAGSHIP // 01',
    title: '10X Bookmark Manager',
    subtitle: 'Type-Safe Knowledge & Link Workspace',
    description:
      'A structured personal link hub engineered with React and strict TypeScript. Designed for instant retrieval across large bookmark collections with normalized tag aggregation and schema-validated creation flows.',
    features: [
      'Case-insensitive tag aggregation engine that deduplicates and counts tags dynamically across active and archived items',
      'Instant multi-criteria filtering combining real-time search queries, tag selection, and pinned/archived state views',
      'Schema-validated add/edit bookmark modals powered by Formik & Yup, paired with persistent dark/light theming',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Formik', 'Yup'],
    filterTags: ['React', 'TypeScript'],
    repoUrl: 'https://github.com/Boka00/10X-Bookmark-Manager',
    liveUrl: undefined,
    imageUrl: undefined,
    imageAlt: '10X Bookmark Manager interface showing tag sidebar, search bar, and pinned developer resources',
    featured: true,
    mockupVariant: 'bookmark',
    architectureNote: 'Typed state reducers + normalized tag index + Formik/Yup validation layer',
    caseStudy: {
      problem:
        'Browser bookmarks quickly degrade into flat, duplicate-ridden lists where inconsistent tag casing ("React" vs "react") breaks filtering and slows down developer resource lookup.',
      solution:
        'Architected a strictly typed React workspace that normalizes tags on ingestion, computes live tag frequencies via memoized selectors, and enforces clean URL/metadata entry through Formik & Yup.',
      pipeline: [
        {
          stage: 'INGEST // 01',
          title: 'Formik + Yup Schema Gate',
          detail: 'Validates URL format, required titles, and comma-separated tags before state mutation.',
        },
        {
          stage: 'INDEX // 02',
          title: 'Case-Insensitive Tag Aggregator',
          detail: 'Normalizes tag keys to lowercase while preserving display labels and computing live counts.',
        },
        {
          stage: 'QUERY // 03',
          title: 'Composable Filter Pipeline',
          detail: 'Combines search text, multi-tag intersection, pin priority, and archive status in O(n) pass.',
        },
      ],
      metrics: [
        { label: 'Type Coverage', value: '100% Strict TS' },
        { label: 'Validation', value: 'Formik + Yup' },
        { label: 'Workflow States', value: 'Pin / Archive' },
        { label: 'Theme Engine', value: 'Dark & Light' },
      ],
    },
  },
  {
    id: '10x-crm',
    indexCode: 'FLAGSHIP // 02',
    title: '10X CRM',
    subtitle: 'Interactive Pipeline & Operations Dashboard',
    description:
      'A full-featured customer relationship management workspace integrating the DummyJSON REST API with dual pipeline visualizations, live operational telemetry, and productivity tooling.',
    features: [
      'Full CRUD lead & customer lifecycle management with seamless switching between tabular List and drag-and-drop Kanban boards',
      'Real-time KPI metrics header tracking pipeline value, conversion velocity, and active stage distribution',
      'Built-in client call duration timers, one-click CSV dataset export, and adaptive dark/light theme support',
    ],
    techStack: ['React', 'JavaScript (ES6+)', 'SCSS / CSS', 'DummyJSON API'],
    filterTags: ['React', 'SCSS / CSS', 'REST API'],
    repoUrl: 'https://github.com/Boka00/10x-CRM-Boris-Mkrtichiani',
    liveUrl: undefined,
    imageUrl: undefined,
    imageAlt: '10X CRM dashboard featuring live KPI cards, Kanban drag-and-drop columns, and active call timer',
    featured: true,
    mockupVariant: 'crm',
    architectureNote: 'REST CRUD synchronization + Kanban DnD state + client-side CSV serializer',
    caseStudy: {
      problem:
        'Sales and operations teams need both high-density tabular views for bulk inspection and spatial Kanban boards for stage progression—without losing live KPI accuracy or call context.',
      solution:
        'Built a unified state store synced with DummyJSON REST endpoints that powers both List and drag-and-drop Kanban views simultaneously, recalculating KPI cards instantaneously on every stage transition.',
      pipeline: [
        {
          stage: 'SYNC // 01',
          title: 'DummyJSON REST CRUD Layer',
          detail: 'Handles asynchronous create, read, update, and delete flows with optimistic UI updates.',
        },
        {
          stage: 'VIEW // 02',
          title: 'Dual List & Kanban Engine',
          detail: 'Drag-and-drop column transitions mutate lead stage and immediately recompute pipeline KPIs.',
        },
        {
          stage: 'TOOLS // 03',
          title: 'Call Timer & CSV Serializer',
          detail: 'Tracks per-contact call sessions and serializes filtered records into downloadable RFC-compliant CSVs.',
        },
      ],
      metrics: [
        { label: 'Data Views', value: 'List + Kanban DnD' },
        { label: 'API Layer', value: 'REST Full CRUD' },
        { label: 'Export Format', value: 'Instant CSV' },
        { label: 'Telemetry', value: 'Live KPIs + Timer' },
      ],
    },
  },
  {
    id: 'react-master-quiz',
    indexCode: 'SYS // 03',
    title: 'React Master Quiz',
    subtitle: '150-Question Interactive Assessment Engine',
    description:
      'An interactive learning and self-assessment platform featuring 150 curated React questions, expressive Kahoot-style visual feedback, and customizable study sessions.',
    features: [
      '150 categorized React questions covering hooks, rendering behavior, state architecture, and component patterns',
      'Kahoot-inspired instant visual score feedback, answer streak indicators, and timed response telemetry',
      'Topic-specific filtering and custom practice modes built with zero-collision CSS Modules',
    ],
    techStack: ['React', 'JavaScript (ES6+)', 'CSS Modules'],
    filterTags: ['React', 'SCSS / CSS'],
    repoUrl: 'https://github.com/Boka00/React-Master-Quiz',
    liveUrl: undefined,
    imageUrl: undefined,
    imageAlt: 'React Master Quiz interactive question screen with topic filter and streak counter',
    featured: false,
    mockupVariant: 'quiz',
    architectureNote: 'Deterministic quiz state machine + scoped CSS Modules',
    caseStudy: {
      problem:
        'Static flashcards fail to test real-time recall under pressure or isolate weak React topics like hook dependency pitfalls and reconciliation.',
      solution:
        'Engineered a deterministic quiz state machine over a 150-question bank with topic filters, custom session lengths, streak multipliers, and Kahoot-style visual state transitions.',
      pipeline: [
        {
          stage: 'CONFIG // 01',
          title: 'Topic & Mode Selector',
          detail: 'Filters the 150-question pool by React domain and initializes custom practice parameters.',
        },
        {
          stage: 'ENGINE // 02',
          title: 'Quiz State Machine',
          detail: 'Manages question progression, answer lock-in, streak counters, and immediate visual feedback.',
        },
        {
          stage: 'STYLE // 03',
          title: 'Scoped CSS Modules',
          detail: 'Encapsulates expressive Kahoot-inspired feedback animations with zero global class collisions.',
        },
      ],
      metrics: [
        { label: 'Question Bank', value: '150 Curated Qs' },
        { label: 'Style Scoping', value: 'CSS Modules' },
        { label: 'Feedback Loop', value: 'Kahoot-Style UI' },
        { label: 'Study Modes', value: 'Topic Filtered' },
      ],
    },
  },
  {
    id: 'rest-countries-explorer',
    indexCode: 'SYS // 04',
    title: 'REST Countries Explorer',
    subtitle: 'Global Demographics & Geodata Browser',
    description:
      'A fast, responsive geopolitical directory consuming live REST API data to explore population metrics, currencies, languages, and neighboring country borders.',
    features: [
      'Asynchronous REST API integration with clean loading skeletons, error recovery, and border-tag navigation',
      'Combined instant live search and continent/region dropdown filtering without unnecessary re-renders',
      'High-contrast dark and light color themes engineered for readability across mobile and desktop viewports',
    ],
    techStack: ['React', 'REST API', 'CSS / SCSS'],
    filterTags: ['React', 'SCSS / CSS', 'REST API'],
    repoUrl: 'https://github.com/Boka00/REST-Countries-API',
    liveUrl: undefined,
    imageUrl: undefined,
    imageAlt: 'REST Countries Explorer showing country statistics cards, search input, and region filter',
    featured: false,
    mockupVariant: 'countries',
    architectureNote: 'REST API data normalization + client-side search/region composition',
    caseStudy: {
      problem:
        'Exploring deeply nested geopolitical REST payloads (currencies, native names,cca3 border codes) requires clean normalization and instant filtering across 250+ nations.',
      solution:
        'Built a responsive geodata browser that normalizes country payloads, pairs live text search with region filtering, and resolves neighboring country codes into interactive navigation pills.',
      pipeline: [
        {
          stage: 'FETCH // 01',
          title: 'REST API Client & Error Guard',
          detail: 'Fetches country datasets asynchronously with resilient loading states and error boundaries.',
        },
        {
          stage: 'FILTER // 02',
          title: 'Search + Region Composition',
          detail: 'Filters 250+ countries instantaneously across query input and continent selection.',
        },
        {
          stage: 'DETAIL // 03',
          title: 'Border Code Graph Lookup',
          detail: 'Maps ISO border codes directly to interactive country detail transitions.',
        },
      ],
      metrics: [
        { label: 'Dataset Scale', value: '250+ Countries' },
        { label: 'Navigation', value: 'Border Graph' },
        { label: 'Filtering', value: 'Search + Region' },
        { label: 'Theming', value: 'Dark & Light' },
      ],
    },
  },
  {
    id: '10x-markup-rewind',
    indexCode: 'SYS // 05',
    title: '10x Markup & Rewind',
    subtitle: 'Multi-Page Semantic & SCSS Architecture Showcase',
    description:
      'A precision-crafted multi-page front-end build demonstrating rock-solid HTML5 document semantics, fluid mobile-first responsive grids, and maintainable SCSS architecture.',
    features: [
      'Multi-page responsive layouts tested from 360px mobile viewports up to 1920px widescreen displays',
      'Strict semantic HTML5 landmarks, accessible navigation patterns, and clean heading hierarchy',
      'Structured SCSS architecture leveraging design variables, reusable mixins, and modular component partials',
    ],
    techStack: ['HTML5', 'SCSS', 'JavaScript (ES6+)'],
    filterTags: ['SCSS / CSS'],
    repoUrl: 'https://github.com/Boka00/Rewind',
    liveUrl: undefined,
    imageUrl: undefined,
    imageAlt: '10x Markup and Rewind multi-page responsive layout preview',
    featured: false,
    mockupVariant: 'rewind',
    architectureNote: 'Semantic HTML5 + modular SCSS token & mixin architecture',
    caseStudy: {
      problem:
        'Multi-page marketing and editorial layouts often suffer from div-soup markup, brittle breakpoint overrides, and unmaintainable stylesheets.',
      solution:
        'Engineered a clean, framework-free multi-page architecture rooted in semantic HTML5 landmarks, fluid CSS Grid/Flexbox compositions, and modular SCSS partials with shared design tokens.',
      pipeline: [
        {
          stage: 'MARKUP // 01',
          title: 'Semantic HTML5 Landmarks',
          detail: 'Structured accessible document outlines, keyboard-friendly navs, and responsive media.',
        },
        {
          stage: 'TOKENS // 02',
          title: 'Modular SCSS Architecture',
          detail: 'Organized variables, responsive breakpoint mixins, and isolated component partials.',
        },
        {
          stage: 'FLUID // 03',
          title: '360px → 1920px QA Matrix',
          detail: 'Verified typography scaling, grid reflows, and touch targets across mobile, tablet, and desktop.',
        },
      ],
      metrics: [
        { label: 'Breakpoints', value: '360px – 1920px' },
        { label: 'Architecture', value: 'Modular SCSS' },
        { label: 'Semantics', value: 'Strict HTML5' },
        { label: 'Dependencies', value: 'Zero Bloat' },
      ],
    },
  },
];
