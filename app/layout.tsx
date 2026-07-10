import type { Metadata } from 'next'

import './globals.css'
import { description, title } from './constants'

export const metadata: Metadata = { description, title }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="dark" lang="en">
      <body className="antialiased">
        <div className="flex min-h-dvh flex-col items-center px-6 py-10 text-center sm:px-8">
          <div className="my-auto flex w-full max-w-lg flex-col items-center gap-10">{children}</div>
        </div>
      </body>
    </html>
  )
}
