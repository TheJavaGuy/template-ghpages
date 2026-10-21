# template-ghpages

Template for small static web apps: Vite+, TypeScript, Tailwind CSS 4, DaisyUI 5, GitHub Pages.

## Stack

- Vite+ (`vp`): dev server, build, Oxlint, Oxfmt, Vitest, type check. Config in `vite.config.ts` only; no `.oxlintrc`, no `vitest.config`.
- TypeScript 7 (type check only, `noEmit`). Plain `.js` modules are allowed (`allowJs`).
- Tailwind CSS 4 via `@tailwindcss/vite`; DaisyUI 5 as `@plugin` in `src/style.css`.
- Tests: Vitest through `vp test`, `happy-dom` environment, imports from `vite-plus/test`.
- npm as bundled with Node; `package.json` `devEngines` requires npm >= 11.16. Node pinned exactly in `.nvmrc`.
- `.npmrc` gates installs: `min-release-age=1`, `strict-allow-scripts=true`. Install scripts need an `allowScripts` entry in `package.json`.

## Commands

| Task                       | Command                                                |
| -------------------------- | ------------------------------------------------------ |
| Install                    | `npm install` (CI: `npm ci`)                           |
| Dev server                 | `npm run dev`                                          |
| Format + lint + type check | `npm run check` (`npm run check -- --fix` to auto-fix) |
| Tests                      | `npm test`                                             |
| Production build           | `npm run build` (output in `dist/`)                    |
| Preview build              | `npm run preview`                                      |

Run `npm run check` and `npm test` before committing. CI runs exactly these plus `npm run build`.

## Layout

- `index.html`: all markup. Static-first; JS only adds behaviour.
- `src/main.ts`: entry. `src/theme.ts`: light/dark toggle. `src/consent.ts`: consent banner + Clarity.
- `src/style.css`: Tailwind import, DaisyUI themes `tjg-light` / `tjg-dark`, fonts, type scale, `.wrap`, `.display`, `.num`, `.hairline`, `.soft`, `.kicker`, `.lead`. Tokens are documented in `DESIGN.md`.
- `public/`: favicons and `og-image.png` (1200x630), copied verbatim to `dist/`.

## Agent skills

- `daisyui` (`.claude/skills/daisyui/`): the official daisyUI 5 reference. Use it for every component, theme, or colour question before guessing class names.
- `good-css` (`.claude/skills/good-css/`): consult it before writing or reviewing CSS beyond Tailwind utilities (layout, spacing, show/hide, text and media rules).
- `mattpocock-skills` plugin (enabled in `.claude/settings.json`): `grilling`, `tdd`, `diagnosing-bugs`, `code-review`, `prototype`, `research`, `codebase-design`, `domain-modeling`, `pr`, `wizard`, `writing-for-agents`.
- Vendored skills are third-party files: never edit them in place; update with `npx skills@latest update`.

## Rules

- Use DaisyUI components and the theme tokens; do not hardcode colours.
- Fonts are self-hosted via `@fontsource-variable`. Never add Google Fonts or other third-party `<link>`/`<script>` tags.
- Third-party scripts load only after consent via `src/consent.ts`. Analytics id comes from `VITE_CLARITY_ID` (`.env.local` locally, repository variable in CI); the feature is inert when unset.
- Never hardcode the `/repo-name/` base path. `deploy.yml` sets `BASE_PATH`; `vite.config.ts` reads it. Use root-relative URLs (`/favicon.svg`) in `index.html` and let Vite rewrite them.
- Dependencies are pinned exact (`save-exact`); Dependabot proposes updates weekly. Do not loosen ranges.
- Deployment: push to `main` triggers `.github/workflows/deploy.yml` (GitHub Pages). Nothing is deployed from branches.
