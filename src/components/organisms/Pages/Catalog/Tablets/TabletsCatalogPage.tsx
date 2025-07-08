
import {useState} from "react";

import { CatalogFilters } from "../CatalogFilters/CatalogFilters";

export const TabletsCatalogPage = () => {
  const [sortBy, setSortBy] = useState(new Set(["newest"]));
  const [itemsOnPage, setItemsOnPage] = useState(new Set(["16"]));

  return (
    <div className="flex flex-col">
      <CatalogFilters
        sortBy={sortBy}
        setSortBy={setSortBy}
        itemsOnPage={itemsOnPage}
        setItemsOnPage={setItemsOnPage}
      />
      
      <div className="flex-1 mt-50">
        <h2 className="text-lg font-semibold text-gray-200">Tablets</h2>
        <p className="text-gray-400">Tablet items will be displayed here.</p>
      </div>
    </div>
  );
};
