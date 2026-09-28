export type SymbolId = 'orb' | 'peak' | 'frame' | 'spark'
export type Door = 1 | 2 | 3
export type Rule = 'forward' | 'backward'
export type Code = [SymbolId, SymbolId, SymbolId]
export type Challenge = { id: number; door: Door; input: Code; rule: Rule }
export type ChallengeRecord = { id: number; door: Door; attempts: number; solved: boolean; hintUsed: boolean }
export type GameResult = { records: ChallengeRecord[] }

export const symbols: SymbolId[] = ['orb', 'peak', 'frame', 'spark']
export const symbolLabels: Record<SymbolId, string> = {
  orb: 'Círculo', peak: 'Triângulo', frame: 'Quadrado', spark: 'Estrela',
}
export const challenges: Challenge[] = [
  { id: 1, door: 1, input: ['orb', 'peak', 'frame'], rule: 'forward' },
  { id: 2, door: 1, input: ['spark', 'orb', 'frame'], rule: 'forward' },
  { id: 3, door: 2, input: ['frame', 'spark', 'peak'], rule: 'forward' },
  { id: 4, door: 2, input: ['peak', 'orb', 'spark'], rule: 'forward' },
  // A mesma entrada da primeira porta volta com a direção invertida.
  { id: 5, door: 3, input: ['orb', 'peak', 'frame'], rule: 'backward' },
  { id: 6, door: 3, input: ['spark', 'frame', 'orb'], rule: 'backward' },
]

export const challengeCount = challenges.length

export function createChallenges(): Challenge[] {
  const codes: Code[] = []
  for (const first of symbols) for (const second of symbols) for (const third of symbols) {
    if (new Set([first, second, third]).size === 3) codes.push([first, second, third])
  }
  for (let index = codes.length - 1; index > 0; index--) {
    const target = Math.floor(Math.random() * (index + 1))
    const selected = codes[index]
    codes[index] = codes[target]
    codes[target] = selected
  }
  return challenges.map((challenge, index) => ({
    ...challenge,
    input: index === 4 ? [...codes[0]] as Code : [...codes[index < 4 ? index : index - 1]] as Code,
  }))
}

export function transform(symbol: SymbolId, rule: Rule): SymbolId {
  const position = symbols.indexOf(symbol)
  return symbols[(position + (rule === 'forward' ? 1 : symbols.length - 1)) % symbols.length]
}
export const expectedCode = (challenge: Challenge): Code => challenge.input.map(symbol => transform(symbol, challenge.rule)) as Code
export function exactMatches(code: SymbolId[], expected: Code): number {
  return code.reduce((count, symbol, index) => count + Number(symbol === expected[index]), 0)
}
export const solvedForDoor = (records: ChallengeRecord[], door: Door) => records.filter(record => record.door === door && record.solved).length
export const totalAttempts = (records: ChallengeRecord[]) => records.reduce((total, record) => total + record.attempts, 0)
export const totalErrors = (records: ChallengeRecord[]) => totalAttempts(records) - records.filter(record => record.solved).length
export const errorsForDoor = (records: ChallengeRecord[], door: Door) => totalErrors(records.filter(record => record.door === door))
