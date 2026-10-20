# docusaurus-plugin-asyncapi

## 2.0.1

### Patch Changes

- 7c6c9ae: Remove the plugin's unused direct AsyncAPI parser dependency and the theme's unused styled-components dependency, avoiding unnecessary dependency trees and allowing the renderer to resolve its own compatible parser version.

## 2.0.0

### Major Changes

- Upgrade the required `@asyncapi/react-component` peer from 2.5.0 to 3.1.7 for React 19 compatibility. Consumers must update their renderer dependency to 3.1.7, matching the AsyncAPI theme.

## 1.0.0

### Major Changes

- Version 1.0.0 of docusaurus-asyncapi

  This upgrade makes the plugin compatible with Docusaurus v3 and
  also upgrades the AsyncAPI React component. The AsyncAPI React component
  upgrade adds support for AsyncAPI version 3.0.0 definitions.

  If you are using Docusaurus v2, you will need to also upgrade
  to Docusaurus v3, which requires upgrading to React 18 or 19.
