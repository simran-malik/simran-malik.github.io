// TinaCMS in local-only mode: edits are saved straight to files on this laptop.
// No Tina Cloud account, no tokens, nothing is sent anywhere. The editor only
// runs while `npm run dev` is running, at http://localhost:4321/admin/index.html.
import { defineConfig } from 'tinacms';

const text = (name: string, label: string, extra: object = {}) => ({ type: 'string' as const, name, label, ...extra });
const paragraph = (name: string, label: string) => text(name, label, { ui: { component: 'textarea' } });

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
            type: 'object', name: 'work', label: 'Work', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.org }) },
            fields: [
              text('org', 'Organization'), text('role', 'Role'), text('dates', 'Dates'),
              text('points', 'Bullet points', { list: true }),
              text('href', 'Link to case study (e.g. /work/google)'),
              text('logo', 'Logo file name in /public/logos (no extension)'),
            ],
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
          {
            type: 'object', name: 'projects', label: 'Projects', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.title }) },
            fields: [
              text('title', 'Title'), paragraph('summary', 'Summary'), text('stack', 'Stack'),
              text('cover', 'Cover word (shown when there is no image)'),
              text('image', 'Image path (e.g. /projects/rag.png)'),
              text('href', 'Link to project page'),
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
        ],
      },
    ],
  },
});
