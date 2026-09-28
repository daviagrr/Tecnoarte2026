import { createFileRoute } from '@tanstack/react-router'
import { PageShell, SectionTitle } from '../components/Layout'
import { studies } from '../content/research'

export const Route = createFileRoute('/referencias')({ component: References })
function References() { return <PageShell><main className="mx-auto min-h-[68vh] max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24"><SectionTitle title="Referências">As explicações científicas e a inspiração das atividades partem destas fontes. Os jogos são adaptações educativas, sem finalidade clínica.</SectionTitle><ol className="mt-16 space-y-5">{studies.map((study,i)=><li data-scroll key={study.href} className="grid gap-4 border-t border-line py-8 sm:grid-cols-[60px_1fr]"><span className="font-numeric font-bold text-cyan">{String(i+1).padStart(2,'0')}</span><div><h2 className="text-xl font-bold text-ice">{study.source}</h2><p className="mt-2 text-mist">{study.citation}</p><a href={study.href} target="_blank" rel="noreferrer" className="mt-3 inline-block break-all font-semibold text-cyan underline underline-offset-4">Abrir fonte ↗</a></div></li>)}</ol></main></PageShell> }
