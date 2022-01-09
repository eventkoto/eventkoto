import { NavLink } from "react-router-dom";
  import { useRef, useState } from "react";
  import '../../styles/index.css'

  // import Swiper
  import { Swiper, SwiperSlide } from "swiper/react";
  import "swiper/css";
  import "swiper/css/pagination"
  import "swiper/css/navigation"
  import '../../styles/modal.css'

  import SwiperCore, {
      Autoplay,Pagination,Navigation
    } from 'swiper';

  SwiperCore.use([Autoplay,Pagination,Navigation]);


  export default function List() {
    const [detail_overview, setdetail_overview] = useState(true)
    const [detail_details, setdetail_details] = useState(false)
    const [detail_schedule, setdetail_schedule] = useState(true)

    const toggledetail1 = () => {
        setdetail_overview(true)
        setdetail_schedule(false)
        setdetail_details(false)
    }

    const toggledetail2 = () => {
        setdetail_overview(false)
        setdetail_schedule(false)
        setdetail_details(true)
    }

    const toggledetail3 = () => {
        setdetail_overview(false)
        setdetail_schedule(true)
        setdetail_details(false)
    }
  
  
    const [overview, setoverview] = useState(true)
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
    setModal(!modal);
    };

    const toggleOverview =() => {
      setoverview(!overview)
    }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  
    return (
     
      <div className="list">
         {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <>
         <Swiper navigation={true} className="popup">
         <SwiperSlide>Slide 1</SwiperSlide>
         <SwiperSlide>Slide 1</SwiperSlide>
         </Swiper>
            <div className="detail_title">TITLE HERE</div>
            <div className="hrline">
            <button className="popuplink" onClick={toggledetail1}> Overview </button>
            <button className="popuplink" onClick={toggledetail2}> Details </button>
            <button className="popuplink" onClick={toggledetail3}> Schedule </button>
            </div>
            <div className="popup_box">
                    {detail_overview && (
                         <div className="popup_overview"> <p>
                         wat the hell
                         </p></div>
                    )}
                    {detail_details && (
                         <div className="popup_details"> <p>
                         wats the hell
                         </p></div>
                    )}
                    {detail_schedule && (
                         <div className="popup_schedule"> <p>
                         watz the hell
                         </p></div>
                    )}

                </div>
                    
            <div className="detail_btn">
            <button className="detail_button">Interested</button>
            <button className="detail_button">Attended</button></div>
    </>
        </div>
        </div>
      )};
        <span> Continue to watch</span>
        <Swiper slidesPerView="5" spaceBetween={15} navigation={true} className="mySwiper1">
        <SwiperSlide className="hoverslide" onClick={toggleModal}>
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