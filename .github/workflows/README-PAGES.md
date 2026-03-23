GitHub Pages deployment is configured via deploy-pages.yml.

Before first deployment:
1. Push this repository to GitHub.
2. In GitHub: Settings -> Pages -> Build and deployment -> Source = GitHub Actions.
3. Push to main branch (or run the workflow manually).

The workflow builds optimized files into dist/ and deploys that folder.
