# template-ghpages

Template for small static web apps: Vite+, TypeScript, Tailwind CSS 4, DaisyUI 5, GitHub Pages.

Live: https://thejavaguy.github.io/template-ghpages/

<!-- template:start -->

## Template usage

Create a new project from this template (requires [`gh`](https://cli.github.com/) logged in, Node 24.18+):

```sh
gh repo create NAME --template TheJavaGuy/template-ghpages --public --clone \
  && cd NAME && npm install && node scripts/init.mjs && git push
```

`scripts/init.mjs` runs once and then deletes itself. It:

1. Derives `owner/name` from the `origin` remote.
2. Asks for a one-line description.
3. Replaces the template name, URLs and description in `package.json`, `index.html`, `README.md`, `CLAUDE.md`, then formats them with `vp fmt`.
4. Sets `package.json` `author` from `git config user.name`.
5. Removes this section, `CHANGELOG.md`, `SPEC.md` and itself.
6. If `gh` is authenticated: sets the GitHub repo description and homepage, and enables GitHub Pages with source "GitHub Actions".
7. Commits everything as `chore: bootstrap from template`.

Non-interactive: `node scripts/init.mjs --description "One line"`.

After the first push, the deploy workflow publishes the site. If Pages could not be enabled automatically, open the repo's Settings > Pages and set Source to "GitHub Actions", then re-run the workflow. If the `deploy` job fails with "The deployment was rejected or didn't satisfy other protection rules", the `github-pages` environment was created before `main` existed: Settings > Environments > github-pages > add `main` to the deployment branches, then re-run.

Then: replace `public/og-image.png` (1200x630) and the favicons, and, if you want analytics, set the repository variable `VITE_CLARITY_ID` (Settings > Secrets and variables > Actions > Variables).

Updating the template itself: edit, run `npm run check && npm test && npm run build`, note the change in `CHANGELOG.md`, push to `main`. The template deploys itself as the live demo above. Derived projects do not receive template updates.
<!-- template:end -->

## Development

Requirements: Node per `.nvmrc` (`nvm install` reads it). npm comes with it; `devEngines` requires npm 11.16 or newer (Node 24.18+).

```sh
npm install
npm run dev        # dev server with HMR
npm run check      # format + lint + type check (npm run check -- --fix to apply fixes)
npm test           # Vitest
npm run build      # production build into dist/
npm run preview    # serve dist/
```

`.npmrc` only installs versions published at least one day ago (`min-release-age=1`) and fails on any dependency install script not listed in `package.json` `allowScripts` (`strict-allow-scripts=true`). `fsevents` is denied there: its registry metadata declares a `node-gyp rebuild` the package cannot run, and its prebuilt binary works without it.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which checks, tests, builds and publishes `dist/` to GitHub Pages. `ci.yml` runs the same checks on pull requests and other branches. Dependabot opens weekly update PRs.

## Analytics

Microsoft Clarity loads only after the visitor accepts the consent banner, and only when `VITE_CLARITY_ID` is set at build time:

- locally: `VITE_CLARITY_ID=xxxx` in `.env.local` (git-ignored)
- in CI: repository variable `VITE_CLARITY_ID`

Unset means no banner and no analytics.

## Design

Themes, tokens, fonts and helper classes are documented in [DESIGN.md](DESIGN.md).

## Claude Code

`.claude/settings.json` is committed and gives every clone the same agent setup:

- Plugins (`enabledPlugins`, keyed `name@marketplace`): `typescript-lsp@claude-plugins-official`, `javascript-typescript@claude-code-workflows`, `mattpocock-skills@mattpocock`. The non-official marketplaces `claude-code-workflows` (wshobson/agents) and `mattpocock` (mattpocock/skills) are registered in `extraKnownMarketplaces` with auto-update, so Claude Code installs the plugins on the first session after you trust the workspace.
- Vendored skills in `.claude/skills/`, tracked in `skills-lock.json`: [`daisyui`](https://daisyui.com/SKILL.md) (official, from saadeghi/daisyui) and [`good-css`](https://skills.sh/vojtaholik/good-css). These files are third-party content and are excluded from `vp fmt`.

Manage vendored skills with the [`skills`](https://skills.sh) CLI:

```sh
npx skills@latest list
npx skills@latest update                                   # refresh to latest upstream
npx skills@latest add <owner>/<repo> -a claude-code -y     # add another skill
```

Project conventions for agents are in [CLAUDE.md](CLAUDE.md).

## License

[MIT](LICENSE)
