import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './SwiperComp.css';

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
interface SwiperCompProps{
  images: string[]
}

export default function SwiperComp(props: SwiperCompProps) {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {props.images.map((item)=>(
          <SwiperSlide>
            <img src={item}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
