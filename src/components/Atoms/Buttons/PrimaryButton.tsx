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
        'bg-surface-2 cursor-not-allowed': isDisabled,
        'bg-accent hover:bg-accent': !isDisabled,
      })}
    >
      {children}
    </button>
  );
};
