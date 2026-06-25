# Deployment setup guide

This document is a step-by-step deployment guide for getting this site live on `notesbyjoshua.github.io`. It is written for an AI agent to follow interactively with Joshua. Each phase is a checkpoint—complete it, verify it, then move to the next.

---

## Agent instructions

Work through phases 0–6 in order. At the start of each phase, tell Joshua what you are about to do and what he will need. At the end of each phase, run the listed verification before proceeding. If a step requires Joshua to act in a browser or paste something, prompt him explicitly and wait for confirmation before continuing.

Do not skip phases or assume prior steps succeeded without verification output.

### If you are blocked

If you hit anything you cannot resolve—a permission error, a missing credential you cannot generate, an account state you cannot verify, a step that requires human judgment outside your scope—stop and give Joshua the following text block to copy and text to Garret:

---

**Copy this and text it to Garret:**

```
[SETUP BLOCKED]
Step: <which phase and step you are on>
Issue: <one sentence describing what is stuck>
Error or screenshot: <paste error text or describe what the screen shows>
```

---

Tell Joshua: "Text that to Garret word for word. He'll respond with what to do next, and you can paste his reply back here."

Do not attempt to work around a blocker by guessing or skipping. Wait for Joshua to relay Garret's response, then continue from where you stopped.

---

## Phase 0 • Prerequisites

**What you need from Joshua before starting:**

- Confirmation that his GitHub repo is named exactly `notesbyjoshua.github.io` under account `notesbyjoshua`
- Node.js 22 installed (`node -v` should return `v22.x.x`)
- npm installed (`npm -v`)

**Check:**

```bash
node -v
npm -v
git remote -v
```

Expected: `origin` should point to `https://github.com/notesbyjoshua/notesbyjoshua.github.io.git`.

If the repo is not cloned yet:

```bash
git clone https://github.com/notesbyjoshua/notesbyjoshua.github.io.git
cd notesbyjoshua.github.io
```

**Verify phase 0:** repo is cloned and `node -v` returns `v22.x.x`. Confirm with Joshua before proceeding.

---

## Phase 1 • Local build test

Confirm the Astro site builds cleanly before touching any external services.

```bash
npm ci
npm run build
```

**Expected output:** ends with `[build] Complete!` and creates a `dist/` directory.

Check the FRQ manifest was generated:

```bash
ls dist/generated/frq-manifest.json
```

**Verify phase 1:** both commands succeed, `dist/generated/frq-manifest.json` exists. If `npm run build` fails, stop and debug before continuing.

---

## Phase 2 • GitHub Pages source

Joshua needs to change one setting in the GitHub repo UI. Prompt him to do this now.

**Prompt Joshua:**

> Go to your GitHub repo → Settings → Pages → Build and deployment → Source, and change it to **GitHub Actions**. Screenshot or confirm when done.

This is a one-time browser step. Without it, GitHub will try to build the site with Jekyll and the Actions workflow will not be used.

**Verify phase 2:** Joshua confirms the setting is saved. The `github-pages` environment is created automatically on first successful deploy—he does not need to create it manually.

---

## Phase 3 • OpenRouter API key

The FRQ grader uses `openrouter/free`—OpenRouter's free-model routing alias. Joshua needs an account and an API key. The key goes into the Cloudflare Worker as a secret; it never touches GitHub or the Astro build.

**Prompt Joshua:**

