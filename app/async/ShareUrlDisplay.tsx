'use client'

import { useState } from 'react'

import type { CompactPayload } from './binaryEncoding'

export function ShareUrlDisplay({ payload }: { payload: CompactPayload }) {
  const shareUrl = `${window.location.origin}/b/${encodeURIComponent(payload.ev)}`
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6">
      <h2 className="text-xl font-medium text-white/90">Your Share URL</h2>
      <div className="flex w-full gap-2">
        <input
          className="min-w-0 flex-1 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white"
          readOnly
          type="text"
          value={shareUrl}
        />
        <button
          className="shrink-0 cursor-pointer rounded-xl border border-cyan-400/20 bg-cyan-400/8 px-5 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-cyan-400/12"
          onClick={() => {
            navigator.clipboard.writeText(shareUrl)
            setCopied(true)
          }}
          type="button"
        >
          {!copied ? 'Copy' : 'Copied!'}
        </button>
      </div>
      <p className="text-center text-sm text-white/40">
        Share this URL with the other party. They can use it to complete the negotiation.
      </p>
    </div>
  )
}
