# Arquitetura — agenciaFVX

Site institucional da agenciaFVX. Fonte da verdade de produto/marca/escopo: `DDD.md`. Este documento cobre as decisões técnicas e o porquê de cada uma.

## Stack

| Camada         | Escolha                                                                                              | Por quê                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework      | **Astro 6** (`^6.4.8`)                                                                               | Site institucional é conteúdo majoritariamente estático. Astro entrega HTML puro por padrão, zero JS no cliente exceto onde há interatividade real (ilhas React). Astro 5 era a recomendação original do DDD; Astro 6 é a versão estável mais recente com integrações (`@astrojs/react`, `@astrojs/sitemap`) já maduras — mesma filosofia, mais recente. Requer **Node ≥22.12** (engine hard-requirement do próprio Astro 6, não uma escolha nossa). |
| Interatividade | **React 19** via `@astrojs/react`, só nas ilhas (menu mobile, animações)                             | Evita runtime de framework na página inteira; hidrata só o que precisa de estado no cliente.                                                                                                                                                                                                                                                                                                                                                         |
| Estilo         | **Tailwind CSS v4** (`@tailwindcss/vite`)                                                            | Utility-first para layout (`flex`, `grid`, breakpoints). Tokens de design (cor, tipografia, espaçamento) via `@theme` no `global.css` — Tailwind v4/Turbopack não resolve com confiança classes arbitrárias (`bg-[#3a7a8c]`), então tokens viram variáveis CSS nomeadas, não classes arbitrárias.                                                                                                                                                    |
| Animação       | **Motion** (sucessora do Framer Motion)                                                              | Já usada nas ilhas React interativas. `prefers-reduced-motion` respeitado globalmente via CSS em `global.css`, então mesmo animações puramente CSS obedecem a preferência do usuário.                                                                                                                                                                                                                                                                |
| Fontes         | `@fontsource-variable/fraunces` (display editorial) + `@fontsource/geist-sans` (corpo) — self-hosted | Zero requisição a CDN de terceiro (performance + LGPD). Fraunces variable dá acesso a eixos ópticos/peso para o hero editorial sem múltiplos arquivos estáticos. Geist é a sans neutra de alta qualidade usada pela própria Vercel — referência de contraste tipográfico citada na seção 7 do DDD.                                                                                                                                                   |
| Conteúdo       | Content Collections do Astro (`src/content.config.ts`), JSON tipado com Zod                          | Sem CMS nesta fase (DDD seção 6). Serviços (lista fechada de 6) e cases (coleção vazia, pronta pra crescer) como coleções tipadas — schema já valida no build.                                                                                                                                                                                                                                                                                       |
| Deploy         | **Cloudflare Pages**                                                                                 | Edge global, custo zero para site estático, `_headers` nativo para security headers, `output: "static"` do Astro gera só arquivos — não precisa de adapter Cloudflare (esse adapter só é necessário para SSR/functions, que este projeto não usa).                                                                                                                                                                                                   |
| SEO            | `@astrojs/sitemap`                                                                                   | Gera `sitemap-index.xml` automaticamente no build a partir das rotas estáticas.                                                                                                                                                                                                                                                                                                                                                                      |

## Por que sem Docker

A seção de infraestrutura local padrão do `/hm-init` assume serviços (banco, cache) que este projeto não tem — é um site estático sem backend, sem banco de dados, sem sessão. Não existe processo pra containerizar: o "servidor" em produção é a CDN da Cloudflare servindo arquivos. Adicionar Docker aqui seria complexidade sem função. Se o projeto ganhar backend (ex.: endpoint de formulário, CMS headless) essa decisão é revisitada.

## Estrutura de pastas

```
src/
  components/     componentes .astro e ilhas React
  layouts/        Layout.astro (shell HTML, meta tags, SEO base)
  pages/          rotas — index, privacidade, 404
  content/
    servicos/     6 JSON tipados (lista fechada, seção 2 do DDD)
    cases/        coleção vazia — pronta pra crescer (seção 3.6 do DDD)
  content.config.ts  schemas Zod das collections
  lib/            constants.ts (WhatsApp, Instagram, âncoras) — fonte única da verdade dos links obrigatórios
  styles/         global.css — tokens de design (@theme) + fontes + base layer
  assets/brand/   logo-mark.png (cópia otimizável do monograma real, via astro:assets)
public/
  _headers        security headers (Cloudflare Pages)
  robots.txt
  favicon.ico, favicon-*.png, apple-touch-icon.png, android-chrome-*.png, site.webmanifest
  logos/          arquivos-fonte da identidade visual (wordmark em fundo claro, render 3D) — referência, não usados diretamente no site
```

## Segurança desde o commit zero

