# Simran Malik — portfolio

A one-page portfolio built with [Astro](https://astro.build). Each section snaps into view as you scroll.

## Preview it on your laptop

```bash
cd ~/Documents/"My Brand"/portfolio
npm install        # first time only
npm run dev        # then open http://localhost:4321
```

Edit any file and save: the browser updates right away.

## Where things are

| To change… | Edit |
|---|---|
| Your bio, stats, links, email, work, publications, projects | `src/data.ts` |
| Colors, fonts, spacing, margins | the top of `src/styles/global.css` |
| A work or project detail page | `src/pages/work/*.md`, `src/pages/projects/*.md` |
| Your photo | `src/assets/simran.png` |
| Resume | put your PDF at `public/resume.pdf` |
| Company logos (optional) | add files to `public/logos/`, set `logo` in `src/data.ts` |
| Project images (optional) | add files to `public/projects/`, set `image` in `src/data.ts` |

Blog posts are read from your Hashnode feed (`simranbuilds.hashnode.dev/rss.xml`) every time the site builds. The GitHub workflow rebuilds daily, so new posts appear on their own.

## Publish on GitHub Pages (free)

1. Create a new GitHub repo named **`simran-malik.github.io`** (public).
2. Push this folder:
   ```bash
   git remote add origin https://github.com/simran-malik/simran-malik.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: GitHub Actions**.
4. A few minutes later the site is live at **https://simran-malik.github.io**.

Using a different repo name? Add `base: '/<repo-name>'` in `astro.config.mjs`.
