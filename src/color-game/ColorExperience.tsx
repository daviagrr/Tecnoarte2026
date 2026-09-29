import { Link } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { colorHex, colors, correctInPhase, createTrials, expectedAnswer, phaseLengths, totalTrials, type Answer, type ColorId, type Phase, type Trial } from './engine'

type Stage = 'intro' | 'instructions' | 'play' | 'interlude' | 'result'

const phaseNames: Record<Phase, string> = {
  1: 'Conhecer', 2: 'Focar', 3: 'Mudar',
}

function targetText(trial: Trial) {
  return trial.target === 'ink' ? 'TOQUE NA COR DA TINTA' : 'TOQUE NA PALAVRA ESCRITA'
}

function PhaseMarker({ active }: { active: Phase }) {
  return <div className="flex gap-2" aria-label={`Etapa ${active} de 3`}>
    {([1, 2, 3] as const).map(phase => <span key={phase} className={`grid size-10 place-items-center rounded-full border text-sm font-bold ${phase === active ? 'border-violet bg-violet text-ink' : phase < active ? 'border-violet/55 text-violet' : 'border-line text-mist'}`}>{phase}</span>)}
  </div>
}

export function ColorExperience() {
  const [stage, setStage] = useState<Stage>('intro')
  const [trials, setTrials] = useState<Trial[]>([])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [response, setResponse] = useState<Answer | null>(null)
  const root = useRef<HTMLDivElement>(null)

  const reset = useCallback(() => {
    setStage('intro')
    setTrials([])
    setIndex(0)
    setAnswers([])
    setResponse(null)
    window.scrollTo(0, 0)
  }, [])

  const begin = () => {
    setTrials(createTrials())
    setIndex(0)
    setAnswers([])
    setResponse(null)
    setStage('play')
    window.scrollTo(0, 0)
  }

  const choose = useCallback((color: ColorId) => {
    if (stage !== 'play' || response || !trials[index]) return
    const trial = trials[index]
    const answer = { trial, chosen: color, correct: color === expectedAnswer(trial) }
    setAnswers(current => [...current, answer])
    setResponse(answer)
  }, [stage, response, trials, index])

  const next = () => {
    if (!response) return
    const nextIndex = index + 1
    setResponse(null)
    if (nextIndex >= trials.length) setStage('result')
    else if (trials[nextIndex].phase !== trials[index].phase) setStage('interlude')
    setIndex(nextIndex)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (stage !== 'result') return
    const timeout = window.setTimeout(reset, 90_000)
    return () => window.clearTimeout(timeout)
  }, [stage, reset])

  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const context = gsap.context(() => {
      gsap.fromTo('[data-color-enter]', { autoAlpha: .8, y: 16 }, { autoAlpha: 1, y: 0, duration: .65, stagger: .09, ease: 'power3.out' })
      if (stage === 'play') {
        gsap.fromTo('.color-stimulus', { autoAlpha: 0, scale: .86, y: 18 }, { autoAlpha: 1, scale: 1, y: 0, duration: .55, ease: 'back.out(1.5)' })
        gsap.fromTo('.color-signal', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: .8, ease: 'power2.out' })
      }
      if (stage === 'interlude') gsap.fromTo('.phase-change', { borderColor: '#ab8dff50', scale: .97 }, { borderColor: '#ab8dff', scale: 1, duration: .7, ease: 'power2.out' })
    }, root)
    return () => context.revert()
  }, [stage, index])

  useEffect(() => {
    if (!response || !root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const context = gsap.context(() => {
      gsap.fromTo('.color-feedback', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .38, ease: 'power2.out' })
      gsap.fromTo('.color-stimulus', { scale: 1 }, { scale: response.correct ? 1.08 : .96, duration: .22, yoyo: true, repeat: 1, ease: 'power2.out' })
    }, root)
    return () => context.revert()
  }, [response])

  useEffect(() => {
    if (stage !== 'play' || response) return
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return
      const choice = Number(event.key) - 1
      if (choice >= 0 && choice < colors.length) {
        event.preventDefault()
        choose(colors[choice])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage, response, choose])

  const trial = trials[index]
  return <div ref={root} className="mx-auto max-w-5xl">
    {stage === 'intro' && <section className="grid gap-10 lg:grid-cols-[1fr_.78fr] lg:items-center"><div data-color-enter><p className="font-bold text-violet">Uma experiência sobre atenção e adaptação</p><h1 className="mt-4 text-4xl font-bold tracking-[-.035em] sm:text-6xl">Cor ou palavra?</h1><p className="mt-6 max-w-[59ch] text-lg leading-relaxed text-mist">Às vezes, a palavra diz uma cor enquanto a tinta mostra outra. Observe a instrução, escolha o detalhe pedido e perceba quando a regra muda.</p><button type="button" onClick={() => setStage('instructions')} className="mt-8 min-h-14 rounded-lg bg-violet px-8 py-3.5 text-lg font-bold text-ink hover:bg-ice">Entender o desafio ↗</button><p className="mt-5 text-sm text-mist">Cerca de 1 a 2 minutos · sem contagem regressiva</p></div><div data-color-enter className="rounded-2xl border border-violet/40 bg-panel/75 p-8 text-center"><p className="text-xs font-bold tracking-[.18em] text-violet uppercase">O que você vê primeiro?</p><span className="mt-10 block text-6xl font-black tracking-[.05em] sm:text-7xl" style={{ color: colorHex.azul }}>ROXO</span><div className="mx-auto mt-9 h-1 w-40 rounded-full bg-gradient-to-r from-cyan to-violet"/><p className="mt-6 text-mist">A palavra diz “roxo”. A tinta é azul.</p></div></section>}

    {stage === 'instructions' && <section className="mx-auto max-w-4xl"><h1 data-color-enter className="text-4xl font-bold tracking-[-.035em] sm:text-5xl">Uma instrução de cada vez.</h1><p data-color-enter className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">Na tela, aparece uma palavra colorida. Toque numa das quatro respostas grandes. A instrução acima da palavra diz qual detalhe vale naquele momento.</p><div className="mt-10 grid gap-5 sm:grid-cols-3">{[
      ['01 / Conhecer', 'No início, palavra e tinta combinam. Toque na cor da tinta.'],
      ['02 / Focar', 'Depois, elas entram em conflito. Continue escolhendo a cor da tinta.'],
      ['03 / Mudar', 'Por fim, a instrução troca: escolha a palavra escrita.'],
    ].map(([title, description]) => <div data-color-enter key={title} className="border-t border-violet/55 pt-5"><h2 className="text-xl font-bold text-violet">{title}</h2><p className="mt-3 leading-relaxed text-mist">{description}</p></div>)}</div><p data-color-enter className="mt-8 text-sm leading-relaxed text-mist">O jogo informa se a escolha correspondeu à instrução e permite continuar. Não há limite de tempo. Use toque, mouse ou teclas 1–4.</p><p data-color-enter className="mt-3 text-sm leading-relaxed text-mist">Se distinguir as tintas for difícil, <Link to="/jogo/codigo" className="font-semibold text-cyan underline underline-offset-4">Código secreto usa símbolos ↗</Link>.</p><button data-color-enter type="button" onClick={begin} className="mt-8 min-h-14 rounded-lg bg-violet px-8 py-3.5 text-lg font-bold text-ink hover:bg-ice">Começar ↗</button></section>}

    {stage === 'play' && trial && <section className="mx-auto max-w-4xl"><div data-color-enter className="flex flex-wrap items-center justify-between gap-5 border-b border-line pb-6"><div><p className="font-bold text-violet">Etapa {trial.phase} de 3 · escolha {index + 1} de {totalTrials}</p><h1 className="mt-2 text-3xl font-bold tracking-[-.03em] sm:text-4xl">{phaseNames[trial.phase]} o detalhe certo</h1></div><PhaseMarker active={trial.phase}/></div><div className="mt-6 h-1 rounded-full bg-line" role="progressbar" aria-label="Progresso da experiência" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={totalTrials}><div className="h-full rounded-full bg-violet" style={{ width: `${((index + 1) / totalTrials) * 100}%` }}/></div>
      <div data-color-enter className="mt-8 rounded-2xl border border-violet/40 bg-panel p-6 text-center sm:p-10"><p className="text-sm font-black tracking-[.18em] text-ice sm:text-base">{targetText(trial)}</p><p className="mt-2 text-sm text-mist">{trial.target === 'ink' ? 'Ignore o significado da palavra.' : 'Ignore a cor da tinta.'}</p><div className="mx-auto mt-7 grid min-h-39 place-items-center rounded-xl border border-line bg-ink/70 px-4"><span className="color-stimulus text-[clamp(3.1rem,11vw,6rem)] font-black tracking-[.04em]" style={{ color: colorHex[trial.ink] }}>{trial.word.toUpperCase()}</span></div><div className="color-signal mx-auto mt-5 h-1 max-w-40 rounded-full bg-gradient-to-r from-cyan via-violet to-cyan"/><p className="mt-7 text-sm font-semibold text-mist">Escolha sua resposta:</p><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{colors.map((color, option) => <button key={color} type="button" disabled={!!response} onClick={() => choose(color)} aria-label={`Escolher ${color}`} className="flex min-h-22 items-center justify-center gap-2 rounded-xl border border-line bg-ink/75 px-3 text-lg font-bold text-ice transition-colors hover:border-violet hover:bg-violet/10 disabled:cursor-default disabled:opacity-55"><span className="size-5 shrink-0 rounded-full border border-white/20" style={{ backgroundColor: colorHex[color] }}/><span className="capitalize">{color}</span><span className="sr-only">Tecla {option + 1}</span></button>)}</div><p className="mt-4 text-xs text-mist">Teclado: teclas 1–4, na ordem das respostas.</p></div>
      {response && <div className={`color-feedback mt-6 flex flex-wrap items-center justify-between gap-5 rounded-xl border p-5 sm:p-6 ${response.correct ? 'border-cyan/55 bg-cyan/9' : 'border-violet/60 bg-violet/9'}`} role="status"><div><p className={`text-lg font-bold ${response.correct ? 'text-cyan' : 'text-violet'}`}>{response.correct ? 'Isso! Você seguiu a instrução.' : 'Essa escolha não corresponde à instrução.'}</p><p className="mt-2 leading-relaxed text-ice">Era <strong className="capitalize">{expectedAnswer(trial)}</strong>: {trial.target === 'ink' ? 'a cor da tinta' : 'a palavra escrita'}. {response.correct ? 'Guarde a regra para a próxima escolha.' : 'Observe o detalhe pedido antes de continuar.'}</p></div><button type="button" onClick={next} className="min-h-13 rounded-lg bg-violet px-6 py-3 font-bold text-ink hover:bg-ice">{index === totalTrials - 1 ? 'Ver resultado' : 'Continuar'} ↗</button></div>}
    </section>}

    {stage === 'interlude' && trial && <section className="phase-change mx-auto max-w-4xl rounded-2xl border border-violet/55 bg-violet/9 p-8 sm:p-12"><p data-color-enter className="font-bold text-violet">Etapa {trial.phase} de 3</p><h1 data-color-enter className="mt-4 text-4xl font-bold tracking-[-.03em] sm:text-5xl">{trial.phase === 2 ? 'Agora palavra e tinta discordam.' : 'Agora a instrução mudou.'}</h1><p data-color-enter className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{trial.phase === 2 ? 'Continue tocando na cor da tinta, mesmo quando a palavra disser outra cor.' : 'Até aqui você tocou na tinta. Agora toque na palavra escrita, mesmo quando a tinta mostrar outra cor.'}</p><button data-color-enter type="button" onClick={() => setStage('play')} className="mt-9 min-h-14 rounded-lg bg-violet px-7 py-3.5 text-lg font-bold text-ink hover:bg-ice">{trial.phase === 2 ? 'Experimentar o conflito' : 'Experimentar a nova regra'} ↗</button></section>}

    {stage === 'result' && <ColorResult answers={answers} onReset={reset}/>}
  </div>
}

