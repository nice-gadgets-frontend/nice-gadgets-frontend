import classNames from 'classnames';
import React from 'react';

type PaginationButtonType = {
  page: number;
  selected?: boolean;
  onClick: () => void;
};

// <PaginationButton page={number} selected?={true}/>
export const PaginationButton: React.FC<PaginationButtonType> = ({
  page,
  selected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames('cursor-pointer w-8 h-8 flex items-center justify-center text-sm font-medium transition-colors',
        {
          'bg-primary text-surface-1 dark:bg-accent dark:text-primary': selected,
          'bg-surface-1 text-primary hover:bg-elements': !selected,
        }
      )}
    >
      {page}
    </button>
  );
};
