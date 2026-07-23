import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                // Paleta "diário de expedição"
                parchment: "#F1ECDE", // fundo principal
                "parchment-dim": "#E7E0CC",
                ink: "#1B2A22", // verde-mata quase preto (texto forte / seções escuras)
                moss: "#3F5A45", // verde secundário
                rust: "#CB8641", // acento / CTA (não confundir com terracota genérico)
                "rust-dark": "#93401F",
                stone: "#6B6558", // texto neutro
                sand: "#DDD3B8", // linhas/divisores
            },
            fontFamily: {
                display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
                body: [
                    '"Work Sans"',
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                ],
                mono: [
                    '"JetBrains Mono"',
                    "ui-monospace",
                    "SFMono-Regular",
                    "monospace",
                ],
            },
            backgroundImage: {
                "topo-lines":
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cg fill='none' stroke='%231B2A22' stroke-opacity='0.06' stroke-width='1.2'%3E%3Cpath d='M0 60 Q100 20 200 60 T400 60'/%3E%3Cpath d='M0 110 Q100 70 200 110 T400 110'/%3E%3Cpath d='M0 160 Q100 120 200 160 T400 160'/%3E%3Cpath d='M0 210 Q100 170 200 210 T400 210'/%3E%3Cpath d='M0 260 Q100 220 200 260 T400 260'/%3E%3Cpath d='M0 310 Q100 270 200 310 T400 310'/%3E%3C/g%3E%3C/svg%3E\")",
            },
            maxWidth: {
                content: "1180px",
            },
        },
    },
    plugins: [typography],
};
