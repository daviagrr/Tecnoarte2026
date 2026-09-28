import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from '../components/Layout'
import { GameExperience } from '../game/GameExperience'

export const Route = createFileRoute('/jogo/codigo')({ component: CodeGame })
function CodeGame() { return <PageShell className="game-glow"><main className="px-5 py-14 sm:px-8 lg:px-12 lg:py-22"><GameExperience/></main></PageShell> }
