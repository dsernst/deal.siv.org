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
    const id = window.setTimeout(() => document.getElementById('price-input')?.focus(), 1200)
    return () => window.clearTimeout(id)
  }, [animate])

  return (
    <div className="flex w-full flex-col items-stretch">
      <label
        className={`mb-3 block text-center text-[10px] uppercase tracking-[0.22em] text-white/25 sm:mb-4 ${animate ? 'instruction-stagger-1' : ''}`}
        htmlFor="price-input"
      >
        {label || `${roleTitle}'s ${description}`}
      </label>

      <div className={`w-full ${animate ? 'instruction-stagger-2' : ''}`}>
        <AutosizeInput
          autoFocus={!animate}
          className="border-white/15 bg-white/[0.03] rounded-xl text-white focus:ring-white/20 focus:border-white/25"
          id="price-input"
          inputMode="numeric"
          onChange={(e) => setInput(normalizePriceInput(e.target.value))}
          onKeyDown={(e) => e.key === 'Enter' && $submit.current?.click()}
          pattern="\d*"
          type="text"
          value={formatIntegerThousands(input)}
        />
      </div>

      <StepNext
        className={`mt-5 sm:mt-8 ${animate ? 'instruction-stagger-3' : ''}`}
        disabled={!input}
        onClick={() => input && onSubmit(input)}
        ref={$submit}
      >
        {submitLabel}
      </StepNext>

      {onBack && (
        <div className={`mt-3 ${animate ? 'instruction-stagger-3' : ''}`}>
          <StepBack onClick={onBack} />
        </div>
      )}
    </div>
  )
}
