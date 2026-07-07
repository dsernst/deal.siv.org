import { description, title } from './constants'

export function SiteHeader() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-1">{title}</h1>
      <p className="text-lg text-gray-400 mb-8">{description}</p>
    </>
  )
}
