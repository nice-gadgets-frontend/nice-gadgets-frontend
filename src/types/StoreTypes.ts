export type FavouritesStore = {
  itemsInFavourites: string[];
  addToFavourites: (id: string) => void;
};

export type InCartStore = {
  itemsIdsInCart: ItemInCart[];
  addToCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
};

export type ItemInCart = {
  id: string;
  quantity: number;
};
