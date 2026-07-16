'use client'

import { useEffect, useRef, useState } from 'react'

import { AutosizeInput } from '../AutosizeInput'
import { formatIntegerThousands, normalizePriceInput } from '../formatDisplay'
import { StepBack, StepNext } from './Instructions'
import { type Choices, roles } from './RoleSelector'

export function Input({
  animate,
  label,
  onBack,
  onSubmit,
  role,
  submitLabel = 'Next',
}: {
  animate?: boolean
  label?: string
  onBack?: () => void
  onSubmit: (value: string) => void
  role?: Choices
  submitLabel?: string
}) {
  const [input, setInput] = useState('')
  const $submit = useRef<HTMLButtonElement>(null)

  const choice = roles.find(([r]) => r.toLowerCase() === role)
  const [roleTitle, description] = choice || []

  useEffect(() => {
    if (!animate) return
    const id = window.setTimeout(() => document.getElementById('price-input')?.focus(), 720)
    return () => window.clearTimeout(id)
  }, [animate])

  const base = 'instruction-stagger '
  const labelStagger = animate ? base + '[animation-delay:0ms]' : ''
  const inputStagger = animate ? base + '[animation-delay:140ms]' : ''
  const actionStagger = animate ? base + '[animation-delay:280ms]' : ''

  return (
    <div className="flex w-full flex-col items-stretch">
      <label
        className={`mb-3 block text-center text-[10px] uppercase tracking-[0.22em] text-white/25 sm:mb-4 ${labelStagger}`}
        htmlFor="price-input"
      >
        {label || `${roleTitle}'s ${description}`}
      </label>

      <div className={`w-full ${inputStagger}`}>
        <AutosizeInput
          autoFocus={!animate}
          id="price-input"
          inputMode="numeric"
          onChange={(e) => setInput(normalizePriceInput(e.target.value))}
          onKeyDown={(e) => e.key === 'Enter' && $submit.current?.click()}
          pattern="\d*"
          type="text"
          value={formatIntegerThousands(input)}
          variant="async"
        />
      </div>

      <StepNext
        className={`mt-5 sm:mt-8 ${actionStagger}`}
        disabled={!input}
        onClick={() => input && onSubmit(input)}
        ref={$submit}
      >
        {submitLabel}
      </StepNext>

      {onBack && (
        <div className={`mt-3 ${actionStagger}`}>
          <StepBack onClick={onBack} />
        </div>
      )}
    </div>
  )
}
