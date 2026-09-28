import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const links = [
  { to: '/', label: 'Início' },
  { to: '/pesquisas', label: 'Pesquisas' },
  { to: '/jogo', label: 'Jogo' },
  { to: '/resultados', label: 'Resultados' },
  { to: '/equipe', label: 'Equipe' },
  { to: '/referencias', label: 'Referências' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const path = useRouterState({ select: state => state.location.pathname })
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])
  return <header className="relative z-40 border-b border-line/70 bg-ink/90 backdrop-blur-md">
    <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
      <Link to="/" className="group flex items-center gap-3" aria-label="Neurociência Tecnoarte — ir para o início" onClick={() => setOpen(false)}>
        <span className="relative flex size-10 items-center justify-center rounded-full border border-cyan/60"><span className="absolute size-5 rounded-full border border-violet/80"/><span className="size-1.5 rounded-full bg-cyan shadow-[0_0_12px_#54d9ed]"/></span>
        <span className="flex flex-col leading-none"><strong className="text-[.99rem] tracking-[.08em] text-ice sm:text-[1.05rem]">NEUROCIÊNCIA <span className="text-cyan">•</span> TECNOARTE</strong><span className="mt-1.5 text-[.56rem] font-bold tracking-[.24em] text-mist">SAÚDE E NEUROCIÊNCIA</span></span>
      </Link>
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
        {links.map(link => <Link key={link.to} to={link.to} className={`text-sm font-semibold transition-colors hover:text-cyan ${(link.to==='/jogo'?path.startsWith('/jogo'):path===link.to)?'text-cyan':'text-mist'}`}>{link.label}</Link>)}
      </nav>
      <button type="button" className="flex size-11 items-center justify-center rounded-lg border border-line text-ice lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open?'Fechar menu':'Abrir menu'} onClick={() => setOpen(v=>!v)}>
        {open?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>}
      </button>
    </div>
    {open && <nav id="mobile-menu" aria-label="Navegação móvel" className="absolute inset-x-0 top-full border-b border-line bg-deep p-5 shadow-[0_20px_40px_rgba(0,0,0,.35)] lg:hidden">
      <div className="mx-auto grid max-w-7xl gap-1">{links.map(link=><Link key={link.to} to={link.to} onClick={()=>setOpen(false)} className={`rounded-lg px-4 py-3 text-base font-semibold ${(link.to==='/jogo'?path.startsWith('/jogo'):path===link.to)?'bg-cyan/10 text-cyan':'text-ice hover:bg-panel'}`}>{link.label}</Link>)}</div>
    </nav>}
  </header>
}

export function Footer() {
  return <footer className="border-t border-line bg-ink px-5 py-10 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-mist md:flex-row md:items-center"><div><strong className="block tracking-[.1em] text-ice">NEUROCIÊNCIA <span className="text-cyan">•</span> TECNOARTE</strong><span>Saúde e Neurociência</span></div><p className="max-w-md">Uma experiência educativa sobre atenção, feedback e aprendizagem.</p><Link to="/referencias" className="font-semibold text-cyan hover:underline">Fontes científicas ↗</Link></div></footer>
}

export function PageShell({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const path = useRouterState({ select: state => state.location.pathname })
  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      root.current?.querySelectorAll<HTMLElement>('[data-scroll]').forEach(element => {
        gsap.fromTo(element, { autoAlpha: 0, y: 26 }, {
          autoAlpha: 1, y: 0, duration: .78, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })
    }, root)
    ScrollTrigger.refresh()
    return () => context.revert()
  }, [path])
  return <div ref={root} className={`min-h-screen bg-ink ${className}`}><Header/>{children}<Footer/></div>
}

export function SectionTitle({ title, children }: { title: string, children?: React.ReactNode }) {
  return <div className="max-w-3xl"><h1 className="text-4xl font-bold tracking-[-.035em] text-ice sm:text-5xl lg:text-6xl">{title}</h1>{children && <p className="mt-6 max-w-[67ch] text-lg leading-relaxed text-mist">{children}</p>}</div>
}
