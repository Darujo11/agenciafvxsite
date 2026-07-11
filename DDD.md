# DDD — agenciaFVX

**Documento de Design e Desenvolvimento — Site institucional da agenciaFVX**

> Este documento é a instrução completa para a criação do site. Ele complementa o `CLAUDE.md` global (padrão world-class) e o `CLAUDE.md` do projeto. Quem executa deve seguir este documento como fonte da verdade de produto, marca e escopo. Decisões finais de stack passam por `/hm-init`; validações finais passam por `/hm-designer`, `/hm-engineer` e `/hm-qa`.

---

## 1. Visão

A **agenciaFVX** é uma agência digital full-stack: constrói presença digital (sites e landing pages), produtos (apps personalizados), crescimento (gestão de tráfego) e inteligência (automações, chatbots e agentes de IA).

O site institucional é a **prova viva do serviço**. Se a agência vende sites world-class, o site dela precisa ser o melhor site que o visitante viu naquele dia. Performance, design e copy do próprio site são o portfólio.

**Objetivo de negócio:** converter visitantes em conversas no WhatsApp. Toda a jornada do site termina em um clique para o WhatsApp.

**Público:** donos de negócio locais e regionais (região do DDD 22 e além), empreendedores digitais e empresas que querem modernizar operação com IA. Nível técnico baixo a médio — a copy vende resultado, não tecnologia.

---

## 2. Domínio e linguagem ubíqua

Termos canônicos do domínio — usar exatamente estes nomes em código, copy e componentes:

| Termo (código) | Nome na interface                    | Definição                                                                                       |
| -------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `servico`      | Serviço                              | Uma das 6 ofertas da agência (lista fechada abaixo)                                             |
| `lead`         | —                                    | Visitante que clicou em um CTA de contato                                                       |
| `cta-whatsapp` | "Fale com a gente" / "Começar agora" | Link para o WhatsApp com mensagem pré-preenchida                                                |
| `case`         | Projeto                              | Trabalho entregue, exibido como prova social                                                    |
| `processo`     | Como trabalhamos                     | As etapas do trabalho da agência (diagnóstico → proposta → execução → entrega → acompanhamento) |

### Os 6 serviços (lista fechada, nesta ordem)

1. **Sites institucionais** — presença digital profissional que gera autoridade e confiança.
2. **Landing pages** — páginas de alta conversão para campanhas, lançamentos e captura de leads.
3. **Apps personalizados** — sistemas e aplicativos sob medida para o processo do cliente.
4. **Gestão de tráfego** — campanhas pagas (Meta Ads, Google Ads) com foco em retorno mensurável.
5. **Automações** — integração de ferramentas e eliminação de trabalho manual repetitivo.
6. **Chatbots e agentes inteligentes** — atendimento e vendas 24/7 com IA (chatbot estruturado e agente de IA conversacional).

> Chatbot e agente inteligente são apresentados como **um serviço com dois níveis** (estruturado vs. IA generativa), não como dois cards separados — evita canibalização e confusão na oferta.

---

## 3. Arquitetura de informação

Site de **página única (one-page)** com âncoras, mais páginas legais. Justificativa: a jornada é curta (conhecer → confiar → chamar no WhatsApp); paginação fragmentaria a narrativa e pioraria a conversão.

### Estrutura da home (ordem das seções)

1. **Header** — fixo, translúcido com blur. Logo "FVX" à esquerda; âncoras (Serviços, Como trabalhamos, Projetos, Contato) e CTA WhatsApp à direita. Em mobile: menu em tela cheia com animação.
2. **Hero** — afirmação forte de posicionamento. Título editorial grande (ex.: _"Seu negócio, em outro nível digital."_), subtítulo com os 3 pilares (presença, crescimento, inteligência), CTA primário WhatsApp + CTA secundário âncora para serviços. Fundo com elemento visual próprio (gradiente animado sutil, malha, ou tipografia cinética — **nunca** ilustração de banco de imagem).
3. **Prova rápida** — faixa fina com números/afirmações (ex.: "Resposta em minutos", "Projetos sob medida", "IA aplicada a negócios reais"). Sem inventar métricas falsas — usar afirmações verdadeiras.
4. **Serviços** — grid dos 6 serviços. Cada card: ícone próprio (traço fino, consistente), nome, uma frase de resultado, micro-CTA. Hover com elevação/glow sutil.
5. **Como trabalhamos** — 4 etapas numeradas (Diagnóstico → Proposta → Execução → Acompanhamento), layout horizontal em desktop, vertical em mobile.
6. **Projetos** — seção preparada com placeholder elegante (ex.: "Portfólio em curadoria — peça exemplos no WhatsApp") até existirem cases reais. A estrutura de dados dos cases já deve existir no código.
7. **CTA final** — seção de fechamento em tela cheia com pergunta direta (ex.: _"Pronto pra tirar seu projeto do papel?"_) e botão WhatsApp grande.
8. **Footer** — ver seção 4 (requisitos obrigatórios).