> 1. Go to [openrouter.ai](https://openrouter.ai) and create an account.
> 2. Dashboard → Keys → Create API key. Name it `notes-frq-grader-prod`.
> 3. Copy the key immediately—it is only shown once.
> 4. Do not paste it anywhere yet. Just confirm you have it copied.

**Rate limits to know:**

| Account state | Free-model limit | Burst |
|---|---|---|
| No credits purchased | 50 requests/day | 20 RPM |
| $10+ credits purchased | 1,000 requests/day | 20 RPM |

50/day is enough for testing. For real student use, add $10 in credits before sharing the site with a class.

**Verify phase 3:** Joshua confirms he has the OpenRouter API key copied. Keep it available for Phase 4.

---

## Phase 4 • Cloudflare Worker deploy

The grader runs as a Cloudflare Worker proxy. No credit card is required. The free tier allows 100,000 requests/day which is more than enough for a study site.

### 4a. Create a Cloudflare account

**Prompt Joshua:**

> Go to [cloudflare.com](https://cloudflare.com) and create a free account if you do not have one. No credit card required.

### 4b. Edit `worker/wrangler.toml`

The file currently has Garret's fork URLs. Replace the `[vars]` block at the bottom with Joshua's values:

```toml
[vars]
OPENROUTER_SITE_URL = "https://notesbyjoshua.github.io"
OPENROUTER_APP_TITLE = "Notes by Joshua FRQ Grader"
ALLOWED_ORIGINS = "https://notesbyjoshua.github.io,http://localhost:4321,http://localhost:5173"
MANIFEST_URL = "https://notesbyjoshua.github.io/generated/frq-manifest.json"
```

The comment block at the top of `worker/wrangler.toml` already shows exactly these values. Copy from there.

### 4c. Deploy the Worker

```bash
cd worker
npm install
npx wrangler login
```

This opens a browser—Joshua authenticates with his Cloudflare account.

```bash
npx wrangler whoami
npx wrangler deploy
```

On first deploy, Cloudflare may ask Joshua to create a `workers.dev` subdomain. He picks any name. The final Worker URL will look like:

```
https://notes-frq-grader.<HIS_SUBDOMAIN>.workers.dev
```

**Prompt Joshua:** paste that Worker URL here before continuing.

### 4d. Set the OpenRouter secret

```bash
npx wrangler secret put OPENROUTER_API_KEY
```

Paste the OpenRouter key from Phase 3 when prompted. Wrangler deploys a new Worker version immediately after.

### 4e. Commit the wrangler.toml change

```bash
cd ..
git add worker/wrangler.toml
git commit -m "Configure worker vars for notesbyjoshua"
git push origin main
```

**Verify phase 4:** Worker deployed successfully, secret is set, `wrangler.toml` committed and pushed.

CORS preflight test (replace URL with actual Worker URL):

```bash
curl -i -X OPTIONS "https://notes-frq-grader.<HIS_SUBDOMAIN>.workers.dev/grade-frq" \
  -H "Origin: https://notesbyjoshua.github.io" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type"
```

Expected response headers include `access-control-allow-origin: https://notesbyjoshua.github.io`.

---

## Phase 5 • Wire the Worker URL into GitHub Actions

`PUBLIC_FRQ_GRADER_URL` must exist as a **repository variable** (not a secret) before the Astro build runs. The workflow reads `${{ vars.PUBLIC_FRQ_GRADER_URL }}` and Astro statically injects it at build time.

**Option A — GitHub CLI:**

```bash
gh variable set PUBLIC_FRQ_GRADER_URL \
  --repo notesbyjoshua/notesbyjoshua.github.io \
  --body "https://notes-frq-grader.<HIS_SUBDOMAIN>.workers.dev/grade-frq"
```

**Option B — GitHub UI:**

**Prompt Joshua:**

> Repo Settings → Secrets and variables → Actions → Variables → New repository variable
>
> Name: `PUBLIC_FRQ_GRADER_URL`
> Value: `https://notes-frq-grader.<HIS_SUBDOMAIN>.workers.dev/grade-frq`
>
> Note the `/grade-frq` path at the end.

**Verify phase 5:** variable is saved. Confirm with Joshua.

---

## Phase 6 • Full deploy and verification

Trigger a new Pages deploy (the push in Phase 4e may have already triggered one):

```bash
git commit --allow-empty -m "Trigger Pages deploy"
git push origin main
```

Or use the manual trigger: GitHub → Actions → Deploy site → Run workflow.

### Check the workflow run

```
GitHub → Actions → Deploy site → latest run
```

Both `build` and `deploy` jobs should be green.

### Verify the live site

```bash
curl -I https://notesbyjoshua.github.io/
```

Expected: `HTTP/2 200`

Verify the manifest reached production:

```bash
curl -I https://notesbyjoshua.github.io/generated/frq-manifest.json
```

Expected: `HTTP/2 200` with `content-type: application/json`

### Spot-check key pages

- `https://notesbyjoshua.github.io/notes/ap/stats/cheatsheet/`
- `https://notesbyjoshua.github.io/notes/ap/chem/cheatsheet/`
- `https://notesbyjoshua.github.io/about/`

### Test the FRQ grader

Navigate to any page with an FRQ block (any page under `notes/ap/`), type an answer, click Grade. The grader should return feedback within a few seconds.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| GitHub Actions build fails with Jekyll errors | Pages source still set to branch/Jekyll | Phase 2: set source to GitHub Actions |
| Build succeeds but site shows old content | Cached Pages deployment | Wait 2-3 min, hard-refresh |
| FRQ Grade button does nothing | `PUBLIC_FRQ_GRADER_URL` variable not set before build | Phase 5, then re-run deploy |
| FRQ grader returns 401 | Bad or missing `OPENROUTER_API_KEY` worker secret | Re-run `npx wrangler secret put OPENROUTER_API_KEY` from `worker/` |
| FRQ grader returns 429 | Hit 50/day free quota | Add $10 credits to OpenRouter account |
| CORS error in browser console | `ALLOWED_ORIGINS` mismatch in `wrangler.toml` | Confirm value is exactly `https://notesbyjoshua.github.io` (no trailing slash), redeploy worker |
| Worker 503, "manifest unavailable" | `MANIFEST_URL` still points to fork URL | Update `wrangler.toml` (Phase 4b), redeploy worker |
| Images 404 on live site | Note images in `assets/` not copied to `public/` | Check which notes reference missing images; placeholder directives should be used instead |

---

## Post-setup maintenance

**Adding or editing notes:** edit markdown under `Notes/`, push to `main`, Pages deploys automatically.

**Note health check:**

```bash
npm run lint:notes
```

Zero errors required before committing. Warnings (legacy Jekyll liquid tags) are non-blocking.

**Updating the FRQ manifest manually:**

```bash
npm run frq:manifest
git add public/generated/frq-manifest.json
git commit -m "Rebuild FRQ manifest"
git push
```

(The manifest is also rebuilt automatically by `prebuild` on every `npm run build`.)

**Checking OpenRouter quota:**

OpenRouter dashboard → Usage. If the site is getting real student traffic, monitor this and consider pinning a specific model for consistent grading behavior.

**Deploying worker changes:**

```bash
cd worker
npx wrangler deploy
```

**Rotating the OpenRouter API key:**

```bash
cd worker
npx wrangler secret put OPENROUTER_API_KEY
```
