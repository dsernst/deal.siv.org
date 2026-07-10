'use client'

import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { PlaintextData } from './binaryEncoding'

import { LearnMoreLink } from '../LearnMoreLink'
import { BobSubmission } from './BobSubmission'
import { Input } from './Input'
import { InstructionStep, StepDots } from './Instructions'
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
    return <p className="text-white/35 text-sm tracking-wide animate-pulse">Loading invite...</p>

  if (error || !aliceData) return <p className="text-red-400">{error || 'Invalid payload'}</p>

  if (existingResult) return <ResultDisplay result={existingResult} title={aliceData?.title} />

  const aliceRole = aliceData.r
  const bobRole = aliceRole === 'b' ? 'seller' : 'buyer'

  if (bobsValue) return <BobSubmission alicePayload={payload!} bobsValue={bobsValue} onError={setError} />

  return (
    <div className="flex flex-col items-center w-full max-w-md gap-7">
      <InviteTitle subtitle={`You're the potential ${bobRole}.`} title={aliceData.title} />
      <StepDots step={step} total={3} />

      {step < 2 && (
        <InstructionStep
          onBack={step > 0 ? () => setStep(step - 1) : undefined}
          onNext={() => setStep(step + 1)}
          step={step}
        />
      )}

      {step === 2 && (
        <>
          <Input
            label={`Enter your ${bobRole === 'buyer' ? 'max offer' : 'min price'}`}
            onBack={() => setStep(1)}
            onSubmit={setBobsValue}
          />
          <LearnMoreLink />
        </>
      )}
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
