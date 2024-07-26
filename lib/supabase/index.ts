'use server'
import { createServerClient, type CookieOptions, createBrowserClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { useMemo } from 'react';
import { createClient } from '@supabase/supabase-js'

export async function createSupabaseServerClient() {
  const cookieStore = cookies()
  return createServerClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {  
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  )
}

export async function createSupbaseAdmin() {
  return createClient<any>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export async function fetchCacheSupabase(query: string) {
  const cookieStore = cookies()

  const authToken = cookieStore.get('sb-yymdoqdtmbfsrfydgfef-auth-token')?.value

  let headers = {}
  if (authToken) {
    const { access_token } = JSON.parse(authToken)
    headers = {
      Authorization: `Bearer ${access_token}`,
    }
  }

  const res = await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL! + '/rest/v1/' + query, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      ...headers,
    },
    cache: 'force-cache',
  })
  return await res.json()
}






