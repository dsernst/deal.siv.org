import { SiteHeader } from '../SiteHeader'

export default function InviteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center px-4 pb-5 pt-6 text-center sm:px-8 sm:py-10">
      <div className="flex w-full max-w-lg flex-col items-center gap-6 sm:my-auto sm:gap-10">
        <div className="flex w-full flex-col items-center gap-6 sm:max-w-md sm:gap-8">
          <SiteHeader />
          {children}
        </div>
      </div>
    </div>
  )
}
