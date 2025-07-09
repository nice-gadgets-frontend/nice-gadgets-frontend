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

type BrandNewmodelsSectionType = {
  phones: Phone[];
};

export const BrandNewmodelsSection: React.FC<BrandNewmodelsSectionType> = ({
  phones,
}) => {
  let filteredPhones = [...phones];

  filteredPhones = filteredPhones.reverse();

  return (
    <div className="bg-black pt-[80px]">
      <div className="xl:w-[1136px] mx-auto">
        <div className="flex justify-between">
          <span className="text-[#F1F2F9] text-[22px] leading-[140%] sm:text-[32px] sm:leading-[41px] font-[Mont-Bold] mb-6 text-left xl:w-[1136px] xl:mx-auto">
            Brand new models
          </span>
          <div className="navigation flex flex-row-reverse gap-4">
            <div className="navigate-brand-new-right">
              <SliderButton />
            </div>
            <div className="navigate-brand-new-left">
              <SliderButton rotate="left" />
            </div>
          </div>
        </div>

        <div className="mx-auto">
          <Swiper
            modules={[Navigation, A11y]}
            slidesPerView="auto"
            spaceBetween={16}
            navigation={{
              nextEl: '.navigate-brand-new-right',
              prevEl: '.navigate-brand-new-left',
            }}
          >
            {filteredPhones.map((phone) => (
              <SwiperSlide className="xl:!w-[272px] sm:!w-[237px] xs:!w-[212px] !w-[212px]">
                <CardItem
                  key={phone.id}
                  phone={phone}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
