import { defineConfig } from "astro/config";

// ⚠️ AJUSTE AQUI antes do deploy:
// - "site" deve ser a URL final do GitHub Pages
// - "base" só é necessário se o repositório NÃO se chamar "usuario.github.io"
//   (ex.: repo "expedicoes" publicado em usuario.github.io/expedicoes -> base: '/expedicoes')
export default defineConfig({
    site: "https://phamaralbr.github.io",
    base: "/siriema",
    trailingSlash: "always",
    // Tailwind (v3) agora entra via PostCSS puro (postcss.config.mjs +
    // tailwind.config.mjs) em vez do pacote @astrojs/tailwind, que é
    // deprecado e não suporta Astro 6+.
    image: {
        // Gera srcset/sizes automaticamente pra qualquer <Image>/<Picture>.
        // "constrained": a imagem encolhe dentro do container, sem passar
        // do tamanho definido em width/height — bom pra cards e conteúdo
        // que não ocupa a viewport inteira. Pode ser sobrescrito por
        // imagem com a prop `layout`.
        layout: "constrained",
        responsiveStyles: true,
    },
});
