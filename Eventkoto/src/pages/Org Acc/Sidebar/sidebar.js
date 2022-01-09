import {
  BiSearch,
  BiMenu,
  BiCalendar,
  BiLogOut,
  BiAddToQueue,
  BiEdit,
  BiListUl
} from "react-icons/bi";
import {
  TiLocationArrow
} from "react-icons/ti"
import {
  BsGrid,
  BsCalendar,
  BsUser
} from "react-icons/bs"
import {
  AiOutlineUser
} from "react-icons/ai"
import {NavLink, Link} from "react-router-dom"
import { useState } from "react";
import { FireAuth } from "../../../libs/firebase/auth";

const SidebarAdmin = () => {
    const style= {color: "white" }

    const [isActive, setisActive] = useState("false");
    const handleToggle = () => {
      setisActive(!isActive);
    };

    function logOut(){
      FireAuth.logoutUser()
    }

    
    
    return ( 
      <div className={isActive ? "sidebar": "sidebar active"}>
        <div className="logo-content">
          <div className="logo"><TiLocationArrow />
          <div className="logo-name">EVENTKOTO
          </div>  
          </div>
          <BiMenu className="btn" onClick={handleToggle}/>
          <ul className="nav-list">
            <li><NavLink to="/dashboard" className="links"> <BiAddToQueue className="icon"/><span className="links-name"> Add Event</span></NavLink>
            {/* <span className="tooltip">Dashboard</span> */}
            </li>
            <li><NavLink to="/calendar" className="links"> <BiEdit className="icon"/><span className="links-name"> Edit Event</span></NavLink>
            {/* <span className="tooltip">Dashboard</span> */}
            </li>
            <li><NavLink to="/userprofile" className="links"> <BiListUl className="icon"/><span className="links-name"> Event List</span></NavLink>
            {/* <span className="tooltip">Dashboard</span> */}
            </li>
            <li>
            <NavLink to="/" onClick={logOut} className="links"> <BiLogOut className="icon"/><span className="links-name"> Log out</span></NavLink>
            {/* <span className="tooltip">Dashboard</span> */}
         
            </li>
          </ul>
          <div className="profile_content">
       
          </div>
        </div>
      </div>
     );

 
     
}

 

export default SidebarAdmin;