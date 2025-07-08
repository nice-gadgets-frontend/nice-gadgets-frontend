import { Dropdowns } from "../../../../Atoms/Dropdowns/Dropdowns";

type CatalogFiltersProps = {
  sortBy: Set<string>;
  setSortBy: (value: Set<string>) => void;
  itemsOnPage: Set<string>;
  setItemsOnPage: (value: Set<string>) => void;
};

const sortOptions = [
  { key: "newest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
  { key: "price_low", label: "Price: Low to High" },
  { key: "price_high", label: "Price: High to Low" },
];

const itemsPerPageOptions = [
  { key: "8", label: "8" },
  { key: "16", label: "16" },
  { key: "32", label: "32" },
  { key: "All", label: "All" },
];

export const CatalogFilters = ({
  sortBy,
  setSortBy,
  itemsOnPage,
  setItemsOnPage,
}: CatalogFiltersProps) => {
  return (
    <div className="flex gap-6 items-start px-4 py-4 text-white">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-[#75767F]">Sort by</span>
        <Dropdowns
          label="Sort by"
          options={sortOptions}
          selected={sortBy}
          onChange={setSortBy}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm text-[#75767F]">Items on page</span>
        <Dropdowns
          label="Items on page"
          options={itemsPerPageOptions}
          selected={itemsOnPage}
          onChange={setItemsOnPage}
        />
      </div>
    </div>
  );
};
