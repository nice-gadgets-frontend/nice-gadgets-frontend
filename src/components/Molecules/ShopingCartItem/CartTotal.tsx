type CartTotalProps = {
  total: number;
  count: number;
};

export const CartTotal: React.FC<CartTotalProps> = ({ total, count }) => {
  return (
    <div className="w-full border border-[#3B3E4A] bg-[#161827] p-6 text-white">
      <p className="text-2xl font-semibold text-center mb-1">${total}</p>
      <p className="text-sm text-gray-400 text-center mb-6">
        Total for {count} {count === 1 ? 'item' : 'items'}
      </p>

      <button
        className="
          w-full 
          bg-[#905BFF] 
          hover:bg-[#7E4FE0] 
          py-3 
          font-semibold 
          transition-colors
        "
      >
        Checkout
      </button>
    </div>
  );
};
