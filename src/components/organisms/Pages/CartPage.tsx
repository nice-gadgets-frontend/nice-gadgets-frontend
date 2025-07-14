import { useEffect, useState } from 'react';
import { useInCartStore } from '../../../services/useStore/useInCartStore';
import { CartItem } from '../../Molecules/ShopingCartItem/CartItem';
import { CartTotal } from '../../Molecules/ShopingCartItem/CartTotal';
import type { ProductType } from '../../../types/ProductType';
import { CartItemSkeleton } from '../../Molecules/ShoppingCartItemSkeleton/CartItemSkeleton';

type ProductWithQuantity = ProductType & { quantity: number };

export const CartPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const itemsIdsInCart = useInCartStore((state) => state.itemsIdsInCart);

  useEffect(() => {
    fetch('/gadgets/products.json')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        return res.json();
      })
      .then((data: ProductType[]) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
      });
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error loading products: {error}
      </div>
    );
  }

  const itemsInCart = itemsIdsInCart
    .map((item) => {
      const product = products.find((p) => p.itemId === item.id);
      if (!product) return null;
      return { ...product, quantity: item.quantity } as ProductWithQuantity;
    })
    .filter(Boolean) as ProductWithQuantity[];

  const totalItemsCount = itemsInCart.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0,
  );

  const total = itemsInCart.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0),
    0,
  );

  return (
    <div className="px-4 py-8 bg-[#0F1121] min-h-screen flex justify-center">
      <div className="w-full max-w-[1040px]">
        <h1 className="text-white text-3xl font-bold mb-6">Cart</h1>

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-[1fr_288px]
            gap-6
            items-start
          "
        >
          {/* Cart items */}
          <div className="order-1">
            <div className="flex flex-col gap-4 md:gap-6 xl:row-start-1">
              {itemsInCart.length > 0 ?
                itemsInCart.map((item) => (
                  <CartItem
                    key={item.itemId}
                    product={item}
                    quantity={item.quantity}
                  />
                ))
              : Array.from({ length: 2 }).map((_, i) => (
                  <CartItemSkeleton key={i} />
                ))
              }
            </div>
          </div>

          {/* Cart total */}
          <div className="order-2">
            <CartTotal
              total={total}
              count={totalItemsCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
