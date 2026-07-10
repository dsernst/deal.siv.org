import { description, title } from './constants'

export function SiteHeader() {
  return (
    <header className="mb-2">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-1.5 text-lg text-white/40">{description}</p>
    </header>
  )
}
