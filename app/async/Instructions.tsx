'use client'

import { Check, Lock, X } from 'lucide-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'

export const instructionSteps = [
  <div className="flex flex-col gap-4 text-left sm:items-center sm:text-center" key="once">
    <OutcomeRow
      centered
      icon={
        <IconSlot>
          <span className="text-[11px] font-semibold tabular-nums text-white/45">1</span>
        </IconSlot>
      }
    >
      You can only submit your <span className="italic whitespace-nowrap">value once.</span>
    </OutcomeRow>
    <OutcomeRow
      centered
      icon={
        <IconSlot>
          <Lock className="size-3.5 text-white/45" strokeWidth={1.75} />
        </IconSlot>
      }
    >
      Neither side will see the other&apos;s input.
    </OutcomeRow>
  </div>,
  <>
    <div className="flex flex-col gap-5 text-left">
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
    </div>
    <Hint>
      Unlike traditional negotiations, both sides&apos; best move here is to enter your honest
      cutoff point, to not miss potential win-win deals. &ldquo;Posturing&rdquo; is a losing
      strategy.
    </Hint>
  </>,
] as const

export function InstructionLog({ showAll, step }: { showAll?: boolean; step: number }) {
  const lastIdx = showAll ? instructionSteps.length - 1 : step
  const visibleSteps = instructionSteps.slice(0, lastIdx + 1)
  const prevLastIdx = useRef(lastIdx)
  const enteringIdx = lastIdx > prevLastIdx.current ? lastIdx : null

  useEffect(() => {
    prevLastIdx.current = lastIdx
  }, [lastIdx])

  return (
    <InstructionPanel>
      <div className="flex flex-col gap-6 transition-[gap] duration-500 ease-out">
        {visibleSteps.map((content, i) => (
          <InstructionLogEntry
            entering={enteringIdx === i}
            isCurrent={!showAll && i === lastIdx}
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
    <div className="w-full rounded-2xl border border-cyan-400/10 bg-linear-to-b from-cyan-400/6 to-cyan-400/2 px-6 py-7 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-[padding] duration-500 ease-out">
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

export function StepDots({ step, total = 4 }: { step: number; total?: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <div
          className={`h-0.5 w-6 rounded-full transition-colors ${i <= step ? 'bg-white/45' : 'bg-white/10'}`}
          key={i}
        />
      ))}
    </div>
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
      className="min-w-32 px-10 py-2.5 rounded-full text-[15px] font-medium bg-white/80 text-black cursor-pointer hover:bg-white/90 active:bg-white/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

function Hint({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 border-t border-white/6 pt-6 text-left text-sm leading-relaxed text-white/40">
      <span className="text-white/55">Hint:</span> {children}
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
  children,
  entering,
  isCurrent,
  isFirst,
}: {
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
          className={`flex flex-col gap-4 text-left text-base leading-relaxed transition-[color,opacity] duration-500 ease-out ${isCurrent ? 'text-white/60' : 'text-white/38'} ${entering && open ? 'instruction-flow-in' : entering ? 'opacity-0' : ''}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function OutcomeRow({
  centered,
  children,
  icon,
}: {
  centered?: boolean
  children: ReactNode
  icon: ReactNode
}) {
  return (
    <div className={`flex items-start gap-3 ${centered ? 'sm:justify-center' : ''}`}>
      {icon}
      <p className={`leading-snug text-white/60 ${centered ? 'sm:text-center' : ''}`}>{children}</p>
    </div>
  )
}
