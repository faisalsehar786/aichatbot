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

  if (!user) {
    return <div className='flex items-center justify-center h-96 gap-2'>Login to continue</div>
  }

  return (
    <form onSubmit={handleCheckOut}>
      <button className='ring-1 ring-green-500 p-10 rounded-md text-center' type='submit'>
        <p className='text-sm text-gray-500'>Unlock all Daily blog contents</p>
      </button>
    </form>
  )
}
