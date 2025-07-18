import type React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

// @ts-expect-error: swiper doesn't export types for CSS
import 'swiper/css';
// @ts-expect-error: swiper doesn't export types for CSS
import 'swiper/css/navigation';
// @ts-expect-error: swiper doesn't export types for CSS
import 'swiper/css/pagination';
// import '../../../../../styles/theme/dark.css';

import 'react-loading-skeleton/dist/skeleton.css';

import { CardItem } from '../../../../Molecules/CardItem/CardItem';
import { SliderButton } from '../../../../Atoms/Buttons/SliderButton';
import { useState } from 'react';
import type { ProductType } from '../../../../../types/ProductType';
import { CardSkeleton } from '../../../../Molecules/CardSkeleton/CardSkeleton';

type BrandNewmodelsSectionType = {
  products: ProductType[];
};

export const BrandNewmodelsSection: React.FC<BrandNewmodelsSectionType> = ({
  products,
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  let filteredProducts = [...products];

  filteredProducts = filteredProducts
    .filter((p) => p.year !== undefined)
    .sort((a, b) => b.year! - a.year!);

  return (
    <div className="bg-black pt-[80px]">
      <div className="xl:w-[1136px] mx-auto">
        <div className="flex justify-between">
          <span className="text-primary text-[22px] leading-[140%] sm:text-[32px] sm:leading-[41px] font-[Mont-Bold] mb-6 text-left xl:w-[1136px] xl:mx-auto">
            Brand new models
          </span>
          <div className="navigation flex flex-row-reverse gap-4">
            <div className="navigate-brand-new-right">
              <SliderButton disabled={isEnd} />
            </div>
            <div className="navigate-brand-new-left">
              <SliderButton
                disabled={isBeginning}
                rotate="left"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto -mr-4 sm:-mr-6 lg:mx-0">
          <Swiper
            modules={[Navigation, A11y]}
            slidesPerView="auto"
            spaceBetween={16}
            navigation={{
              nextEl: '.navigate-brand-new-right',
              prevEl: '.navigate-brand-new-left',
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 16,
              },
              480: {
                slidesPerView: 1.8,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2.8,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 16,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
            }}
          >
            {filteredProducts.length > 0 ?
              filteredProducts.map((product) => (
                <SwiperSlide
                  key={product.itemId}
                  className="max-w-[212px] sm:max-w-[237px] lg:max-w-[272px]"
                >
                  <CardItem product={product} />
                </SwiperSlide>
              ))
            : Array.from({ length: 8 }).map((_, i) => (
                <SwiperSlide
                  key={i}
                  className="max-w-[212px] sm:max-w-[237px] lg:max-w-[272px]"
                >
                  <CardSkeleton />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </div>
  );
};
