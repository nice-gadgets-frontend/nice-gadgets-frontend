import classNames from 'classnames';
import React from 'react';

type PaginationButtonType = {
  page: number;
  selected?: boolean;
};

// <PaginationButton page={number} selected?={true}/>
export const PaginationButton: React.FC<PaginationButtonType> = ({
  page,
  selected,
}) => {
  return (
    <button
      className={classNames('cursor-pointer hover:bg-[#3B3E4A] w-[40px]', {
        'bg-[#905BFF]': selected,
        'bg-[#161827]': !selected,
      })}
    >
      {page}
    </button>
  );
};
