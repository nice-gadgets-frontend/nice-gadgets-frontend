import classNames from 'classnames';
import React, { type ReactNode } from 'react';

type PrimaryButtonType = {
  children: ReactNode;
  selected?: boolean;
};

// <PrimaryButton selected?={true}>EXAMPLE</PrimaryButton>
export const PrimaryButton: React.FC<PrimaryButtonType> = ({
  children,
  selected,
}) => {
  return (
    <button
      className={classNames(
        'px-[39.5px] py-[9.5px] cursor-pointer hover:bg-[#A378FF]',
        { 'bg-[#323542]': selected, 'bg-[#905BFF]': !selected },
      )}
    >
      {children}
    </button>
  );
};
