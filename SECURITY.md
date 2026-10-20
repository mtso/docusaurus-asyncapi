# Security policy

This policy covers `docusaurus-asyncapi`, `docusaurus-plugin-asyncapi`, and
`docusaurus-theme-asyncapi`, including their integration with Docusaurus and the
AsyncAPI renderer.

## Supported versions

Security fixes target the latest published release in the 2.x line. Upgrade to
the latest release before checking whether an issue is still reproducible.

| Version | Security updates |
| --- | --- |
| Latest 2.x release (currently 2.0.1) | Best effort |
| Earlier 2.x releases | Upgrade to the latest 2.x release |
| 1.x and older | Unsupported |

Use maintained Node.js and Docusaurus releases compatible with your application.
The audit snapshot below records the versions tested during the dependency
cleanup; it does not extend upstream support for those versions or guarantee an
audit with no findings.

## Reporting a vulnerability

Email the maintainer at [~@mtso.io](mailto:~@mtso.io) with the subject
`[SECURITY] docusaurus-asyncapi`. Use this private channel for suspected new
vulnerabilities instead of opening a public issue or pull request containing
exploit details. GitHub private vulnerability reporting is not currently enabled
for this repository.

Include the affected package and version, Node.js and Docusaurus versions, a
minimal reproduction, expected impact, and any relevant advisory IDs or
dependency paths. Redact credentials and sensitive AsyncAPI documents. For a
dependency finding, include the relevant `npm audit --json` and `npm ls` output.

Please coordinate public disclosure with the maintainer while the report is
investigated and a fix or mitigation is prepared. Reports and fixes are handled
on a best-effort basis; there is no guaranteed response or resolution timeline.
Public issues are appropriate for already disclosed dependency advisories when
they contain no new exploit details or private information. Check the known
findings below before reporting a duplicate.

## Security scope and application responsibilities

The plugin reads and bundles AsyncAPI documents and their references in the
Node.js build process. The theme renders the resulting document in the browser.
Build configuration and glob patterns should come from trusted maintainers.
Review documents and their references before building, and run builds with only
the filesystem, network, and credential access they need. Treat generated
documentation as public: the bundled specification is included in site assets,
so remove secrets and private API information before publishing.

The consuming application controls its Node.js runtime, Docusaurus version,
lockfile, and dependency overrides. Keep these dependencies updated and verify
both the application's audit and production build. Repository overrides do not
propagate to installed packages; see the host-toolchain guidance below.

## Known dependency findings

The following record preserves the dependency audit and deferral decisions from
the security cleanup. A deferred finding remains a vulnerability; reassess it
when upstream patches become available or your application's exposure changes.

### Audit snapshot

Reviewed on 2026-10-12 with Node 24.6.0 and npm 11.5.1; dependency-tree checks also used npm 11.21.0 as described below. The scope is the root npm workspace lockfile, plus a separate install of the packed public packages into a Docusaurus 3.10.2 consumer. The workspace counts were rechecked on 2026-10-19 with the same result. The packed-consumer results remain the original pre-release snapshot.

### Result and reproduction

| Workspace audit | Critical | High | Moderate | Low | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Before remediation | 17 | 39 | 24 | 3 | 83 |
| After remediation | 0 | 39 | 19 | 0 | 58 |

Run these commands from the repository root:

```sh
npm ci
npm audit
npm audit --json
npm audit fix --dry-run
npm ls --all
```

The audit still exits nonzero. Every remaining high entry is either `braces` itself or a parent that inherits its advisory; the 39 entries represent one unresolved high-severity advisory. A final non-forced audit-fix dry run proposed zero additions, removals, or updates. Counts are a snapshot of the registry advisories on the review date and may change.

Compatible audit-fix updates were applied to the root lockfile, including Babel, XML and URI parsers, form-data, YAML parsers, glob matching dependencies, Joi, Lodash/Spectral, SVGO, tmp, and ws. The unused `styled-components` theme dependency and unused direct `@asyncapi/parser` plugin dependency were removed. The renderer retains its own parser dependency. These manifest changes were subsequently released in version 2.0.1 of all three public packages; the patch Changeset has been consumed.

### High: braces stack exhaustion — deferred until upstream patches it

