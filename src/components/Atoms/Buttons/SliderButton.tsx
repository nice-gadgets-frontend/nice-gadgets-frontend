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
        'bg-surface-2 hover:bg-icons w-[32px] h-[32px] flex justify-center items-center',
        {
          'border border-elements bg-transparent text-icons hover:bg-transparent':
            disabled,
          'cursor-pointer': !disabled,
        },
      )}
    >
      {rotate === 'right' ?
        <ChevronRight
          size={20}
          color={disabled ? 'var(--color-icons)' : 'var(--color-primary)'}
        />
      : <ChevronLeft
          size={20}
          color={disabled ? 'var(--color-icons)' : 'var(--color-primary)'}
        />
      }
    </button>
  );
};
