---
"docusaurus-plugin-asyncapi": patch
"docusaurus-theme-asyncapi": patch
---

Remove the plugin's unused direct AsyncAPI parser dependency and the theme's unused styled-components dependency, avoiding unnecessary dependency trees and allowing the renderer to resolve its own compatible parser version.
