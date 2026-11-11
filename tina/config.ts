// TinaCMS in local-only mode: edits are saved straight to files on this laptop.
// No Tina Cloud account, no tokens, nothing is sent anywhere. The editor only
// runs while `npm run dev` is running, at http://localhost:4321/admin/index.html.
import { defineConfig } from 'tinacms';

const text = (name: string, label: string, extra: object = {}) => ({ type: 'string' as const, name, label, ...extra });
const paragraph = (name: string, label: string) => text(name, label, { ui: { component: 'textarea' } });


// Shared fields for the case-study pages in src/pages/work and src/pages/projects.
// `card` = the fields that also show on the homepage card.
const caseStudy = (name: string, label: string, dir: string, back: string, backLabel: string, card: any[], titleLabel = 'Title') => ({
  name, label, path: `src/pages/${dir}`, format: 'md' as const,
  match: { exclude: '_*' },
  defaultItem: () => ({ layout: '../../layouts/CaseStudy.astro', back, backLabel, construction: true, order: 99 }),
  ui: { filename: { slugify: (v: any) => (v?.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') } },
  fields: [
    text('layout', 'Layout (leave as is)', { ui: { component: 'hidden' } }),
    text('title', titleLabel, { isTitle: true, required: true }),
    paragraph('summary', name === 'projects' ? 'Summary (page and homepage card)' : 'One-line summary (page only)'),
    ...card,
    { type: 'number' as const, name: 'order', label: 'Position on the homepage (1 = first)' },
    {
      type: 'object' as const, name: 'facts', label: 'More facts for the page (e.g. Where, Course, Result)', list: true,
      ui: { itemProps: (i: any) => ({ label: `${i?.label ?? ''}: ${i?.value ?? ''}` }) },
      fields: [text('label', 'Label'), text('value', 'Value')],
    },
    { type: 'boolean' as const, name: 'construction', label: 'Show "under construction" note' },
    text('repo', 'GitHub repo link (shown in that note)'),
    text('back', 'Back link (leave as is)', { ui: { component: 'hidden' } }),
    text('backLabel', 'Back link text'),
    { type: 'rich-text' as const, name: 'body', label: 'Page content', isBody: true },
  ],
});

const workCard = [
  text('org', 'Company / lab (homepage card)'),
  text('dates', 'Dates (card and page)'),
  text('points', 'Card bullet points (the first one shows)', { list: true }),
  text('logo', 'Logo file name in /public/logos (no extension)'),
];
const projectCard = [
  text('stack', 'Stack (card and page)'),
  text('cover', 'Cover word (card, shown when there is no image)'),
  { type: 'image' as const, name: 'image', label: 'Image (card thumbnail and page header)' },
];

export default defineConfig({
  branch: '',
  clientId: null,
  token: null,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: '', publicFolder: 'public' } },
  schema: {
    collections: [
      {
        name: 'home',
        label: 'Homepage',
        path: 'src/site-content',
        format: 'md',
        match: { include: 'home' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          text('role', 'Role (small line above your name)'),
          {
            type: 'rich-text',
            name: 'body',
            label: 'Summary (select words and press B to bold them)',
            isBody: true,
            toolbarOverride: ['bold', 'italic', 'link'],
          },
          {
            type: 'object', name: 'stats', label: 'Stats row', list: true,
            ui: { itemProps: (i: any) => ({ label: `${i?.value ?? ''} · ${i?.label ?? ''}` }) },
            fields: [text('value', 'Big number'), text('label', 'Label')],
          },
          {
            type: 'object', name: 'publications', label: 'Publications', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.title }) },
            fields: [
              text('venue', 'Venue'), text('status', 'Status'), text('title', 'Title'), text('authors', 'Authors'),
              text('paragraphs', 'Paragraphs', { list: true }),
              {
                type: 'object', name: 'links', label: 'Links', list: true,
                fields: [text('label', 'Label'), text('href', 'URL')],
              },
              text('pending', 'Note when there is no public link yet'),
            ],
          },
          text('funIntro', 'Life section: short line beside the heading'),
          paragraph('funSummary', 'Life section: summary (1–2 sentences, shown above the cards)'),
          {
            type: 'object', name: 'fun', label: 'Life (interests)', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.title }) },
            fields: [
              text('title', 'Interest'),
              paragraph('note', 'A line about it'),
              { type: 'image', name: 'image', label: 'Photo (optional)' },
              text('link', 'Link (optional, e.g. a Goodreads list)'),
            ],
          },
          {
            type: 'object', name: 'blogCovers', label: 'Blog card covers (optional overrides)', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.post || 'New cover' }) },
            fields: [
              text('post', 'Post URL (copy it from Hashnode)'),
              { type: 'image', name: 'image', label: 'Cover image to show on this site' },
            ],
          },
          paragraph('contactLine', 'Contact line'),
          paragraph('contactNote', 'Contact: line under the contact line (e.g. reply time)'),
        ],
      },
      caseStudy('work', 'Work', 'work', '/#work', 'All work', workCard, 'Role (page heading and homepage card)'),
      caseStudy('projects', 'Projects', 'projects', '/#projects', 'All projects', projectCard, 'Title (page heading and homepage card)'),
    ],
  },
});
