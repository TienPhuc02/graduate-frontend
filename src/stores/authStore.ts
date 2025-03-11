import { create } from 'zustand'

interface AuthState {
  user: IUserLogin | null
  setUser: (user: IUserLogin | null) => void
  logout: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}))

export default useAuthStore
