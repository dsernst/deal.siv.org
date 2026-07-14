'use client'

import type { ComponentProps } from 'react'

/** Width expands to the displayed value */
export function AutosizeInput({
  className = '',
  variant = 'local',
  ...props
}: ComponentProps<'input'> & { minWidthClass?: string; variant?: 'async' | 'local' }) {
  const measure = String(props.value ?? '') || '\u00a0'
  if (variant === 'async') {
    return (
      <div className="relative block w-full min-h-16 sm:inline-block sm:min-h-20 sm:w-auto sm:min-w-40">
        <span
          aria-hidden
          className="invisible flex h-16 sm:h-20 items-center whitespace-pre border border-transparent box-border px-3 text-center text-2xl sm:text-3xl pointer-events-none select-none"
        >
          {measure}
        </span>
        <input
          {...props}
          className={`absolute left-0 top-0 z-10 h-16 sm:h-20 w-full min-w-0 box-border rounded-xl border border-white/15 bg-white/3 px-3 py-2 text-center text-2xl sm:text-3xl text-white focus:border-white/25 focus:outline-none focus:ring-2 focus:ring-white/20 no-number-controls ${className}`}
        />
      </div>
    )
  }

  return (
    <div className="relative inline-block min-h-20 self-center min-w-40">
      <span
        aria-hidden
        className="invisible flex h-20 items-center whitespace-pre border border-transparent box-border px-3 text-center text-3xl pointer-events-none select-none"
      >
        {measure}
      </span>
      <input
        {...props}
        className={`absolute left-0 top-0 z-10 h-20 w-full min-w-0 box-border border border-gray-300 rounded-md px-3 py-2 text-center text-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 no-number-controls ${className}`}
      />
    </div>
  )
}
