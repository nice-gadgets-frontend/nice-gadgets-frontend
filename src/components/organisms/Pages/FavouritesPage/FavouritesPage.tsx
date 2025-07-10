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

  //whole page background color bg-black

  //desktop grid (1200px+): fixed width 24-column grid, column 32px, gutter 16px
  //tablet grid (640-1199px): stretch 12-column grid (640-1199px) side margins 24px, gutter 16px
  //mobile grid (320-639px): stretch 4 column grid, side margins 16px, gutter 16px

  //location-wrapper on phone has 16px left margin (basically grid 1st column); 8px gap between children; direction row; children aligned left
  //location font-size 12px, lineheight 100%, color #75767F, font-[Mont-Regular]

  //distance between location-wrapper and title-wrapper 24px

  //title-wrapper direction column, gap between children 8px, children aligned left
  //title color #F1F2F9, font size 32px, leniheight 41px, letter spacing -1%, font-[Mont-Bold]

  //subtitle color #75767F, font [Mont-Regular], size 14px, lineheight 21px

  //distance between title-wrapper and content-wrapper 32px

  //content wrapper according to grid
  //card sizes for better grid undertendment  max-w-[212px] sm:max-w-[237px] lg:max-w-[272px] min-h-[439px] sm:min-h-[512px]

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
