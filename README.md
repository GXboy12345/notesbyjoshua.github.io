# Notes by Joshua

Study site for AP, math, and physics notes. Static site built with Astro and deployed to GitHub Pages.

## Local preview

```bash
npm ci
npm run dev
```

Open the URL printed in the terminal (default port 4321).

## Production build

```bash
npm run build
npm run preview
```

Output is in `dist/`.

## Deploy

Push to `main` (or `frontend` on the fork). GitHub Actions workflow `.github/workflows/deploy.yml` builds and publishes to Pages. In the repo **Settings → Pages**, set source to **GitHub Actions**.

## Content

Markdown lives under `Notes/`, `blog/`, `Practice Problems/`, `Resources/`, and `feedback/`. Each file can set `permalink:` in frontmatter for the canonical URL path.

Legacy Jekyll files (`_config.yml`, `_includes/`) remain for reference but are not part of the Astro build.
