# Contributing

## Versioning with `@changesets/cli`

### Adding changes to a pending version

```
npx @changesets/cli add
```

### Creating a new version

```
npx @changesets/cli version
```

Review the CHANGELOG.md files for accuracy.

### Publishing the version

```
npx @changesets/cli publish
```

## Git commits

Follow semantic commit message format: `<type>(scope): <subject>`.
See https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716

### Example

```
chore(theme): Bump @asyncapi/react-component version to 2.6.3
```

