export const CategoryCardSkeleton = () => {
  return (
    <div className="group flex flex-col gap-6 w-full max-w-[368px] animate-pulse">
      <div
        className="block w-full aspect-square overflow-hidden mb-6 rounded"
        style={{ backgroundColor: '#33363F' }} // A dark grey for the skeleton background
      />
      <div className="flex flex-col items-start">
        <div className="h-5 bg-[#33363F] rounded w-3/4 mb-2" />
        <div className="h-4 bg-[#33363F] rounded w-1/2" />
      </div>
    </div>
  );
};