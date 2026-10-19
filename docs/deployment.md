> Atualização: a alternativa Vercel abaixo é histórica. O usuário optou por validar GitHub Pages; consulte github-pages-validation.md. Nenhum token Vercel é necessário para esse caminho.

# Publicação navegável pendente

O usuário solicitou explicitamente um link público para acessar o LUME. O servidor local foi novamente verificado (HTTP 200), mas não há ferramenta de preview público nesta interface. A tentativa HTTPS ao endpoint oficial de túneis temporários `api.trycloudflare.com` recebeu HTTP 403 do proxy; nenhum túnel foi criado.

A rota escolhida é publicar um preview Next.js na Vercel. Não foi encontrada credencial VERCEL_TOKEN no processo, binding salvo de Vercel ou configuração local de login/projeto. Foi registrado o requisito VERCEL_TOKEN para preenchimento seguro nas configurações do ambiente, com destino api.vercel.com. Também foram propostos os domínios api.vercel.com, vercel.com e *.vercel.app, preservando os domínios anteriores.

Após o usuário salvar a credencial e as configurações:

1. Rechecar presença da variável pelo nome, sem imprimir seu valor, e testar uma operação autenticada de leitura da API oficial da Vercel. A existência de placeholder do proxy não prova credencial inválida; utilizar o destino HTTPS configurado.
2. Confirmar a conta/equipe acessível. Usar um projeto novo chamado lume-streaming ou equivalente disponível; não sobrescrever projetos existentes sem verificar identidade. Usar Node.js 24.x, npm ci e Next.js detectado automaticamente. Não é necessário publicar no GitHub para enviar os arquivos à hospedagem.
3. Publicar o código como preview público, conforme já solicitado pelo usuário, sem desativar proteções de outros projetos nem expor credenciais no frontend. A aplicação não precisa de segredos em runtime.
4. Aguardar o build remoto, verificar o endereço retornado pela plataforma com requisições HTTP e pelo Chromium, exercitar pelo menos navegação, busca e mídia local. Entregar somente a URL efetivamente retornada e validada, nunca inventar um domínio.

Ainda não foi criado projeto, deployment ou link público. Salvar o rascunho do ambiente não é hospedar o site. Publicar o ambiente Codex também não torna automaticamente o aplicativo público.

## Revisão antes da publicação

Na revisão atual, 45 arquivos foram inspecionados fora de dependências, build, metadados Git e capturas de teste. Nenhum padrão de credencial, arquivo sensível conhecido ou link simbólico foi encontrado. É uma verificação por padrões e inspeção do conteúdo do projeto, não uma garantia absoluta sobre quaisquer arquivos adicionados depois. A aplicação usa apenas catálogo fictício e mídias originais locais.

O arquivo .vercelignore exclui histórico Git, dependências locais, builds, documentação do ambiente, testes, capturas, credenciais e configurações locais. A pasta .vercel também foi adicionada ao .gitignore. Antes de enviar, repetir a revisão no conjunto exato de arquivos do deployment. Nunca enviar o token como variável NEXT_PUBLIC_ ou como configuração de runtime do aplicativo.

A API da Vercel está agora acessível por HTTPS. A configuração do ambiente declara VERCEL_TOKEN, mas has_saved_binding é false e a variável não está injetada no processo. Ainda não há autorização de conta utilizável.

## Conta e custos

Usar exclusivamente o plano Hobby gratuito para este protótipo pessoal. Não iniciar teste Pro, criar assinatura, contratar domínio, adicionar banco pago ou habilitar cobrança por uso. Depois da autenticação, verificar o plano da conta/equipe antes de criar o projeto. Se o destino acessível não permitir publicação gratuita, parar e informar o requisito em vez de contratar.

O usuário cria uma conta gratuita em https://vercel.com/signup e gera um token pessoal em https://vercel.com/account/settings/tokens. O valor deve ser inserido somente no segredo VERCEL_TOKEN nas configurações seguras do ambiente Codex. A integração envia credenciais somente ao destino HTTPS autorizado api.vercel.com; não registrar valores em logs ou arquivos. Salvar a configuração e aguardar propagação antes de testar novamente a autenticação.

## Atualizações do mesmo site

Após a primeira publicação bem-sucedida, preservar a identidade projectId/orgId em .vercel/project.json (metadados locais, sem credenciais). Registrar a URL real retornada no resultado e reutilizar o projeto nos próximos deploys. A URL principal deve apontar para o deployment de produção aprovado; previews intermediários podem ter URLs distintas. O usuário já autorizou publicar a aplicação e atualizar esse mesmo site. A cada alteração, validar localmente, revisar arquivos enviados, publicar no projeto existente e verificar a URL HTTPS principal. Não criar um projeto novo a cada revisão.
