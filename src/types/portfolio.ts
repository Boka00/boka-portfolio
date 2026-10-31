export type Theme = 'dark' | 'light';

export type SkillCategoryId = 'languages' | 'frameworks' | 'workflow';

export type SkillIconKey =
  | 'typescript'
  | 'javascript'
  | 'html5'
  | 'css3'
  | 'scss'
  | 'react'
  | 'tailwind'
  | 'cssmodules'
  | 'formik'
  | 'yup'
  | 'git'
  | 'github'
  | 'restapi'
  | 'vite'
  | 'security';

export interface SkillItem {
  name: string;
  context: string;
  iconKey: SkillIconKey;
}

export interface SkillGroup {
  id: SkillCategoryId;
  code: string;
  title: string;
  subtitle: string;
  items: SkillItem[];
}

export type ProjectMockupVariant = 'bookmark' | 'crm' | 'quiz' | 'countries' | 'rewind';

export type ProjectFilterTag = 'All' | 'React' | 'TypeScript' | 'SCSS / CSS' | 'REST API';

export interface ArchitectureStep {
  stage: string;
  title: string;
  detail: string;
}

export interface ProjectCaseStudy {
  problem: string;
  solution: string;
  pipeline: ArchitectureStep[];
  metrics: { label: string; value: string }[];
}

export interface ProjectItem {
  id: string;
  indexCode: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techStack: string[];
  filterTags: Exclude<ProjectFilterTag, 'All'>[];
  repoUrl: string;
  /** Optional live URL — button automatically hides when undefined or empty */
  liveUrl?: string;
  /** Optional screenshot path (e.g. "/projects/bookmark-manager.webp") — falls back to interactive schematic */
  imageUrl?: string;
  imageAlt: string;
  /** Flagship projects span wider columns with expanded telemetry details */
  featured: boolean;
  mockupVariant: ProjectMockupVariant;
  architectureNote: string;
  caseStudy: ProjectCaseStudy;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  distinction?: string;
  skills: string[];
}

export interface JourneyItem {
  id: string;
  code: string;
  period: string;
  title: string;
  organization: string;
  category: 'Education' | 'Specialization' | 'Certification';
  description: string;
  highlights: string[];
  tags: string[];
}
