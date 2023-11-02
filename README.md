# docusaurus-asyncapi

[![npm version](https://badge.fury.io/js/docusaurus-asyncapi.svg)](https://badge.fury.io/js/docusaurus-asyncapi)

Async API for Docusaurus V2.

## Installation

```
$ yarn install docusaurus-asyncapi
```

## Usage

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
          },
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

### Development Requirements

- yarn v1.22.19
- node v16

### Local Development

```
$ yarn workspaces run build && yarn start
```

This builds the packages and starts the local docusaurus server.
TODO: Watch and build source files.
