# Rock Mission Ministries Website

<p align="center">
	<a href="https://github.com/mr-h-digital/rock-mission-ministries-website/actions/workflows/deploy-pages.yml">
		<img src="https://img.shields.io/github/actions/workflow/status/mr-h-digital/rock-mission-ministries-website/deploy-pages.yml?branch=main&label=deploy&logo=githubactions&logoColor=white" alt="Deploy Status" />
	</a>
	<a href="https://github.com/mr-h-digital/rock-mission-ministries-website/commits/main">
		<img src="https://img.shields.io/github/last-commit/mr-h-digital/rock-mission-ministries-website?label=last%20commit" alt="Last Commit" />
	</a>
	<a href="https://github.com/mr-h-digital/rock-mission-ministries-website">
		<img src="https://img.shields.io/github/repo-size/mr-h-digital/rock-mission-ministries-website?label=repo%20size" alt="Repo Size" />
	</a>
	<a href="https://github.com/mr-h-digital/rock-mission-ministries-website/blob/main/LICENSE">
		<img src="https://img.shields.io/github/license/mr-h-digital/rock-mission-ministries-website?label=license" alt="License" />
	</a>
</p>

<p align="center">
	<img src="assets/images/mrh-digital-logo-transparent.png" alt="MRH Digital Logo" width="220" />
</p>

<p align="center">
	Structured static website with modern layout architecture, production build optimization, and automated GitHub Pages deployment.
</p>

---

## Project Snapshot

- Architecture: Static multi-page website
- Stack: HTML, CSS, JavaScript
- Hosting: GitHub Pages
- Deployment: GitHub Actions workflow
- Build Output: Minified production assets in `dist/`

## Features

- Clean website directory architecture
- Separated concerns (`index.html`, `assets/css`, `assets/js`, `pages`)
- Multi-page navigation (`about`, `projects`, `contact`)
- Minified production build pipeline
- Auto-deploy to GitHub Pages on push to `main`

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
│     └─ mrh-digital-logo-transparent.png
├─ pages/
│  ├─ about.html
│  ├─ projects.html
│  └─ contact.html
├─ scripts/
│  └─ build.mjs
├─ .github/
│  └─ workflows/
│     └─ deploy-pages.yml
├─ dist/
├─ archive/
│  └─ rockmission-revamp.html
├─ package.json
├─ package-lock.json
├─ .gitignore
└─ README.md
```

## Local Development

Install dependencies:

```bash
npm install
```

Run production build:

```bash
npm run build
```

Build artifacts are generated in `dist/`.

## GitHub Pages Deployment

This project is configured to deploy optimized files automatically via GitHub Actions.

1. Push repository to GitHub.
2. Open repository `Settings`.
3. Go to `Pages`.
4. Under Source, choose `GitHub Actions`.
5. Push to `main` to trigger build and deploy.

Workflow file:

- `.github/workflows/deploy-pages.yml`

## Build and Hosting Notes

- The website remains a static site (no server infrastructure required).
- The build process only optimizes output and does not change your hosting model.
- You can still host directly on GitHub Pages for free.

## Credits

- Website project: Rock Mission Ministries
- Development and branding support: MRH Digital