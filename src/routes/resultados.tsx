import { Link, createFileRoute } from '@tanstack/react-router'
import { PageShell, SectionTitle } from '../components/Layout'

export const Route = createFileRoute('/resultados')({ component: Results })

function Results() {
  return <PageShell><main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
    <SectionTitle title="O que um resultado pode mostrar?">Cada jogo explica as escolhas da partida que acabou. Nada é guardado para a próxima pessoa.</SectionTitle>
    <div className="mt-16 grid gap-6 lg:grid-cols-2">
      <article data-scroll className="rounded-2xl border border-cyan/35 bg-panel/70 p-7 sm:p-9"><span className="text-sm font-bold tracking-[.15em] text-cyan uppercase">Código secreto</span><h2 className="mt-4 text-2xl font-bold text-ice">Descobrir e adaptar uma regra</h2><p className="mt-4 leading-relaxed text-mist">O resultado informa códigos encontrados, erros, tentativas e pistas usadas. As três portas mostram como uma regra pode ser aplicada e depois modificada.</p><Link to="/jogo/codigo" className="mt-7 inline-flex font-bold text-cyan underline underline-offset-4">Abrir Código secreto ↗</Link></article>
      <article data-scroll className="rounded-2xl border border-violet/35 bg-panel/70 p-7 sm:p-9"><span className="text-sm font-bold tracking-[.15em] text-violet uppercase">Cor ou palavra?</span><h2 className="mt-4 text-2xl font-bold text-ice">Selecionar o detalhe pedido</h2><p className="mt-4 leading-relaxed text-mist">O resultado informa acertos e erros em cada etapa. A atividade mostra o que aconteceu quando palavra e tinta entraram em conflito e quando a instrução mudou.</p><Link to="/jogo/cores" className="mt-7 inline-flex font-bold text-violet underline underline-offset-4">Abrir Cor ou palavra? ↗</Link></article>
    </div>
    <section data-scroll className="mt-16 grid gap-10 rounded-2xl border border-line bg-panel p-8 sm:p-12 md:grid-cols-[.6fr_1fr]"><h2 className="text-3xl font-bold tracking-[-.03em]">Como ler essas medidas</h2><div className="space-y-5 leading-relaxed text-mist"><p>Os números descrevem somente respostas dadas ali. Atenção, familiaridade, cansaço, percepção das cores e o aparelho usado podem influenciar as escolhas.</p><p>Os jogos ilustram atenção, feedback e adaptação. Eles não mostram como as sinapses da pessoa mudaram; a neurociência estuda esses processos com métodos próprios.</p><p className="text-sm">As experiências não medem QI, inteligência ou saúde cerebral, não oferecem diagnóstico e não substituem avaliação profissional.</p></div></section>
    <div className="mt-10 flex flex-wrap gap-5"><Link to="/jogo" className="inline-flex min-h-13 items-center rounded-lg bg-cyan px-6 py-3 font-bold text-ink hover:bg-ice">Escolher um jogo ↗</Link><Link to="/pesquisas" className="inline-flex min-h-13 items-center rounded-lg border border-cyan/45 px-6 py-3 font-bold text-cyan hover:bg-cyan/10">Entender a ciência</Link></div>
  </main></PageShell>
}
