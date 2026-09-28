import { createFileRoute } from '@tanstack/react-router'
import { PageShell, SectionTitle } from '../components/Layout'

export const Route = createFileRoute('/equipe')({ component: Team })

const members = [
  'Ana Luiza Santos', 'Bruna Sette', 'Davi Guerra', 'Guilherme Avelino',
  'Guilherme Fonseca', 'João Arthur', 'Julia Rosa', 'Maria Clara Souza',
  'Maria Eduarda Lima', 'Maria Eduarda Moura', 'Maria Luiza Carvalho',
  'Mariana Faraco', 'Pedro Henrique', 'Theo Martins',
]

function Team() {
  return <PageShell><main className="team-glow relative min-h-[70vh] overflow-hidden"><div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan/35 via-violet/35 to-cyan/35"/><div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24"><SectionTitle title="Quem construiu esta experiência">Neurociência • Tecnoarte transforma uma pergunta científica em uma descoberta para compartilhar.</SectionTitle>
    <section data-scroll className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-[.65fr_1fr]"><div><span className="text-sm font-bold tracking-[.16em] text-cyan uppercase">O grupo</span><h2 className="mt-3 text-3xl font-bold text-ice">Uma pergunta feita em conjunto.</h2><p className="mt-5 max-w-[55ch] text-lg leading-relaxed text-mist">Os slides da apresentação reúnem cérebro, neurônios, atenção e neuroplasticidade. O site continua a conversa com uma experiência que cada visitante pode testar.</p></div><div className="rounded-2xl border border-line bg-panel/75 p-6 sm:p-8"><h2 className="text-xl font-bold text-cyan">Integrantes da apresentação</h2><p className="mt-2 text-sm text-mist">Nomes conforme o slide “Composição” enviado pelo grupo.</p><ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">{members.map((member,i)=><li key={member} className="flex items-baseline gap-3 border-b border-line/70 pb-2"><span className="font-numeric text-xs font-bold text-cyan">{String(i+1).padStart(2,'0')}</span><span className="text-ice">{member}</span></li>)}</ul></div></section>
    <section data-scroll className="mt-16 grid gap-7 border-t border-line pt-9 md:grid-cols-[.65fr_1fr]"><h2 className="text-2xl font-bold text-ice">Nossa proposta</h2><p className="max-w-2xl text-lg leading-relaxed text-mist">Conectar pesquisa, explicação e participação. Queremos que cada visitante saia com uma pergunta melhor sobre como aprende — e com a noção de que uma atividade curta ilustra processos, mas não avalia o cérebro de ninguém.</p></section>
  </div></main></PageShell>
}
