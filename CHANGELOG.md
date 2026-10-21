# Changelog

All notable changes to this template are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Derived projects do
not carry this file.

## [Unreleased]

### Added

- `mattpocock-skills` plugin enabled through project settings, with the `mattpocock` marketplace registered via `extraKnownMarketplaces`.
- Vendored `good-css` and official `daisyui` agent skills in `.claude/skills/` with `skills-lock.json`; `.claude/skills/**` excluded from formatting.
- Plugin keys in `.claude/settings.json` use the full `name@marketplace` form; `claude-code-workflows` marketplace registered.
- README section "Claude Code" documenting plugins, skills, and the `pnpm dlx skills` workflow.

### Changed

- npm replaces pnpm: `package-lock.json`, `npm ci` in CI, `devEngines` requires npm `>=11.16.0`, `engines.node` `>=24.18.0`, `.nvmrc` `v24.22.1`. `npx` works in the repo again (the pnpm pin made it fail with `EBADDEVENGINES`).
- `.npmrc` adds `min-release-age=1` and `strict-allow-scripts=true`; `package.json` `allowScripts` denies `fsevents`.
- `skills` CLI runs via `npx skills@latest`.

### Removed

- `github` plugin no longer enabled in project settings.

## [1.0.0] - 2026-10-11

### Added

- Vite+ 1.1.0 toolchain (dev, build, lint, format, test, type check).
- TypeScript 7.0.2, Tailwind CSS 4.3.3, DaisyUI 5.7.47, Vitest 5 with happy-dom.
- `tjg-light` / `tjg-dark` DaisyUI themes, self-hosted Fraunces + Manrope, type scale.
- Theme toggle with persisted choice and flash-free initial paint.
- Consent banner; Microsoft Clarity loaded only after consent and only when `VITE_CLARITY_ID` is set.
- GitHub Pages deploy workflow, CI workflow, Dependabot config.
- `scripts/init.mjs` bootstrap for derived projects.
- `CLAUDE.md`, `.claude/settings.json`, `DESIGN.md`, `SPEC.md`.
