import React from 'react';
import classNames from 'classnames';
import { Heart } from 'lucide-react';

type FavouritesButtonType = {
  selected?: boolean;
};

export const FavouritesButton: React.FC<FavouritesButtonType> = ({
  selected,
}) => {
  return (
    <button
      className={classNames(
        'bg-[#323542] hover:bg-[#4A4D58] w-[40px] flex justify-center items-center cursor-pointer',
        {
          'border border-[#3B3E4A] bg-transparent text-[#EB5757] ': selected,
        },
      )}
    >
      {selected ? <Heart size={16} fill="#EB5757" /> : <Heart size={16} />}
    </button>
  );
};
