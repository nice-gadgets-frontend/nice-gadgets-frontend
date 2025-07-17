import {useEffect, useMemo, useState} from "react";

import { CatalogFilters } from "../CatalogFilters/CatalogFilters";
import { Pagination } from "../../../../Molecules/Pagination/Pagination";
import type { Accessory } from "../../../../../types/Accessories";
import { useSearchParams } from "react-router-dom";
import { CardItem } from "../../../../Molecules/CardItem/CardItem";
import { getProducts } from "../../../../../services/getProducts";
import { mergedAccessoriesWithProducts } from "../../../../../types/Utils/mergedAccessoriesWithProducts";
import { getAccessories } from "../../../../../services/getAccessories";
import { HomePageIcon } from "../../../../Atoms/Icons/HomePageIcon";
import { ArrowRightIcon } from "../../../../Atoms/Icons/ArrowRightIcon";


type MergedAccessory =  Omit<Accessory, 'id'> & {
  id: number;
  itemId: string;
  image: string;
  price: number;
  fullPrice: number;
  year: number;
}
 

export const AccessoriesCatalogPage = () => {
  const [sortBy, setSortBy] = useState(new Set(["newest"]));
  const [itemsOnPage, setItemsOnPage] = useState(new Set(["16"]));
  const [accessories, setAccessories] = useState<MergedAccessory[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const selected = Array.from(itemsOnPage)[0]; // наприклад "16" або "all"
  // const perPage = selected === "all" ? 50 : Number(selected); // конвертуємо
  const pageParam = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage') || selected;

  const perPage = perPageParam.toLowerCase() === 'all'
    ? accessories.length || 16
    : Number(perPageParam);
  const currentPage = pageParam;

  useEffect(() => {
    const selectedValue = Array.from(itemsOnPage)[0];

    const newParams = new URLSearchParams(searchParams);
    newParams.set('perPage', selectedValue);
    newParams.set('page', '1');

    setSearchParams(newParams);
  }, [itemsOnPage]);

  useEffect(() => {
    Promise.all([getAccessories(), getProducts()])
      .then(([accessoriesData, productsData]) => {
        const merged = mergedAccessoriesWithProducts(accessoriesData, productsData);
        setAccessories(merged);
    })
  }, []);

  const sortedAccessories = useMemo(() => {
    const sorted = Array.from(sortBy)[0];

    switch (sorted) {
      case 'newest':
        return [...accessories].sort((a, b) => b.year - a.year);
      case 'oldest':
        return [...accessories].sort((a, b) => a.year - b.year);
      case 'price_low':
        return [...accessories].sort((a, b) => a.price - b.price);
      case 'price_high':
        return [...accessories].sort((a, b) => b.price - a.price);
      default:
        return accessories
    }
  }, [accessories, sortBy]);

  const paginatedPhones = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return sortedAccessories.slice(start, end);

  }, [sortedAccessories, currentPage, perPage])

  return (
    
    <div className="flex-1 mt-10 bg-black">
      <div className="w-full max-w-[1200px] mx-auto sm:px-6 lg:px-8">
         <div className="location-wrapper flex flex-row items-center gap-x-2 mb-6 sm:mb-6 lg:mb-8">
                        <HomePageIcon />
                        <ArrowRightIcon />
                        <span className="text-[12px] leading-[100%] text-secondary font-['Mont-Regular']">
                          Accessories
          </span>
          </div>
      <h1 className=" text-primary font-extrabold text-3xl md:text-5xl font-[Mont-Regular]">Accessories</h1>
      <p className="text-secondary mb-6 text-sm font-semibold"> {sortedAccessories.length}</p>

    
    <div className="flex flex-col bg-black min-h-screen">
      <CatalogFilters
        sortBy={sortBy}
        setSortBy={setSortBy}
        itemsOnPage={itemsOnPage}
        setItemsOnPage={setItemsOnPage}
      />


      <div className="w-full grid gap-y-10 gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center px-4 sm:px-6 xl:px-0 max-w-[1200px] mx-auto">
        {paginatedPhones.map(phone => (
          <CardItem key={phone.id} product={phone}/>
        ))}

      </div>

        <Pagination totalItems={sortedAccessories.length}
          perPage={perPage}
          currentPage={currentPage} 
          onPageChange={(page) => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('page', page.toString());
            setSearchParams(newParams);
          }}
        />
      </div>
    </div>
</div>
  );
};
