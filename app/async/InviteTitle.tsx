export function InviteTitle({ subtitle, title }: { subtitle?: string; title?: string }) {
  if (!title) return null

  return (
    <header className="w-full px-4 text-center -mt-2 mb-1">
      <p className="text-lg font-light tracking-wide text-white text-balance">{title}</p>
      {subtitle && <p className="mt-2 text-sm text-white/45">{subtitle}</p>}
    </header>
  )
}
