import { useFavouritesStore } from '../../../../services/useStore/useFavouritesStore';
import { ArrowRightIcon } from '../../../Atoms/Icons/ArrowRightIcon';
import { HomePageIcon } from '../../../Atoms/Icons/HomePageIcon';
import { CardItem } from '../../../Molecules/CardItem/CardItem';
import { getProducts } from '../../../../services/getProducts';
import { useEffect, useState } from 'react';
import type { ProductType } from '../../../../types/ProductType';
import { CardSkeleton } from '../../../Molecules/CardSkeleton/CardSkeleton';
import { useNavigate } from 'react-router-dom';

export const FavouritesPage = () => {
  const itemIdsInFavourites = useFavouritesStore(
    (state) => state.itemsInFavourites,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const isEmpty = !isLoading && itemIdsInFavourites.length < 1;

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((data) => setProducts(data))
      .finally(() => {
        setIsLoading(false);
      });
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
        {itemsInFavouritesCount > 0 && (
          <span className="text-[#75767F] font-['Mont-Regular'] text-[14px] leading-[21px]">
            {itemsInFavouritesCount} items
          </span>
        )}
      </div>
      {isEmpty && (
        <div className="text-[var(--color-white)] mt-10 font-[Mont-Regular]">
          <p>You haven't added any favourites yet.</p>
          <p
            onClick={() => navigate('/phones')}
            className="text-[var(--color-blue)] cursor-pointer hover:scale-[1.1] w-fit transition underline"
          >
            Explore products
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 justify-items-center">
        {!isLoading ?
          itemsInFavourites.map((product) => (
            <CardItem
              key={product.id}
              product={product}
              className="w-full max-w-[287px] min-h-[440px] sm:max-w-[288px] sm:min-h-[506px]"
            />
          ))
        : Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton
              key={i}
              className="w-full max-w-[287px] min-h-[440px] sm:max-w-[288px] sm:min-h-[506px]"
            />
          ))
        }
      </div>
    </div>
  );
};
