import { description, title } from '../constants'

export default function InviteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-md flex-col items-center">
      <p className="mb-10 text-center text-sm leading-relaxed text-white/30">
        <span className="text-white/45">{title}</span>
        <span className="mx-1.5">·</span>
        {description}
      </p>
      {children}
    </div>
  )
}
