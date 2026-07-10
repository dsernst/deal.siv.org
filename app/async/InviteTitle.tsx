export function InviteTitle({ subtitle, title }: { subtitle?: string; title?: string }) {
  if (!title) return null

  return (
    <header className="w-full text-center text-[17px] leading-relaxed">
      <p className="text-balance text-white/75">{title}</p>
      {subtitle && <p className="mt-2 text-white/40">{subtitle}</p>}
    </header>
  )
}
