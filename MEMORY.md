# MEMORY.md — agenciaFVX

Resumo vivo do estado do projeto. Fonte da verdade de produto/escopo: `DDD.md`. Decisões técnicas: `ARCHITECTURE.md`.

## Estado (2026-07-11)

- Home completa (header, hero, prova rápida, 6 serviços, como trabalhamos, projetos, CTA final, footer), páginas de privacidade e 404, SEO (meta tags, JSON-LD, sitemap, OG image), identidade visual real integrada. Primeiro commit feito.
- Auditoria funcional completa via Playwright (links WhatsApp/Instagram, teclado, menu mobile, reduced-motion) + Lighthouse mobile real: **Performance 97, Acessibilidade 100, Boas práticas 100, SEO 100** — critério de aceite do DDD (`≥95` nas quatro) atingido.
- Pendente: `/hm-designer` e `/hm-engineer` formais (auditoria manual equivalente já foi feita), deploy.

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

## Bugs reais encontrados e corrigidos na auditoria (Playwright + Lighthouse)

- **Menu mobile cobria só 80px de altura, não a tela inteira.** `backdrop-blur-md` no `<header>` cria um containing block para os descendentes `fixed` (mesmo efeito de `transform`) — o overlay `fixed inset-0` do menu resolvia contra a caixa do header (~80px), não contra o viewport. Corrigido renderizando o overlay via `createPortal` (React) direto em `document.body`, com guard `mounted` pra evitar chamar `document` durante SSR. Ao portar, o botão de abrir (dentro do header, `z-50`) ficou visualmente atrás do overlay portado (`z-40` no nível de `body`) porque o header cria seu próprio stacking context — um `z-index` alto *dentro* de um contexto não escapa um irmão de `z-index` menor no nível pai. Resolvido com botão de fechar próprio, renderizado dentro do overlay portado.
- **Contraste insuficiente** nos números "01–04" de "Como trabalhamos" (`text-accent/50` sobre o fundo dava 2.7:1, precisa de 3:1 pra texto grande) — trocado pra `text-accent` sólido.
- **`aria-label` conflitando com texto visível** (WCAG "Label in Name") — botões de WhatsApp tinham `ariaLabel="Falar com a agenciaFVX no WhatsApp"` enquanto o texto visível era "Fale com a gente"/"Começar agora"; `aria-label` substitui o nome acessível inteiro, então leitor de tela e usuário vidente liam coisas diferentes. Removido — o texto visível já é claro o suficiente no contexto.
- **Logo em baixa resolução** (Lighthouse `image-size-responsive`) — `<Image>` do Astro gerava exatamente o tamanho de exibição (28×28), sem folga pra telas de alta densidade (Retina). Corrigido pedindo 2× o tamanho exibido (`width`/`height` no componente = 2× a classe Tailwind de exibição).
- **Citação da LGPD quebrada visualmente**: "Lei nº 13.709/2018" renderizava como "Lei no 13.709/2018" — o glyph do indicador ordinal (º, U+00BA) não renderiza de forma confiável nesse ambiente de fonte. Removido o "nº" da citação (fica só "Lei 13.709/2018 — LGPD", igualmente correto e sem ambiguidade).

## Gotchas do ambiente de shell (não do projeto — pra não repetir na próxima sessão)

- **`pkill -f "<padrão>"` pode se automatar.** O harness roda cada comando via `sh -c "... eval '<script inteiro>' ..."`; se o script contém literalmente o texto do padrão buscado (ex.: `pkill -9 -f "astro preview"` dentro de um script que também tem essa string em outro lugar), o próprio processo que interpreta o script casa com o padrão e morre no meio — comandos depois dele nunca rodam, sem nenhum output. Preferir `kill <PID>` específico (via `ps`/`lsof`/`ss -ltnp`) em vez de `pkill -f` com padrões que apareçam no próprio comando.
- **Cache de imagem do Astro (`node_modules/.astro/assets/`) não invalida sempre que `width`/`height` do `<Image>` muda** — rebuild reaproveitou uma transformação antiga ("reused cache entry") mesmo depois de mudar as props. Se uma mudança em `<Image>` não aparecer no build, apagar essa pasta antes de rebuildar.
- **`astro dev` neste ambiente às vezes não pega mudança de arquivo via HMR/file-watch** (provável limitação de inotify em filesystem de sandbox) — quando uma edição não aparece no navegador, matar o processo e subir `astro dev` de novo em vez de confiar no watch.

## Pendências que bloqueiam o ship (não bloqueiam o dev)

- Domínio próprio (usando placeholder `agenciafvx.com.br` em `astro.config.mjs` e `src/lib/constants.ts`, marcado `TODO(domínio)`).
