import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// ⚠️ AJUSTE AQUI antes do deploy:
// - "site" deve ser a URL final do GitHub Pages
// - "base" só é necessário se o repositório NÃO se chamar "usuario.github.io"
//   (ex.: repo "expedicoes" publicado em usuario.github.io/expedicoes -> base: '/expedicoes')
export default defineConfig({
    site: "https://phamaralbr.github.io",
    base: "/siriema",
    trailingSlash: "always",
    integrations: [tailwind({ applyBaseStyles: false })],
});
