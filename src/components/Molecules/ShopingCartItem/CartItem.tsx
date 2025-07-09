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
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-[#161827] text-white w-full max-w-[752px]">
      {/* Left section */}
      <div className="flex items-center gap-6 w-full">
        <button className="text-gray-500 hover:text-red-500 text-xl">×</button>
        <img
          src={`/gadgets/${image}`}
          alt={name}
          className="w-[66px] h-[66px] object-contain"
        />
        <p className="text-sm md:text-base font-medium leading-tight">{name}</p>
      </div>

      {/* Counter + Price */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-[#0F1121] px-2 py-1">
          <button className="w-6 h-6 text-white text-lg">−</button>
          <span className="px-3">{quantity}</span>
          <button className="w-6 h-6 text-white text-lg">+</button>
        </div>
        <p className="text-lg font-semibold">${price}</p>
      </div>
    </div>
  );
};
