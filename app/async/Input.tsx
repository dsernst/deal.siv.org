'use client'

import { useRef, useState } from 'react'

import { AutosizeInput } from '../AutosizeInput'
import { formatIntegerThousands, normalizePriceInput } from '../formatDisplay'
import { type Choices, roles } from './RoleSelector'

export function Input({
  label,
  onSubmit,
  role,
}: {
  label?: string
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
        <label className="text-sm font-medium mb-1 text-center" htmlFor="price-input">
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
          className="mt-4 w-full cursor-pointer rounded-md border border-blue-500 px-4 py-2 text-white hover:bg-blue-500/10 active:bg-blue-500/20"
          disabled={!input}
          onClick={() => input && onSubmit(input)}
          ref={$submit}
        >
          Next
        </button>
      </div>
    </div>
  )
}
