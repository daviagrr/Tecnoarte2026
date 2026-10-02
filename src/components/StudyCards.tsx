import { useState } from 'react'

type Card = { id: string; name: string; color: string; label: string; detail: string }

const brainCards: Card[] = [
  { id: 'frontal', name: 'Lobo frontal', color: '#f4b98f', label: 'Planejar e agir', detail: 'Participa do planejamento, das decisões e do controle de movimentos voluntários.' },
  { id: 'parietal', name: 'Lobo parietal', color: '#a5d9ed', label: 'Integrar sentidos', detail: 'Integra sinais sensoriais do corpo e participa da atenção espacial.' },
  { id: 'occipital', name: 'Lobo occipital', color: '#c7d77b', label: 'Processar a visão', detail: 'Participa do processamento das informações visuais, como formas e cores.' },
  { id: 'temporal', name: 'Lobo temporal', color: '#ed8584', label: 'Ouvir e lembrar', detail: 'Participa do processamento de sons; estruturas nessa região ajudam a formar memórias.' },
  { id: 'cerebellum', name: 'Cerebelo', color: '#c8afe8', label: 'Coordenar', detail: 'Ajuda a coordenar movimentos e participa da aprendizagem motora.' },
  { id: 'brainstem', name: 'Tronco encefálico', color: '#e8d780', label: 'Manter funções vitais', detail: 'Liga o cérebro à medula e participa do controle de funções como a respiração.' },
]

function CardDeck({ cards, activeId, onFlip, flipped, setFlipped }: { cards: Card[]; activeId: string; onFlip: (id: string) => void; flipped: string[]; setFlipped: (ids: string[]) => void }) {
  const allFlipped = flipped.length === cards.length

  return <div>
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <button type="button" onClick={() => setFlipped(cards.map(card => card.id))} disabled={allFlipped} className="min-h-11 rounded-full bg-cyan px-5 py-2 font-bold text-ink transition-colors hover:bg-ice disabled:cursor-default disabled:opacity-55">Mostrar funções</button>
      <button type="button" onClick={() => setFlipped([])} disabled={flipped.length === 0} className="min-h-11 rounded-full border border-cyan/55 px-5 py-2 font-bold text-cyan transition-colors hover:bg-cyan/10 disabled:cursor-default disabled:opacity-55">Mostrar nomes</button>
      <span aria-live="polite" className="text-sm text-mist">{flipped.length} de {cards.length} virados</span>
    </div>
    <div className={`grid gap-4 ${cards.length === 4 ? 'sm:grid-cols-2 xl:grid-cols-4' : 'sm:grid-cols-2 xl:grid-cols-3'}`}>
      {cards.map(card => {
        const isFlipped = flipped.includes(card.id)
        return <button key={card.id} type="button" onClick={() => onFlip(card.id)} aria-pressed={isFlipped} aria-label={`${card.name}. ${isFlipped ? card.detail : 'Toque para conhecer a função.'}`} className={`study-card group relative min-h-56 overflow-hidden rounded-2xl p-6 text-left text-[#18212b] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(0,0,0,.24)] focus-visible:outline-ink ${activeId === card.id ? 'ring-4 ring-ice/85 ring-offset-4 ring-offset-ink' : ''}`} style={{ backgroundColor: card.color }}>
          <span className="absolute inset-0 opacity-25" aria-hidden="true" style={{ background: 'radial-gradient(circle at 82% 12%, white, transparent 56%)' }}/>
          <span className="relative flex h-full min-h-44 flex-col">
            <span className="text-[.7rem] font-bold tracking-[.18em] uppercase">{isFlipped ? 'Função' : card.label}</span>
            {isFlipped ? <span className="mt-auto"><strong className="block text-xl font-bold">{card.name}</strong><span className="mt-3 block text-sm leading-relaxed">{card.detail}</span></span> : <strong className="mt-auto text-2xl font-bold tracking-[-.025em]">{card.name}</strong>}
            <span className="mt-4 text-xs font-semibold opacity-75">Toque para ver {isFlipped ? 'o nome' : 'a função'} ↻</span>
          </span>
        </button>
      })}
    </div>
  </div>
}