- **CSP** em `public/_headers`: `default-src 'self'`, `script-src 'self'` (sem terceiros, sem inline script), `style-src 'self' 'unsafe-inline'` — o `unsafe-inline` em style é necessário porque o DDD exige inline styles para tokens de design (limitação do Tailwind v4/Turbopack com classes arbitrárias) e o Astro injeta estilos com escopo via atributo `style`/`<style>` hasheado; não há conteúdo de usuário no site, então o risco de injeção via este vetor é nulo.
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security` com preload, `Permissions-Policy` restritiva.
- Zero tracking de terceiros nesta fase (DDD seção 8). Quando entrar pixel de Meta/Google, precisa de consentimento LGPD antes — não adicionar sem isso.
- Sem secrets neste projeto: não há chaves de API, não há `.env` com segredo real (site 100% estático, sem backend). `.gitignore` já cobre `.env*` por padrão caso isso mude.
- Números de contato (WhatsApp, Instagram) são públicos por design (são o CTA do site) — não são segredos, ficam em `src/lib/constants.ts` como fonte única.

## Como rodar

Requer **Node ≥22.12** (exigência do próprio Astro 6 — não roda em Node 20).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check (type-check) + build estático em dist/
npm run preview   # serve o build de dist/ localmente
npm run lint      # eslint (astro + typescript + jsx-a11y)
npm run format    # prettier (com plugin astro + tailwind)
```

Sem variáveis de ambiente obrigatórias nesta fase (sem CMS, sem API, sem banco).

### Nota sobre `vite` no `package.json`

`vite` aparece fixado como dependência direta (`^7.3.6`) com `overrides` apontando pra mesma versão. Sem isso, o npm resolve `@tailwindcss/vite` e `@astrojs/react` contra um `vite@8.x` mais novo enquanto o Astro usa `vite@7.3.6` internamente — dois runtimes de Vite coexistindo quebram o plugin do Tailwind no build (`Missing field tsconfigPaths on BindingViteResolvePluginConfig`). Fixar a versão força uma resolução única. Reavaliar este pin quando o Astro migrar para Vite 8 nativamente.

## Decisões de identidade

- **Cor de acento: ciano-azul (`#06B6C4`, hover `#5FDCE6`)**, extraída por amostragem de pixel diretamente do monograma real da marca (`public/android-chrome-512x512.png`, gradiente de `#03B8C0` a `#1D3690`) depois que os arquivos de identidade visual (`public/logos/`, `public/favicon_io/`) apareceram no projeto no meio do `/hm-init`. **Isso substitui uma decisão anterior** (violeta-elétrico, `#7C5CFC`) que foi tomada como placeholder antes de qualquer arquivo de marca existir — corrigida assim que a identidade real ficou disponível, porque marca real sempre vence suposição. Contraste verificado: ~8:1 sobre `--bg`, acima do mínimo AAA para texto normal. Um único acento, usado com disciplina, como exige a seção 7 do DDD; o tom mais escuro do gradiente (`--color-accent-deep`) aparece só em glows atmosféricos (hero, CTA final, OG image), nunca como cor de UI.
- **Par tipográfico:** Fraunces (display) + Geist Sans (corpo), das opções sugeridas no DDD. Geist alinha diretamente com a referência de "Vercel — contraste e tipografia" citada na seção 7; Fraunces tem eixo óptico variável que dá peso editorial ao hero sem precisar de múltiplos arquivos estáticos. Isso continua válido — a chegada da identidade visual real não trouxe tipografia própria para o site (só o wordmark bitmap do logo, não usado como fonte).
- **Uso do logo:** o monograma (`android-chrome-512x512.png`, fundo transparente, real) foi copiado para `src/assets/brand/logo-mark.png` e é usado via `astro:assets` `<Image>` no Header, Footer e 404 — otimizado automaticamente pelo Astro (AVIF/WebP + tamanho certo), nunca servido cru. O wordmark completo (`public/logos/logofvx.png`) e o render 3D (`logo2.jpeg`) têm fundo claro sólido (sem transparência) — não são usados diretamente no site dark-first; ficam como arquivo-fonte de referência.

## Pendências conhecidas (não bloqueiam o `/hm-init`, bloqueiam o ship)

- Domínio próprio ainda não existe — `SITE_URL` em `astro.config.mjs` e `src/lib/constants.ts` está com placeholder `agenciafvx.com.br`, marcado com `TODO(domínio)`. Trocar antes do deploy final.
- Se a agência quiser uma versão do wordmark com fundo transparente (pro header em telas muito grandes, por exemplo), precisa ser gerada a partir do arquivo-fonte em `public/logos/` — o site hoje usa só o monograma.
