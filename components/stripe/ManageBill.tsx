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
      <button
        className='btn btn-sm btn-light btn-active-light-primary  me-2'
        id='kt_account_billing_cancel_subscription_btn'
      >
        Cancel Subscription
      </button>
    </form>
  )
}
