import type { Accessory } from "../Accessories";
import type { Product } from "../Products";

export type MergedPhone = Omit<Accessory, 'id'> & {
  itemId: string;
  image: string;
  price: number;
  fullPrice: number;
  year: number;
  id: number;
}
 

export const mergedAccessoriesWithProducts = (
  accessories: Accessory[],
  products: Product[],
): MergedPhone [] => {
  return accessories.map(accessory => {
    const mergedProduct = products.find(product => product.itemId === accessory.id);

    return {
      ...accessory,
      id: mergedProduct?.id ?? 0,
      itemId: mergedProduct?.itemId ?? '',
      image: mergedProduct?.image ?? '',
      price: mergedProduct?.price ?? 0,
      fullPrice: mergedProduct?.fullPrice ?? 0,
      year: mergedProduct?.year ?? 0,
    };
  });
};