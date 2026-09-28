import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from '../components/Layout'
import { ColorExperience } from '../color-game/ColorExperience'

export const Route = createFileRoute('/jogo/cores')({ component: ColorsGame })
function ColorsGame() { return <PageShell className="game-glow"><main className="px-5 py-14 sm:px-8 lg:px-12 lg:py-22"><ColorExperience/></main></PageShell> }
