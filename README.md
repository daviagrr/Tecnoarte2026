# Neurociência • Tecnoarte

Site educativo sobre a pergunta **Como o cérebro é capaz de aprender?** Usa React, TypeScript, TanStack Start, Vite, Tailwind CSS e GSAP.

## Rodar localmente

Requer Node.js e npm atuais.

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. Verificações:

```bash
npm run typecheck
npm run build
```

## Estrutura

- `src/routes`: páginas, seleção dos jogos, rotas diretas dos dois jogos e documento raiz.
- `src/components`: navegação, layout e gráficos compartilhados.
- `src/content`: textos científicos e referências.
- `src/game/engine.ts`: símbolos, códigos, regras e medidas.
- `src/game/GameScreens.tsx`: etapas visuais do jogo.
- `src/game/GameExperience.tsx`: fluxo, estado, teclado, pistas e animações.
- `src/color-game`: regras, interface, feedback e medidas do jogo de palavra e tinta.
- `src/styles.css`: tokens Tailwind e efeitos globais pontuais.

## Experiência da feira

Há dois jogos independentes, próprios para abrir um em cada computador: `/jogo/codigo` e `/jogo/cores`. A página `/jogo` apresenta as duas opções.

Em **Código secreto**, o visitante monta seis códigos de três símbolos distribuídos em três portas. Os códigos são sorteados a cada partida; uma entrada da primeira porta reaparece na terceira para destacar a mudança. Nas duas primeiras, cada símbolo avança uma posição no circuito. Na terceira, a direção se inverte. Cada tentativa informa quantas posições estão corretas. Erros são contados mesmo quando a pessoa refaz o código. Há até quatro tentativas por código; então a resposta é revelada para a experiência continuar. Uma pista fica disponível após duas tentativas ou 18 segundos.

Em **Cor ou palavra?**, a pessoa vê palavras coloridas e escolhe primeiro a cor da tinta. Depois palavra e tinta discordam; na última etapa, a instrução passa a pedir a palavra escrita. Há 12 escolhas e feedback a cada uma, sem contagem regressiva. Ambos os jogos aceitam toque, mouse e teclado.

Cada resultado mostra somente as escolhas daquela partida. As explicações relacionam atenção, memória da regra, feedback e adaptação aos conceitos de neurônios, sinapses e neuroplasticidade. As experiências se inspiram em pesquisas sobre aprendizagem de regras e interferência entre palavra e tinta, sem reproduzir testes clínicos, medir o cérebro ou fazer avaliação psicológica.

Nada da nova partida é salvo no navegador. O botão final limpa o resultado para a próxima pessoa; as telas também voltam ao início após 90 segundos. Não há conta, histórico ou placar coletivo.

## Hospedagem

A configuração usa **prerenderização estática** do TanStack Start para as oito rotas. O Dockerfile faz o build com Node e serve `dist/client` com Nginx na porta 3000; não é necessário um processo Node em produção. O Nginx serve diretamente caminhos como `/jogo/codigo` e retorna 404 para rotas desconhecidas.

Na VPS com Docker instalado:

```bash
docker build -t tecnoarte-neurociencia .
docker run -d --name tecnoarte-site --restart unless-stopped -p 3000:3000 tecnoarte-neurociencia
```

Abra `http://IP-DA-VPS:3000`. Para conferir o estado, use `docker ps` e `docker logs tecnoarte-site`. Neste computador, o mesmo Dockerfile foi construído e executado com Podman porque a sessão atual não tem permissão de acesso ao daemon Docker:

```bash
podman build --format docker -t tecnoarte-neurociencia:local .
podman run -d --name tecnoarte-site -p 3000:3000 localhost/tecnoarte-neurociencia:local
```

O contêiner local está disponível em `http://localhost:3000`. Nenhum deploy na VPS foi feito por este projeto.

### Coolify na VPS

O deploy do commit `c3eadbf` tentou usar **Railpack**. Esse commit ainda não contém `Dockerfile`, `.dockerignore` e `nginx.conf`; eles precisam fazer parte de um novo commit enviado ao repositório antes de um novo deploy. Não cole o Dockerfile na opção “Dockerfile sem Git”, pois os comandos `COPY` precisam dos arquivos do repositório.

Na aplicação conectada ao repositório Git, configure:

1. **Build Pack:** `Dockerfile` (em vez de Railpack).
2. **Branch:** a branch que receber o novo commit; **Base Directory:** `/`; **Dockerfile Location:** `Dockerfile` na raiz.
3. **Ports Exposes:** `3000`, a porta interna do Nginx. O domínio pode usar HTTPS normalmente pelo proxy do Coolify.
4. Salve e faça um novo deploy somente depois de confirmar que o commit escolhido contém os três arquivos de implantação.

No log do novo deploy, devem aparecer as etapas `FROM node:22-bookworm-slim` e `FROM nginx:stable-alpine`. Se ainda aparecer “Building docker image with Railpack”, o Build Pack não foi alterado. Se o build passar mas o domínio falhar, confira a porta interna `3000`, os logs do contêiner e o healthcheck.

## Conteúdo pendente

- Capturas ou exportações do Figma para conferir fidelidade visual; a API retornou limite de chamadas.
- O slide `Neurociencia.pdf`, fornecido em `/home/davi/Downloads`, foi lido. A página Equipe usa os nomes do slide “Composição”; confirme com o grupo antes de publicar.
- Funções e imagens autorizadas da equipe, se o grupo quiser acrescentá-las.
- Provedor e domínio de hospedagem.

As referências científicas verificáveis estão na página Referências do site.
