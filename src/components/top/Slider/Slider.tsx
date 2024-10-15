"use client";

import Image from "next/image";
import "swiper/css";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { SLIDER_IMAGES } from "@/constants/constant";

const Slider = () => {
  return (
    <div>
      <Swiper
        slidesPerView={2}
        spaceBetween={15}
        centeredSlides={true}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        {SLIDER_IMAGES.map((image) => {
          return (
            <SwiperSlide key={image}>
              <Image src={image} alt="スライダー画像" width={150} height={100} priority />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
