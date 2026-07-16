'use client'

import { useRef, useState } from 'react'

import { AutosizeInput } from '../AutosizeInput'
import { formatIntegerThousands, normalizePriceInput } from '../formatDisplay'
import { StepNext } from './Instructions'
import { type Choices, roles } from './RoleSelector'

export function Input({
  label,
  onSubmit,
  role,
  submitLabel = 'Next',
}: {
  label?: string
  onSubmit: (value: string) => void
  role?: Choices
  submitLabel?: string
}) {
  const [input, setInput] = useState('')
  const $submit = useRef<HTMLButtonElement>(null)

  const choice = roles.find(([r]) => r.toLowerCase() === role)
  const [roleTitle, description] = choice || []

  return (
    <div className="flex w-full flex-col items-stretch">
      <label
        className="mb-3 block text-center text-[10px] uppercase tracking-[0.22em] text-white/25 sm:mb-4"
        htmlFor="price-input"
      >
        {label || `${roleTitle}'s ${description}`}
      </label>

      <AutosizeInput
        autoFocus
        id="price-input"
        inputMode="numeric"
        onChange={(e) => setInput(normalizePriceInput(e.target.value))}
        onKeyDown={(e) => e.key === 'Enter' && $submit.current?.click()}
        pattern="\d*"
        type="text"
        value={formatIntegerThousands(input)}
        variant="async"
      />

      <StepNext
        className="mt-5 sm:mt-8"
        disabled={!input}
        onClick={() => input && onSubmit(input)}
        ref={$submit}
      >
        {submitLabel}
      </StepNext>
    </div>
  )
}
