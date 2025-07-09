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
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-[#161827] text-white w-full max-w-[752px]">
      {/* Left section */}
      <div className="flex items-center gap-6 w-full">
        <button
          className="text-gray-500 hover:text-red-500 text-xl"
          onClick={deleteItemFromCartHandle}
        >
          ×
        </button>
        <img
          src={`gadgets/${product.image}`}
          alt={product.name}
          className="w-[66px] h-[66px] object-contain"
        />
        <p className="text-sm md:text-base font-medium leading-tight">
          {product.name}
        </p>
      </div>

      {/* Counter + Price */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-[#0F1121] px-2 py-1">
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
        <p className="text-lg font-semibold">${product.price}</p>
      </div>
    </div>
  );
};
