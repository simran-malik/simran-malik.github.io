// ─────────────────────────────────────────────────────────────
//  Everything personal on the site lives in this one file.
//  Edit text here; the page updates as soon as you save.
//  Anything in [SQUARE BRACKETS] is a placeholder to fill in.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Simran Malik',
  role: 'Applied AI Engineer',
  // <strong> words show in darker ink.
  bio: `I bring production engineering rigor to AI systems — four years at Google building for <strong>12M+ daily orders</strong>, now designing multi-agent AI systems at Brain Corp. <strong>NeurIPS 2026</strong> co-author. Master's in Computer Science at UC San Diego, specializing in artificial intelligence.`,
  description: 'Simran Malik — applied AI engineer. Agents, retrieval, evaluation, and production backend engineering.',
  email: 'malik.simran4@gmail.com',
  linkedin: 'https://www.linkedin.com/in/simranmalik4/',
  github: 'https://github.com/simran-malik',
  blog: 'https://simranbuilds.hashnode.dev/',
  resume: '/resume.pdf', // drop your PDF into /public/resume.pdf
  // Google Analytics 4 Measurement ID, e.g. 'G-ABC123XYZ'. Leave '' to turn analytics off.
  analyticsId: '',
  contactLine: "Building something with AI? I'd love to hear about it.",
};

export const stats = [
  { value: '4+ yrs', label: 'Google · scale' },
  { value: 'NeurIPS', label: '2026 co-author' },
  { value: '2', label: 'Patents pending' },
  { value: 'M.S.', label: 'CS · AI, UC San Diego' },
];

// Newest first. `href` points to a page in src/pages/work/.
// `logo` is a file name in /public/logos/ without the extension (svg, png, jpg or webp all work).
// If the file isn't there yet, the card shows the company's first letter instead.
export const work = [
  {
    org: "UC San Diego · Prof. Nikolai Atanasov's lab",
    role: 'Graduate Researcher',
    dates: 'Fall 2026 – now',
    points: ['Map question-answering for robots: answering plain-language questions grounded in what a robot has mapped.'],
    href: '/work/ucsd-research',
    logo: 'ucsd',
  },
  {
    org: 'Brain Corp · San Diego',
    role: 'Robotics Software Engineering Intern',
    dates: 'Summer 2026',
    points: [
      'Built a knowledge graph and an agent that answer plain-language questions about a robot-built 3D store map — 859 tests, ~47K lines in two weeks.',
      "Shipped a cloud-to-robot pipeline that learns how long jobs really take from run history and shows a confidence range on the robot's screen.",
    ],
    href: '/work/brain-corp',
    logo: 'brain-corp',
  },
  {
    org: 'Google · Google Pay · Bangalore',
    role: 'Software Engineer',
    dates: 'Jul 2021 – Aug 2025',
    points: [
      'Resolved 300K+ stuck orders (99% reduction) and took throttled orders from 46K+ to zero across 12M+ daily orders.',
      'Designed a partner-integration framework for 7M+ daily orders, cutting partner onboarding time by 75%.',
    ],
    href: '/work/google',
    logo: 'google',
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
    // Add { label: 'Conference page', href: 'https://…' } once there's a public page.
    links: [] as { label: string; href: string }[],
    pending: 'Paper · coming soon',
  },
];

// `cover` is the short word shown on the card when there's no `image`.
// `image` is optional: put a file in /public/projects/ and write e.g. '/projects/rag.png'.
export const projects = [
  {
    title: 'RAG chatbot for RapidFire AI docs',
    summary: 'Multi-stage retrieval pipeline under a 2,000-token budget; ranked 3rd of 141 teams with 0.978 correctness.',
    stack: 'LangChain · FAISS · HuggingFace',
    cover: 'RAG',
    image: '',
    href: '/projects/rag-chatbot',
  },
  {
    title: 'Small language model from scratch',
    summary: 'Pretrained a 98M-parameter Transformer on 10B tokens; ranked 5th, and quadrupled GPU utilization to 47%.',
    stack: 'PyTorch · nanoGPT · RTX 5090',
    cover: 'SLM',
    image: '',
    href: '/projects/slm-pretraining',
  },
  {
    title: 'Schema linking with LoRA fine-tuning',
    summary: 'Four-stage pipeline of fine-tuned adapters on Qwen2.5-Coder, raising schema-linking score from 0.097 to 0.627.',
    stack: 'PyTorch · PEFT · Qwen2.5',
    cover: 'SQL',
    image: '',
    href: '/projects/schema-linking',
  },
  {
    title: 'Pupper Potter',
    summary: 'A Harry Potter–themed game on a quadruped robot, coordinated by a distributed ROS2 state machine.',
    stack: 'ROS2 · Python · Piper TTS',
    cover: 'ROS2',
    image: '',
    href: '/projects/pupper-potter',
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
