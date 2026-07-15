export function InviteTitle({ subtitle, title }: { subtitle?: string; title?: string }) {
  if (!title) return null

  return (
    <header className="w-full text-center leading-snug sm:leading-relaxed">
      <p className="text-balance text-lg text-white sm:text-xl">{title}</p>
      {subtitle && <p className="mt-1.5 text-sm text-white/40 sm:mt-2">{subtitle}</p>}
    </header>
  )
}
