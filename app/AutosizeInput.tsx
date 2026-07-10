'use client'

import type { ComponentProps } from 'react'

/** Width expands to the displayed value */
export function AutosizeInput({
  className = '',
  ...props
}: ComponentProps<'input'> & { minWidthClass?: string }) {
  const measure = String(props.value ?? '') || '\u00a0'
  return (
    <div className="relative block w-full min-h-16 sm:inline-block sm:min-h-20 sm:w-auto sm:min-w-40">
      <span
        aria-hidden
        className="invisible flex h-16 sm:h-20 items-center whitespace-pre border border-transparent box-border px-3 text-2xl sm:text-3xl pointer-events-none select-none"
      >
        {measure}
      </span>
      <input
        {...props}
        className={`absolute left-0 top-0 z-10 h-16 sm:h-20 w-full min-w-0 box-border rounded-xl border border-white/15 bg-white/3 px-3 py-2 text-2xl sm:text-3xl text-white focus:border-white/25 focus:outline-none focus:ring-2 focus:ring-white/20 no-number-controls ${className}`}
      />
    </div>
  )
}
