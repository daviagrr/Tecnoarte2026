import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({ meta: [
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { title: 'Neurociência • Tecnoarte | Como o cérebro aprende?' },
    { name: 'description', content: 'Explore como o cérebro aprende por meio de pesquisas e dois jogos educativos sobre atenção, feedback e adaptação.' },
  ] }),
  component: Root,
})

function Root() { return <Document><Outlet/></Document> }
function Document({ children }: { children: ReactNode }) {
  return <html lang="pt-BR"><head><HeadContent/></head><body>{children}<Scripts/></body></html>
}
