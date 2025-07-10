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
    <div className="grid grid-cols-[24px_66px_1fr_auto] items-center gap-4 p-4 md:p-6 bg-[#161827] text-white w-full rounded-md">
      {/* Delete button */}
      <button
        onClick={() => deleteFromCart(product.itemId)}
        className="text-white text-xl hover:text-red-500"
        aria-label="Remove item"
      >
        ×
      </button>

      {/* Image */}
      <img
        src={`gadgets/${product.image}`}
        alt={product.name}
        className="w-[66px] h-[66px] object-contain"
      />

      {/* Product name */}
      <p className="text-sm md:text-base font-medium leading-tight">
        {product.name}
      </p>

      {/* Price */}
      <p className="text-lg font-semibold text-right">${product.price}</p>

      {/* Quantity controls */}
      <div className="col-span-4 md:col-start-3 md:col-span-2 flex items-center justify-end gap-2 mt-2 md:mt-0">
        <div className="flex items-center bg-[#0F1121] border border-[#3B3E4A] rounded-md">
          <button
            onClick={() => decreaseItemInCart(product.itemId)}
            className="w-8 h-8 text-xl border-r border-[#3B3E4A] hover:bg-[#1E2030] transition"
          >
            −
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={() => increaseItemInCart(product.itemId)}
            className="w-8 h-8 text-xl border-l border-[#3B3E4A] hover:bg-[#1E2030] transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
