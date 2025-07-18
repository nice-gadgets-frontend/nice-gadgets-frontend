type CounterBadgeIconProps = {
  itemCount: number;
};

export const CounterBadgeIcon = ({ itemCount }: CounterBadgeIconProps) => {
  if (itemCount === 0) return null;

  return (
    <span
      className="absolute top-0 right-0 flex items-center justify-center 
      w-[14px] h-[14px] text-[9px] leading-[1] font-bold text-primary
      bg-[#EB5757] border border-black rounded-full font-[Mont-Regular]"
    >
      {itemCount}
    </span>
  );
};
