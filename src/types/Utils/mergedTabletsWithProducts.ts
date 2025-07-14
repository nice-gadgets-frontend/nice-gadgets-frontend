import type { Tablet } from "../Tablets";
import type { Product } from "../Products";

export type MergedPhone = Omit<Tablet, 'id'> & {
  itemId: string;
  image: string;
  price: number;
  fullPrice: number;
  year: number;
  id: number;
}
 

export const mergedTabletsWithProducts = (
  tablets: Tablet[],
  products: Product[],
): MergedPhone [] => {
  return tablets.map(tablet => {
    const mergedProduct = products.find(product => product.itemId === tablet.id);

    return {
      ...tablet,
      id: mergedProduct?.id ?? 0,
      itemId: mergedProduct?.itemId ?? '',
      image: mergedProduct?.image ?? '',
      price: mergedProduct?.price ?? 0,
      fullPrice: mergedProduct?.fullPrice ?? 0,
      year: mergedProduct?.year ?? 0,
    };
  });
};