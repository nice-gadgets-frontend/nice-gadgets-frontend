import { useSearchParams } from 'react-router-dom';
import { Dropdowns } from '../../../../Atoms/Dropdowns/Dropdowns';

type CatalogFiltersProps = {
  sortBy: Set<string>;
  setSortBy: (value: Set<string>) => void;
  itemsOnPage: Set<string>;
  setItemsOnPage: (value: Set<string>) => void;
};

const sortOptions = [
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'price_low', label: 'Price: Low to High' },
  { key: 'price_high', label: 'Price: High to Low' },
];

const itemsPerPageOptions = [
  { key: '8', label: '8' },
  { key: '16', label: '16' },
  { key: '32', label: '32' },
  { key: 'all', label: 'All' },
];

export const CatalogFilters = ({
  sortBy,
  setSortBy,
  itemsOnPage,
  setItemsOnPage,
}: CatalogFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dropdownButtonClass = `
    w-full
    h-[40px] cursor-pointer bg-surface-2 text-primary font-semibold
    active:border-accent
    focus:outline-accent active:outline-accent
    rounded-none hover:bg-elements transition-colors duration-300
  `;

  return (
    <div className="flex  gap-4 py-4 text-white">
      <div className="flex flex-col gap-1 w-[136px] sm:w-[187px] lg:w-[176px]">
        <span className="text-sm text-secondary">Sort by</span>
        <Dropdowns
          label="Sort by"
          options={sortOptions}
          selected={sortBy}
          onChange={(value) => {
            setSortBy(value);

            const newParams = new URLSearchParams(searchParams);
            newParams.set('sort', Array.from(value)[0]);
            setSearchParams(newParams);
          }}
          buttonClassName={dropdownButtonClass}
        />
      </div>

      <div className="flex flex-col gap-1 w-[136px]">
        <span className="text-sm text-secondary">Items on page</span>
        <Dropdowns
          label="Items on page"
          options={itemsPerPageOptions}
          selected={itemsOnPage}
          onChange={(value) => {
            setItemsOnPage(value);

            const newParams = new URLSearchParams(searchParams);
            newParams.set('perPage', Array.from(value)[0]);
            newParams.set('page', '1');
            setSearchParams(newParams);
          }}
          buttonClassName={dropdownButtonClass}
        />
      </div>
    </div>
  );
};
