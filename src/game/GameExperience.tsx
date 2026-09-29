import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { InstructionScreen, InterludeScreen, IntroScreen, PlayScreen, ResultScreen } from './GameScreens'
import { challenges, createChallenges, exactMatches, expectedCode, symbols, type ChallengeRecord, type SymbolId } from './engine'

type Stage = 'intro' | 'instructions' | 'playing' | 'interlude' | 'result'
export type Feedback = { matches: number; code: SymbolId[]; finished: boolean; solved: boolean; revealed: boolean }

export function GameExperience() {
  const [stage, setStage] = useState<Stage>('intro')
  const [runChallenges, setRunChallenges] = useState(challenges)
  const [index, setIndex] = useState(0)
  const [draft, setDraft] = useState<SymbolId[]>([])
  const [attempts, setAttempts] = useState(0)
  const [records, setRecords] = useState<ChallengeRecord[]>([])
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [hintAvailable, setHintAvailable] = useState(false)
  const [hintShown, setHintShown] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  const reset = useCallback(() => {
    setStage('intro'); setIndex(0); setDraft([]); setAttempts(0); setRecords([])
    setFeedback(null); setHintAvailable(false); setHintShown(false)
    window.scrollTo(0, 0)
    try { sessionStorage.removeItem('sinapse-result') } catch { /* dados legados opcionais */ }
  }, [])

  useEffect(() => {
    try { sessionStorage.removeItem('sinapse-result') } catch { /* dados legados opcionais */ }
  }, [])
  useEffect(() => {
    if (stage !== 'result') return
    const timeout = window.setTimeout(reset, 90_000)
    return () => window.clearTimeout(timeout)
  }, [stage, reset])
  useEffect(() => {
    if (stage !== 'playing' || feedback?.finished || hintShown) return
    if (attempts >= 2) setHintAvailable(true)
    const timeout = window.setTimeout(() => setHintAvailable(true), 18_000)
    return () => window.clearTimeout(timeout)
  }, [stage, index, attempts, feedback?.finished, hintShown])

  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const context = gsap.context(() => {
      gsap.fromTo('[data-enter]', { autoAlpha: .8, y: 16 }, { autoAlpha: 1, y: 0, duration: .56, stagger: .07, ease: 'power3.out' })
      if (stage === 'playing') gsap.fromTo('.circuit-pulse', { opacity: .2, scale: .96 }, { opacity: 1, scale: 1, duration: .65, ease: 'power2.out' })
      if (stage === 'interlude' && index === 4) gsap.fromTo('.phase-shift', { boxShadow: '0 0 0 rgba(171,141,255,0)' }, { boxShadow: '0 18px 58px rgba(171,141,255,.22)', duration: .7 })
    }, root)
    return () => context.revert()
  }, [stage, index])
  useEffect(() => {
    if (!feedback || !root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const context = gsap.context(() => {
      gsap.fromTo('.feedback-panel', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .42, ease: 'power2.out' })
      if (feedback.solved) gsap.fromTo('.door-lock', { rotate: -8, scale: .9 }, { rotate: 0, scale: 1.12, duration: .5, ease: 'back.out(2)' })
      else gsap.fromTo('.door-lock', { x: -5 }, { x: 0, duration: .35, ease: 'elastic.out(1,.2)' })
    }, root)
    return () => context.revert()
  }, [feedback])

  const addSymbol = (symbol: SymbolId) => {
    if (stage !== 'playing' || feedback?.finished) return
    setDraft(current => current.length < 3 ? [...current, symbol] : current)
  }
  const removeLast = () => { if (stage === 'playing' && !feedback?.finished) setDraft(current => current.slice(0, -1)) }
  const submit = () => {
    if (stage !== 'playing' || draft.length !== 3 || feedback?.finished) return
    const challenge = runChallenges[index]
    const matches = exactMatches(draft, expectedCode(challenge))
    const nextAttempts = attempts + 1
    const solved = matches === 3
    const finished = solved || nextAttempts >= 4
    setAttempts(nextAttempts)
    setFeedback({ matches, code: draft, finished, solved, revealed: finished && !solved })
    setDraft([])
    if (finished) setRecords(current => [...current, { id: challenge.id, door: challenge.door, attempts: nextAttempts, solved, hintUsed: hintShown }])
    if (!solved && nextAttempts >= 2) setHintAvailable(true)
  }
  const next = () => {
    if (!feedback?.finished) return
    const nextIndex = index + 1
    if (nextIndex >= runChallenges.length) { setStage('result'); window.scrollTo(0, 0); return }
    setIndex(nextIndex); setDraft([]); setAttempts(0); setFeedback(null)
    setHintAvailable(false); setHintShown(false)
    if (nextIndex === 2 || nextIndex === 4) setStage('interlude')
    window.scrollTo(0, 0)
  }
  const begin = () => { reset(); setRunChallenges(createChallenges()); setStage('playing') }
  const continueAfterInterlude = () => { setStage('playing'); window.scrollTo(0, 0) }

  useEffect(() => {
    if (stage !== 'playing' || feedback?.finished) return
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return
      const option = Number(event.key) - 1
      if (option >= 0 && option < symbols.length) { event.preventDefault(); addSymbol(symbols[option]) }
      if (event.key === 'Backspace') { event.preventDefault(); removeLast() }
      if (event.key === 'Enter' && !(event.target instanceof HTMLButtonElement)) { event.preventDefault(); submit() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage, index, draft, attempts, feedback])

  return <div ref={root} className="mx-auto max-w-6xl">
    {stage === 'intro' && <IntroScreen onStart={() => setStage('instructions')}/>}
    {stage === 'instructions' && <InstructionScreen onBegin={begin}/>}
    {stage === 'playing' && <PlayScreen challenge={runChallenges[index]} index={index} draft={draft} attempts={attempts} feedback={feedback} hintAvailable={hintAvailable} hintShown={hintShown} onAdd={addSymbol} onRemove={removeLast} onClear={() => setDraft([])} onSubmit={submit} onHint={() => setHintShown(true)} onNext={next}/>}
    {stage === 'interlude' && <InterludeScreen door={runChallenges[index].door} records={records} onContinue={continueAfterInterlude}/>}
    {stage === 'result' && <ResultScreen result={{ records }} onReset={reset}/>}
  </div>
}
