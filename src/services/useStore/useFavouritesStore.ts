import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { FavouritesStore } from '../../types/StoreTypes';

export const useFavouritesStore = create<FavouritesStore>()(
  persist(
    (set, get) => ({
      itemsInFavourites: [],
      addToFavourites: (id: string) => {
        if (!get().itemsInFavourites.includes(id)) {
          set({ itemsInFavourites: [...get().itemsInFavourites, id] });
        } else {
          set({
            itemsInFavourites: get().itemsInFavourites.filter(
              (itemId) => itemId !== id,
            ),
          });
        }
      },
    }),
    {
      name: 'favourites-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);