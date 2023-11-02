# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Requirements

- yarn v1.22.19
- node v16

### Installation

```
$ yarn install docusaurus-asyncapi
```

### Usage

```js
// docusaurus.config.js

const config = {
  presets: [
    [
      "docusaurus-asyncapi",
      {
        specs: [
          {
            spec: "path/to/asyncapi.yml",
            route: "/asyncapi",
          }
        ],
        // See defaults for ConfigInterface at:
        // https://github.com/asyncapi/asyncapi-react/blob/42a349ad/library/src/config/default.ts#L7
        config: {
          show: {
            sidebar: true,
          },
        },
      },
    ],
    ...
  ],
  ...
}

module.exports = config;
```

### Local Development

```
$ yarn workspaces run build && yarn start
```

This builds the packages and starts the local docusaurus server.
TODO: Watch and build source files.
