# breenice.github.io

backgroud credit: https://www.newgrounds.com/art/view/yougonna

## Deploying

The site is built and deployed by GitHub Actions on every push to `main`. To use it:

1. In the repo on GitHub go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not "Deploy from a branch").
3. Push to `main`; the workflow builds `breesite/client` and deploys it. Your site will update at https://breenice.github.io after the action finishes (usually 1–2 minutes).