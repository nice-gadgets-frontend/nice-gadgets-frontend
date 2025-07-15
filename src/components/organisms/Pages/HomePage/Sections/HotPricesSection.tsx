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

import { CardItem } from '../../../../Molecules/CardItem/CardItem';
import { SliderButton } from '../../../../Atoms/Buttons/SliderButton';
import { useState } from 'react';
import type { ProductType } from '../../../../../types/ProductType';
import { CardSkeleton } from '../../../../Molecules/CardSkeleton/CardSkeleton';

type HotPricesSectionType = {
  products: ProductType[];
};

export const HotPricesSection: React.FC<HotPricesSectionType> = ({
  products,
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  let filteredProducts = [...products];

  filteredProducts = filteredProducts.sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );

  return (
    <div className="bg-black pt-[80px]">
      <div className="xl:w-[1136px] mx-auto">
        <div className="flex justify-between">
          <span className="text-primary text-[22px] leading-[140%] sm:text-[32px] sm:leading-[41px] font-[Mont-Bold] mb-6 text-left xl:w-[1136px] xl:mx-auto">
            Hot prices
          </span>
          <div className="navigation flex flex-row-reverse gap-4">
            <div className="navigate-hot-prices-right">
              <SliderButton disabled={isEnd} />
            </div>
            <div className="navigate-hot-prices-left">
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
              nextEl: '.navigate-hot-prices-right',
              prevEl: '.navigate-hot-prices-left',
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
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
