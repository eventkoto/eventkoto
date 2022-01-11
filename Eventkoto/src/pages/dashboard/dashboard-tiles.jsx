import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../../styles/index.css";

// import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/modal.css";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { FireDBQueryEvents } from "../../libs/firebase/db_events";

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function List({name=false, category=false}) {

  const [display, setDisplay] = useState([])
  const navigate = useNavigate()

  async function fetchData() {
    
    let doc = category ? await FireDBQueryEvents.getLatestCategory(category, 10) : await FireDBQueryEvents.getLatestAll(10)
    setDisplay(doc)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {
        display.length > 0 &&
        <div className="list">
            
          <span>{name ? `${name}` : "Latest"}</span>
          <Swiper
            slidesPerView="5"
            spaceBetween={15}
            navigation={true}
            className="mySwiper1"
          >
            {
              display.map((e,i) =>
                  <SwiperSlide onClick={navigate.bind(this, `/view/${e.uid}`)} key={`cards_${i}`} className="hoverslide w-full h-full relative overflow-hidden cursor-pointer">
                      <img src={e.splash_image} alt="cover" className="object-cover absolute top-0 left-0 bottom-0 right-0" />
                      <div className="textslide bg-red-600 text-white w-full h-1/6 justify-center items-center flex">{e.title}</div>
                  </SwiperSlide>
              )
            }
          </Swiper>
        </div>
      }
    </>
    
  );
}
