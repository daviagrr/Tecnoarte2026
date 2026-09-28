import { Link, Outlet, createFileRoute, useRouterState } from '@tanstack/react-router'
import { PageShell, SectionTitle } from '../components/Layout'
import { CircuitMap, SymbolGlyph } from '../game/SymbolGlyph'
import { symbols } from '../game/engine'

export const Route = createFileRoute('/jogo')({ component: Games })

function Games() {
  const path = useRouterState({ select: state => state.location.pathname })
  if (path !== '/jogo') return <Outlet/>
  return <PageShell className="game-glow"><main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
    <SectionTitle title="Duas maneiras de experimentar a aprendizagem.">Escolha uma atividade. Cada computador do estande pode abrir um jogo diretamente; as partidas e os resultados ficam separados.</SectionTitle>
    <div className="mt-14 grid gap-6 lg:grid-cols-2">
      <article data-scroll className="flex min-w-0 flex-col rounded-2xl border border-cyan/35 bg-panel/75 p-6 sm:p-9">
        <span className="text-sm font-bold tracking-[.16em] text-cyan uppercase">01 / Descobrir uma regra</span>
        <h2 className="mt-4 text-3xl font-bold tracking-[-.03em] text-ice">Código secreto</h2>
        <p className="mt-4 max-w-[52ch] leading-relaxed text-mist">Monte códigos de símbolos, use o retorno de cada tentativa e adapte sua ideia quando o circuito mudar de direção.</p>
        <div className="mt-8 rounded-xl border border-line bg-ink/45 p-4"><div className="grid grid-cols-4 gap-2 sm:hidden" aria-label="Quatro símbolos do circuito">{symbols.map(symbol => <span key={symbol} className="grid size-12 place-items-center rounded-lg border border-cyan/35 text-cyan"><SymbolGlyph symbol={symbol} className="size-8"/></span>)}</div><div className="hidden sm:block"><CircuitMap/></div></div>
        <div className="mt-auto pt-8"><Link to="/jogo/codigo" className="inline-flex min-h-13 items-center rounded-lg bg-cyan px-6 py-3 font-bold text-ink hover:bg-ice">Abrir Código secreto ↗</Link></div>
      </article>
      <article data-scroll className="flex min-w-0 flex-col rounded-2xl border border-violet/35 bg-panel/75 p-6 sm:p-9">
        <span className="text-sm font-bold tracking-[.16em] text-violet uppercase">02 / Focar e mudar</span>
        <h2 className="mt-4 text-3xl font-bold tracking-[-.03em] text-ice">Cor ou palavra?</h2>
        <p className="mt-4 max-w-[52ch] leading-relaxed text-mist">Observe uma palavra colorida, escolha o detalhe pedido e perceba o que acontece quando a instrução muda.</p>
        <div aria-hidden="true" className="mt-8 flex min-h-39 items-center justify-center rounded-xl border border-line bg-ink/45"><span className="text-5xl font-black tracking-[.06em] text-cyan sm:text-6xl">ROXO</span></div>
        <div className="mt-auto pt-8"><Link to="/jogo/cores" className="inline-flex min-h-13 items-center rounded-lg bg-violet px-6 py-3 font-bold text-ink hover:bg-ice">Abrir Cor ou palavra? ↗</Link></div>
      </article>
    </div>
    <p className="mt-9 max-w-3xl text-sm leading-relaxed text-mist">As duas experiências são educativas. Os resultados descrevem apenas as escolhas feitas na partida e são apagados ao recomeçar.</p>
  </main></PageShell>
}
