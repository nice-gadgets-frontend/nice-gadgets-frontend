import type { Phone } from "../Phone";
import type { Product } from "../Products";

export type MergedPhone = Omit<Phone, 'id'> & {
  itemId: string;
  image: string;
  price: number;
  fullPrice: number;
  year: number;
  id: number;
}
 

export const mergedPhonesWithProducts = (
  phones: Phone[],
  products: Product[],
): MergedPhone [] => {
  return phones.map(phone => {
    const mergedProduct = products.find(product => product.itemId === phone.id);

    return {
      ...phone,
      id: mergedProduct?.id ?? 0,
      itemId: mergedProduct?.itemId ?? '',
      image: mergedProduct?.image ?? '',
      price: mergedProduct?.price ?? 0,
      fullPrice: mergedProduct?.fullPrice ?? 0,
      year: mergedProduct?.year ?? 0,
    };
  });
};