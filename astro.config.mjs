import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// TODO(domínio): trocar pela URL definitiva assim que o domínio próprio existir.
// Necessário para sitemap.xml e canonical/OG tags absolutos.
const SITE_URL = "https://agenciafvx.com.br";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
});
