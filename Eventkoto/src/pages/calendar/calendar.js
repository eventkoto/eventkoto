import Sidebar from "../dashboard/sidebar";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Upcoming from "./eventlist-upcoming";
import Detailbox from "./Detailbox"
import { useState, useRef } from 'react'
import Finished from "./eventlist-finished";


const Calendar = () => {
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 2,
            }}
        />
    );

    const [switchpages, setswitchpages] = useState(true)

    const togglePages = () => {
        setswitchpages(true)
    }

    const togglePagetwo = () => {
        setswitchpages(false)
    }


    return ( 
        <div className="calendar">
            <Sidebar />
            <div className="dashboard-main">
            <div className="title">EVENT DETAILS</div>
            <div className="hrline"><ColoredLine color="#262626" /></div>
            <div className="hrline">
                <button className="calendarlink" onClick={togglePages}> Upcoming </button>
                <button className="calendarlink" onClick={togglePagetwo}> Finished </button>
            </div>
            <div className="calendarevents">
                {switchpages ? <Upcoming /> :  <Finished />}
            <Detailbox/>
            </div>
            
        </div>
       
        </div>
     );
}
 
export default Calendar