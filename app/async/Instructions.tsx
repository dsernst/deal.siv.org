'use client'

import { Check, Lock, X } from 'lucide-react'
import { type ComponentProps, forwardRef, type ReactNode } from 'react'

export const Instructions = () => (
  <InstructionPanel>
    <div className="flex flex-col gap-5 text-left sm:gap-6">
      <div className="flex flex-col gap-4 sm:gap-5">
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
      </div>

      <div className="flex flex-col gap-4 border-t border-white/6 pt-4 sm:gap-5 sm:pt-6">
        <OutcomeRow
          icon={
            <span className="flex h-[1.375em] w-5 shrink-0 items-center justify-center rounded-md bg-emerald-400/20">
              <Check className="size-3.5 text-emerald-400" strokeWidth={2.5} />
            </span>
          }
        >
          If there is an overlap, a win-win price is picked within our limits, centered on the
          midpoint, with random noise for privacy.
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

      <p className="border-t border-white/6 pt-4 text-left text-[15px] leading-relaxed text-white/50 sm:pt-6">
        <span className="text-white/65">Hint:</span> Unlike traditional negotiations, both sides&apos;
        best move here is to enter your honest cutoff point, to not miss potential win-win deals.
        &ldquo;Posturing&rdquo; is a losing strategy.
      </p>
    </div>
  </InstructionPanel>
)

export function InstructionPanel({ children }: { children: ReactNode }) {
  return (
    <div className="w-full rounded-xl border border-cyan-400/10 bg-linear-to-b from-cyan-400/6 to-cyan-400/2 px-4 py-5 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_24px_48px_-24px_rgba(6,182,212,0.12)] sm:rounded-2xl sm:px-6 sm:py-7">
      {children}
    </div>
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
      className={`w-full px-10 py-3 sm:w-auto sm:min-w-32 sm:py-2.5 rounded-full text-[15px] font-medium bg-white/80 text-black cursor-pointer hover:bg-white/90 active:bg-white/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      onClick={onClick}
      ref={ref}
      type="button"
    >
      {children}
    </button>
  )
})

function IconSlot({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-[1.375em] w-5 shrink-0 items-center justify-center rounded-md bg-white/8">
      {children}
    </span>
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
