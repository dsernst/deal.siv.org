'use client'

import { useRef, useState } from 'react'

import type { Inputs } from './Content'

import { AutosizeInput } from './AutosizeInput'
import { formatIntegerThousands, normalizePriceInput } from './formatDisplay'

export function PrivateInput({
  inputs,
  setValues,
}: {
  inputs: Inputs
  setValues: (nextValues: Inputs) => void
}) {
  const [index, setIndex] = useState(0)
  const [tempInput, setTempInput] = useState('')
  const $submit = useRef<HTMLButtonElement>(null)

  if (index === 2) return null

  return (
    <div className="inline-flex gap-4">
      <div className="flex flex-col items-stretch" key={`odds${index + 1}`}>
        {/* Label */}
        <label className="text-sm font-medium mb-1 text-center" htmlFor={`odds${index + 1}`}>
          {index === 0 ? "Seller's Min" : "Buyer's Max"} Price
        </label>

        {/* Input Box */}
        <AutosizeInput
          autoFocus
          id={`odds${index + 1}`}
          inputMode="numeric"
          onChange={(e) => setTempInput(normalizePriceInput(e.target.value))}
          onKeyDown={(e) => e.key === 'Enter' && $submit.current?.click()}
          pattern="\d*"
          type="text"
          value={formatIntegerThousands(tempInput)}
        />

        {/* Submit Button */}
        <button
          className="mt-4 w-full cursor-pointer rounded-md border border-blue-500 px-4 py-2 text-white hover:bg-blue-500/10 active:bg-blue-500/20"
          disabled={!tempInput}
          onClick={() => {
            const nextValues = [...inputs] as Inputs
            nextValues[index] = tempInput
            setValues(nextValues)
            setIndex(index + 1)
            setTempInput('')
          }}
          ref={$submit}
        >
          Next
        </button>
      </div>
    </div>
  )
}
