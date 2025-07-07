import classNames from 'classnames';
import { ChevronRight } from 'lucide-react';
import React from 'react';

type SliderButtonType = {
  disabled?: boolean;
};

// <SliderButton disabled?={true}/>
export const SliderButton: React.FC<SliderButtonType> = ({ disabled }) => {
  return (
    <button
      className={classNames(
        'bg-[#323542] hover:bg-[#4A4D58] w-[40px] flex justify-center items-center',
        {
          'border border-[#3B3E4A] bg-transparent text-[#4A4D58] hover:bg-transparent':
            disabled,
          'cursor-pointer': !disabled,
        },
      )}
    >
      {disabled ?
        <ChevronRight
          size={20}
          color="#4A4D58"
        />
      : <ChevronRight
          size={20}
          color="#ffffff"
        />
      }
    </button>
  );
};
