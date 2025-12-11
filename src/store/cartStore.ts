import { create } from 'zustand'
import { Book } from '@/payload-types'
import { persist } from 'zustand/middleware'

export interface CartItem {
  book: Book
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (book: Book) => void
  removeItem: (bookId: number) => void
  updateQuantity: (bookId: number, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (book) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.book.id == book.id)

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          })
        } else {
          set({
            items: [...currentItems, { book, quantity: 1 }],
          })
        }
      },

      removeItem: (bookId) => {
        set({
          items: get().items.filter((item) => item.book.id !== bookId),
        })
      },

      updateQuantity: (bookId, quantity) => {
        if (quantity < 0) {
          get().removeItem(bookId)
        } else {
          set({
            items: get().items.map((item) =>
              item.book.id === bookId ? { ...item, quantity } : item,
            ),
          })
        }
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (item.book.price || 0) * item.quantity
        }, 0)
      },
    }),
    {
      name: 'cart-storage',
    },
  ),
)
