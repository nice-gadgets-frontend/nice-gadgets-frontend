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

import type { Phone } from '../../../../../types/Phone';
import { CardItem } from '../../../../Molecules/CardItem/CardItem';
import { SliderButton } from '../../../../Atoms/Buttons/SliderButton';
import { useState } from 'react';

type HotPricesSectionType = {
  phones: Phone[];
};

export const HotPricesSection: React.FC<HotPricesSectionType> = ({
  phones,
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  let filteredPhones = [...phones];

  filteredPhones = filteredPhones.sort(
    (a, b) =>
      b.priceRegular - b.priceDiscount - (a.priceRegular - a.priceDiscount),
  );

  return (
    <div className="bg-black pt-[80px]">
      <div className="xl:w-[1136px] mx-auto">
        <div className="flex justify-between">
          <span className="text-[#F1F2F9] text-[22px] leading-[140%] sm:text-[32px] sm:leading-[41px] font-[Mont-Bold] mb-6 text-left xl:w-[1136px] xl:mx-auto">
            Hot prices
          </span>
          <div className="navigation flex flex-row-reverse gap-4">
            <div className="navigate-hot-prices-right">
              <SliderButton disabled={isEnd}/>
            </div>
            <div className="navigate-hot-prices-left">
              <SliderButton disabled={isBeginning} rotate="left" />
            </div>
          </div>
        </div>

        <div className="mx-auto">
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
            {filteredPhones.map((phone) => (
              <SwiperSlide
                key={phone.id}
                className="xl:!w-[272px] sm:!w-[237px] xs:!w-[212px] !w-[212px]"
              >
                <CardItem phone={phone} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
