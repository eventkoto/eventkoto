
  import { useRef, useState } from "react";
  import '../../styles/index.css'

  // import Swiper
  import { Swiper, SwiperSlide } from "swiper/react";
  import "swiper/css";
  import "swiper/css/pagination"
  import "swiper/css/navigation"

  import SwiperCore, {
      Autoplay,Pagination,Navigation
    } from 'swiper';

  SwiperCore.use([Autoplay,Pagination,Navigation]);


  export default function List() {
  
    return (
      <div className="list">
        <span> Continue to watch</span>
        <Swiper slidesPerView="5" spaceBetween={15} navigation={true} className="mySwiper1">
        <SwiperSlide className="hoverslide">
          <div className="textslide">Title Here</div>
        </SwiperSlide >
        <SwiperSlide className="hoverslide">
        <div className="textslide">Title Here</div>
        </SwiperSlide >
        <SwiperSlide className="hoverslide">
        <div className="textslide">Title Here</div>
        </SwiperSlide>
        <SwiperSlide className="hoverslide">
          <div className="textslide">Title Here</div>
          </SwiperSlide>
        <SwiperSlide className="hoverslide">
          <div className="textslide">Title Here</div>
          </SwiperSlide>
        <SwiperSlide className="hoverslide">
          <div className="textslide">Title Here</div>
          </SwiperSlide>
        <SwiperSlide className="hoverslide">
          <div className="textslide">Title Here</div>
          </SwiperSlide>
        <SwiperSlide className="hoverslide">
          <div className="textslide">Title Here</div>
          </SwiperSlide>
          <SwiperSlide className="hoverslide">
          <div className="textslide">Title Here</div>
        </SwiperSlide >
        <SwiperSlide className="hoverslide">
        <div className="textslide">Title Here</div>
        </SwiperSlide >
        <SwiperSlide className="hoverslide">
        <div className="textslide">Title Here</div>
        </SwiperSlide>
        <SwiperSlide className="hoverslide">
          <div className="textslide">Title Here</div>
          </SwiperSlide>
        <SwiperSlide className="hoverslide">
          <div className="textslide">Title Here</div>
          </SwiperSlide>
        <SwiperSlide className="hoverslide">
          <div className="textslide">Title Here</div>
          </SwiperSlide>
        <SwiperSlide className="hoverslide">
          <div className="textslide">Title Here</div>
          </SwiperSlide>
        <SwiperSlide className="hoverslide">
          <div className="textslide">Title Here</div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  }