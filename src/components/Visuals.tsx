import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function NeuralOrbit({ compact = false }: { compact?: boolean }) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
    const context = gsap.context(() => {
      const path = ref.current?.querySelector<SVGPathElement>('.orbit-trace')
      const signal = ref.current?.querySelector<SVGCircleElement>('.orbit-signal')
      if (!path || !signal) return
      gsap.set(signal, { opacity: 1 })
      gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'bottom 25%', scrub: .5 } })
        .fromTo('.orbit-trace', { strokeDashoffset: 380 }, { strokeDashoffset: 0, stagger: .12, duration: 1.2, ease: 'none' }, 0)
        .to(signal, { motionPath: { path }, duration: 2, ease: 'none' }, 0)
        .fromTo('.orbit-core', { scale: .94, transformOrigin: '50% 50%' }, { scale: 1.04, duration: 2, ease: 'none' }, 0)
    }, ref)
    return () => context.revert()
  }, [])
  return <svg ref={ref} className={`orbital h-auto w-full ${compact ? 'max-w-105' : 'max-w-145'}`} viewBox="0 0 600 600" role="img" aria-label="Diagrama abstrato de conexões neurais, com pontos ligados por trajetórias luminosas">
    <defs>
      <radialGradient id="sphere"><stop stopColor="#3474b3" stopOpacity=".42"/><stop offset=".55" stopColor="#262d73" stopOpacity=".16"/><stop offset="1" stopColor="#0b1126" stopOpacity="0"/></radialGradient>
      <linearGradient id="trace" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#54d9ed" stopOpacity=".14"/><stop offset=".5" stopColor="#54d9ed" stopOpacity=".8"/><stop offset="1" stopColor="#ab8dff" stopOpacity=".25"/></linearGradient>
    </defs>
    <circle cx="300" cy="300" r="245" fill="url(#sphere)" className="orbit-core"/>
    <circle cx="300" cy="300" r="195" fill="none" stroke="#627dad" strokeOpacity=".24" strokeWidth="1"/>
    <circle cx="300" cy="300" r="133" fill="none" stroke="#6786b1" strokeOpacity=".16" strokeWidth="1"/>
    <ellipse cx="300" cy="300" rx="251" ry="111" transform="rotate(-29 300 300)" fill="none" stroke="#50709a" strokeOpacity=".25"/>
    <ellipse cx="300" cy="300" rx="238" ry="91" transform="rotate(51 300 300)" fill="none" stroke="#6e72b8" strokeOpacity=".25"/>
    <g fill="none" stroke="url(#trace)" strokeWidth="2" strokeLinecap="round" strokeDasharray="380 0">
      <path className="orbit-trace" d="M104 315 C170 220 240 255 298 302 S411 378 493 240"/>
      <path className="orbit-trace" d="M173 136 C232 172 218 275 298 302 S375 309 422 445"/>
      <path className="orbit-trace" d="M128 415 C197 400 219 337 298 302 S406 195 481 371"/>
      <path className="orbit-trace" d="M246 493 C294 446 273 351 298 302 S373 179 354 95"/>
    </g>
    <circle className="orbit-signal" cx="0" cy="0" r="9" fill="#e8f5fa" opacity="0" filter="drop-shadow(0 0 12px #54d9ed)"/>
    <circle cx="298" cy="302" r="46" fill="#17325d" stroke="#70ddea" strokeOpacity=".56"/>
    <circle cx="298" cy="302" r="21" fill="#54d9ed" opacity=".9"/>
    <circle cx="298" cy="302" r="70" fill="none" stroke="#54d9ed" strokeOpacity=".18"/>
    {[[104,315],[493,240],[173,136],[422,445],[128,415],[481,371],[246,493],[354,95]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="10" fill={i%3===0?'#ab8dff':'#54d9ed'} opacity=".9"/><circle cx={x} cy={y} r="22" fill="none" stroke={i%3===0?'#ab8dff':'#54d9ed'} strokeOpacity=".24"/></g>)}
  </svg>
}

export function PathGraphic() {
  return <svg viewBox="0 0 860 180" className="h-auto w-full" role="img" aria-label="Trajetória da pergunta à conclusão em seis etapas conectadas">
    <path d="M32 100 C128 25 176 130 256 85 S395 49 445 95 S563 148 615 88 S745 40 825 76" fill="none" stroke="#344e72" strokeWidth="2"/>
    <path d="M32 100 C128 25 176 130 256 85 S395 49 445 95 S563 148 615 88 S745 40 825 76" fill="none" stroke="#54d9ed" strokeOpacity=".68" strokeWidth="2" strokeDasharray="12 16"/>
    {[[32,100],[185,92.57],[335,56.58],[485,121.6],[645,62.6],[825,76]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="8" fill={i===5?'#ab8dff':'#54d9ed'}/><circle cx={x} cy={y} r="18" fill="none" stroke={i===5?'#ab8dff':'#54d9ed'} strokeOpacity=".32"/></g>)}
  </svg>
}
