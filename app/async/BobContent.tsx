'use client'

import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { PlaintextData } from './binaryEncoding'

import { LearnMoreLink } from '../LearnMoreLink'
import { BobSubmission } from './BobSubmission'
import { Input } from './Input'
import { Instructions } from './Instructions'
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
  const [existingResult, setExistingResult] = useState<null | {
    hasOverlap: boolean
    result: null | number
  }>(null)

  useEffect(() => {
    if (!payload) {
      setError('No payload found in URL')
      return setLoading(false)
    }

    // Check invite status
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

        // If invite already has results, show them
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

  // Determine Bob's role (opposite of Alice's)
  const aliceRole = aliceData.r
  const bobRole = aliceRole === 'b' ? 'seller' : 'buyer'

  if (bobsValue)
    return <BobSubmission alicePayload={payload!} bobsValue={bobsValue} onError={setError} />

  return (
    <div className="flex w-full flex-col items-center gap-5 sm:gap-8">
      <p className="text-balance text-lg text-white/70 sm:text-xl">
        You&apos;ve been invited as a potential{' '}
        <span className="font-medium text-white">{bobRole === 'buyer' ? 'Buyer' : 'Seller'}</span>
        {aliceData.title ? (
          <>
            {' '}
            for <span className="font-medium text-white">{aliceData.title}</span>
          </>
        ) : null}
        .
      </p>

      <div className="flex w-full flex-col items-stretch gap-6 sm:gap-8">
        <Input
          label={`Enter your ${bobRole === 'buyer' ? 'max offer' : 'min price'}`}
          onSubmit={setBobsValue}
          submitLabel="Do we have a win-win deal?"
        />
        <Instructions />
        <LearnMoreLink className="text-sm text-white/30 mt-2 block hover:text-white/50 transition-colors" />
      </div>
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