### Páginas adicionais

- `/privacidade` — política de privacidade (obrigatória por causa de tráfego pago/LGPD).
- `404` — página de erro com a mesma identidade e CTA de volta.

---

## 4. Contatos e links — REQUISITOS OBRIGATÓRIOS

Estes itens são **critério de aceite**, não sugestão:

- **WhatsApp:** número `22 99224-2189`. Todo CTA de contato e o link do rodapé apontam para:
  `https://wa.me/5522992242189?text=Ol%C3%A1!%20Quero%20falar%20sobre%20um%20projeto%20com%20a%20agenciaFVX.`
  (mensagem pré-preenchida ajustável por CTA — ex.: o card de tráfego pode pré-preencher "Quero falar sobre gestão de tráfego").
- **Instagram:** `@agenciafvx` → `https://instagram.com/agenciafvx` (abrir em nova aba, `rel="noopener noreferrer"`).
- **Rodapé contém, no mínimo:** logo/nome, frase de posicionamento curta, link do WhatsApp com o número formatado visível **(22) 99224-2189**, ícone + handle do Instagram, links das âncoras, link da política de privacidade e copyright `© {ano corrente} agenciaFVX`.
- Botão flutuante de WhatsApp discreto (canto inferior direito), visível após rolar além do hero — sem atrapalhar a leitura, sem animação chamativa em loop.

---

## 5. Copy base (PT-BR)

Tom de voz: direto, confiante, sem jargão técnico desnecessário, sem clichê de agência ("soluções inovadoras", "alavancar", "mundo cada vez mais digital" — proibidos). Frases curtas. Vende resultado.

Copy de partida por serviço (refinável, mas manter a essência):

- **Sites institucionais** — "Um site que passa a confiança que seu negócio merece. Rápido, bonito e feito pra aparecer no Google."
- **Landing pages** — "Páginas construídas com um único objetivo: transformar visitante em cliente."
- **Apps personalizados** — "Seu processo não cabe em ferramenta pronta? A gente constrói a ferramenta certa."
- **Gestão de tráfego** — "Anúncio bom é anúncio que dá retorno. Campanhas no Google e no Instagram com resultado medido de verdade."
- **Automações** — "O trabalho repetitivo, a gente entrega pras máquinas. Seu tempo volta pra onde importa."
- **Chatbots e agentes inteligentes** — "Atendimento que não dorme. Do chatbot que organiza ao agente de IA que conversa, qualifica e vende."

---

## 6. Stack técnica (recomendação — validar com `/hm-init`)

Recomendação para o `/hm-init` partir dela (e só divergir com justificativa melhor):

- **Framework:** **Astro 5** com ilhas React apenas onde há interatividade (menu mobile, animações). Justificativa: site institucional é conteúdo estático — Astro entrega HTML puro, Lighthouse ~100, zero JS desnecessário. Para uma agência que vende performance, o próprio site precisa ser imbatível em performance. Next.js seria aceitável, mas carrega runtime que este site não precisa.
- **Estilo:** Tailwind CSS v4.
- **Animação:** Motion (Framer Motion) nas ilhas + CSS `@media (prefers-reduced-motion)` respeitado em tudo.
- **Fontes:** self-hosted via `@fontsource` ou arquivos locais (nunca Google Fonts via CDN — performance e LGPD). Sugestão de par: uma display editorial (ex.: _Instrument Serif_, _Fraunces_ ou similar) + uma sans neutra de qualidade (ex.: _Inter_, _Geist_).
- **Deploy:** Vercel ou Cloudflare Pages (decidir no `/hm-init`; Cloudflare Pages tem edge global e custo zero — bom default).
- **Sem CMS nesta fase.** Conteúdo em arquivos (Markdown/JSON tipado). Cases como coleção de conteúdo do Astro, prontos para crescer.
- **Git desde o primeiro commit**, com histórico limpo e mensagens em português.

---

## 7. Design system

Dark-first, editorial, cinematográfico. Referências: Linear (estrutura), Vercel (contraste e tipografia), Stripe (profundidade sutil). **Se parecer template, reprovou.**

### Paleta (ponto de partida — refinar no build)

