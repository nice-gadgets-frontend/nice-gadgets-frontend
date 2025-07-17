import { Minus, Plus, X } from 'lucide-react';
import { useInCartStore } from '../../../services/useStore/useInCartStore';
import type { ProductType } from '../../../types/ProductType';

type CartItemProps = {
  product: ProductType;
  quantity: number;
};

export const CartItem: React.FC<CartItemProps> = ({ product, quantity }) => {
  const deleteFromCart = useInCartStore((state) => state.deleteFromCart);
  const increaseItemInCart = useInCartStore((state) => state.increase);
  const decreaseItemInCart = useInCartStore((state) => state.decrease);

  return (
    <div className="border border-[var(--color-elements)] dark:border-0 flex flex-col sm:grid sm:grid-cols-[24px_66px_1fr_auto_auto] items-start sm:items-center gap-4 p-4 md:p-6 bg-[var(--color-surface-1)] text-[var(--color-primary)] w-full">
      {/* Mobile: X button, image, and product name in one row */}
      <div className="flex items-center gap-4 w-full sm:contents">
        {/* Delete button */}
        <button
          onClick={() => deleteFromCart(product.itemId)}
          className="text-[var(--color-primary)] text-xl hover:text-[var(--color-red)] cursor-pointer transition-colors"
          aria-label="Remove item"
        >
          <X />
        </button>

        {/* Product image */}
        <img
          src={`gadgets/${product.image}`}
          alt={product.name}
          className="w-[66px] h-[66px] object-contain flex-shrink-0"
        />

        {/* Product name */}
        <p className="text-[var(--color-primary)] text-sm sm:text-base font-medium leading-tight flex-1">
          {product.name}
        </p>
      </div>

      {/* Quantity controls (shown only on sm+) */}
      <div className="hidden sm:flex items-center gap-2">
        <button
          onClick={() => decreaseItemInCart(product.itemId)}
          className="text-[var(--color-primary)]  w-8 h-8 flex cursor-pointer items-center justify-center border border-[var(--color-elements)] hover:bg-[var(--color-surface-2)] transition"
        >
          <span className="text-xl">
            <Minus size={16} />
          </span>
        </button>
        <span className="w-6 text-center">{quantity}</span>
        <button
          onClick={() => increaseItemInCart(product.itemId)}
          className="text-[var(--color-primary)] cursor-pointer w-8 h-8 flex items-center justify-center border border-[var(--color-elements)] hover:bg-[var(--color-surface-2)] transition"
        >
          <span className="text-xl">
            <Plus size={16} />
          </span>
        </button>
      </div>

      {/* Price (shown only on sm+) */}
      <p className="text-[var(--color-primary)]  hidden sm:block text-lg font-[Mont-SemiBold] text-right">
        ${product.price}
      </p>

      {/* Mobile-only block for quantity + price */}
      <div className="text-[var(--color-primary)] flex justify-between items-center sm:hidden mt-2 w-full">
        {/* Quantity controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => decreaseItemInCart(product.itemId)}
            className="text-[var(--color-primary)] w-8 h-8 flex items-center justify-center border border-[var(--color-elements)] hover:bg-[var(--color-surface-2)] transition"
          >
            <span className="text-xl">
              <Minus size={15} />
            </span>
          </button>
          <span className="text-[var(--color-primary)] w-6 text-center">
            {quantity}
          </span>
          <button
            onClick={() => increaseItemInCart(product.itemId)}
            className="text-[var(--color-primary)] w-8 h-8 flex items-center justify-center border  border-[var(--color-elements)] hover:bg-[var(--color-surface-2)] transition"
          >
            <span className="text-xl">
              <Plus size={15} />
            </span>
          </button>
        </div>

        {/* Price */}
        <p className="text-[var(--color-primary)] text-lg font-[Mont-SemiBold]">
          ${product.price}
        </p>
      </div>
    </div>
  );
};
