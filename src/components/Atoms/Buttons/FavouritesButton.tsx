import classNames from 'classnames';
import { Heart } from 'lucide-react';
import React from 'react';

type FavouritesButtonType = {
  selected?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

// <FavouritesButton />
export const FavouritesButton: React.FC<FavouritesButtonType> = ({
  selected,
  onClick,
}) => {
  return (
    <button
      className={classNames(
        'bg-[#323542] hover:bg-[#4A4D58] w-[40px] flex justify-center items-center cursor-pointer',
        {
          'border border-[#3B3E4A] bg-transparent text-[#EB5757]': selected,
        },
      )}
      onClick={onClick}
    >
      {selected ?
        <Heart
          size={16}
          fill="#EB5757"
        />
      : <Heart size={16} />}
    </button>
  );
};
