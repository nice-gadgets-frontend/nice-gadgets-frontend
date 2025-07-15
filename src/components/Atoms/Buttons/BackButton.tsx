import { ChevronLeft } from 'lucide-react';

// <BackButton />
export const BackButton = () => {
  return (
    <button className="hover:text-accent flex justify-center items-center gap-1 cursor-pointer h-4">
      <ChevronLeft size={16} />
      <p className="font-['Mont-SemiBold'] leading-[15px]">Back</p>
    </button>
  );
};
