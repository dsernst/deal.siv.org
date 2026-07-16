'use client'

import type { ComponentProps } from 'react'

/** Width expands to the displayed value */
export function AutosizeInput({
  className = '',
  variant = 'local',
  ...props
}: ComponentProps<'input'> & { minWidthClass?: string; variant?: 'async' | 'local' }) {
  const measure = String(props.value ?? '') || '\u00a0'
  const isAsync = variant === 'async'

  // Async differs from local in: full-width on mobile, shorter mobile height,
  // smaller mobile text, and glassy white styling instead of gray border + blue ring
  const size = isAsync ? 'h-16 sm:h-20 text-2xl sm:text-3xl' : 'h-20 text-3xl'

  return (
    <div
      className={
        isAsync
          ? 'relative block w-full min-h-16 sm:inline-block sm:min-h-20 sm:w-auto sm:min-w-40'
          : 'relative inline-block min-h-20 self-center min-w-40'
      }
    >
      <span
        aria-hidden
        className={`invisible flex ${size} items-center whitespace-pre border border-transparent box-border px-3 text-center pointer-events-none select-none`}
      >
        {measure}
      </span>
      <input
        {...props}
        className={`absolute left-0 top-0 z-10 ${size} w-full min-w-0 box-border px-3 py-2 text-center no-number-controls ${
          isAsync
            ? 'rounded-xl border border-white/15 bg-white/3 text-white focus:border-white/25 focus:outline-none focus:ring-2 focus:ring-white/20'
            : 'border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        } ${className}`}
      />
    </div>
  )
}