function ColorResult({ answers, onReset }: { answers: Answer[]; onReset: () => void }) {
  const correct = answers.filter(answer => answer.correct).length
  const errors = answers.length - correct
  return <section className="mx-auto max-w-5xl"><div data-color-enter><p className="font-bold text-violet">Você terminou as três etapas</p><h1 className="mt-3 text-4xl font-bold tracking-[-.035em] sm:text-6xl">O que aconteceu nesta partida?</h1><p className="mt-6 max-w-3xl text-lg leading-relaxed text-mist">Você escolheu entre palavra e tinta em {answers.length} situações. Estes números mostram somente suas escolhas neste jogo.</p></div><div data-color-enter className="mt-10 grid gap-4 sm:grid-cols-3">{([1, 2, 3] as const).map(phase => <div key={phase} className="rounded-xl border border-line bg-panel p-6"><p className="font-bold text-violet">{phaseNames[phase]}</p><p className="font-numeric mt-5 text-3xl font-bold text-ice">{correctInPhase(answers, phase)} <span className="text-base font-normal text-mist">de {phaseLengths[phase - 1]}</span></p><p className="mt-2 text-sm text-mist">escolhas de acordo com a instrução</p></div>)}</div><p data-color-enter className="mt-5 text-sm text-mist">Ao todo: {correct} {correct === 1 ? 'acerto' : 'acertos'} · {errors} {errors === 1 ? 'erro' : 'erros'} · {answers.length} escolhas.</p>
    <div className="mt-16 border-t border-line pt-10"><h2 data-color-enter className="text-3xl font-bold tracking-[-.03em] sm:text-4xl">Do que você precisou?</h2><div className="mt-9 grid gap-6 md:grid-cols-3"><article data-color-enter className="border-t border-cyan/55 pt-5"><span className="font-bold text-cyan">01 / Atenção</span><p className="mt-3 leading-relaxed text-mist">Você observou palavra e tinta, mas selecionou apenas a informação pedida.</p></article><article data-color-enter className="border-t border-violet/55 pt-5"><span className="font-bold text-violet">02 / Feedback</span><p className="mt-3 leading-relaxed text-mist">Depois de cada escolha, viu qual resposta correspondia à instrução e pôde ajustar a próxima.</p></article><article data-color-enter className="border-t border-cyan/55 pt-5"><span className="font-bold text-cyan">03 / Mudança</span><p className="mt-3 leading-relaxed text-mist">Na última etapa, a informação importante deixou de ser a tinta e passou a ser a palavra.</p></article></div></div>
    <div data-color-enter className="mt-14 grid gap-8 rounded-2xl border border-violet/45 bg-violet/8 p-7 sm:p-10 md:grid-cols-[.3fr_1fr]"><div aria-hidden="true" className="flex items-center justify-center gap-3 text-5xl font-black"><span className="text-cyan">A</span><span className="text-violet">→</span><span className="text-violet">B</span></div><div><h2 className="text-2xl font-bold text-ice">E o cérebro?</h2><p className="mt-4 leading-relaxed text-mist">A atividade ilustra como atenção, instruções e feedback orientam escolhas e como uma regra pode precisar de ajuste. No cérebro, neurônios se comunicam por redes que incluem sinapses; experiências podem modificar o funcionamento dessas redes ao longo do tempo. O jogo observou apenas respostas na tela: não mediu alterações cerebrais nem sinapses.</p><Link to="/pesquisas" className="mt-5 inline-block font-semibold text-violet underline underline-offset-5">Explorar a explicação científica ↗</Link></div></div>
    <p data-color-enter className="mt-8 max-w-4xl text-sm leading-relaxed text-mist">A experiência não mede QI, inteligência ou saúde cerebral, não oferece diagnóstico e não substitui avaliação profissional. Atenção, familiaridade, cansaço, percepção das cores e o aparelho usado podem influenciar as escolhas.</p><div data-color-enter className="mt-9 flex flex-wrap items-center gap-5"><button type="button" onClick={onReset} className="min-h-14 rounded-lg bg-violet px-7 py-3.5 text-lg font-bold text-ink hover:bg-ice">Limpar e começar para outra pessoa</button><span className="text-sm text-mist">Esta tela volta ao início automaticamente.</span></div>
  </section>
}
