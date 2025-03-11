import { create } from 'zustand'

interface OrderState {
  order: IAdminOrder | null
  setOrder: (order: IAdminOrder | ((prev: IAdminOrder | null) => IAdminOrder)) => void
}

export const useOrderStore = create<OrderState>((set) => ({
  order: null,
  setOrder: (order) =>
    set((state) => ({
      order: typeof order === 'function' ? order(state.order) : order
    }))
}))
