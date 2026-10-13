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

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true npm run deploy --workspace example
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> npm run deploy --workspace example
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
