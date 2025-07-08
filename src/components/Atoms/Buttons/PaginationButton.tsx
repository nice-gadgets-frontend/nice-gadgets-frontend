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
          'bg-accent text-white': selected,
          'bg-surface-1 text-white hover:bg-elements': !selected,
        }
      )}
    >
      {page}
    </button>
  );
};
