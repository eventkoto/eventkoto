import { useState, useRef } from 'react'

// import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"

import SwiperCore, {
    Autoplay,Pagination,Navigation
  } from 'swiper';

SwiperCore.use([Autoplay,Pagination,Navigation]);

export default function DashboardMain() {

    return (
        <div className="dashboard">
        <div className="title">TRENDING NOW</div>
        <Swiper centeredSlides={true} autoplay={{ "delay": 2500,"disableOnInteraction": false}} 
        pagination={{"clickable": true}} className="filteredlist">
        <SwiperSlide>ahahahahah</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        </Swiper>
        </div>
    )
}
