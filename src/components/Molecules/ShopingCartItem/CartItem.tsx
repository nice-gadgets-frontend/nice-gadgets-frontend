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

  const deleteItemFromCartHandle = () => {
    deleteFromCart(product.itemId);
  };

  const increaseItemInCartHandle = () => {
    increaseItemInCart(product.itemId);
  };

  const decreaseItemInCartHandle = () => {
    decreaseItemInCart(product.itemId);
  };

  return (
    <div
      className="
        grid 
        grid-cols-[auto_66px_1fr] 
        md:grid-cols-[auto_66px_1fr_auto_auto] 
        items-center 
        gap-4 
        p-6 
        bg-[#161827] 
        text-white 
        w-full
      "
    >
      {/* Delete button */}
      <button
        className="text-gray-500 hover:text-red-500 text-xl"
        onClick={deleteItemFromCartHandle}
      >
        ×
      </button>

      {/* Image */}
      <img
        src={`gadgets/${product.image}`}
        alt={product.name}
        className="w-[66px] h-[66px] object-contain"
      />

      {/* Name */}
      <p className="text-sm md:text-base font-medium leading-tight col-span-2 md:col-span-1">
        {product.name}
      </p>

      {/* Quantity counter */}
      <div className="flex items-center bg-[#0F1121] px-2 py-1 justify-center">
        <button
          className="w-6 h-6 text-white text-lg"
          onClick={decreaseItemInCartHandle}
        >
          −
        </button>
        <span className="px-3">{quantity}</span>
        <button
          className="w-6 h-6 text-white text-lg"
          onClick={increaseItemInCartHandle}
        >
          +
        </button>
      </div>

      {/* Price */}
      <p className="text-lg font-semibold text-right">${product.price}</p>
    </div>
  );
};
