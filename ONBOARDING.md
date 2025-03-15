## Deployment Setup

1. Enable GitHub Pages:
   - Repository Settings → Pages → Build from 'gh-pages' branch

2. Configure VitePress:
```js
// docs/.vitepress/config.js
export default {
  base: '/nebula-singularity-branding/' // Match repository name
}
```

3. Push changes:
```bash
git add .
git commit -m "docs: publish documentation"
git push origin main
```

Automated deployment will run via GitHub Actions workflow.
