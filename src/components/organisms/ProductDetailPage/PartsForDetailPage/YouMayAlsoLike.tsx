import type React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

// @ts-expect-error: swiper doesn't export types for CSS
import 'swiper/css';
// @ts-expect-error: swiper doesn't export types for CSS
import 'swiper/css/navigation';
// @ts-expect-error: swiper doesn't export types for CSS
import 'swiper/css/pagination';

import { CardItem } from '../../../Molecules/CardItem/CardItem';
import { SliderButton } from '../../../Atoms/Buttons/SliderButton';
import { useState } from 'react';
import type { ProductType } from '../../../../types/ProductType';
import { useNavigate } from 'react-router-dom';

type YouMayAlsoLikeProps = {
  youMayAlsoLikeProducts: ProductType[];
  currentProductCategory: string;
};

// перемішування карток
function shuffleProductsArray<T>(products: T[]): T[] {
  const productsCopy = [...products];
  for (
    let currentIndex = productsCopy.length - 1;
    currentIndex > 0;
    currentIndex--
  ) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [productsCopy[currentIndex], productsCopy[randomIndex]] = [
      productsCopy[randomIndex],
      productsCopy[currentIndex],
    ];
  }
  return productsCopy;
}
export const YouMayAlsoLike: React.FC<YouMayAlsoLikeProps> = ({
  youMayAlsoLikeProducts,
  currentProductCategory,
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const navigate = useNavigate();

  // по категорії
  const filteredProducts = youMayAlsoLikeProducts.filter(
    (product) => product.category === currentProductCategory,
  );

  // перемішати і взяти перші 8 рандомних
  const randomProducts = shuffleProductsArray(filteredProducts).slice(0, 8);

  return (
    <div className="bg-black pt-[80px]">
      <div className="xl:w-[1136px] mx-auto">
        {/* Заголовок і кнопки */}
        <div className="grid grid-cols-[1fr_auto] items-center mb-6">
          <span className="text-primary text-[22px] leading-[140%] sm:text-[32px] sm:leading-[41px] font-[Mont-Bold] text-left">
            You may also like
          </span>

          <div className="navigation flex flex-row-reverse gap-4">
            <div className="navigate-you-may-right">
              <SliderButton disabled={isEnd} />
            </div>
            <div className="navigate-you-may-left">
              <SliderButton
                disabled={isBeginning}
                rotate="left"
              />
            </div>
          </div>
        </div>

        {/* Слайдер */}
        <Swiper
          modules={[Navigation, A11y]}
          slidesPerView="auto"
          spaceBetween={16}
          navigation={{
            nextEl: '.navigate-you-may-right',
            prevEl: '.navigate-you-may-left',
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {randomProducts.map((product) => {
            const adaptedProduct = {
              ...product,
              itemId: product.itemId ?? product.id,
              price: product.priceDiscount ?? product.price,
              fullPrice: product.priceRegular ?? product.fullPrice,
              image: product.image ?? product.images?.[0] ?? '',
            };

            return (
<SwiperSlide
  key={adaptedProduct.itemId}
   className="max-w-[212px] sm:max-w-[237px] lg:max-w-[272px] !h-auto flex"
>
  <div
    onClick={() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate(`/product/${currentProductCategory}/${adaptedProduct.id ?? adaptedProduct.itemId}`);
    }}
    className="h-full"
  >
    <div className="h-full flex">
      <CardItem product={adaptedProduct} className="h-full flex flex-col"/>
    </div>
  </div>
</SwiperSlide>

            );
          })}
        </Swiper>
      </div>
    </div>
  );
};