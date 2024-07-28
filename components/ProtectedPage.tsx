'use client'
import { useUser } from '@/lib/store/user'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const user = useUser((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login') // Redirect to login if not authenticated
    }
  }, [router, user])
  return <>{children}</>
}
