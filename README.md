# Gunal Seenivasagan · portfolio

Personal site for a data and AI engineer: incremental pipelines, retrieval systems and the checks that keep them correct.

**Live:** https://m3rcury02.github.io/FirstTailwind/

## What's here

```
index.html          the whole page
404.html            GitHub Pages not-found page
assets/site.css     styles: design tokens, light and dark themes, layout
assets/site.js      theme toggle, copy-email button, mobile menu close (optional; the page works without it)
assets/favicon.svg
assets/og.png       1200×630 link-preview image
.nojekyll           serve files as-is, skip the Jekyll build
```

No framework, no build step and no tracking. Fonts are Archivo and Martian Mono from Google Fonts.

## Editing

Open `index.html` in a browser, edit, refresh. Push to the default branch and GitHub Pages redeploys.

Every project figure on the page links to the file it came from in that project's repository
(`spark-rag/runs/…`, `jobscan-de` README). When a number changes upstream, change the figure and its link
together.

## Browser features used

All are progressive: older browsers get the same content without the effect.

- Scroll-driven animation (`animation-timeline: scroll()`) for the reading-progress bar
- View Transitions for the theme switch
- The Popover API for the mobile menu, with no JavaScript needed to open it
- `color-mix()`, `text-wrap: balance | pretty`, variable-font width axes
- `prefers-color-scheme` and `prefers-reduced-motion`

## If the repository is renamed

Renaming it to `m3rcury02.github.io` would serve the site at `https://m3rcury02.github.io/`. After a rename,
update the absolute URLs in `index.html` (`canonical`, `og:url`, `og:image`, JSON-LD `url`) and the
`/FirstTailwind/` paths in `404.html`.
