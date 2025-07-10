import { useFavouritesStore } from '../../../../services/useStore/useFavouritesStore';
import { ArrowRightIcon } from '../../../Atoms/Icons/ArrowRightIcon';
import { HomePageIcon } from '../../../Atoms/Icons/HomePageIcon';
import { CardItem } from '../../../Molecules/CardItem/CardItem';
import { getProducts } from '../../../../services/getProducts';
import { useEffect, useState } from 'react';
import type { ProductType } from '../../../../types/ProductType';

export const FavouritesPage = () => {
  const itemIdsInFavourites = useFavouritesStore(
    (state) => state.itemsInFavourites,
  );

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  const itemsInFavourites = products.filter((product) =>
    itemIdsInFavourites.includes(product.itemId),
  );
  const itemsInFavouritesCount = itemsInFavourites.length;

  return (
    <div className="bg-black lg:max-w-[1200px] lg:mx-auto px-4 sm:px-6 lg:px-0">
      <div className="location-wrapper flex flex-row items-center gap-x-2 mb-6 sm:mb-6 lg:mb-8">
        <HomePageIcon />
        <ArrowRightIcon />
        <span className="text-[12px] leading-[100%] text-[#75767F] font-['Mont-Regular']">
          Favourites
        </span>
      </div>
      <div className="flex flex-col items-start gap-y-2 mb-8 sm:mb-8 lg:mb-10">
        <span className="text-[#F1F2F9] text-[32px] leading-[41px] tracking-[-0.01em] font-['Mont-Bold']">
          Favourites
        </span>
        <span className="text-[#75767F] font-['Mont-Regular'] text-[14px] leading-[21px]">
          {itemsInFavouritesCount} items
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 justify-items-center">
        {itemsInFavourites.map((product) => (
          <CardItem
            key={product.itemId}
            product={product}
            className="w-full max-w-[287px] min-h-[440px] sm:max-w-[288px] sm:min-h-[506px]"
          />
        ))}
      </div>
    </div>
  );
};
