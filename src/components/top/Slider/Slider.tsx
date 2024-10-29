"use client";

import Image from "next/image";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type { SpecialOverView } from "@/types/deezer";
import Link from "next/link";

const Slider = ({ getPicksInfo }: { getPicksInfo: SpecialOverView[] }) => {
  return (
    <div>
      <Swiper
        slidesPerView={1.5}
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
        {getPicksInfo.map((getPickInfo) => {
          return (
            <SwiperSlide key={getPickInfo.id}>
              <Link href={`/special/${getPickInfo.id}`}>
                <Image
                  src={`/images/${getPickInfo.image}`}
                  alt={`${getPickInfo.title}サムネイル`}
                  width={300}
                  height={150}
                  priority
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
