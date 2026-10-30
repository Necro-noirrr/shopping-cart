import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../schemas/product'

export const MIN_QTY = 1
export const MAX_QTY = 5

export type CartItem = {
  id: number
  title: string
  price: number
  thumbnail: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (id: number) => void
  increase: (id: number) => void
  decrease: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id
                  ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QTY) }
                  : i
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity: 1,
              },
            ],
          }
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      increase: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QTY) } : i
          ),
        })),

      decrease: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(i.quantity - 1, MIN_QTY) } : i
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
)