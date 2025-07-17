import { useEffect, useState } from 'react';
import { useInCartStore } from '../../../services/useStore/useInCartStore';
import type { ProductType } from '../../../types/ProductType';
import { getProducts } from '../../../services/getProducts';
import Skeleton from 'react-loading-skeleton';

type ProductWithQuantity = ProductType & { quantity: number };

export const InCartItemsCheckoutSection = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((data: ProductType[]) => {
        setProducts(data);
      })
      .catch(() => {
        console.log('Unknown error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const itemsIdsInCart = useInCartStore((state) => state.itemsIdsInCart);
  const itemsInCart = itemsIdsInCart
    .map((item) => {
      const product = products.find((p) => p.itemId === item.id);
      if (!product) return null;
      return { ...product, quantity: item.quantity } as ProductWithQuantity;
    })
    .filter(Boolean) as ProductWithQuantity[];

  if (isLoading) {
    return (
      <section className="p-6 rounded-2xl shadow-2xl inset-shadow-sm bg-[var(--color-surface-1)] border-[var(--color-secondary)]">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex items-center mb-6 pb-4 border-b border-[var(--color-elements)]"
          >
            <Skeleton
              circle
              height={64}
              width={64}
              className="mr-4"
            />
            <div className="flex-1">
              <Skeleton
                height={20}
                width={120}
              />
              <Skeleton
                height={16}
                width={60}
              />
            </div>
            <div className="text-right">
              <Skeleton
                height={20}
                width={40}
              />
              <Skeleton
                height={20}
                width={40}
              />
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="p-6 rounded-2xl shadow-2xl inset-shadow-sm bg-[var(--color-surface-1)] border-[var(--color-secondary)]">
      {itemsInCart.map((item) => {
        return (
          <div
            key={item.itemId}
            className="flex items-center mb-4 last:mb-0 mb-6 pb-4 border-b border-[var(--color-elements)]"
          >
            <img
              src={`/gadgets/${item.image}`}
              alt={item.name}
              className="w-16 h-16 object-cover rounded mr-4 object-scale-down"
            />
            <div className="flex-1">
              <p className="font-[Mont-Regular] text-[var(--color-primary)]">
                {item.name}
              </p>
              <p className="font-[Mont-Regular] text-[var(--color-primary)]/75 text-sm">
                {item.quantity} pcs.
              </p>
            </div>
            <div className="text-right">
              <p className="font-[Mont-SemiBold] text-[var(--color-primary)]/35 line-through">
                {item.fullPrice} $
              </p>
              <p className="font-[Mont-SemiBold] text-[var(--color-primary)]">
                {item.price} $
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};
