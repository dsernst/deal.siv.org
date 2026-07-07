'use client'

import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { PlaintextData } from './binaryEncoding'

import { LearnMoreLink } from '../LearnMoreLink'
import { BobSubmission } from './BobSubmission'
import { Input } from './Input'
import { InstructionStep, StepActions } from './Instructions'
import { InviteTitle } from './InviteTitle'
import { ResultDisplay } from './ResultDisplay'

type ValidateResponse =
  | { error: string }
  | {
      r: 'b' | 's'
      result?: { hasOverlap: boolean; result: null | number }
      title?: string
      used: boolean
    }

export function BobContent() {
  const params = useParams()
  const pathname = usePathname()
  const payload = readPayloadParam(params?.payload) ?? readPayloadFromPath(pathname)
  const [aliceData, setAliceData] = useState<null | PlaintextData>(null)
  const [bobsValue, setBobsValue] = useState<null | string>(null)
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(0)
  const [existingResult, setExistingResult] = useState<null | {
    hasOverlap: boolean
    result: null | number
  }>(null)

  useEffect(() => {
    if (!payload) {
      setError('No payload found in URL')
      return setLoading(false)
    }

    fetch('/async/api/validate', {
      body: JSON.stringify({ payload }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
      .then(async (res) => {
        const data: ValidateResponse = await res.json()
        if (!res.ok) {
          setError('error' in data ? data.error : 'Failed to validate payload')
          return setLoading(false)
        }

        setLoading(false)
        if ('error' in data) return setError(data.error)

        setAliceData({
          r: data.r,
          ...(data.title !== undefined && { title: data.title }),
        } as PlaintextData)

        if (data.used && data.result) setExistingResult(data.result)
      })
      .catch(() => {
        setError('Failed to validate payload')
        setLoading(false)
      })
  }, [payload])

  if (loading)
    return <p className="text-white/40 mt-8 animate-pulse font-extralight text-lg">Loading invite...</p>

  if (error || !aliceData) return <p className="text-red-400">{error || 'Invalid payload'}</p>

  if (existingResult) return <ResultDisplay result={existingResult} title={aliceData?.title} />

  const aliceRole = aliceData.r
  const bobRole = aliceRole === 'b' ? 'seller' : 'buyer'
  const roleLabel = bobRole === 'buyer' ? 'Buyer' : 'Seller'

  if (bobsValue) return <BobSubmission alicePayload={payload!} bobsValue={bobsValue} onError={setError} />

  return (
    <div className="flex flex-col items-center w-full">
      <InviteTitle title={aliceData.title} />

      <div className="w-full border-t border-white/[0.06] mt-14 pt-14 flex flex-col items-center">
        {step < 2 && (
          <InstructionStep
            onBack={step > 0 ? () => setStep(step - 1) : undefined}
            onNext={() => setStep(step + 1)}
            step={step}
          />
        )}

        {step === 2 && (
          <div className="flex flex-col items-center gap-12 max-w-md px-4 text-center">
            <div className="flex flex-col gap-5 text-[17px] font-extralight leading-relaxed text-white/60">
              <p>
                You&apos;re the potential <b className="text-cyan-200">{roleLabel}</b> in this deal.
              </p>
              <p className="text-[15px] text-white/35">Ready to enter your number?</p>
            </div>
            <StepActions onBack={() => setStep(1)} onClick={() => setStep(3)} />
          </div>
        )}

        {step === 3 && (
          <Input
            label={`Enter your ${bobRole === 'buyer' ? 'max offer' : 'min price'}`}
            onBack={() => setStep(2)}
            onSubmit={setBobsValue}
          />
        )}
      </div>

      {step === 3 && <LearnMoreLink />}
    </div>
  )
}

function readPayloadFromPath(pathname: null | string) {
  if (!pathname?.startsWith('/b/')) return undefined
  return readPayloadParam(pathname.slice(3))
}

function readPayloadParam(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value.join('/') : value
  if (!raw) return undefined
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}