- Advisory: [GHSA-vfj7-8cjw-p6xm / CVE-2026-93687](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
- Installed version: `braces@3.0.3`; the advisory covers every published version through 3.0.3 and lists no patched version. `npm view braces version` returned 3.0.3.
- Impact: a sufficiently deeply nested, attacker-controlled brace pattern can exhaust the process stack. This concerns Node build, watch, glob, and development-server tooling; our renderer does not import `braces` into its browser component.
- Relevant paths include `docusaurus-theme-asyncapi → @docusaurus/theme-common → @docusaurus/utils → globby → fast-glob → micromatch → braces`, the host's `@docusaurus/core → chokidar → braces`, and release tooling `@changesets/cli → @manypkg/get-packages → globby → fast-glob → micromatch → braces`.
- Reason for deferral: there is no released compatible patch to select. Replacing this shared glob implementation with an unrelated package or maintaining a local fork would change Docusaurus/Changesets internals and would not automatically protect downstream consumers. Repository patterns and plugin spec paths come from maintainer-controlled configuration. Treat untrusted build configuration or glob patterns as capable of crashing the Node build; this is a deferral, not a claim that the advisory is false or universally unreachable.
- The suggested `npm audit fix --force` downgrade of Docusaurus to 3.7.0 is not an upstream patch for `braces`. The suggested Changesets 3 upgrade requires Node `^22.11 || ^24 || >=26`, beyond this project's Node 20 support, and would leave the Docusaurus path. [Changesets 3 release notes](https://github.com/changesets/changesets/releases/tag/@changesets%2Fcli@3.0.0).
- Revisit when `braces` publishes a security fix, or Docusaurus/Changesets replace it with a compatible maintained implementation. Keep build inputs and development-server configuration under maintainer control in the meantime.

#### Every remaining high workspace audit entry

The last column is one dependency path in the npm audit report to the same `braces` advisory. The upstream package names below are recorded so inherited findings are accounted for explicitly.

| Package | Installed version(s) | Path to the unresolved advisory |
| --- | --- | --- |
| `@changesets/apply-release-plan` | 7.1.1 | `@changesets/apply-release-plan` → `@changesets/config` → `micromatch` → `braces` |
| `@changesets/assemble-release-plan` | 6.0.10 | `@changesets/assemble-release-plan` → `@manypkg/get-packages` → `globby` → `fast-glob` → `micromatch` → `braces` |
| `@changesets/cli` | 2.31.1 | `@changesets/cli` → `@changesets/config` → `micromatch` → `braces` |
| `@changesets/config` | 3.1.4 | `@changesets/config` → `micromatch` → `braces` |
| `@changesets/get-dependents-graph` | 2.1.4 | `@changesets/get-dependents-graph` → `@manypkg/get-packages` → `globby` → `fast-glob` → `micromatch` → `braces` |
| `@changesets/get-release-plan` | 4.0.16 | `@changesets/get-release-plan` → `@changesets/config` → `micromatch` → `braces` |
| `@changesets/git` | 3.0.4 | `@changesets/git` → `micromatch` → `braces` |
| `@changesets/pre` | 2.0.2 | `@changesets/pre` → `@manypkg/get-packages` → `globby` → `fast-glob` → `micromatch` → `braces` |
| `@changesets/read` | 0.6.7 | `@changesets/read` → `@changesets/git` → `micromatch` → `braces` |
| `@changesets/should-skip-package` | 0.1.2 | `@changesets/should-skip-package` → `@manypkg/get-packages` → `globby` → `fast-glob` → `micromatch` → `braces` |
| `@docusaurus/babel` | 3.10.2 | `@docusaurus/babel` → `@docusaurus/utils` → `micromatch` → `braces` |
| `@docusaurus/bundler` | 3.10.2 | `@docusaurus/bundler` → `@docusaurus/utils` → `micromatch` → `braces` |
| `@docusaurus/core` | 3.10.2 | `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/mdx-loader` | 3.10.2 | `@docusaurus/mdx-loader` → `@docusaurus/utils` → `micromatch` → `braces` |
| `@docusaurus/plugin-content-blog` | 3.10.2 | `@docusaurus/plugin-content-blog` → `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/plugin-content-docs` | 3.10.2 | `@docusaurus/plugin-content-docs` → `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/plugin-content-pages` | 3.10.2 | `@docusaurus/plugin-content-pages` → `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/plugin-css-cascade-layers` | 3.10.2 | `@docusaurus/plugin-css-cascade-layers` → `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/plugin-debug` | 3.10.2 | `@docusaurus/plugin-debug` → `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/plugin-google-analytics` | 3.10.2 | `@docusaurus/plugin-google-analytics` → `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/plugin-google-gtag` | 3.10.2 | `@docusaurus/plugin-google-gtag` → `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/plugin-google-tag-manager` | 3.10.2 | `@docusaurus/plugin-google-tag-manager` → `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/plugin-sitemap` | 3.10.2 | `@docusaurus/plugin-sitemap` → `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/plugin-svgr` | 3.10.2 | `@docusaurus/plugin-svgr` → `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/preset-classic` | 3.10.2 | `@docusaurus/preset-classic` → `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/theme-classic` | 3.10.2 | `@docusaurus/theme-classic` → `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/theme-common` | 3.10.2 | `@docusaurus/theme-common` → `@docusaurus/utils` → `micromatch` → `braces` |
| `@docusaurus/theme-search-algolia` | 3.10.2 | `@docusaurus/theme-search-algolia` → `@docusaurus/core` → `chokidar` → `braces` |
| `@docusaurus/utils` | 3.10.2 | `@docusaurus/utils` → `micromatch` → `braces` |
| `@docusaurus/utils-validation` | 3.10.2 | `@docusaurus/utils-validation` → `@docusaurus/utils` → `micromatch` → `braces` |
| `@manypkg/get-packages` | 1.1.3 | `@manypkg/get-packages` → `globby` → `fast-glob` → `micromatch` → `braces` |
| `braces` | 3.0.3 | `braces` |
| `chokidar` | 3.6.0 | `chokidar` → `braces` |
| `copy-webpack-plugin` | 11.0.0 | `copy-webpack-plugin` → `fast-glob` → `micromatch` → `braces` |
| `fast-glob` | 3.3.3 | `fast-glob` → `micromatch` → `braces` |
| `globby` | 11.1.0, 13.2.2 | `globby` → `fast-glob` → `micromatch` → `braces` |
| `http-proxy-middleware` | 2.0.10 | `http-proxy-middleware` → `micromatch` → `braces` |
| `micromatch` | 4.0.8 | `micromatch` → `braces` |
| `webpack-dev-server` | 5.2.6 | `webpack-dev-server` → `chokidar` → `braces` |

### Host-toolchain fixes are local to the consuming application

This repository fixes Tinypool's critical advisories and serialize-javascript's high advisory with these root overrides:

```json
{
  "overrides": {
    "tinypool": "^2.1.2",
    "serialize-javascript": "^7.0.5"
  }
}
```

The workspace resolves `tinypool@2.2.0` and `serialize-javascript@7.1.2`. The patched major releases retain the APIs used by the installed Docusaurus tooling; their major-version breaking changes raise older Node requirements. Compatibility was verified on Node 20.19.5, including the default production build, serializer injection probes, and Docusaurus's optional two-worker SSG build. [Tinypool 2 release notes](https://github.com/tinylibs/tinypool/releases/tag/v2.0.0), [serializer 7 release notes](https://github.com/yahoo/serialize-javascript/releases/tag/v7.0.0).

These overrides are in this repository's private root package (`"private": true`). npm does not apply a dependency's overrides to the application's dependency tree, and published library lockfiles do not impose the repository's resolutions. A downstream site's Docusaurus 3.10.2 toolchain still selects the following vulnerable versions unless the site owner also applies the overrides or upgrades to an upstream framework release that fixes them. [npm override rules](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#overrides).

| Finding still possible in downstream hosts without overrides | Dependency path | Decision |
| --- | --- | --- |
| Critical: [GHSA-5gmw-xhrv-c9v3](https://github.com/advisories/GHSA-5gmw-xhrv-c9v3), [GHSA-85c8-ppgw-ccpr](https://github.com/advisories/GHSA-85c8-ppgw-ccpr) | `@docusaurus/core@3.10.2 → tinypool@1.1.1` | Fixed in this workspace; downstream host must select ≥2.1.2. Do not add or bundle the host's SSG worker implementation as an unused library dependency to force resolution. |
| High: [GHSA-5c6j-r48x-rmvq](https://github.com/advisories/GHSA-5c6j-r48x-rmvq) | `@docusaurus/bundler → copy-webpack-plugin@11.0.0 / css-minimizer-webpack-plugin@5.0.1 → serialize-javascript@6.0.2` | Fixed in this workspace; downstream host must select ≥7.0.5, which also fixes the moderate [GHSA-qj8w-gfj5-8c6v](https://github.com/advisories/GHSA-qj8w-gfj5-8c6v). Serialization belongs to the host's asset toolchain, not this library's API. |

Merge the overrides into the consuming site's root package.json, install, then rerun its audit and build. These fixes protect the Node build tools; the static site does not run the worker pool or asset serializer in visitors' browsers. Remove each override once the supported Docusaurus toolchain selects a patched version itself. The unresolved `braces` finding above still applies to downstream hosts.

#### Packed-package consumer results

A separate application installed tarballs of all three changed public packages alongside Docusaurus core/preset-classic 3.10.2 and React/React DOM 19.1.1. It used its own lockfile and installed package contents, without workspace links.

| Fresh consumer audit | Critical | High | Moderate | Low | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Without host overrides | 15 | 17 | 15 | 0 | 47 |
| With the two host overrides above | 0 | 30 | 15 | 0 | 45 |

Without overrides, the root critical/high advisories were Tinypool, serialize-javascript, and `braces`. After overrides, every remaining high entry traces only to `braces`. Some parent entries move from critical to high when their critical dependency is fixed; the increased high count does not represent new advisories. The consumer also reports `docusaurus-asyncapi@2.0.0` and `docusaurus-theme-asyncapi@2.0.0` as inherited high entries, through `docusaurus-asyncapi → docusaurus-theme-asyncapi → @docusaurus/theme-common → @docusaurus/utils → micromatch → braces`. These public-package findings have the same deferral and revisit conditions as the workspace table above.

Packed preset/plugin runtime checks passed: loading the real YAML, generating the API route and data, resolving the theme component and renderer, and verifying the removed dependencies were absent from their manifests. The consumer also passed the serializer/worker security probes after adding its overrides.

### Moderate findings retained outside the original high/critical cleanup scope

Compatible updates were applied, but 19 moderate audit entries remain. Their root advisories are [PostCSS selector parsing CPU exhaustion](https://github.com/advisories/GHSA-rj75-hqrm-r3gf), [sprintf-js precision denial of service](https://github.com/advisories/GHSA-hp3w-g68c-fv3c), and [uuid buffer bounds](https://github.com/advisories/GHSA-w5hq-g745-h8pq). They affect CSS build tools, Changesets YAML/config loading, and the development server's SockJS transport. They were not further overridden across dependency majors as part of the high/critical remediation; they remain real audit findings.

| Remaining moderate audit entry | Installed version(s) |
| --- | --- |
| `@docusaurus/cssnano-preset` | 3.10.2 |
| `argparse` | 1.0.10 |
| `css-minimizer-webpack-plugin` | 5.0.1 |
| `cssnano` | 6.1.2 |
| `cssnano-preset-advanced` | 6.1.2 |
| `cssnano-preset-default` | 6.1.2 |
| `js-yaml` | 3.15.2 |
| `postcss-calc` | 9.0.1 |
| `postcss-discard-unused` | 6.0.5 |
| `postcss-merge-longhand` | 6.0.5 |
| `postcss-merge-rules` | 6.1.1 |
| `postcss-minify-selectors` | 6.0.4 |
| `postcss-selector-parser` | 6.1.4 |
| `postcss-unique-selectors` | 6.0.4 |
| `read-yaml-file` | 1.1.0 |
| `sockjs` | 0.3.24 |
| `sprintf-js` | 1.0.3 |
| `stylehacks` | 6.1.1 |
| `uuid` | 8.3.2 |

### Verification recorded during the cleanup

- Clean installs passed with the resolved lockfiles. Both workspace and packed-consumer dependency trees passed `npx --yes --package=npm@11.21.0 -- npm ls --all`. npm 11.5.1 can incorrectly report `domhandler@5.0.3` as invalid in these overridden trees: its incoming version ranges are satisfied, but its override-context comparison rejects the edge. The newer CLI passes without changing the package versions; use it to reproduce the tree check if the older CLI reports this error.
- All public packages and the example production build passed on Node 20.19.5; root and example typechecks passed.
- Serializer RegExp/date injection and worker-options prototype-pollution probes failed against the old versions and passed after the overrides. The patched pool preserved Docusaurus's worker-data and worker-id conventions; the real two-worker SSG build also passed.
- Desktop and mobile browser checks passed for hydration, docs/MDX/blog, API content, client navigation, operation anchors, nested-schema expansion, and theme/menu controls, with no console errors or failed requests.
- The original review verified that the patch Changeset scheduled 2.0.1 for all three public packages through the normal dependency release plan. Version 2.0.1 has since been published for all three packages, and the Changeset has been consumed.
