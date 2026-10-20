# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

Run these commands from the repository root with Node.js 20 or newer. The example is an npm workspace and uses the root `package-lock.json`.

```
$ npm ci
$ npm run build --workspaces
```

### Local Development

```
$ npm run start --workspace example
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build --workspace example
```

This command generates static content into `example/build`. Build the packages first with `npm run build --workspaces` from the repository root when starting from a fresh checkout.

Preview the production build at `http://localhost:3000/docusaurus-asyncapi/`:

```
$ npm run serve --workspace example
```

### Deployment

The example is hosted at [https://mtso.github.io/docusaurus-asyncapi/](https://mtso.github.io/docusaurus-asyncapi/).

The [Pages workflow](../.github/workflows/pages.yml) installs dependencies from the root lockfile and builds all workspaces in order, including the example. Pull requests to `main` validate the build; pushes to `main` also deploy `example/build` to GitHub Pages. The workflow can also be run manually on `main` from the Actions tab.

The repository's **Settings → Pages → Build and deployment → Source** must be set to **GitHub Actions**. Deployment uses the workflow's `GITHUB_TOKEN`; no personal access token or deploy key is needed.
