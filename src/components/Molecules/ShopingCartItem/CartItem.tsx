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
    <div className="flex flex-col sm:grid sm:grid-cols-[24px_66px_1fr_auto_auto] items-start sm:items-center gap-4 p-4 md:p-6 bg-[var(--color-surface-1)] text-[var(--color-white)] w-full">
      {/* Delete button */}
      <button
        onClick={() => deleteFromCart(product.itemId)}
        className="text-[var(--color-white)] text-xl hover:text-[var(--color-red)]"
        aria-label="Remove item"
      >
        ×
      </button>

      {/* Product image */}
      <img
        src={`gadgets/${product.image}`}
        alt={product.name}
        className="w-[66px] h-[66px] object-contain"
      />

      {/* Product name */}
      <p className="text-sm sm:text-base font-medium leading-tight sm:col-span-1">
        {product.name}
      </p>

      {/* Quantity controls (shown only on sm+) */}
      <div className="hidden sm:flex items-center gap-2">
        <button
          onClick={() => decreaseItemInCart(product.itemId)}
          className="w-8 h-8 flex items-center justify-center border border-[var(--color-elements)] hover:bg-[var(--color-surface-2)] transition"
        >
          <span className="text-xl">−</span>
        </button>
        <span className="w-6 text-center">{quantity}</span>
        <button
          onClick={() => increaseItemInCart(product.itemId)}
          className="w-8 h-8 flex items-center justify-center border border-[var(--color-elements)] hover:bg-[var(--color-surface-2)] transition"
        >
          <span className="text-xl">+</span>
        </button>
      </div>

      {/* Price (shown only on sm+) */}
      <p className="hidden sm:block text-lg font-semibold text-right">
        ${product.price}
      </p>

      {/* Mobile-only block for quantity + price */}
      <div className="flex justify-between items-center sm:hidden mt-2 w-full">
        {/* Quantity controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => decreaseItemInCart(product.itemId)}
            className="w-8 h-8 flex items-center justify-center border border-[var(--color-elements)] hover:bg-[var(--color-surface-2)] transition"
          >
            <span className="text-xl">−</span>
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button
            onClick={() => increaseItemInCart(product.itemId)}
            className="w-8 h-8 flex items-center justify-center border border-[var(--color-elements)] hover:bg-[var(--color-surface-2)] transition"
          >
            <span className="text-xl">+</span>
          </button>
        </div>

        {/* Price */}
        <p className="text-lg font-semibold">${product.price}</p>
      </div>
    </div>
  );
};
