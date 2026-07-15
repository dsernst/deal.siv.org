export default function AsyncLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center px-4 pb-5 pt-6 text-center sm:px-8 sm:py-10">
      <div className="flex w-full max-w-lg flex-1 flex-col items-center">{children}</div>
    </div>
  )
}
