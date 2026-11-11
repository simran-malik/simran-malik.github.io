// ─────────────────────────────────────────────────────────────
//  Everything personal on the site lives in this one file.
//  Edit text here; the page updates as soon as you save.
//  Anything in [SQUARE BRACKETS] is a placeholder to fill in.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Simran Malik',
  role: 'Applied AI Engineer',
  // <strong> words show in darker ink, like the screenshot.
  bio: `I bring production engineering rigor to AI systems — four years at Google building for <strong>12M+ daily orders</strong>, now designing multi-agent AI systems at Brain Corp. <strong>NeurIPS 2026</strong> co-author. Master's in Computer Science at UC San Diego, specializing in artificial intelligence.`,
  description: 'Simran Malik — applied AI engineer. Multi-agent systems, evaluation, and production backend engineering.',
  email: '[YOUR EMAIL]',
  linkedin: 'https://www.linkedin.com/in/simranmalik4/',
  github: 'https://github.com/simran-malik',
  blog: 'https://simranbuilds.hashnode.dev/',
  resume: '/resume.pdf', // drop your PDF into /public/resume.pdf
  contactLine: "Building something with AI? I'd love to hear about it.",
};

export const stats = [
  { value: '4+ yrs', label: 'Google · scale' },
  { value: 'NeurIPS', label: '2026 co-author' },
  { value: '2', label: 'Patents pending' },
  { value: 'M.S.', label: 'CS · AI, UC San Diego' },
];

// Newest first. `href` points to a page in src/pages/work/.
// `logo` is optional: put a file in /public/logos/ and write e.g. '/logos/google.svg'.
export const work = [
  {
    org: "UC San Diego · Prof. Nikolai Atanasov's lab",
    role: 'Graduate Researcher',
    dates: 'Fall 2026 – now',
    points: ['Map question-answering for robots. [One line on your approach.]'],
    href: '/work/ucsd-research',
    logo: '',
  },
  {
    org: 'Brain Corp · San Diego',
    role: 'Software Engineering Intern',
    dates: 'Summer 2026',
    points: [
      'Designed multi-agent AI systems: a store-map Q&A knowledge graph with an agent on top.',
      'Built a robot job-time (ETA) estimation pipeline. [Result with a number]',
    ],
    href: '/work/brain-corp',
    logo: '',
  },
  {
    org: 'Google',
    role: '[Software Engineer, Backend]',
    dates: '[YEAR] – [YEAR] · 4+ yrs',
    points: [
      'Built backend systems serving 12M+ daily orders. [Which system]',
      '[Second major point] · 2 patents pending.',
    ],
    href: '/work/google',
    logo: '',
  },
];

export const publications = [
  {
    venue: 'NeurIPS 2026 · Evaluations & Datasets Track',
    status: 'Accepted',
    title: 'SourceBench: Can AI Answers Reference Quality Web Sources?',
    authors: 'H. Jin*, S. Liu*, Y. Li*, S. Malik, Y. Zhang (*equal contribution)',
    paragraphs: [
      'Evaluated web sources cited by 12 AI systems on 8 quality metrics across 100 diverse questions. Proposed the research direction and the human-labeled ground truth, and built the evaluation pipeline behind the main results.',
      "Led the Google vs. AI-search study: top AI systems cite sources largely absent from Google's top results (16% overlap for GPT-5 vs. 55% for Tavily). Also caught a prompt-bias bug that would have skewed every system's results.",
    ],
    links: [{ label: 'Conference page', href: '[CONFERENCE PAGE URL]' }],
    pending: 'Paper · coming soon',
  },
];

// `image` is optional: put a file in /public/projects/ and write e.g. '/projects/agent.png'.
// `href` points to a page in src/pages/projects/.
export const projects = [
  {
    title: '[Personal project 1]',
    summary: '[One sentence on what it does.]',
    stack: '[Python · LangGraph]',
    image: '',
    href: '/projects/project-1',
  },
  {
    title: '[Personal project 2]',
    summary: '[One sentence on what it does.]',
    stack: '[Stack]',
    image: '',
    href: '/projects/project-1',
  },
];

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
