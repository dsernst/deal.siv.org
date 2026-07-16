'use client'

import Link from 'next/link'
import { useState } from 'react'

import { LearnMoreLink } from '../LearnMoreLink'
import { SiteHeader } from '../SiteHeader'
import { CompactPayload } from './binaryEncoding'
import { Input } from './Input'
import { Instructions, StepNext } from './Instructions'
import { InviteTitle } from './InviteTitle'
import { type Choices, RoleSelector } from './RoleSelector'
import { ShareUrlDisplay } from './ShareUrlDisplay'
import { useInitiatePayload } from './useInitiatePayload'

type Role = Choices | null

export function Content() {
  const [titleStepDone, setTitleStepDone] = useState(false)
  const [title, setTitle] = useState('')
  const [role, setRole] = useState<Role>(null)
  const [value, setValue] = useState<null | string>(null)

  const { loading, signedPayload } = useInitiatePayload(role, value, title)

  if (value) return <ShareUrlScreen {...{ loading, signedPayload }} />

  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 sm:gap-10">
        <SiteHeader />

        <div className="flex w-full max-w-md flex-col items-center gap-10">
          <TitleStep onNext={() => setTitleStepDone(true)} {...{ setTitle, title, titleStepDone }} />

          {titleStepDone && (
            <div className="flex w-full flex-col items-center border-t border-white/8 pt-10">
              <RoleSelector onSelect={setRole} selectedRole={role} />
            </div>
          )}

          {role && (
            <div className="flex w-full flex-col items-stretch gap-6 border-t border-white/8 pt-10 sm:gap-8">
              <Input onSubmit={setValue} role={role} />
              <Instructions />
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

function TitleStep({
  onNext,
  setTitle,
  title,
  titleStepDone,
}: {
  onNext: () => void
  setTitle: (value: string) => void
  title: string
  titleStepDone: boolean
}) {
  const isEmpty = !title.trim()

  if (titleStepDone && title.trim()) return <InviteTitle title={title.trim()} />
  if (titleStepDone) return null

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 px-2">
      <label className="flex w-full flex-col gap-2 text-left" htmlFor="deal-title">
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/25">
          Optional deal name
        </span>
        <input
          autoFocus
          className="w-full rounded-xl border border-white/[0.07] bg-white/3 px-4 py-3 text-[15px] text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/5 focus:outline-none transition-colors"
          id="deal-title"
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onNext()}
          placeholder="e.g. Consulting Gig"
          type="text"
          value={title}
        />
      </label>

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
