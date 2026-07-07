'use client'

import type { ReactNode } from 'react'

export const instructionSteps = [
  <>
    <p>
      You each have a <b className="text-cyan-200">private number</b>.
    </p>
    <p>
      Submit <b className="italic text-yellow-300/93">once</b> — neither side sees the other&apos;s.
    </p>
  </>,
  <>
    <p>
      If there <b className="text-green-300">is overlap</b>, a fair win-win price is picked.
    </p>
    <p>
      If there&apos;s <b className="text-pink-300">no overlap</b>, walk away — no hard feelings.
    </p>
    <div className="mt-2 pt-6 border-t border-white/[0.06] flex flex-col gap-1.5">
      <p>
        Your best move: <b className="text-white/90">honest cutoff</b>.
      </p>
      <p className="text-[15px] text-white/35">Posturing is a losing strategy.</p>
    </div>
  </>,
] as const

export function InstructionStep({
  onBack,
  onNext,
  step,
}: {
  onBack?: () => void
  onNext: () => void
  step: number
}) {
  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-md px-4">
      <div className="flex flex-col gap-5 text-[17px] font-extralight leading-relaxed text-white/60 text-center">
        {instructionSteps[step]}
      </div>
      <StepActions onBack={onBack} onClick={onNext} />
    </div>
  )
}

export function StepActions({
  children = 'Next',
  disabled,
  onBack,
  onClick,
}: {
  children?: ReactNode
  disabled?: boolean
  onBack?: () => void
  onClick: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <StepNext disabled={disabled} onClick={onClick}>
        {children}
      </StepNext>
      {onBack && <StepBack onClick={onBack} />}
    </div>
  )
}

export function StepBack({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="text-sm text-white/25 hover:text-white/45 transition-colors cursor-pointer"
      onClick={onClick}
      type="button"
    >
      Back
    </button>
  )
}

export function StepNext({
  children = 'Next',
  disabled,
  onClick,
}: {
  children?: ReactNode
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      className="min-w-[7.5rem] px-10 py-2.5 border border-white/15 rounded-full text-[15px] text-white/90 cursor-pointer hover:bg-white/[0.05] hover:border-white/25 active:bg-white/[0.08] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}
