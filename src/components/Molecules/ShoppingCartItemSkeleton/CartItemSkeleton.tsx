import Skeleton from 'react-loading-skeleton';

export const CartItemSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-[24px_66px_1fr_auto] items-center gap-4 p-4 md:p-6 bg-[#161827] text-white w-full rounded-md">
      {/* Delete button */}
      <button
        className="text-white text-xl hover:text-red-500"
        aria-label="Remove item"
      >
        ×
      </button>

      {/* Image */}
      <Skeleton
        width={'66px'}
        height={'66px'}
      />

      {/* Product name */}
      <p className="text-sm md:text-base font-medium leading-tight">
        <Skeleton width={'80%'} />
      </p>

      {/* Price */}
      <div className="w-20">
        <Skeleton />
      </div>
    </div>
  );
};
