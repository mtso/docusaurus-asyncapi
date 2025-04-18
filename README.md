# docusaurus-asyncapi

[![npm version](https://badge.fury.io/js/docusaurus-asyncapi.svg)](https://badge.fury.io/js/docusaurus-asyncapi)

Async API Documentation for Docusaurus V3.

![docusaurus-asyncapi example screenshot](./example/static/img/docusaurus-asyncapi-example-screenshot-0.png)

## Installation

```
npm install docusaurus-asyncapi
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

## Local Development

### Requirements

- node >=v18

### Building Example

```
npm install --workspaces
npm run build --workspaces
cd example
npm start
```

This builds the packages and starts the local docusaurus server.
