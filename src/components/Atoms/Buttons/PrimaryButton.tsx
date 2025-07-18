import classNames from 'classnames';
import React, { type ReactNode } from 'react';

type PrimaryButtonType = {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isDelete?: boolean;
};

// <PrimaryButton>EXAMPLE</PrimaryButton>
export const PrimaryButton: React.FC<PrimaryButtonType> = ({
  children,
  onClick,
  isDisabled,
  isDelete,
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={classNames('flex-1 py-[9.5px] cursor-pointer', {
        'bg-accent text-surface-1 dark:bg-accent dark:text-primary hover:bg-hover':
          !isDelete,
        'bg-purple-900 text-surface-1 dark:text-primary hover:bg-purple-800':
          isDelete,
      })}
    >
      {children}
    </button>
  );
};
