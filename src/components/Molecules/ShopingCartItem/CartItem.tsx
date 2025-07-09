import { Plus, Minus } from 'lucide-react';

type CartItemProps = {
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export const CartItem: React.FC<CartItemProps> = ({
  name,
  price,
  image,
  quantity,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4 p-6 bg-[#161827] text-white w-full">
      {/* Left section */}
      <div className="grid grid-cols-[auto_66px_1fr] items-center gap-6">
        <button className="text-gray-500 hover:text-red-500 text-xl">×</button>
        <img
          src={`/gadgets/${image}`}
          alt={name}
          className="w-[66px] h-[66px] object-contain"
        />
        <p className="text-sm md:text-base font-medium leading-tight">{name}</p>
      </div>

      {/* Counter + Price */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center bg-[#0F1121] px-2 py-1">
          <button className="w-6 h-6 text-white">
            <Minus size={16} />
          </button>
          <span className="px-3">{quantity}</span>
          <button className="w-6 h-6 text-white">
            <Plus size={16} />
          </button>
        </div>
        <p className="text-lg font-semibold">${price}</p>
      </div>
    </div>
  );
};
