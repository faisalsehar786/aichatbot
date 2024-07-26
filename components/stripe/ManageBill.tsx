'use client'

import { manageBillingPortal } from '@/lib/actions/stripe'

import { BackpackIcon } from '@radix-ui/react-icons'
import React, { ChangeEvent, useTransition } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function ManageBill({ customerId }: { customerId: string }) {
  const [isPending, startTransition] = useTransition()
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      const data = JSON.parse(await manageBillingPortal(customerId))
      window.location.href = data.url
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <span className='flex items-center gap-2'>
        <AiOutlineLoading3Quarters />
        Billing
      </span>
      <BackpackIcon />
    </form>
  )
}
