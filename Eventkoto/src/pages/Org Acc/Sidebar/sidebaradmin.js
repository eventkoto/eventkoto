import {
  BiMenu,
  BiLogOut,
  BiAddToQueue,
  BiEdit,
  BiListUl
} from "react-icons/bi";
import {
  TiLocationArrow
} from "react-icons/ti"
import { NavLink } from "react-router-dom"
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
            <li><NavLink to="/addevent" className="links"> <BiAddToQueue className="icon"/><span className="links-name"> Add Event</span></NavLink>
            </li>
            <li><NavLink to="/admin" className="links"> <BiListUl className="icon"/><span className="links-name"> Event List</span></NavLink>
            </li>
            <li>

              {/* EXTRA BUTTON FOR NAVIGATION BETWEEN USER AND ORGANIZATION ACCOUNT */}

            <li><NavLink to="/dashboard" className="links"> <BiAddToQueue className="icon"/><span className="links-name"> Go back</span></NavLink>
            </li>
               {/*  */}
               
            <NavLink to="/" onClick={logOut} className="links"> <BiLogOut className="icon"/><span className="links-name"> Log out</span></NavLink>
            </li>
          </ul>
          </div>
        </div>
     );

 
     
}

 

export default SidebarAdmin;