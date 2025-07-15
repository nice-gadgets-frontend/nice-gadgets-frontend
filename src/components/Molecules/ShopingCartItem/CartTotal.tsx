type CartTotalProps = {
  total: number;
  count: number;
};

export const CartTotal: React.FC<CartTotalProps> = ({ total, count }) => {
  return (
    <div className="w-full border border-[var(--color-elements)] bg-[var(--color-surface-1)] p-6 text-[var(--color-primary)]">
      <p className="text-2xl font-semibold text-center mb-1">${total}</p>
      <p className="text-sm text-[var(--color-secondary)] text-center mb-6">
        Total for {count} {count === 1 ? 'item' : 'items'}
      </p>

      <button
        className="
          w-full bg-primary text-surface-1 dark:bg-accent dark:text-primary
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
