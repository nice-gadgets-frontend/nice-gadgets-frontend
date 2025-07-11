import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperClass from 'swiper';

// Імпорт модулів з розширенням .js
import { Thumbs } from 'swiper/modules';

// Імпорт стилів Swiper
// import 'swiper/css';
// import 'swiper/css/thumbs';

type Props = {
  images: string[];
  altPrefix: string;
  maxThumbs?: number;
};

export const SwiperGallery: React.FC<Props> = ({ images, altPrefix, maxThumbs = 4 }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="flex gap-6">
      <Swiper
        modules={[Thumbs]}
        direction="vertical"
        slidesPerView={Math.min(images.length, maxThumbs)}
        spaceBetween={10}
        onSwiper={setThumbsSwiper}
        watchSlidesProgress={true}
        className="w-24 h-[400px]"
        navigation={false}
        pagination={false}
        style={{ cursor: 'pointer' }}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src.startsWith('http') ? src : `/gadgets/${src}`}
              alt={`${altPrefix} thumb ${idx + 1}`}
              className="w-[80px] h-[80px] object-contain border-[0.5px] border-elements"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Thumbs]}
        slidesPerView={1}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="w-[400px] h-[400px]"
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