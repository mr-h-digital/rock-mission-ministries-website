# Rock Mission Website Structure

This project has been reorganized into a standard static-site architecture so styles, scripts, and page content are easier to maintain.

## Hosting Model

This is still a static website and can be hosted on GitHub Pages.

- No server runtime is required.
- The new build step is optional for local editing and mandatory only for optimized production output.

## Directory Layout

```text
rock-mission/
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ main.css
│  ├─ js/
│  │  └─ main.js
│  └─ images/
├─ pages/
│  ├─ about.html
│  ├─ projects.html
│  └─ contact.html
├─ scripts/
│  └─ build.mjs
├─ .github/
│  └─ workflows/
│     └─ deploy-pages.yml
├─ package.json
├─ .gitignore
├─ archive/
│  └─ rockmission-revamp.html
└─ README.md
```

## What Changed

- Main entry page is now `index.html`.
- All inline styles were moved to `assets/css/main.css`.
- All inline scripts were moved to `assets/js/main.js`.
- Multi-page structure was added in `pages/` for about, projects, and contact content.
- Automated GitHub Actions deployment was added in `.github/workflows/deploy-pages.yml`.
- Build tooling was added through `package.json` and `scripts/build.mjs`.
- The original single-file version was preserved in `archive/rockmission-revamp.html`.

## Local Development

Install dependencies:

```bash
npm install
```

Create optimized production files in `dist/`:

```bash
npm run build
```

## GitHub Pages Auto-Deploy

This repository includes workflow-based deployment of optimized files from `dist/`.

1. Push this repository to GitHub.
2. Open repository settings in GitHub.
3. Go to Pages.
4. Set source to `GitHub Actions`.
5. Push to `main` branch.

The workflow will install dependencies, run `npm run build`, and publish `dist/` automatically.

## Recommended Next Steps

- Put future photos, logos, and graphics in `assets/images/`.
- If JavaScript grows, split `main.js` into modules by feature.