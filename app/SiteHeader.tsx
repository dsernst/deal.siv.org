import Image from 'next/image'

import { description, title } from './constants'

export function SiteHeader() {
  return (
    <header>
      <Image
        alt=""
        className="mx-auto mb-2.5 h-9 w-9 opacity-75 sm:mb-3"
        height={36}
        priority
        src="/apple-icon.png"
        width={36}
      />
      <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.65rem]">
        {title}
      </h1>
      <p className="mt-1 text-sm text-white/40">{description}</p>
    </header>
  )
}
