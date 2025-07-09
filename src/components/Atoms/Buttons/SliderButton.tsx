import classNames from 'classnames';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

type SliderButtonType = {
  rotate?: 'right' | 'left';
  disabled?: boolean;
};

// <SliderButton rotate?='left' disabled?={true}/>
export const SliderButton: React.FC<SliderButtonType> = ({
  disabled,
  rotate = 'right',
}) => {
  return (
    <button
      className={classNames(
        'bg-[#323542] hover:bg-[#4A4D58] w-[40px] h-[40px] flex justify-center items-center',
        {
          'border border-[#3B3E4A] bg-transparent text-[#4A4D58] hover:bg-transparent':
            disabled,
          'cursor-pointer': !disabled,
        },
      )}
    >
      {rotate === 'right' ?
        <ChevronRight
          size={20}
          color={disabled ? '#4A4D58' : '#ffffff'}
        />
      : <ChevronLeft
          size={20}
          color={disabled ? '#4A4D58' : '#ffffff'}
        />
      }
    </button>
  );
};
