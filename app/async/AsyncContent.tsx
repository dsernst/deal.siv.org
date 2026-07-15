'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { LearnMoreLink } from '../LearnMoreLink'
import { SiteHeader } from '../SiteHeader'
import { CompactPayload } from './binaryEncoding'
import { Input } from './Input'
import {
  INSTRUCTION_STEP_COUNT,
  InstructionLog,
  StepActions,
  StepNext,
} from './Instructions'
import { InviteTitle } from './InviteTitle'
import { type Choices, RoleSelector } from './RoleSelector'
import { ShareUrlDisplay } from './ShareUrlDisplay'
import { useInitiatePayload } from './useInitiatePayload'

type Role = Choices | null

const INPUT_STEP = INSTRUCTION_STEP_COUNT

export function Content() {
  const [titleStepDone, setTitleStepDone] = useState(false)
  const [name, setName] = useState('')
  const [dealTitle, setDealTitle] = useState('')
  const [role, setRole] = useState<Role>(null)
  const [step, setStep] = useState(0)
  const [showInput, setShowInput] = useState(false)
  const [value, setValue] = useState<null | string>(null)
  const inputRef = useRef<HTMLDivElement>(null)

  const title = composeInviteTitle(name, dealTitle)
  const { loading, signedPayload } = useInitiatePayload(role, value, title)

  useEffect(() => {
    if (!role || step !== INPUT_STEP) return setShowInput(false)
    const revealId = window.setTimeout(() => setShowInput(true), 500)
    const scrollId = window.setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 900)
    return () => {
      window.clearTimeout(revealId)
      window.clearTimeout(scrollId)
    }
  }, [role, step])

  if (value) return <ShareUrlScreen {...{ loading, signedPayload }} />

  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 sm:gap-10">
        <SiteHeader />

        <div className="flex w-full max-w-md flex-col items-center gap-10">
          <TitleSection
            {...{ dealTitle, name, setDealTitle, setName, titleStepDone }}
            onNext={() => setTitleStepDone(true)}
          />

          {/* Role */}
          {titleStepDone && (
            <div className="flex w-full flex-col items-center border-t border-white/8 pt-10">
              <RoleSelector onSelect={setRole} selectedRole={role} />
            </div>
          )}

          {/* Instructions → Value */}
          {role && (
            <div className="flex w-full flex-col items-stretch gap-4 border-t border-white/8 pt-10 sm:gap-6">
              <InstructionLog step={step} />

              {step < INPUT_STEP ? (
                <StepActions
                  onBack={step > 0 ? () => setStep(step - 1) : undefined}
                  onClick={() => setStep(step + 1)}
                />
              ) : (
                showInput && (
                  <div
                    className="flex w-full scroll-mb-8 flex-col items-stretch gap-6 sm:gap-8"
                    ref={inputRef}
                  >
                    <Input
                      animate
                      onBack={() => setStep(INSTRUCTION_STEP_COUNT - 1)}
                      onSubmit={setValue}
                      role={role}
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-center pt-8">
        <LearnMoreLink className="text-sm text-white/30 block hover:text-white/50 transition-colors" />
        <Link className="text-sm text-gray-400 mt-1 block hover:underline" href="/">
          Switch to local-device mode
        </Link>
      </div>
    </>
  )
}

function composeInviteTitle(name: string, dealTitle: string) {
  const trimmedName = name.trim()
  const trimmedDeal = dealTitle.trim()
  if (!trimmedName || !trimmedDeal) return ''
  return `${trimmedName} invites you to ${trimmedDeal}`
}

function ShareUrlScreen({
  loading,
  signedPayload,
}: {
  loading: boolean
  signedPayload: CompactPayload | null
}) {
  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 sm:gap-10">
        <SiteHeader />
        {loading ? (
          <p className="text-gray-400">Creating your Share URL...</p>
        ) : signedPayload ? (
          <ShareUrlDisplay payload={signedPayload} />
        ) : (
          <p className="text-red-400">Error creating Share URL</p>
        )}
      </div>
      <LearnMoreLink className="text-sm text-white/30 shrink-0 pt-8 block hover:text-white/50 transition-colors" />
    </>
  )
}

function TitleSection({
  dealTitle,
  name,
  onNext,
  setDealTitle,
  setName,
  titleStepDone,
}: {
  dealTitle: string
  name: string
  onNext: () => void
  setDealTitle: (value: string) => void
  setName: (value: string) => void
  titleStepDone: boolean
}) {
  const $deal = useRef<HTMLInputElement>(null)
  const [dealDone, setDealDone] = useState(false)
  const preview = composeInviteTitle(name, dealTitle)
  const isEmpty = !name.trim() && !dealTitle.trim()
  const showUnified = dealDone && Boolean(name.trim() && dealTitle.trim())

  if (titleStepDone && preview) return <InviteTitle title={preview} />

  if (titleStepDone) return null

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-md px-2">
      {/* Live preview */}
      <p className="text-xl font-light leading-relaxed text-balance">
        {showUnified ? (
          <span className="text-white">{preview}</span>
        ) : (
          <>
            <span className={name.trim() ? 'text-white' : 'text-white/20'}>
              {name.trim() || 'Name'}
            </span>
            <span className="text-white"> invites you to </span>
            <span className={dealTitle.trim() ? 'text-white' : 'text-white/20'}>
              {dealTitle.trim() || 'the deal'}
            </span>
          </>
        )}
      </p>

      {/* Fields */}
      <div className="grid w-full gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-left">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/25">Name</span>
          <input
            autoFocus
            className="w-full rounded-xl border border-white/[0.07] bg-white/3 px-4 py-3 text-[15px] text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/5 focus:outline-none transition-colors"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return
              e.preventDefault()
              $deal.current?.focus()
            }}
            placeholder="Sarah"
            type="text"
            value={name}
          />
        </label>
        <label className="flex flex-col gap-2 text-left">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/25">Deal</span>
          <input
            className="w-full rounded-xl border border-white/[0.07] bg-white/3 px-4 py-3 text-[15px] text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/5 focus:outline-none transition-colors"
            onBlur={() => name.trim() && dealTitle.trim() && setDealDone(true)}
            onChange={(e) => {
              setDealTitle(e.target.value)
              if (!e.target.value.trim()) setDealDone(false)
            }}
            onFocus={() => setDealDone(false)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return
              if (name.trim() && dealTitle.trim()) setDealDone(true)
              onNext()
            }}
            placeholder="Consulting Gig"
            ref={$deal}
            type="text"
            value={dealTitle}
          />
        </label>
      </div>

      {isEmpty ? (
        <button
          className="text-sm text-white/35 hover:text-white/55 transition-colors cursor-pointer"
          onClick={onNext}
          type="button"
        >
          Skip
        </button>
      ) : (
        <StepNext onClick={onNext} />
      )}
    </div>
  )
}
