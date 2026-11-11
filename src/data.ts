// ─────────────────────────────────────────────────────────────
//  Site settings and links live in this file.
//  Edit text here; the page updates as soon as you save.
//  Anything in [SQUARE BRACKETS] is a placeholder to fill in.
//
//  Homepage text (summary, stats, publications, Life, contact line)
//  lives in src/site-content/home.md; work and project cards come
//  from their own pages. All of it is editable in TinaCMS so you can
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

// Work and project cards are read from their own pages (src/pages/work, src/pages/projects) in src/pages/index.astro.

export const publications: {
  venue: string; status: string; title: string; authors: string;
  paragraphs: string[]; links: { label: string; href: string }[]; pending: string;
}[] = (home.publications ?? []).map((p: any) => ({ ...p, paragraphs: p.paragraphs ?? [], links: p.links ?? [], pending: p.pending ?? '' }));

// The Life section: your interests. `image` (optional) is a path like '/fun/tea.jpg' in /public.
export const funIntro: string = home.funIntro ?? '';
export const funSummary: string = home.funSummary ?? '';
export const fun: { title: string; note: string; image: string; link: string }[] =
  (home.fun ?? []).map((f: any) => ({ title: f.title ?? '', note: f.note ?? '', image: f.image ?? '', link: f.link ?? '' }));

// Optional: replace a blog post's cover on this site only. `post` is the post's Hashnode URL.
export const blogCovers: { post: string; image: string }[] =
  (home.blogCovers ?? []).filter((c: any) => c?.post && c?.image);

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