| Token          | Valor sugerido                           | Uso                                                          |
| -------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `--bg`         | `#0A0A0B`                                | Fundo base (quase-preto, não preto puro)                     |
| `--surface`    | `#131316`                                | Cards e superfícies elevadas                                 |
| `--border`     | `#26262B`                                | Bordas hairline (1px)                                        |
| `--text`       | `#F4F4F5`                                | Texto principal                                              |
| `--text-muted` | `#A1A1AA`                                | Texto secundário                                             |
| `--accent`     | violeta-elétrico ou verde-lima a definir | CTAs, detalhes, glow. **Um** acento só, usado com disciplina |

- Verificar contraste WCAG AA em todos os pares texto/fundo.
- Gradientes apenas como atmosfera (glow radial atrás do hero, por exemplo), nunca como fundo de card genérico.

### Tipografia

- Display: tamanho generoso no hero (clamp fluido, ~3.5rem a 6rem), tracking apertado, quebras de linha intencionais.
- Corpo: 16–18px, line-height 1.6, largura máxima de leitura ~65ch.
- Hierarquia por tamanho e peso, não por cor.

### Motion

- Entradas por scroll: fade + translate curto (≤16px), uma vez só, com stagger nos grids.
- Hover states em tudo que é clicável. Transições 150–250ms, easing custom.
- Nada de parallax pesado, nada de animação em loop infinito chamando atenção.

---

## 8. Requisitos não-funcionais

- **Performance:** Lighthouse ≥ 95 em todas as categorias (mobile). LCP < 2.0s em 4G. Imagens em AVIF/WebP com `srcset`. Zero layout shift (CLS < 0.05).
- **SEO:** meta tags completas, Open Graph com imagem própria da marca, `sitemap.xml`, `robots.txt`, dados estruturados JSON-LD (`Organization` + `LocalBusiness` com o telefone e Instagram), títulos semânticos (um `h1` só).
- **Acessibilidade:** navegação completa por teclado, `aria-label` nos links de ícone (WhatsApp, Instagram), foco visível, `prefers-reduced-motion` respeitado.
- **Segurança:** headers (CSP, X-Content-Type-Options, Referrer-Policy), sem dependência desnecessária, sem tracking de terceiros nesta fase (quando entrar pixel de Meta/Google para tráfego, condicionar a consentimento LGPD).
- **Idioma:** `lang="pt-BR"`, todo o conteúdo em português.
- **Responsivo:** mobile-first de verdade — a maioria dos leads vem de Instagram/WhatsApp, ou seja, mobile.

---

## 9. Roteiro de execução (para o Claude do `c:\claude-lab`)

Executar nesta ordem, sem pular etapas:

1. **`/hm-init`** — validar/decidir a stack partindo da recomendação da seção 6. Criar estrutura do projeto, git, tooling (lint, format, build). Preencher as seções "Sobre este projeto" e "Design deste produto" do `CLAUDE.md` do projeto com as decisões tomadas aqui.
2. **Design tokens e base** — implementar paleta, tipografia, espaçamento e componentes base (botão, card, container, section) antes de qualquer seção.
3. **Seções na ordem da seção 3** — header e footer primeiro (esqueleto completo navegável), depois hero, serviços, processo, projetos, CTA final.
4. **Conteúdo e SEO** — copy final (seção 5 como base), meta tags, JSON-LD, OG image, sitemap, robots, página de privacidade e 404.
5. **`/hm-designer`** — auditoria visual contra a seção 7. Corrigir tudo que reprovar.
6. **`/hm-engineer`** — auditoria de código, performance e segurança contra a seção 8.
7. **`/hm-qa`** — testar: todos os links (WhatsApp abre com mensagem correta, Instagram abre o perfil), âncoras, menu mobile, teclado, reduced-motion, Lighthouse mobile.
8. **Deploy** — publicar, validar produção com Lighthouse real, configurar domínio quando existir.

---

## 10. Critérios de aceite (checklist final)

- [ ] Os 6 serviços aparecem na home, na ordem e com a copy da essência definida
- [ ] Todo CTA de contato abre `wa.me/5522992242189` com mensagem pré-preenchida
- [ ] Rodapé tem o número **(22) 99224-2189** visível e clicável + Instagram `@agenciafvx`
- [ ] JSON-LD `LocalBusiness` com telefone `+5522992242189` e link do Instagram
- [ ] Lighthouse mobile ≥ 95 nas quatro categorias
- [ ] Zero texto em inglês na interface
- [ ] Não parece template — passou no `/hm-designer`
- [ ] `/hm-engineer` e `/hm-qa` sem pendência aberta
- [ ] Site publicado e acessível

---

_Documento vivo — atualizar quando cases reais, domínio próprio e identidade visual definitiva existirem._
