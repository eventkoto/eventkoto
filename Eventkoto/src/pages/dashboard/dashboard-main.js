import { useState, useRef, useEffect } from "react";

// import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { FireDBQueryEvents } from "../../libs/firebase/db_events";
import { useNavigate } from "react-router-dom";

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function DashboardMain({triggerDone}) {

  const [display, setDisplay] = useState([])
  const navigate = useNavigate()

  async function fetchData() {
    
    let doc = await FireDBQueryEvents.getLatestAll(10)
    setDisplay(doc)
    triggerDone()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="">
      <div className="title">TRENDING NOW</div>
      <Swiper
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className=""
      >
        {
          display.map((e,i) =>{

            let doc;
            
            if (e.overview){
              let oDom = `<div>${e.overview.replaceAll('<br>', '<br/>')}</div>`;
              doc = new DOMParser().parseFromString(oDom, "text/xml");
            }

            return (
            <SwiperSlide onClick={navigate.bind(this, `/view/${e.uid}`)} key={`arr_${e.uid}`}>
              <div className="w-full h-full relative cursor-pointer">

                <img src={e.splash_image} alt="cover" className="object-cover absolute top-0 left-0 bottom-0 right-0" />
                
                <div className="bg-gradient-to-b from-transparent to-gray-600 absolute left-0 bottom-0 text-left p-5 w-full">
                  <h2 className="text-6xl font-extrabold text-white">{e.title}</h2>
                  <h3 className="text-3xl text-white">{doc && doc.firstChild.firstChild.innerHTML}</h3>
                </div>
              </div>
            </SwiperSlide>
            )
            
          }
          )
        }
        
      </Swiper>
    </div>
  );
}
