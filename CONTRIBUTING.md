# Contributing

## Versioning with `@changesets/cli`

### Adding changes to a pending version

```
npx @changsets/cli add
```

### Creating a new version

```
npx @changsets/cli version
```

Review the CHANGELOG.md files for accuracy.

### Publishing the version

```
npx @changsets/cli publish
```

## Git commits

Follow semantic commit message format: `<type>(scope): <subject>`.
See https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716

### Example

```
chore(theme): Bump @asyncapi/react-component version to 2.6.3
```

