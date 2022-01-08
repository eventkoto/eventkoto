import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid"
import "swiper/css/pagination"


// import Swiper core and required modules
import SwiperCore, {
    Grid,Pagination
  } from 'swiper';
  
  // install Swiper modules
  SwiperCore.use([Grid,Pagination]);
  
  

const TileFiltered = () => {
    return ( 
        <div className="tile">
            <div className="title">HAHAHAHA</div>
            <>
    <Swiper slidesPerView={3} grid={{
  "rows": 2
}} spaceBetween={30} pagination={{
  "clickable": true
}} className="mySwiper2">
  <SwiperSlide>Slide 1</SwiperSlide>
  <SwiperSlide>Slide 2</SwiperSlide>
  <SwiperSlide>Slide 3</SwiperSlide>
  <SwiperSlide>Slide 4</SwiperSlide>
  <SwiperSlide>Slide 5</SwiperSlide>
  <SwiperSlide>Slide 6</SwiperSlide>
  <SwiperSlide>Slide 7</SwiperSlide>
  <SwiperSlide>Slide 8</SwiperSlide>
  <SwiperSlide>Slide 9</SwiperSlide>
  </Swiper>
    </>
            </div>
    )
    }
export default TileFiltered;