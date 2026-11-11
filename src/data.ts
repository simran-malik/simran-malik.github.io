// ─────────────────────────────────────────────────────────────
//  Site settings and links live in this file.
//  Edit text here; the page updates as soon as you save.
//  Anything in [SQUARE BRACKETS] is a placeholder to fill in.
//
//  Homepage text (summary, stats, work, publications, projects,
//  contact line) now lives in src/site-content/home.md so you can
//  edit it in TinaCMS at http://localhost:4321/admin/index.html.
// ─────────────────────────────────────────────────────────────

import { frontmatter as home } from './site-content/home.md';

export const site = {
  name: 'Simran Malik',
  role: home.role ?? '',
  // The summary under your name is the body of src/site-content/home.md.
  description: 'Simran Malik — applied AI engineer. Agents, retrieval, evaluation, and production backend engineering.',
  email: 'malik.simran4@gmail.com',
  linkedin: 'https://www.linkedin.com/in/simranmalik4/',
  github: 'https://github.com/simran-malik',
  blog: 'https://simranbuilds.hashnode.dev/',
  resume: '/resume.pdf', // drop your PDF into /public/resume.pdf
  // Google Analytics 4 Measurement ID, e.g. 'G-ABC123XYZ'. Leave '' to turn analytics off.
  analyticsId: 'G-7VPY4V0SXC',
  contactLine: home.contactLine ?? '',
};

export const stats: { value: string; label: string }[] = home.stats ?? [];

// Newest first. `href` points to a page in src/pages/work/.
// `logo` is a file name in /public/logos/ without the extension (svg, png, jpg or webp all work).
// If the file isn't there yet, the card shows the company's first letter instead.
export const work: { org: string; role: string; dates: string; points: string[]; href: string; logo: string }[] =
  (home.work ?? []).map((j: any) => ({ ...j, points: j.points ?? [], logo: j.logo ?? '' }));

export const publications: {
  venue: string; status: string; title: string; authors: string;
  paragraphs: string[]; links: { label: string; href: string }[]; pending: string;
}[] = (home.publications ?? []).map((p: any) => ({ ...p, paragraphs: p.paragraphs ?? [], links: p.links ?? [], pending: p.pending ?? '' }));

// `cover` is the short word shown on the card when there's no `image`.
// `image` is optional: put a file in /public/projects/ and write e.g. '/projects/rag.png'.
export const projects: { title: string; summary: string; stack: string; cover: string; image: string; href: string }[] =
  (home.projects ?? []).map((p: any) => ({ ...p, image: p.image ?? '', cover: p.cover ?? '' }));

// The Life section: your interests. `image` (optional) is a path like '/fun/tea.jpg' in /public.
export const funIntro: string = home.funIntro ?? '';
export const funSummary: string = home.funSummary ?? '';
export const fun: { title: string; note: string; image: string; link: string }[] =
  (home.fun ?? []).map((f: any) => ({ title: f.title ?? '', note: f.note ?? '', image: f.image ?? '', link: f.link ?? '' }));

// Used only if the blog feed can't be reached while the site builds.
export const fallbackPosts = [
  {
    title: 'build your v0, my dear',
    subtitle: 'get started with your AI project the imperfect way',
    url: 'https://simranbuilds.hashnode.dev/',
    date: '2026-11-04',
    cover: '',
    readTime: '3 min read',
  },
];
