'use client'

import Link from 'next/link'
import { useState } from 'react'

import { AgreementText } from './AgreementText'
import { Calculation } from './Calculation'
import { LearnMoreLink } from './LearnMoreLink'
import { ModeContainer } from './ModeSwitcher'
import { PrivateInput } from './PrivateInput'
import { SiteHeader } from './SiteHeader'

export type Inputs = [string, string]
export function Content() {
  const [[input1, input2], setValues] = useState<Inputs>(['', ''])

  return (
    <>
      <SiteHeader />

      {/* Private inputs */}
      <PrivateInput {...{ inputs: [input1, input2], setValues }} />

      <ModeContainer>
        {({ activeTab, ModeSwitcherUI }) => (
          <>
            <Calculation {...{ activeTab, input1, input2 }} />
            <AgreementText {...{ activeTab, ModeSwitcherUI }} />
          </>
        )}
      </ModeContainer>

      {/* Learn more */}
      <LearnMoreLink />

      {/* Switch to async mode */}
      <Link className="text-sm text-gray-400 mt-1 block hover:underline" href="/async">
        Switch to async mode
      </Link>
    </>
  )
}
