'use client'

import { Check, Lock, X } from 'lucide-react'
import { type ComponentProps, forwardRef, type ReactNode, useEffect, useRef, useState } from 'react'

export const INSTRUCTION_STEP_COUNT = 3

export const instructionSteps = [
  <div className="flex flex-col gap-5 text-left" key="once">
    <OutcomeRow
      icon={
        <IconSlot>
          <span className="text-[11px] font-semibold tabular-nums text-white/50">1</span>
        </IconSlot>
      }
    >
      You can only submit your <span className="italic whitespace-nowrap">value once.</span>
    </OutcomeRow>
    <OutcomeRow
      icon={
        <IconSlot>
          <Lock className="size-3.5 text-white/50" strokeWidth={1.75} />
        </IconSlot>
      }
    >
      Neither side will see the other&apos;s input.
    </OutcomeRow>
  </div>,
  <div className="flex flex-col gap-5 text-left" key="outcomes">
    <OutcomeRow
      icon={
        <span className="flex h-[1.375em] w-5 shrink-0 items-center justify-center rounded-md bg-emerald-400/20">
          <Check className="size-3.5 text-emerald-400" strokeWidth={2.5} />
        </span>
      }
    >
      If there is an overlap, a fair random win-win price will be picked between min &amp; max.
    </OutcomeRow>
    <OutcomeRow
      icon={
        <span className="flex h-[1.375em] w-5 shrink-0 items-center justify-center rounded-md bg-red-500/15">
          <X className="size-3.5 text-red-500" strokeWidth={2.5} />
        </span>
      }
    >
      If there&apos;s no overlap, no hard feelings.
    </OutcomeRow>
  </div>,
  <Hint key="hint">
    Unlike traditional negotiations, both sides&apos; best move here is to enter your honest
    cutoff point, to not miss potential win-win deals. &ldquo;Posturing&rdquo; is a losing
    strategy.
  </Hint>,
] as const

export function InstructionLog({ step }: { step: number }) {
  const onInputStep = step >= INSTRUCTION_STEP_COUNT
  const lastVisibleIdx = onInputStep ? instructionSteps.length - 1 : step
  const visibleSteps = instructionSteps.slice(0, lastVisibleIdx + 1)
  const currentIdx = onInputStep ? -1 : step
  const prevLastIdx = useRef(lastVisibleIdx)
  const enteringIdx = lastVisibleIdx > prevLastIdx.current ? lastVisibleIdx : null

  useEffect(() => {
    prevLastIdx.current = lastVisibleIdx
  }, [lastVisibleIdx])

  return (
    <InstructionPanel>
      <div className="flex flex-col gap-6 transition-[gap] duration-500 ease-out">
        {visibleSteps.map((content, i) => (
          <InstructionLogEntry
            age={currentIdx < 0 ? instructionSteps.length : currentIdx - i}
            entering={enteringIdx === i}
            isCurrent={i === currentIdx}
            isFirst={i === 0}
            key={i}
          >
            {content}
          </InstructionLogEntry>
        ))}
      </div>
    </InstructionPanel>
  )
}

export function InstructionPanel({ children }: { children: ReactNode }) {
  return (
    <div className="w-full rounded-2xl border border-cyan-400/10 bg-linear-to-b from-cyan-400/6 to-cyan-400/2 px-6 py-7 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_24px_48px_-24px_rgba(6,182,212,0.12)] transition-[padding] duration-500 ease-out">
      {children}
    </div>
  )
}

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
    <div className="flex flex-col items-center gap-8 w-full px-4">
      <InstructionLog {...{ step }} />
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
      className="text-sm text-white/30 hover:text-white/50 transition-colors cursor-pointer"
      onClick={onClick}
      type="button"
    >
      Back
    </button>
  )
}

export const StepNext = forwardRef(function StepNext(
  {
    children = 'Next',
    className = '',
    disabled,
    onClick,
  }: {
    children?: ReactNode
    className?: string
    disabled?: boolean
    onClick: () => void
  },
  ref: ComponentProps<'button'>['ref'],
) {
  return (
    <button
      className={`min-w-32 px-10 py-2.5 rounded-full text-[15px] font-medium bg-white/80 text-black cursor-pointer hover:bg-white/90 active:bg-white/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      onClick={onClick}
      ref={ref}
      type="button"
    >
      {children}
    </button>
  )
})

function Hint({ children }: { children: ReactNode }) {
  return (
    <p className="text-left text-[15px] leading-relaxed text-white/50">
      <span className="text-white/65">Hint:</span> {children}
    </p>
  )
}

function IconSlot({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-[1.375em] w-5 shrink-0 items-center justify-center rounded-md bg-white/8">
      {children}
    </span>
  )
}

function InstructionLogEntry({
  age,
  children,
  entering,
  isCurrent,
  isFirst,
}: {
  age: number
  children: ReactNode
  entering: boolean
  isCurrent: boolean
  isFirst: boolean
}) {
  const [open, setOpen] = useState(!entering)

  useEffect(() => {
    if (!entering) return
    const id = requestAnimationFrame(() => setOpen(true))
    return () => cancelAnimationFrame(id)
  }, [entering])

  return (
    <div
      className={`grid transition-[grid-template-rows] duration-550 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} ${isFirst ? '' : 'border-t border-white/6 pt-6'}`}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className={`flex flex-col gap-4 text-left text-base leading-relaxed transition-[opacity,transform] duration-700 ease-out ${
            isCurrent ? 'opacity-100' : age === 1 ? 'opacity-40' : age >= 2 ? 'opacity-25' : 'opacity-30'
          } ${entering && open ? 'instruction-flow-in' : entering ? 'opacity-0' : ''}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function OutcomeRow({ children, icon }: { children: ReactNode; icon: ReactNode }) {
  return (
    <div className="flex items-start gap-3.5">
      {icon}
      <p className="leading-snug text-white/60">{children}</p>
    </div>
  )
}
