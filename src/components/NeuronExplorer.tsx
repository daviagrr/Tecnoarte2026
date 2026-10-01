import { useState } from 'react'

const modelUrl = 'https://sketchfab.com/3d-models/neuronios-143-24b6630743074c7787063e5f4eb37d2d'
const authorUrl = 'https://sketchfab.com/raunicesumar'
const embedUrl = 'https://sketchfab.com/models/24b6630743074c7787063e5f4eb37d2d/embed?autostart=1&camera=0'

const parts = [
  { id: 'dendrites', label: 'Dendritos', detail: 'Ramificações que recebem sinais de outras células.' },
  { id: 'soma', label: 'Corpo celular', detail: 'Região que abriga o núcleo e integra muitos dos sinais recebidos.' },
  { id: 'axon', label: 'Axônio', detail: 'Prolongamento pelo qual o sinal pode seguir até outras células. Em muitos neurônios, a mielina ajuda na condução.' },
  { id: 'terminals', label: 'Terminações', detail: 'Extremidades que podem transmitir sinais a outras células nas sinapses.' },
] as const

type PartId = (typeof parts)[number]['id']

export function NeuronExplorer() {
  const [openParts, setOpenParts] = useState<PartId[]>([])

  const togglePart = (part: PartId) => {
    setOpenParts(current => current.includes(part) ? current.filter(item => item !== part) : [...current, part])
  }

  return <section className="border-y border-line bg-ink/60 px-5 py-18 sm:px-8 lg:px-12 lg:py-24" aria-labelledby="neuron-title">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-3xl">
        <h2 id="neuron-title" className="text-3xl font-bold tracking-[-.03em] text-ice sm:text-5xl">Explore um neurônio em três dimensões.</h2>
        <p className="mt-6 text-lg leading-relaxed text-mist">Gire e aproxime o modelo para observar sua estrutura. Toque nos números para ler as anotações do autor ou abra as notas ao lado. O modelo é uma representação didática; ele não mostra o cérebro de quem joga.</p>
      </div>

      <div className="mt-10 grid overflow-hidden rounded-2xl border border-cyan/25 bg-panel/65 lg:grid-cols-[1.45fr_.55fr]">
        <div className="relative aspect-[3/5] min-h-110 bg-[#101725] sm:aspect-[4/5] sm:min-h-130 lg:aspect-auto lg:min-h-170">
          <iframe
            title="Neurônios (143), modelo 3D interativo de RA Unicesumar no Sketchfab"
            src={embedUrl}
            loading="eager"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <h3 className="text-xl font-bold text-ice">O que observar</h3>
          <p className="mt-3 text-sm leading-relaxed text-mist">Abra quantas notas quiser. Elas ajudam na leitura e não modificam o visualizador.</p>
          <div className="mt-6 space-y-2">{parts.map(part => {
            const open = openParts.includes(part.id)
            return <div key={part.id} className={`rounded-lg border transition-colors ${open ? 'border-cyan/65 bg-cyan/8' : 'border-line bg-ink/40'}`}>
              <button type="button" aria-expanded={open} aria-controls={`neuron-note-${part.id}`} onClick={() => togglePart(part.id)} className="flex min-h-13 w-full items-center justify-between gap-3 px-4 py-3 text-left font-semibold text-ice hover:text-cyan">
                {part.label}<span aria-hidden="true" className="text-xl font-light text-cyan">{open ? '−' : '+'}</span>
              </button>
              <p id={`neuron-note-${part.id}`} hidden={!open} className="px-4 pb-4 text-sm leading-relaxed text-mist">{part.detail}</p>
            </div>
          })}</div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-mist">
        Modelo <a href={modelUrl} target="_blank" rel="noreferrer" className="font-semibold text-cyan underline underline-offset-4">Neurônios (143)</a> de <a href={authorUrl} target="_blank" rel="noreferrer" className="font-semibold text-cyan underline underline-offset-4">RA Unicesumar — Recursos Digitais e Inovação</a>, incorporado pelo Sketchfab. É necessária conexão com a internet para carregá-lo.
      </p>
    </div>
  </section>
}
