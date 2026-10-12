# docusaurus-asyncapi

## 2.0.0

### Major Changes

- Upgrade the bundled AsyncAPI plugin and theme to 2.0.0 for the updated Docusaurus and React stack.

  The example now uses `@docusaurus/core` and `@docusaurus/preset-classic` 3.10.2 with React and React DOM 19.1.1. For this stack, upgrade to Node.js 20 or newer. The renderer dependency is now `@asyncapi/react-component` 3.1.7, and the theme supports React 18.2 or newer within the React 18 release line, or React 19.

### Patch Changes

- Updated dependencies
  - docusaurus-plugin-asyncapi@2.0.0
  - docusaurus-theme-asyncapi@2.0.0

## 1.0.2

### Patch Changes

- Updated dependencies
  - docusaurus-theme-asyncapi@1.0.2

## 1.0.1

### Patch Changes

- Bump @asyncapi/react-component to 2.5.1
- Updated dependencies
  - docusaurus-theme-asyncapi@1.0.1

## 1.0.0

### Major Changes

- Version 1.0.0 of docusaurus-asyncapi

  This upgrade makes the plugin compatible with Docusaurus v3 and
  also upgrades the AsyncAPI React component. The AsyncAPI React component
  upgrade adds support for AsyncAPI version 3.0.0 definitions.

  If you are using Docusaurus v2, you will need to also upgrade
  to Docusaurus v3, which requires upgrading to React 18 or 19.

- Updated dependencies
  - docusaurus-plugin-asyncapi@1.0.0
  - docusaurus-theme-asyncapi@1.0.0
