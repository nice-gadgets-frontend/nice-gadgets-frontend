import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperClass from 'swiper';
import { Thumbs } from 'swiper/modules';

type Props = {
  images: string[];
  altPrefix: string;
  maxThumbs?: number;
};

export const SwiperGallery: React.FC<Props> = ({ images, altPrefix, maxThumbs = 4 }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Init on load
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      {/* Маленькі зображення */}
      <Swiper
        modules={[Thumbs]}
        direction={isMobile ? 'horizontal' : 'vertical'}
        slidesPerView={Math.min(images.length, maxThumbs)}
        spaceBetween={10}
        onSwiper={setThumbsSwiper}
        watchSlidesProgress
        className={`order-2 md:order-1 ${isMobile ? 'w-full h-[80px]' : 'w-24 h-[400px]'}`}
        navigation={false}
        pagination={false}
        style={{ cursor: 'pointer' }}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src.startsWith('http') ? src : `/gadgets/${src}`}
              alt={`${altPrefix} thumb ${idx + 1}`}
              className="w-[80px] h-[80px] object-contain border-[0.5px] border-elements pt-2 pb-2 mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Велике зображення */}
      <Swiper
        modules={[Thumbs]}
        slidesPerView={1}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="order-1 md:order-2 w-full md:w-[400px] h-[400px]"
        navigation={false}
        pagination={false}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src.startsWith('http') ? src : `/gadgets/${src}`}
              alt={`${altPrefix} large ${idx + 1}`}
              className="w-full h-full object-contain rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};