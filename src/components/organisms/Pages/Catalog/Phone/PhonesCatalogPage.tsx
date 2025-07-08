import {useState} from "react";

import { CatalogFilters } from "../CatalogFilters/CatalogFilters";
import { Pagination } from "../../../../Molecules/Pagination/Pagination";


export const PhonesCatalogPage = () => {
  const [sortBy, setSortBy] = useState(new Set(["newest"]));
  const [itemsOnPage, setItemsOnPage] = useState(new Set(["16"]));

   const selected = Array.from(itemsOnPage)[0]; // наприклад "16" або "all"
  const perPage = selected === "all" ? 50 : Number(selected); // конвертуємо

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
      <Pagination totalItems={50} perPage={perPage} />
      
    </div>
   
  );
};
