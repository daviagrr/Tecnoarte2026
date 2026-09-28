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

A hospedagem do grupo ainda não foi informada. A configuração usa **prerenderização estática** do TanStack Start para as oito rotas. Após `npm run build`, `dist/client` pode ser hospedado em um serviço estático que sirva caminhos como `/jogo/codigo/index.html`. Confirme o suporte a caminhos e fallback do provedor antes de publicar. O site não foi publicado.

## Conteúdo pendente

- Capturas ou exportações do Figma para conferir fidelidade visual; a API retornou limite de chamadas.
- O slide `Neurociencia.pdf`, fornecido em `/home/davi/Downloads`, foi lido. A página Equipe usa os nomes do slide “Composição”; confirme com o grupo antes de publicar.
- Funções e imagens autorizadas da equipe, se o grupo quiser acrescentá-las.
- Provedor e domínio de hospedagem.

As referências científicas verificáveis estão na página Referências do site.
