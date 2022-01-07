import Sidebar from "../dashboard/sidebar";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Upcoming from "./eventlist";
import Detailbox from "./Detailbox"

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


    return ( 
        <div className="calendar">
            <Sidebar />
            <div className="dashboard-main">
            <div className="title">CALENDAR OF EVENTS</div>
            <div className="hrline"><ColoredLine color="#262626" /></div>
            <div className="hrline">
                <NavLink to="/calendar/upcoming" className="calendarlink"> Upcoming </NavLink>
                <NavLink to="/calendar/finished" className="calendarlink"> Finished </NavLink>
            </div>
            <div className="calendarevents">
                <Upcoming />
                <Detailbox />
                
            </div>
            
        </div>
       
        </div>
     );
}
 
export default Calendar