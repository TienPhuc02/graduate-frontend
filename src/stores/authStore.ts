import { create } from 'zustand'

interface UserState {
  user: IAdminUser | null
  setUser: (user: IAdminUser | null) => void
  logout: () => void
}

const useAuthStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}))

export default useAuthStore
