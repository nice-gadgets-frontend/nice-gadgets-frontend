import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { InCartStore } from '../../types/StoreTypes';

export const useInCartStore = create<InCartStore>()(
  persist(
    (set, get) => ({
      itemsIdsInCart: [],
      addToCart: (id: string) => {
        if (!get().itemsIdsInCart.find((item) => item.id === id)) {
          set({
            itemsIdsInCart: [...get().itemsIdsInCart, { id: id, quantity: 1 }],
          });
        } else {
          get().increase(id);
        }
      },
      deleteFromCart: (id: string) => {
        set({
          itemsIdsInCart: get().itemsIdsInCart.filter((item) => item.id !== id),
        });
      },
      changeQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          return;
        }
        set({
          itemsIdsInCart: get().itemsIdsInCart.map((item) => {
            if (item.id === id) {
              item.quantity = quantity;
            }
            return item;
          }),
        });
      },
      increase: (id: string) => {
        set({
          itemsIdsInCart: get().itemsIdsInCart.map((item) => {
            if (item.id === id) {
              item.quantity++;
            }
            return item;
          }),
        });
      },
      decrease: (id: string) => {
        const itemInCart = get().itemsIdsInCart.find((i) => i.id === id);

        if (itemInCart && itemInCart.quantity - 1 <= 0) {
          get().deleteFromCart(id);
          return;
        }

        set({
          itemsIdsInCart: get().itemsIdsInCart.map((item) => {
            if (item.id === id && item.quantity - 1 > 0) {
              item.quantity--;
            }
            return item;
          }),
        });
      },
      resetCart: () => set({ itemsIdsInCart: [] }),
    }),
    {
      name: 'in-cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
