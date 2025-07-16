import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { PaginationButton } from "../../Atoms/Buttons/PaginationButton";
import cn from "classnames";


type PaginationProps = {
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
  currentPage: number;
};


export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  perPage,
  onPageChange,
  currentPage,
}) => {

  const totalPages = Math.ceil(totalItems / perPage);

  const updatePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  }

  if (totalPages <= 1) {
    return null;
  }

  const showMobilePages = () => (
    <>
      <PaginationButton page={1} selected={currentPage === 1} onClick={() => updatePage(1)} />
      {currentPage > 3 && <span className="text-primary px-1 ">...</span>}

      {[currentPage - 1, currentPage, currentPage + 1]
        .filter((page) => page > 1 && page < totalPages)
        .map((page) => (
          <PaginationButton
            key={page}
            page={page}
            selected={currentPage === page}
            onClick={() => updatePage(page)}
          />
        )
      )}
      
      {currentPage < totalPages - 2 && <span className="text-primary px-1">...</span>}

      {totalPages > 1 && (
        <PaginationButton
          page={totalPages}
          selected={currentPage === totalPages}
          onClick={() => updatePage(totalPages)}
        />
      )}
    </>
  );
  const showFullPages = () =>  
  
    [...Array(totalPages)].map((_, i) => {
      const page = i + 1;
      return (
        <PaginationButton
          key={page}
          page={page}
          selected={currentPage === page}
          onClick={() => updatePage(page)}
        />
      );
    }
    
  );

  return (
    <div className="flex justify-center items-center gap-2 py-4">
      <button
        onClick={() => updatePage(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn('w-8 h-8 flex cursor-pointer justify-center items-center bg-surface-1 transition-colors',
           {
            'bg-surface-1 hover:text-[var(--color-surface-1)] hover:bg-primary dark:hover:bg-accent': currentPage > 1,
             'bg-black text-icons cursor-default opacity-100': currentPage === 1,
           }
  )}
      >
        <ChevronLeft
          size={16}
          className={currentPage === 1 ? 'text-icons' : 'dark:text-primary'}
        />
        </button>

       <div className="flex mx-4 gap-2">
         <div className="hidden md:flex gap-2">{showFullPages()}</div>
        <div className="flex md:hidden gap-2">{showMobilePages()}</div>
        </div>
      <button
        onClick={() => updatePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 cursor-pointer flex justify-center items-center bg-surface-1 text-primary hover:bg-primary hover:text-[var(--color-surface-1)]  dark:hover:bg-accent disabled:opacity-100"
      >
        <ChevronRight
          size={16}
          className={currentPage === totalPages ? 'text-icons' : 'dark:text-primary'}
        />
      </button>


    </div>
  )

}
