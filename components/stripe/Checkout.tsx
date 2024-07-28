'use client'
import React, { ChangeEvent, useTransition } from 'react'
import { useUser } from '@/lib/store/user'
import { loadStripe } from '@stripe/stripe-js'
import { checkout } from '@/lib/actions/stripe'
import { usePathname } from 'next/navigation'

export default function Checkout() {
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()

  const user = useUser((state) => state.user)

  const handleCheckOut = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      const data = JSON.parse(await checkout(user?.email!, location.origin + pathname))
      const result = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
      await result?.redirectToCheckout({ sessionId: data.id })
    })
  }

  return (
    <form onSubmit={handleCheckOut}>
      <button
        className='btn btn-sm btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#kt_modal_upgrade_plan'
      >
        Upgrade Plan
      </button>
    </form>
  )
}
