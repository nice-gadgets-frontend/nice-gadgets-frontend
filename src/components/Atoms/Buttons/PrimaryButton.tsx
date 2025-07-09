import classNames from 'classnames';
import React, { type ReactNode } from 'react';

type PrimaryButtonType = {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
};

// <PrimaryButton selected?={true}>EXAMPLE</PrimaryButton>
export const PrimaryButton: React.FC<PrimaryButtonType> = ({
  children,
  onClick,
  isDisabled,
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={classNames('flex-1 py-[9.5px] cursor-pointer', {
        'bg-[#323542] cursor-not-allowed': isDisabled,
        'bg-[#905BFF] hover:bg-[#A378FF]': !isDisabled,
      })}
    >
      {children}
    </button>
  );
};
