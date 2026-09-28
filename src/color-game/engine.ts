export type ColorId = 'azul' | 'roxo' | 'amarelo' | 'verde'
export type Phase = 1 | 2 | 3
export type Trial = { id: number; phase: Phase; word: ColorId; ink: ColorId; target: 'ink' | 'word' }
export type Answer = { trial: Trial; chosen: ColorId; correct: boolean }

export const colors: ColorId[] = ['azul', 'roxo', 'amarelo', 'verde']
export const colorHex: Record<ColorId, string> = {
  azul: '#65b9ff', roxo: '#b9a0ff', amarelo: '#ffd166', verde: '#80e6aa',
}
export const phaseLengths = [3, 5, 4] as const
export const totalTrials = phaseLengths.reduce((total, length) => total + length, 0)

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index--) {
    const target = Math.floor(Math.random() * (index + 1))
    const selected = copy[index]
    copy[index] = copy[target]
    copy[target] = selected
  }
  return copy
}

export function createTrials(): Trial[] {
  const result: Trial[] = []
  for (const phase of [1, 2, 3] as const) {
    const length = phaseLengths[phase - 1]
    const words = shuffle([...colors, ...colors]).slice(0, length)
    words.forEach(word => {
      const ink = phase === 1 ? word : shuffle(colors.filter(color => color !== word))[0]
      result.push({ id: result.length + 1, phase, word, ink, target: phase === 3 ? 'word' : 'ink' })
    })
  }
  return result
}

export const expectedAnswer = (trial: Trial) => trial.target === 'ink' ? trial.ink : trial.word
export const correctInPhase = (answers: Answer[], phase: Phase) => answers.filter(answer => answer.trial.phase === phase && answer.correct).length
