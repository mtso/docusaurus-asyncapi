# docusaurus-theme-asyncapi

## 2.0.0

### Major Changes

- Upgrade `@asyncapi/react-component` from 2.6.3 to 3.1.7 for React 19 compatibility and align `@docusaurus/theme-common` with Docusaurus 3.9.0.

  Docusaurus 3.9.0 requires Node.js 20 or newer. The theme now requires React and React DOM 18.2 or newer within the React 18 release line, or React 19. Upgrade both React packages together; the example uses React and React DOM 19.1.1.

## 1.0.2

### Patch Changes

- Bump asyncapi/react-component to 2.6.3

## 1.0.1

### Patch Changes

- Bump @asyncapi/react-component to 2.5.1

## 1.0.0

### Major Changes

- Version 1.0.0 of docusaurus-asyncapi

  This upgrade makes the plugin compatible with Docusaurus v3 and
  also upgrades the AsyncAPI React component. The AsyncAPI React component
  upgrade adds support for AsyncAPI version 3.0.0 definitions.

  If you are using Docusaurus v2, you will need to also upgrade
  to Docusaurus v3, which requires upgrading to React 18 or 19.
