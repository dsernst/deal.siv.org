'use client'

import { useRef, useState } from 'react'

import { AutosizeInput } from '../AutosizeInput'
import { formatIntegerThousands, normalizePriceInput } from '../formatDisplay'
import { StepBack } from './Instructions'
import { type Choices, roles } from './RoleSelector'

export function Input({
  label,
  onBack,
  onSubmit,
  role,
}: {
  label?: string
  onBack?: () => void
  onSubmit: (value: string) => void
  role?: Choices
}) {
  const [input, setInput] = useState('')
  const $submit = useRef<HTMLButtonElement>(null)

  const choice = roles.find(([r]) => r.toLowerCase() === role)
  const [roleTitle, description] = choice || []

  return (
    <div className="inline-flex gap-4">
      <div className="flex flex-col items-stretch">
        <label
          className="text-[10px] uppercase tracking-[0.22em] text-white/25 mb-3 text-center block"
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
        />

        {/* Submit Button */}
        <button
          className={
            onBack
              ? 'mt-6 min-w-[7.5rem] w-full cursor-pointer rounded-full border border-white/20 px-4 py-2.5 text-[15px] text-white/90 hover:bg-white/[0.05] hover:border-white/30 active:bg-white/[0.08] transition-colors disabled:opacity-40'
              : 'mt-4 w-full cursor-pointer rounded-md border border-blue-500 px-4 py-2 text-white hover:bg-blue-500/10 active:bg-blue-500/20'
          }
          disabled={!input}
          onClick={() => input && onSubmit(input)}
          ref={$submit}
        >
          Next
        </button>

        {onBack && (
          <div className="mt-3 flex justify-center">
            <StepBack onClick={onBack} />
          </div>
        )}
      </div>
    </div>
  )
}
