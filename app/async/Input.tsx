'use client'

import { useRef, useState } from 'react'

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
    <div className="flex gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1 text-center" htmlFor="price-input">
          {label || `${roleTitle}'s ${description}`}
        </label>

        <input
          autoFocus
          className="px-3 py-2 h-20 w-48 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 no-number-controls text-3xl"
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
          className="border-blue-500 border text-white px-4 py-2 rounded-md mt-4 cursor-pointer hover:bg-blue-500/10 active:bg-blue-500/20"
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