function BrainMap({ activeId, flipped, onFlip }: { activeId: string; flipped: string[]; onFlip: (id: string) => void }) {
  const active = brainCards.find(card => card.id === activeId)
  const markers: Record<string, { left: string; top: string }> = {
    frontal: { left: '28%', top: '35%' },
    parietal: { left: '65%', top: '29%' },
    occipital: { left: '86%', top: '49%' },
    temporal: { left: '52%', top: '59%' },
    cerebellum: { left: '72%', top: '77%' },
    brainstem: { left: '54%', top: '87%' },
  }
  return <figure className="overflow-hidden rounded-2xl bg-[#101a2b] p-5 sm:p-7">
    <div className="relative mx-auto w-full max-w-xl">
      <img src="/brain-regions.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustração lateral do cérebro com regiões em salmão, azul, verde, coral, violeta e amarelo" className="block h-auto w-full" />
      {brainCards.map(card => <button key={card.id} type="button" onClick={() => onFlip(card.id)} aria-pressed={flipped.includes(card.id)} aria-label={`${card.name}: ${flipped.includes(card.id) ? 'mostrar nome' : 'mostrar função'}`} className="absolute z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white" style={markers[card.id]}>
        <span aria-hidden="true" className={`rounded-full border-2 border-white shadow-[0_2px_9px_rgba(7,11,25,.8)] transition-[width,height,box-shadow] duration-300 ${activeId === card.id ? 'size-6 shadow-[0_0_0_5px_rgba(7,11,25,.55),0_0_16px_rgba(255,255,255,.9)]' : 'size-4'}`} style={{ backgroundColor: card.color }} />
      </button>)}
    </div>
    <figcaption className="mx-auto mt-2 max-w-sm text-center">
      <span aria-live="polite" className="flex min-h-7 items-center justify-center gap-2 text-sm font-bold text-ice">
        {active ? <><span className="size-3 rounded-full" style={{ backgroundColor: active.color }}/>{active.name}</> : 'Toque em um ponto ou cartão para explorar'}
      </span>
      {active && flipped.includes(active.id) && <span className="mt-2 block text-sm leading-relaxed text-ice">{active.detail}</span>}
      <span className="mt-2 block text-xs leading-relaxed text-mist">Os pontos indicam posições aproximadas. Toque novamente para voltar ao nome; as regiões atuam em redes.</span>
    </figcaption>
    <p className="mt-5 text-center text-xs leading-relaxed text-mist">Imagem adaptada da capa enviada pelo grupo. Representação visual, não um atlas anatômico.</p>
  </figure>
}

export function StudyCards() {
  const [activeBrain, setActiveBrain] = useState('')
  const [flipped, setFlipped] = useState<string[]>([])
  const flipBrain = (id: string) => {
    setFlipped(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
    setActiveBrain(id)
  }
  return <section className="px-5 py-18 sm:px-8 lg:px-12 lg:py-24" aria-labelledby="study-cards-title">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-3xl">
        <h2 id="study-cards-title" data-scroll className="text-3xl font-bold tracking-[-.03em] text-ice sm:text-5xl">Regiões do cérebro</h2>
        <p data-scroll className="mt-5 text-lg leading-relaxed text-mist">Toque em um ponto do cérebro ou em um cartão para descobrir uma função associada. As cores ajudam a localizar as regiões; aprender envolve a comunicação entre muitas áreas.</p>
      </div>
      <div data-scroll className="mt-10">
        <div className="mt-8 grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-6"><BrainMap activeId={activeBrain} flipped={flipped} onFlip={flipBrain}/></div>
          <CardDeck cards={brainCards} activeId={activeBrain} onFlip={flipBrain} flipped={flipped} setFlipped={setFlipped}/>
        </div>
        <p className="mt-7 text-sm leading-relaxed text-mist">Fontes: <a href="https://www.brainfacts.org/brain-anatomy-and-function/anatomy/2022/major-brain-landmarks-110822" target="_blank" rel="noreferrer" className="text-cyan underline underline-offset-4">BrainFacts/Society for Neuroscience</a> e <a href="https://www.ninds.nih.gov/health-information/public-education/brain-basics" target="_blank" rel="noreferrer" className="text-cyan underline underline-offset-4">NINDS/NIH</a>.</p>
      </div>
    </div>
  </section>
}
