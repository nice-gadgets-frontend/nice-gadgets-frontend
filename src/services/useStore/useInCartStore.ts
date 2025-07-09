import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { InCartStore } from '../../types/StoreTypes';

export const useInCartStore = create<InCartStore>()(
  persist(
    (set, get) => ({
      itemsInCart: [],
      addToCart: (id: string) => {
        if (!get().itemsInCart.find((item) => item.id === id)) {
          set({ itemsInCart: [...get().itemsInCart, { id: id, quantity: 1 }] });
        } else {
          get().increase(id);
        }
      },
      deleteFromCart: (id: string) => {
        set({
          itemsInCart: get().itemsInCart.filter((item) => item.id !== id),
        });
      },
      changeQuantity: (id: string, quantity: number) => {
        set({
          itemsInCart: get().itemsInCart.map((item) => {
            if (item.id === id) {
              item.quantity = quantity;
            }
            return item;
          }),
        });
      },
      increase: (id: string) => {
        set({
          itemsInCart: get().itemsInCart.map((item) => {
            if (item.id === id) {
              item.quantity++;
            }
            return item;
          }),
        });
      },
      decrease: (id: string) => {
        set({
          itemsInCart: get().itemsInCart.map((item) => {
            if (item.id === id) {
              item.quantity--;
            }
            return item;
          }),
        });
      },
    }),
    {
      name: 'in-cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
