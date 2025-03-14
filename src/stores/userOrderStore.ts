import { create } from 'zustand'

interface OrderState {
  order: IAdminOrder | null
  setOrder: (order: IAdminOrder | null | ((prev: IAdminOrder | null) => IAdminOrder | null)) => void
}

export const useOrderStore = create<OrderState>((set) => ({
  order: null,
  setOrder: (order) =>
    set((state) => ({
      order: typeof order === 'function' ? order(state.order) : order
    }))
}))
