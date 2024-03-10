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
import { Typography } from '@mui/material';
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
          delay: 2500,
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
          {/* <Typography sx={{
            position: 'absolute',
            top: '90%',
            left: '50%',
            alignContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px #000000',
          }}>Vehicle Type</Typography> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
