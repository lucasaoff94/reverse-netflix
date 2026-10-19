# Referência, evidências e decisões

## Integração oficial do REA

Fonte consultada: https://github.com/morluto/rea, commit `808339f0b1cf3837445f392b5d5f1f362d64a27d`, README, `docs/installation.md` e `docs/browser-observation.md`.

`codex mcp list` inicialmente não apresentava servidores. O plano somente leitura foi obtido com:

```sh
npx -y rea-agents@6.5.0 setup --client codex --dry-run --json
```

O usuário aprovou os dois destinos globais mostrados no plano. O setup foi aplicado pelo comando oficial com `--client codex --yes --json`, usando a permissão de escrita necessária. Resultado: `status: ready`, `configured_codex`, `installed_skill`, registro e skill alinhados, `doctor.healthy: true`. O registro aponta para `npx -y rea-agents@6.5.0 mcp`. Não foram instalados Hopper, Ghidra ou outros analisadores nativos. A saúde global de engines binárias não se aplica à observação web.

Arquivos geridos pelo setup: `/run/codex-environment/codex-home/config.toml` e `/home/agent/.agents/skills/reverse-engineer-anything`. O registro é do cliente desta máquina; não implica instalação em outro computador ou disponibilidade retroativa de ferramentas na conversa já aberta. A documentação oficial exige reiniciar/reconectar o cliente. A CLI equivalente foi utilizada sem reiniciar esta conversa.

## Acesso à referência pública

Alvo: https://www.netflix.com/br/. Somente navegação pública; nenhuma autenticação, coleta de código interno ou contorno de acesso.

Evidências obtidas:

1. HTTPS retornou `CONNECT tunnel failed, response 403`.
2. Chromium retornou `net::ERR_TUNNEL_CONNECTION_FAILED`.
3. REA `list-browser-targets` reconheceu o alvo solicitado no Chromium, mas isso **não comprova carregamento**: o navegador pode manter o URL da navegação que falhou. Evidence ID: `ev_d2c9a69bf4f1a7cdc50175f9a194c59bfa3fb00236fb830157ef91a9b7e7101a`.
4. REA `inspect-web-page` não capturou o conteúdo, retornando `target_unavailable / target_not_allowed` após a falha de navegação.

Os domínios `netflix.com` e `www.netflix.com` foram adicionados ao rascunho de rede para revisão. Salvar o rascunho não aplica sua política à máquina atual. A análise visual ao vivo permanece pendente da liberação de acesso.

Não foram verificados a fonte exata, tokens de cores, medidas, breakpoints, imagens, número de cards, hover ou transições atuais da Netflix. A página pública de aquisição também não deve ser confundida com o catálogo autenticado. Não foram inferidos comportamentos privados a partir dela.

## Direção original implementada no LUME

As decisões abaixo pertencem ao projeto; não são medições da Netflix:

| Aspecto | Implementação LUME |
| --- | --- |
| Hierarquia | Navegação discreta, destaque cinematográfico, ações, gêneros, catálogo, coleção editorial, rodapé |
| Paleta | Carvão `#101111`, texto `#f3f0e9`, âmbar `#e6b275`, metadados em tons cinza e verde |
| Tipografia | Georgia nos títulos editoriais; Arial/Helvetica na interface; sem dependência de fontes externas |
| Proporções | Banner de 710 px no desktop; cards aproximadamente 1.72:1; espaçamento lateral de 5% |
| Cabeçalho | Marca LUME, início, filmes, séries, minha lista, busca e indicador de perfil local |
| Catálogo | 12 títulos fictícios em 6 gêneros; carrosséis horizontais e grades filtráveis |
| Interação | Hover com zoom sutil e borda âmbar; setas de rolagem; controles sempre disponíveis para toque |
| Movimento | Transições curtas, seleção manual de destaque e suporte a `prefers-reduced-motion` |
| Responsividade | Reorganização em 1100, 760 e 380 px; carrosséis mostram o próximo card parcialmente no celular |
| UX | Busca sem acentos, estados vazios, favoritos locais, detalhes próprios e demonstração claramente identificada |

## Validação

Build de produção e checagem TypeScript executados. A suíte real de navegador verifica home e imagens, carrosséis, seleção de destaque, favoritos e persistência após recarga, remoção e estado vazio, busca sem acentos, busca sem resultados, 404, gêneros e ordenação, filmes/séries, detalhes/episódios, decodificação e reprodução/pausa/seek do vídeo, Escape/foco, responsividade e erros de execução.

Capturas são produzidas pelo navegador em `test-results/`. Favoritos são dados locais de demonstração. Não há requisições externas de conteúdo na aplicação.
