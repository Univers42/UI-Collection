# Releasing `@univers42/ui-collection`

This repository is prepared so downstream projects can upgrade with:

```bash
npm update @univers42/ui-collection
```

That only works when the package is published to an npm-compatible registry with a newer semver version.

## Consumer Requirements

Consumers should depend on a semver range, for example:

```json
{
  "dependencies": {
    "@univers42/ui-collection": "^0.1.0"
  }
}
```

If a consumer pins an exact version such as `0.1.0`, `npm update` will not move it to a newer release.

## Maintainer Release Flow

1. Make sure `package.json` has the next version.
2. Commit the changes.
3. Create a semantic version tag that matches the package version, for example `v0.2.0`.
4. Push the commit and tag.

Example:

```bash
npm version minor
git push origin main --follow-tags
```

The GitHub Actions workflow in `.github/workflows/publish-package.yml` will then:

1. install dependencies
2. verify the package with `npm pack --dry-run`
3. publish it to npm

## Required Repository Secret

Set this repository secret before publishing:

- `NPM_TOKEN`: npm token with permission to publish `@univers42/ui-collection`

## Packaging Notes

- `npm publish` runs `prepack`, which rebuilds `dist/` from source.
- Only `dist/` and `README.md` are included in the published package.
- The package is configured for a public scoped npm publish with `publishConfig.access = "public"`.

If you want to publish to a private registry instead of npmjs, update the workflow registry URL and adjust `publishConfig` as needed.
