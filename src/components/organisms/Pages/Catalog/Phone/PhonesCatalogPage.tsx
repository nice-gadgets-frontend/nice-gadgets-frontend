import { useEffect, useMemo, useState } from 'react';

import { CatalogFilters } from '../CatalogFilters/CatalogFilters';
import { Pagination } from '../../../../Molecules/Pagination/Pagination';
import type { Phone } from '../../../../../types/Phone';
import { useSearchParams } from 'react-router-dom';
import { getPhones } from '../../../../../services/getPhones';
import { CardItem } from '../../../../Molecules/CardItem/CardItem';
import { getProducts } from '../../../../../services/getProducts';
import { mergedPhonesWithProducts } from '../../../../../types/Utils/mergedPhonesWithProducts';
import { HomePageIcon } from '../../../../Atoms/Icons/HomePageIcon';
import { ArrowRightIcon } from '../../../../Atoms/Icons/ArrowRightIcon';
import { InputFilter } from '../../../../Molecules/InputFilter/InputFilter';

type MergedPhone = Omit<Phone, 'id'> & {
  id: number;
  itemId: string;
  image: string;
  price: number;
  fullPrice: number;
  year: number;
};

export const PhonesCatalogPage = () => {
  const [sortBy, setSortBy] = useState(new Set(['newest']));
  const [itemsOnPage, setItemsOnPage] = useState(new Set(['16']));
  const [phones, setPhones] = useState<MergedPhone[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const selected = Array.from(itemsOnPage)[0]; // наприклад "16" або "all"
  // const perPage = selected === "all" ? 50 : Number(selected); // конвертуємо
  const pageParam = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage') || selected;

  const perPage = perPageParam.toLowerCase() === 'all'
    ? phones.length || 16
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
    Promise.all([getPhones(), getProducts()])
      .then(([phonesData, productsData]) => {
        const merged = mergedPhonesWithProducts(phonesData, productsData);
        setPhones(merged);
      },
    );
  }, []);

  const sortedPhones = useMemo(() => {
    const sorted = Array.from(sortBy)[0];

    switch (sorted) {
      case 'newest':
        return [...phones].sort((a, b) => b.year - a.year);
      case 'oldest':
        return [...phones].sort((a, b) => a.year - b.year);
      case 'price_low':
        return [...phones].sort((a, b) => a.price - b.price);
      case 'price_high':
        return [...phones].sort((a, b) => b.price - a.price);
      default:
        return phones;
    }
  }, [phones, sortBy]);

   useEffect(() => {
    const queryParam = searchParams.get('query') || '';
    setQuery(queryParam);
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (query) {
      newParams.set('query', query)
    } else {
      newParams.delete('query')
    }

    newParams.set('page', '1');
    setSearchParams(newParams);
  }, [query])


   const filteredPhones = useMemo(() => {
    return sortedPhones.filter(phone =>
      phone.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [sortedPhones, query])

  const paginatedPhones = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return filteredPhones.slice(start, end);

  }, [filteredPhones, currentPage, perPage])

  return (
    
    <div className="flex-1 mt-10 bg-black">
      <div className="w-full max-w-[1200px] mx-auto sm:px-6 lg:px-8">
        <div className="location-wrapper flex flex-row items-center gap-x-2 mb-6 sm:mb-6 lg:mb-8">
                <HomePageIcon />
                <ArrowRightIcon />
                <span className="text-[12px] leading-[100%] text-secondary font-['Mont-Regular']">
                  Mobile phones
          </span>
          </div>
      <h1 className=" text-primary font-extrabold text-3xl md:text-5xl font-[Mont-Regular]">Mobile phones</h1>
      <p className="text-secondary mb-6 text-sm font-semibold"> {filteredPhones.length}</p>

         <InputFilter query={query} setQuery={setQuery} placeholder="Search..." />
    
    <div className="flex flex-col bg-black min-h-screen">
      <CatalogFilters
        sortBy={sortBy}
        setSortBy={setSortBy}
        itemsOnPage={itemsOnPage}
        setItemsOnPage={setItemsOnPage}
      />

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedPhones.length > 0 ? (
            paginatedPhones.map((product) => (
              <CardItem
                key={product.id}
                product={product}
              />
            ))
          ) : (
                 <p className=" text-secondary text-lg py-10">
                  No items found
                 </p>
            )
            }
        </div>

        <Pagination
          totalItems={filteredPhones.length}
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
