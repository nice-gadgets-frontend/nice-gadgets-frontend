import { useEffect, useState } from 'react';
import { useInCartStore } from '../../../services/useStore/useInCartStore';
import { getProducts } from '../../../services/getProducts';
import type { ProductType } from '../../../types/ProductType';
import { useRecipientStore } from '../../../services/useStore/useRecipientStore';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

type ProductWithQuantity = ProductType & { quantity: number };

export const CheckoutTotal = () => {
  const navigate = useNavigate();

  const itemsIdsInCart = useInCartStore((state) => state.itemsIdsInCart);

  const shippingPrice = useRecipientStore((state) => state.shippingPrice);

  const selectedDelivery = useRecipientStore((state) => state.selectedDelivery);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [products, setProducts] = useState<ProductType[]>([]);

  const resetCart = useInCartStore((state) => state.resetCart);

  useEffect(() => {
    if (selectedDelivery) setError(null);
  }, [selectedDelivery]);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((data: ProductType[]) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleConfirmPurchase = () => {
    if (!selectedDelivery) {
      setError('Please select a delivery option to confirm purchase.');
      return;
    }
    resetCart();
    setError(null);
    navigate('/thankyou');
  };

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

  const checkoutTotalFullPrice = itemsInCart.reduce(
    (sum, item) => sum + (item.fullPrice ?? 0) * (item.quantity ?? 0),
    0,
  );

  const checkoutTotal = itemsInCart.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0),
    0,
  );

  const discountTotal = checkoutTotalFullPrice - checkoutTotal;

  if (isLoading) {
    return (
      <section className="flex-1 p-6 rounded-2xl shadow-2xl inset-shadow-sm bg-[var(--color-surface-1)] border-[var(--color-secondary)] max-w-[1050px]">
        <Skeleton
          height={32}
          width={200}
          className="mb-6"
        />
        <Skeleton
          count={4}
          height={24}
          className="mb-4"
        />
        <Skeleton
          height={48}
          className="mb-4"
        />
        <Skeleton height={48} />
      </section>
    );
  }

  return (
    <section className="flex-1 p-6 rounded-2xl shadow-2xl inset-shadow-sm bg-[var(--color-surface-1)] border-[var(--color-secondary)] max-w-[1050px]">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-[23px] text-[var(--color-primary)] font-[Mont-SemiBold]">
          Order summary
        </h2>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-[Mont-Regular] text-[var(--color-primary)]">
            {totalItemsCount} items for
          </span>
          <span className="font-[Mont-SemiBold] text-[var(--color-primary)]">
            <span className="line-through mr-2 font-[Mont-SemiBold] text-[var(--color-primary)]/35">
              {checkoutTotalFullPrice}$
            </span>
            {checkoutTotal}$
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-[Mont-Regular] text-[var(--color-primary)]">
            Discount
          </span>
          <span className="font-[Mont-SemiBold] text-[var(--color-red)]">
            {discountTotal}$
          </span>
        </div>
        <div className="flex justify-between mb-6">
          <span className="font-[Mont-Regular] text-[var(--color-primary)]">
            Delivery
          </span>
          {shippingPrice ?
            <span className="font-[Mont-SemiBold] text-[var(--color-primary)]">
              {Math.round(shippingPrice / 41.2)}$
            </span>
          : selectedDelivery === 'pickup' ?
            <span className="font-[Mont-SemiBold] text-[var(--color-primary)]">
              Free
            </span>
          : <span className="font-[Mont-SemiBold] text-[var(--color-primary)]">
              ...
            </span>
          }
        </div>

        <div className="flex justify-between text-xl font-[Mont-Bold] text-[var(--color-primary)] mb-6">
          <span>Total sum</span>
          <span>{checkoutTotal}$</span>
        </div>
      </div>

      {error && (
        <div className="text-[var(--color-red)] font-[Mont-SemiBold] mb-4">
          {error}
        </div>
      )}

      <button
        className="w-full bg-[var(--color-accent)]/50 shadow-sm text-[var(--color-primary)] py-3 rounded-lg text-lg font-[Mont-SemiBold] hover:bg-[var(--color-accent)]/80 transition-colors"
        onClick={handleConfirmPurchase}
      >
        Confirm purchase
      </button>
    </section>
  );
};
