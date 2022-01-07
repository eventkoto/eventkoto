import { NavLink } from "react-router-dom";

const Detailbox = () => {
    return ( 
        <div className="clndrRight">
            <div className="event_box">
                <div className="img_box">
                    
                </div>
                <div className="info_links">
                <div className="hrline">
                <NavLink to="/calendar/upcoming" className="infolink"> Overview </NavLink>
                <NavLink to="/calendar/finished" className="infolink"> Details </NavLink>
                <NavLink to="/calendar/finished" className="infolink"> Schedule </NavLink>
            </div>
                <div className="detail_box"> hahahaha</div>
                    </div>
                    </div>
                
            </div>
     );
}
 
export default Detailbox;