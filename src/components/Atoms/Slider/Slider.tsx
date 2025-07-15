import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// @ts-expect-error: swiper doesn't export types for CSS
import 'swiper/css';
// @ts-expect-error: swiper doesn't export types for CSS
import 'swiper/css/navigation';
// @ts-expect-error: swiper doesn't export types for CSS
import 'swiper/css/pagination';

import './Slider.css';
import '../../../styles/responsive.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Slider: React.FC = () => {
  const navigate = useNavigate();

  const handleSlideClick = () => {
    navigate(`/product/phones/apple-iphone-14-pro-1tb-spaceblack`);
  };

  return (
    <div className="bg-black">
      <div className="grid grid-cols-[auto_1fr_auto] gap-0 sm:gap-4 items-center xl:w-[1136px] mx-auto ">
        <div className="navigate-left bg-surface-2 hidden sm:flex w-[32px] h-full cursor-pointer justify-center items-center">
          <ChevronLeft
            color='var(--color-primary)'
            size={16}
          />
        </div>
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={true}
          navigation={{
            nextEl: '.navigate-right',
            prevEl: '.navigate-left',
          }}
          pagination={{
            clickable: true,
            el: '.pagination',
            bulletClass: 'bullet',
            bulletActiveClass: 'bullet--active',
          }}
          className="w-full"
          style={{ margin: '0 0' }}
        >
          <SwiperSlide onClick={() => handleSlideClick()}>
            <picture className="w-full h-full block">
              <source
                media="(max-width: 639px)"
                srcSet="gadgets/img/banner-mobile.svg"
              />
              <img
                src="gadgets/img/banner.svg"
                alt="banner"
                className="w-full h-full object-cover"
              />
            </picture>
          </SwiperSlide>
          <SwiperSlide onClick={() => handleSlideClick()}>
            <picture className="w-full h-full block">
              <source
                media="(max-width: 639px)"
                srcSet="gadgets/img/banner-mobile.svg"
              />
              <img
                src="gadgets/img/banner.svg"
                alt="banner"
                className="w-full h-full object-cover"
              />
            </picture>
          </SwiperSlide>
          <SwiperSlide onClick={() => handleSlideClick()}>
            <picture className="w-full h-full block">
              <source
                media="(max-width: 639px)"
                srcSet="gadgets/img/banner-mobile.svg"
              />
              <img
                src="gadgets/img/banner.svg"
                alt="banner"
                className="w-full h-full object-cover"
              />
            </picture>
          </SwiperSlide>
        </Swiper>
        <div className="navigate-right bg-surface-2 hidden sm:flex w-[32px] h-full cursor-pointer justify-center items-center">
          <ChevronRight
            color='var(--color-primary)'
            size={16}
          />
        </div>
      </div>
      <div className="pagination flex justify-center items-center mx-auto my-0 w-[80px] h-[24px] mt-[8px] gap-[14px]"></div>
    </div>
  );
};
