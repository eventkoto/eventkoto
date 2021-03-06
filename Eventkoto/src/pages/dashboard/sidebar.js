import {
  BiSearch,
  BiMenu,
  BiCalendar,
  BiLogOut
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
import { FireAuth } from "../../libs/firebase/auth";

const Sidebar = () => {
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
            {/*
            <BiSearch className="icon-search" style={style} onClick={handleToggle}/>
            <li> <input type="text" placeholder="Search..." />
            </li>
            */}
            <li><NavLink to="/dashboard" className="links"> <BsGrid className="icon"/><span className="links-name"> Dashboard</span></NavLink>

            </li>
            <li><NavLink to="/calendar" className="links"> <BsCalendar className="icon"/><span className="links-name"> Calendar</span></NavLink>

            </li>
            <li><NavLink to="/userprofile" className="links"> <AiOutlineUser className="icon"/><span className="links-name"> Profile</span></NavLink>

            </li>
            {/* EXTRA BUTTON FOR NAVIGAATION BETWEEN USER AND ORGANIZATION ACCOUNTS */}
            <li><NavLink to="/admin" className="links"> <AiOutlineUser className="icon"/><span className="links-name"> To admin</span></NavLink>

            </li>
            <li>
            <NavLink to="/" onClick={logOut} className="links"> <BiLogOut className="icon"/><span className="links-name"> Log out</span></NavLink>
  
         
            </li>
          </ul>
          <div className="profile_content">
       
          </div>
        </div>
      </div>
     );

 
     
}

 

export default Sidebar;