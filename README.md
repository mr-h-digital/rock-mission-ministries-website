<p align="center">
	<img src="assets/images/rock-mission-logo-transparent.png" alt="Rock Mission Ministries Logo" width="210" />
</p>

<h1 align="center">Rock Mission Ministries Website</h1>

<p align="center">
	<strong>Modern static website for ministry outreach, events, sermons, and community engagement.</strong>
</p>

<p align="center">
	<a href="https://mr-h-digital.github.io/rock-mission-ministries-website/">Live Site</a>
	·
	<a href="https://github.com/mr-h-digital/rock-mission-ministries-website/actions/workflows/deploy-pages.yml">Deployment Workflow</a>
</p>

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

---

## Overview

This repository contains the Rock Mission Ministries public website.

It is built as a static multi-page site with:

- Shared design system and responsive layout
- Production build pipeline for minified assets
- Automated deployment to GitHub Pages

## Highlights

- Mobile-first responsive behavior across homepage and internal pages
- Homepage sections for services, sermons, outreach projects, events, donations, and contact
- Dedicated internal pages: About, Projects, Contact, and Thank You
- Form handling integrated with Web3Forms and success redirect flow
- Automated build and publish workflow using GitHub Actions

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Node.js build tooling

## Project Structure

```text
rock-mission/
|- index.html
|- assets/
|  |- css/
|  |  |- main.css
|  |- js/
|  |  |- main.js
|  |- images/
|- pages/
|  |- about.html
|  |- projects.html
|  |- contact.html
|  |- thank-you.html
|- scripts/
|  |- build.mjs
|- .github/
|  |- workflows/
|  |  |- deploy-pages.yml
|- dist/
|- archive/
|- robots.txt
|- sitemap.xml
|- site.webmanifest
|- package.json
|- package-lock.json
|- README.md
```

## Local Setup

Install dependencies:

```bash
npm install
```

Run optimized production build:

```bash
npm run build
```

Build output is generated in the dist folder.

## Deployment

Deployment is automated by GitHub Actions and publishes dist to the gh-pages branch.

Workflow file:

- .github/workflows/deploy-pages.yml

Deployment flow:

1. Push changes to main
2. Workflow installs dependencies and runs npm run build
3. Generated dist output is published to gh-pages
4. GitHub Pages serves the latest published build

## Notes

- This is a static site with no server runtime required.
- Keep source edits in index, pages, assets, and scripts.
- Do not edit dist manually; it is generated.

## Credits

- Website: Rock Mission Ministries
- Development and branding support: Mr. H Digital

---

<p align="center">
	<strong>Development Signature</strong>
</p>

<p align="center">
	<img src="assets/images/mrh-digital-logo-transparent.png" alt="Mr. H Digital Logo" width="260" />
</p>

<p align="center">
	Designed and developed by <a href="https://mrhdigital.co.za" target="_blank" rel="noopener noreferrer"><strong>Mr. H Digital</strong></a>
</p>