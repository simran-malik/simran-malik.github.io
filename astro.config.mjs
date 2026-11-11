// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// If your GitHub repo is named "simran-malik.github.io", the site lives at the URL below.
// If you name the repo something else (e.g. "portfolio"), add:  base: '/portfolio'
export default defineConfig({
  site: 'https://simran-malik.github.io',
  integrations: [icon()],
});
