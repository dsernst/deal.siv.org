import Link from 'next/link'

import { formatCurrency } from '../formatDisplay'
import { InstructionPanel } from './Instructions'
import { InviteTitle } from './InviteTitle'

type MPCResult = {
  hasOverlap: boolean
  result: null | number
}

export function ResultDisplay({ result, title }: { result: MPCResult; title?: string }) {
  if (!result.hasOverlap)
    return (
      <div className="flex flex-col items-center gap-5 max-w-md">
        <InviteTitle title={title} />
        <p className="text-xl text-white/90">No overlap</p>
        <p className="text-sm text-white/40">
          The seller&apos;s minimum is higher than the buyer&apos;s maximum.
        </p>
        <ReturnHomeLink />
      </div>
    )

  if (result.result === null)
    return (
      <div className="flex flex-col items-center gap-5 max-w-md">
        <InviteTitle title={title} />
        <p className="text-xl text-white/90">A deal is possible</p>
        <ReturnHomeLink />
      </div>
    )

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8">
      <InviteTitle title={title} />
      <InstructionPanel>
        <p className="text-sm text-white/40">Your win-win price</p>
        <div className="mt-2 text-4xl font-light tracking-tight text-white">
          {formatCurrency(result.result)}
        </div>
      </InstructionPanel>
      <p className="text-center text-sm text-white/35">
        Tell the sender to open the link to see the deal.
      </p>
      <ReturnHomeLink />
    </div>
  )
}

const ReturnHomeLink = () => (
  <Link className="text-sm mt-10 text-white/30 block hover:text-white/50 transition-colors" href="/async">
    <span className="text-xs">↩</span> Home
  </Link>
)
