import { User } from '@supabase/supabase-js'
import { create } from 'zustand'


interface UserState {
  user: any | null
  setUser: (user: any | null) => void
}

export const useUser = create<UserState>()((set) => ({
  user: null,
  setUser: (user: any | null) => set(() => ({ user })),
}))
