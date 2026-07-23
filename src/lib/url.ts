/**
 * Prefixa um caminho absoluto (começando com "/") com o `base` configurado
 * em astro.config.mjs. Use em TODO link interno e caminho de imagem que
 * comece com "/" (ex: "/images/x.png", "/expedicoes/slug/", "/admin/").
 *
 * Sem isso, ao publicar em usuario.github.io/nome-do-repo/, qualquer
 * caminho hardcoded como "/images/x.png" aponta para a raiz do domínio
 * em vez de "/nome-do-repo/images/x.png" — causando 404 em produção
 * (mesmo funcionando normalmente em `npm run dev`, quando base costuma
 * coincidir com a raiz ou já é digitado manualmente).
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL; // ex: "/nome-do-repo/" (sempre com barra final)
  return base + path.replace(/^\/+/, '');
}
