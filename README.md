# Catálogo de Expedições

Site estático em Astro para catálogo de expedições/trilhas, com edição de conteúdo
via Sveltia CMS e hospedagem gratuita no GitHub Pages. Sem backend, sem banco de dados.

## Estrutura

```
src/
  components/     -> Header, Hero, ExpeditionCard, ItineraryTimeline, etc.
  config/site.ts   -> nome da agência, número do WhatsApp, redes sociais
  content/
    config.ts      -> schema de cada expedição (validação automática)
    expeditions/   -> um arquivo .md por expedição (editável pelo Sveltia)
  pages/
    index.astro          -> home com o catálogo
    expedicoes/[slug].astro -> página de detalhe de cada expedição
public/
  admin/           -> painel do Sveltia CMS (config.yml + index.html)
  images/          -> fotos de capa das expedições
```

## 1. Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:4321`.

## 2. Editar o número de WhatsApp e dados da agência

Edite `src/config/site.ts`:

```ts
whatsappNumber: '5561999999999', // DDI + DDD + número, só dígitos
```

## 3. Adicionar/editar expedições sem o painel (direto no código)

Cada expedição é um arquivo `.md` em `src/content/expeditions/`. Copie um dos
três exemplos (`serra-dos-orgaos.md`) e ajuste os campos. O Astro valida
automaticamente o formato pelo schema em `src/content/config.ts` — se faltar
um campo obrigatório, o build falha com um erro claro.

## 4. Publicar no GitHub Pages

1. Crie um repositório no GitHub e suba este projeto:
   ```bash
   git init
   git add .
   git commit -m "primeira versão do catálogo"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```
2. No GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Edite `astro.config.mjs` e ajuste:
   ```js
   site: 'https://SEU-USUARIO.github.io',
   base: '/SEU-REPOSITORIO',
   ```
   Se o repositório se chamar exatamente `SEU-USUARIO.github.io`, remova a
   linha `base` inteiramente.
4. Faça commit e push — o workflow em `.github/workflows/deploy.yml` builda e
   publica automaticamente a cada push na `main`. O link fica disponível em
   **Settings → Pages** após alguns minutos.

## 5. Como acessar o `/admin` (painel do Sveltia CMS)

Depois que o site estiver publicado no GitHub Pages, o painel fica em:

```
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/admin/
```

### Opção A — Login com token pessoal (recomendado para você/equipe pequena)

Não precisa criar OAuth App nem servidor nenhum:

1. Abra a URL do `/admin` acima.
2. Clique em **"Sign In with Token"**.
3. O próprio Sveltia mostra um link para gerar o token no GitHub, já com os
   escopos certos pré-selecionados (acesso de leitura/escrita ao repositório).
   Gere o token, copie e cole de volta na janela do Sveltia.
4. Pronto — você já pode criar, editar e apagar expedições visualmente.

Guarde esse token com cuidado (é como uma senha). Se quiser revogar o acesso
depois, é só apagar o token em GitHub → Settings → Developer settings →
Personal access tokens.

### Opção B — Login "Continue with GitHub" (melhor para várias pessoas não-técnicas editando)

Essa opção usa o fluxo OAuth tradicional e exige um pequeno servidor
intermediário (o navegador sozinho não pode guardar o "client secret" do
GitHub com segurança). Só vale a pena se você tiver mais de uma pessoa
editando o conteúdo e quiser evitar que cada uma gerencie seu próprio token.

1. Crie um OAuth App em GitHub → Settings → Developer settings → OAuth Apps.
   - Callback URL: `https://SEU-AUTH-WORKER.workers.dev/callback`
2. Publique o worker gratuito `sveltia-cms-auth`
   (https://github.com/sveltia/sveltia-cms-auth) na Cloudflare, com as
   variáveis `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET` do passo anterior.
3. Adicione ao `public/admin/config.yml`, dentro de `backend:`:
   ```yaml
   base_url: https://SEU-AUTH-WORKER.workers.dev
   auth_endpoint: auth
   ```
4. Volte ao `/admin`, agora aparece "Continue with GitHub".

> Observação: `publish_mode: editorial_workflow` está ativado no
> `config.yml`, o que faz cada edição virar um Pull Request para revisão antes
> de ir ao ar. Se preferir que as edições publiquem direto, remova essa linha.

## 6. Design

A identidade visual segue um conceito de "diário de expedição": paleta
verde-mata/pergaminho/ferrugem, tipografia serifada (Fraunces) para títulos e
monoespaçada (JetBrains Mono) para dados como duração/dificuldade/preço, e um
motivo de curvas de nível (linhas topográficas) como elemento assinatura no
hero e nos divisores de seção. Tudo isso vive em `tailwind.config.mjs` e
`src/styles/global.css` — mude as cores lá para ajustar a marca.

## Substituir as imagens de exemplo

As imagens em `public/images/expeditions/*.png` são placeholders sólidos só
para o layout funcionar. Suba fotos reais com o mesmo nome (ou ajuste o campo
`cover` de cada expedição) — pelo painel `/admin` ou direto na pasta.
