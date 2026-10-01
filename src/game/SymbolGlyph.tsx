import type { ReactNode } from 'react'
import { symbolLabels, symbols, type SymbolId } from './engine'

const outlines: Record<SymbolId, ReactNode> = {
  orb: <circle cx="24" cy="24" r="13"/>,
  peak: <path d="M24 9 40 37H8Z"/>,
  frame: <rect x="11" y="11" width="26" height="26" rx="3"/>,
  spark: <path d="M24 7 28.3 19.7 41 24l-12.7 4.3L24 41l-4.3-12.7L7 24l12.7-4.3Z"/>,
}

export function SymbolGlyph({ symbol, className = '' }: { symbol: SymbolId; className?: string }) {
  return <svg viewBox="0 0 48 48" role="img" aria-label={symbolLabels[symbol]} className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">{outlines[symbol]}</svg>
}

export function CircuitMap({ uncertain = false }: { uncertain?: boolean }) {
  return <div className="rounded-xl border border-line bg-ink/45 p-4 sm:p-5"><p className="text-xs font-bold tracking-[.15em] text-mist uppercase">Circuito de símbolos</p><div className="mt-4 flex items-center justify-between gap-1" aria-label={uncertain ? 'Símbolos do circuito: círculo, triângulo, quadrado e estrela. Descubra a nova direção.' : 'Ordem circular: círculo, triângulo, quadrado, estrela, de volta ao círculo'}>{symbols.map((symbol, index) => <div key={symbol} className="flex min-w-0 items-center gap-1 sm:gap-2"><div className="grid size-12 shrink-0 place-items-center rounded-lg border border-cyan/40 bg-cyan/7 text-cyan sm:size-15"><SymbolGlyph symbol={symbol} className="size-8 sm:size-10"/></div>{index < 3 && <span aria-hidden="true" className={`text-base font-bold sm:text-xl ${uncertain?'text-violet':'text-cyan'}`}>{uncertain?'?':'→'}</span>}</div>)}</div>{!uncertain && <p className="mt-3 text-xs leading-relaxed text-mist">Depois da estrela, o circuito volta ao círculo.</p>}</div>
}
