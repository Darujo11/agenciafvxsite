# MEMORY.md — agenciaFVX

Resumo vivo do estado do projeto. Fonte da verdade de produto/escopo: `DDD.md`. Decisões técnicas: `ARCHITECTURE.md`.

## Estado (2026-07-11)

- `/hm-init` concluído: stack decidida (Astro 6, React 19 ilhas, Tailwind v4, Motion, fontes self-hosted, Cloudflare Pages), estrutura de pastas montada, tooling configurado (TS strict, ESLint, Prettier), design tokens base em `src/styles/global.css`.
- Git inicializado nesta pasta (`agenciafvx/` é a raiz do repositório).
- Pendente: seções da home (hero, serviços, processo, projetos, CTA final), header/footer completos, SEO/JSON-LD, OG image, páginas legais, auditorias (`/hm-designer`, `/hm-engineer`, `/hm-qa`), deploy.

## Decisões tomadas que o DDD deixou em aberto

- **Astro 6, não Astro 5** — versão estável mais recente com integrações maduras. Descoberto durante o build: tanto Astro 6 quanto 7 exigem Node ≥22.12 (não é diferencial entre eles); a máquina de build só tinha Node 20.20 — ver gotcha abaixo.
- **ESLint 9.x, não 10.x** — `eslint-plugin-jsx-a11y@6.10.2` (mais recente) só suporta ESLint até `^9`. Reavaliar quando o plugin liberar suporte a ESLint 10.
- **Cor de acento: ciano-azul (`#06B6C4`)**, não violeta nem verde-lima — extraída por amostragem de pixel do logo real assim que os arquivos de marca apareceram em `public/logos/`/`public/favicon_io/` (ver "Identidade visual real chegou no meio do build" abaixo). Ver justificativa completa em `ARCHITECTURE.md`.
- **Par tipográfico: Fraunces Variable + Geist Sans** — ver justificativa em `ARCHITECTURE.md`.

## Identidade visual real chegou no meio do build

Depois que a stack e as seções já estavam construídas com uma cor de acento placeholder (violeta), arquivos de marca de verdade apareceram em `public/logos/` (`logofvx.png` — wordmark completo, `logo2.jpeg` — render 3D) e `public/favicon_io/` (favicon.ico + pngs + site.webmanifest, esses com transparência real). São a identidade visual definitiva da agência: monograma "FVX" em gradiente ciano→azul.

Ação tomada: cor de acento recalculada por amostragem de pixel do monograma (`#03B8C0` a `#1D3690`), todos os componentes que tinham a cor placeholder hardcoded atualizados, logo integrado ao Header/Footer/404 via `astro:assets` (cópia em `src/assets/brand/logo-mark.png`), favicon completo movido de `public/favicon_io/` pra `public/` (raiz padrão), `site.webmanifest` preenchido com nome/tema reais, OG image regerada com o logo e cor certos.

**Se aparecerem mais arquivos de marca depois** (nova versão do logo, guideline de marca, etc.), tratar como fonte da verdade acima de qualquer decisão de design já tomada neste projeto — sempre recalcular/ajustar em vez de manter o que já foi decidido por suposição.

## Gotchas

- `create-astro` (CLI de scaffold) exige Node ≥22.12 — por isso o projeto foi montado a mão (package.json + configs escritos diretamente) em vez de via `npm create astro@latest`. Descoberto depois: o próprio **Astro 6 também exige Node ≥22.12** pra rodar (não só o CLI de scaffold). A máquina de build usada nesta sessão tinha só Node 20.20 no sistema — resolvido baixando um binário Node 22.23.1 isolado (sem alterar o Node global do sistema) só pra rodar `npm install`/`npm run build` durante o desenvolvimento. Ambiente real de dev/CI precisa ter Node ≥22.12 instalado normalmente.
- `vite` precisou ser fixado em `^7.3.6` + `overrides` no `package.json` — sem isso o npm resolve `@tailwindcss/vite`/`@astrojs/react` contra `vite@8.x` enquanto o Astro usa `vite@7.3.6` internamente, e os dois runtimes coexistindo quebram o build do Tailwind. Ver `ARCHITECTURE.md`.
- Tailwind v4 + Turbopack não resolve com confiança classes arbitrárias (`bg-[#hex]`) — por isso tokens de design são variáveis CSS via `@theme` em `global.css`, não classes Tailwind arbitrárias. Ver DDD seção 6 e `ARCHITECTURE.md`.

## Pendências que bloqueiam o ship (não bloqueiam o dev)

- Domínio próprio (usando placeholder `agenciafvx.com.br` em `astro.config.mjs` e `src/lib/constants.ts`, marcado `TODO(domínio)`).
