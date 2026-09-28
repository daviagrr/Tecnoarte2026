import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function ScienceFlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(min-width: 640px)', () => {
        gsap.timeline({ scrollTrigger: { trigger: '.science-diagram', start: 'top 85%', end: 'bottom 30%', scrub: .5 } })
          .fromTo('.science-trace', { strokeDashoffset: 480 }, { strokeDashoffset: 0, stagger: .18, duration: 1.6, ease: 'none' }, 0)
          .fromTo('.science-spark', { scale: .7, transformOrigin: '50% 50%' }, { scale: 1, stagger: .18, duration: .6 }, .2)
          .fromTo('.science-signal-one', { x: 0 }, { x: 209, duration: 1, ease: 'none' }, 0)
          .fromTo('.science-signal-two', { x: 0 }, { x: 208, duration: 1, ease: 'none' }, 1)
      })
      media.add('(max-width: 639px)', () => {
        const track = ref.current?.querySelector<HTMLElement>('.science-mobile-track')
        if (!track) return
        gsap.fromTo('.science-mobile-signal', { y: 0 }, { y: () => track.offsetHeight - 90, ease: 'none', scrollTrigger: { trigger: track, start: 'top 85%', end: 'bottom 35%', scrub: .5, invalidateOnRefresh: true } })
      })
      return () => media.revert()
    }, ref)
    return () => context.revert()
  }, [])
  return <div ref={ref}><div className="science-mobile-track relative grid gap-0 sm:hidden" aria-label="Do neurônio ao circuito, passando pela sinapse">
    <span aria-hidden="true" className="absolute top-10 bottom-10 left-9 w-px bg-gradient-to-b from-cyan via-cyan to-violet opacity-60"/>
    <span aria-hidden="true" className="science-mobile-signal absolute top-9 left-[1.6rem] z-10 size-5 rounded-full border-[3px] border-ink bg-cyan shadow-[0_0_18px_#54d9ed]"/>
    {[
      ['Neurônio', 'recebe e envia sinais', 'bg-cyan'],
      ['Sinapse', 'comunicação entre células', 'bg-cyan'],
      ['Circuito', 'pode se modificar', 'bg-violet'],
    ].map(([title, detail, color], index) => <div key={title} className="relative flex items-center gap-4 px-3 py-5 not-last:border-b not-last:border-line"><span className={`relative grid size-12 shrink-0 place-items-center rounded-full border border-line ${index === 2 ? 'shadow-[0_0_24px_#ab8dff25]' : 'shadow-[0_0_24px_#54d9ed20]'}`}><span className={`size-4 rounded-full ${color}`}/></span><span><strong className="block text-lg text-ice">{title}</strong><span className="text-sm text-mist">{detail}</span></span></div>)}
  </div><svg viewBox="0 0 900 290" className="science-diagram hidden h-auto w-full sm:block" role="img" aria-label="Diagrama conceitual: um neurônio envia um sinal, ocorre comunicação na sinapse e a experiência pode modificar circuitos">
    <defs><linearGradient id="science-line"><stop stopColor="#54d9ed"/><stop offset="1" stopColor="#ab8dff"/></linearGradient></defs>
    <g fill="none" stroke="#395276" strokeWidth="2"><circle cx="114" cy="122" r="42"/><circle cx="438" cy="122" r="42"/><circle cx="762" cy="122" r="42"/></g>
    <g fill="none" stroke="url(#science-line)" strokeWidth="3" strokeLinecap="round"><path className="science-trace" d="M156 122 H365" strokeDasharray="480"/><path className="science-trace" d="M480 122 H688" strokeDasharray="480"/><path className="science-trace" d="M711 99 Q650 20 555 42" strokeDasharray="480" opacity=".48"/></g>
    <circle className="science-signal-one" cx="156" cy="122" r="9" fill="#e8f5fa" filter="drop-shadow(0 0 12px #54d9ed)"/>
    <circle className="science-signal-two" cx="480" cy="122" r="9" fill="#e8f5fa" filter="drop-shadow(0 0 12px #ab8dff)"/>
    <g className="science-spark" fill="#54d9ed"><circle cx="114" cy="122" r="14"/><circle cx="438" cy="122" r="14"/></g><circle className="science-spark" cx="762" cy="122" r="14" fill="#ab8dff"/>
    <g fontFamily="Cantarell, sans-serif" fontSize="20" fontWeight="700" fill="#e8f5fa" textAnchor="middle"><text x="114" y="210">Neurônio</text><text x="438" y="210">Sinapse</text><text x="762" y="210">Circuito</text></g>
    <g fontFamily="Cantarell, sans-serif" fontSize="15" fill="#aabdd2" textAnchor="middle"><text x="114" y="238">recebe e envia sinais</text><text x="438" y="238">comunicação entre células</text><text x="762" y="238">pode se modificar</text></g>
  </svg></div>
}
