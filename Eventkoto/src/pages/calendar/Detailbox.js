import { NavLink } from "react-router-dom";
import { useState, useRef } from 'react'
const Detailbox = () => {
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

    return ( 
        <div className="clndrRight">
            <div className="event_box">
                <div className="img_box">
                  hahahah  
                </div>
                <div className="info_links">
                <div className="hrline">
                <button className="infolink" onClick={toggledetail1}> Overview </button>
                <button className="infolink" onClick={toggledetail2}> Details </button>
                <button className="infolink" onClick={toggledetail3}> Schedule </button>
            </div>
                <div className="detail_box">
                    {detail_overview && (
                         <div className="detail_overview"> <p>
                         Overview Here
                         </p></div>
                    )}
                    {detail_details && (
                         <div className="detail_details"> <p>
                         Conference Link and Other Details Here
                         </p></div>
                    )}
                    {detail_schedule && (
                         <div className="detail_schedule"> <p>
                         Schedule here
                         </p></div>
                    )}
        

                </div>
                    </div>
                    </div>
                
            </div>
     );
}
 
export default Detailbox;