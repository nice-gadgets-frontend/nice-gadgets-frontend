type CartTotalProps = {
  total: number;
  count: number;
};

export const CartTotal: React.FC<CartTotalProps> = ({ total, count }) => {
  return (
    <div className="w-full lg:max-w-[288px] border border-[#3B3E4A] p-6 text-white">
      <p className="text-2xl font-semibold mb-2">${total}</p>
      <p className="text-sm text-gray-400 mb-6">Total for {count} items</p>
      <button className="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-md font-medium">
        Checkout
      </button>
    </div>
  );
};
