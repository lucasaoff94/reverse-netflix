# LUME — Histórias que ficam

Protótipo funcional de streaming com Next.js 15, React 19, TypeScript e Tailwind CSS 4. Identidade original em carvão e âmbar, 12 títulos fictícios e imagens locais; não requer chaves, banco de dados ou serviços externos.

## Desenvolvimento

Node.js 24.19 e npm 11.9 foram usados na validação deste ambiente.

```sh
cd /workspace/reverse-netflix
npm ci --no-audit --no-fund
npm run dev -- --port 3000
```

O agente pode iniciar e testar tudo diretamente. O processo de desenvolvimento precisa reiniciar em uma nova máquina; as instruções estão salvas no `start_skill` do ambiente. Use o checkout existente: cada tarefa de nuvem já é isolada e não precisa de worktree.

## Recursos

- Destaque com três seleções manuais e arte cinematográfica original.
- Catálogo por gênero, filmes e séries, ordenação e carrosséis horizontais com setas, toque e rolagem nativa.
- Busca por título, gênero, sinopse e tags, sem distinção de maiúsculas ou acentos.
- Rotas individuais `/titulo/[slug]`, recomendações e episódios ilustrativos.
- Minha lista persistida em `localStorage`, sem conta e sem sincronização entre dispositivos.
- Player HTML5 com play/pause, busca temporal, volume, tela cheia e legendas descritivas. Modal fecha por Escape e devolve o foco ao botão de abertura.
- Layout responsivo, foco visível e preferência de movimento reduzido.

`/sobre` explica o conteúdo fictício e o tratamento local dos favoritos. Os metadados de duração, ano, classificação e “98% para você” são ilustrativos. Todos os títulos/episódios reproduzem a mesma animação demonstrativa original de 20 segundos. Não são filmes completos nem trailers reais.

## Verificação

```sh
npm run typecheck
npm run build
# Com o servidor executando:
npm run test:e2e
```

Os testes usam `/usr/bin/chromium`; `CHROMIUM_PATH` permite escolher outro Chromium. Em outra máquina, instale o navegador pelo procedimento oficial do Playwright se necessário. `LUME_BASE_URL` define um servidor alternativo. Capturas de desktop, celular, detalhes e player são produzidas em `test-results/` (ignorado pelo Git).

## REA e referência visual

Consulte [a análise e suas limitações](docs/reference-analysis.md). O setup oficial do REA 6.5.0 foi aplicado com aprovação global explícita e verificado pelo próprio instalador. O MCP só fica disponível em uma sessão que recarregue a configuração; a CLI foi usada nesta sessão. Engines de análise binária não são necessárias para este projeto.

A página pública da Netflix foi tentada por HTTPS, Chromium e REA/CDP; o proxy bloqueou o acesso. Este projeto não apresenta medidas ou comportamentos não observados como uma análise concluída da Netflix. A implementação explora padrões comuns de interfaces de streaming com identidade e conteúdo próprios.

## Arquitetura e conteúdo

- `lib/catalog.ts`: títulos, sinopses, tags e metadados fictícios.
- `components/`: navegação, catálogo, carrosséis, detalhes, player e estado da lista.
- `app/`: rotas, estilos e metadados.
- `public/art/`: ilustrações originais SVG e cenário gerado por IA para este projeto.
- `public/media/`: vídeo local original e legendas.
- `tests/smoke.mjs`: validação funcional real no Chromium.

O cenário cinematográfico foi gerado para o projeto. As ilustrações vetoriais foram desenhadas para o LUME; o vídeo anima o cenário com zoom e texto da marca própria. Nenhum arquivo visual, filme ou marca da Netflix está incluído. Lucide fornece ícones sob licença ISC. As dependências mantêm suas próprias licenças.

Não há backend, autenticação, cobrança, DRM ou catálogo de streaming de produção. Esses componentes exigem uma etapa própria de produto e infraestrutura.

## GitHub Pages — alternativa sem Vercel

A versão estática foi validada no caminho `/reverse-netflix/`. Ela mantém catálogo, detalhes, busca e vídeo, sem servidor Node em produção.

```sh
npm run build:pages
python3 scripts/serve-pages.py
# Em outro terminal, ou executados pelo agente:
LUME_BASE_URL=http://127.0.0.1:4173/reverse-netflix npm run test:e2e
npm run test:pages
```

O simulador serve exclusivamente `out/`, com 404 estático e requisições parciais de mídia. Ele não executa o Next.js e não é servidor de produção. O GitHub Pages serve os arquivos por CDN.

O workflow `.github/workflows/pages.yml` prepara e publica `out/` em pushes para `main`, usando o token temporário do próprio GitHub Actions, sem token Vercel. A configuração do repositório deve usar **Settings → Pages → Source: GitHub Actions**. Para Pages gratuito no GitHub Free, o repositório precisa ser público. Não alterar a visibilidade de um repositório privado sem decisão explícita do usuário.

Neste ambiente a API do GitHub está bloqueada, e o remoto ainda não tem commits; por isso não foi possível verificar visibilidade/plano, ativar Pages ou executar o workflow no GitHub. Nenhuma publicação remota foi realizada. Os arquivos estão preparados localmente. Consulte `docs/github-pages-validation.md`.

`npm run build` continua produzindo a versão de servidor Next.js; `npm run build:pages` produz exportação estática e substitui os artefatos de `.next/`. Não rodar os dois builds, ou um build e `next dev`, simultaneamente. Após build estático, servir `out/`; `next start` requer um novo build normal.
