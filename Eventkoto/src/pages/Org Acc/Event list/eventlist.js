import SidebarAdmin from "../Sidebar/sidebaradmin";
import AdminDetailbox from "./Detailbox";
import Upcoming from "../../calendar/eventlist-upcoming";
import Finished from "../../calendar/eventlist-finished";
import { useState } from "react";


import '../../../styles/admin.css'

const Eventlist = () => {

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
       <div className="createevent">
            <SidebarAdmin /> 
        <div className="event-main">
            <div className="titleadmin">EVENT DETAILS</div>
            <div className="hrline"><ColoredLine color="#262626" /></div>
            <div className="hrline">
                <button className="calendarlink" onClick={togglePages}> Upcoming </button>
                <button className="calendarlink" onClick={togglePagetwo}> Finished </button>
            </div>
            <div className="calendarevents">
                {switchpages ? <Upcoming /> :  <Finished />}
            <AdminDetailbox/>
            </div>
</div></div>
    );

}
 
export default Eventlist;