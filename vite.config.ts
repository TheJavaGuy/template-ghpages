import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite-plus";

// GitHub Pages serves project sites under /<repo>/. deploy.yml sets BASE_PATH;
// local dev and custom-domain deployments use "/".
const base = process.env["BASE_PATH"] ?? "/";

// The stylesheet goes inline into the HTML, so first paint needs one request instead of two.
// GitHub Pages caches every file for only 10 minutes, so a separate CSS file buys little.
function inlineCss(): Plugin {
  return {
    name: "inline-css",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const sheets = Object.values(bundle).flatMap((file) =>
        file.type === "asset" && file.fileName.endsWith(".css") ? [file] : [],
      );
      const inlined = new Set<string>();
      for (const page of Object.values(bundle)) {
        if (page.type !== "asset" || !page.fileName.endsWith(".html")) continue;
        page.source = String(page.source).replace(
          /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
          (tag, href: string) => {
            const sheet = sheets.find((s) => href.endsWith(`/${s.fileName}`));
            if (!sheet) return tag;
            inlined.add(sheet.fileName);
            return `<style>${String(sheet.source)}</style>`;
          },
        );
      }
      // CSS of lazily loaded chunks is fetched by JS, so only the inlined sheets go.
      for (const fileName of inlined) delete bundle[fileName];
    },
  };
}

export default defineConfig({
  base,
  plugins: [tailwindcss(), inlineCss()],
  build: {
    // Fonts stay separate files: inlined, they bloat the render-blocking CSS with rarely used subsets.
    assetsInlineLimit: (file) => (file.endsWith(".woff2") ? false : undefined),
  },
  fmt: {
    // Vendored agent skills are third-party content; keep them byte-identical for `skills update`.
    ignorePatterns: [".claude/skills/**"],
  },
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  test: {
    environment: "happy-dom",
    environmentOptions: {
      // External <script src> loads are disabled under happy-dom; treat them as loaded instead of logging errors.
      happyDOM: { settings: { handleDisabledFileLoadingAsSuccess: true } },
    },
  },
});
