import SidebarAdmin from "../Sidebar/sidebaradmin";
import AdminDetailbox from "./Detailbox";
import { useState } from "react";

import { FireDBQueryEvents } from "../../../libs/firebase/db_events";
import { FireAuth } from "../../../libs/firebase/auth";
import { CompLoading } from "../../../components/Loading";
import Upcoming from "./eventlist-upcoming";
import Finished from "./eventlist-finished";
import { CompSidebar } from "../../../components/SideBar";

const Eventlist = () => {

  const [switchpages, setswitchpages] = useState(true);
  const [loading, setLoading] = useState(true);

  const togglePages = () => {
    setswitchpages(true);
  };

  const togglePagetwo = () => {
    setswitchpages(false);
  };

  const [eve, setEve] = useState([]);

  async function loadData() {
    let auth = await FireAuth.getUser(false, false, false);
    let data = await FireDBQueryEvents.getLatestByAuthor(auth.uid);
    setLoading(false)
    setEve(data);
  }

  useState(() => {
    loadData();
  }, []);

  const [ hasData, setHadData ] = useState(false)

  return (
    <div className="createevent">
      <CompSidebar />
      <CompLoading enabled={loading} />
      <div className="event-main">
        <div className="title mt-0">EVENT DETAILS</div>
        <div className="border-b-4 border-red-700"></div>
        <div className="hrline">
          <button className="calendarlink" onClick={togglePages}>
            {" "}
            Upcoming{" "}
          </button>
          <button className="calendarlink" onClick={togglePagetwo}>
            {" "}
            Finished{" "}
          </button>
        </div>
        <div className="flex mr-10">
          <div className="flex-1 transition-all">
            
            {switchpages ? 
            <Upcoming setData={setHadData} events={
              eve.filter(e => { return ((e.schedules && e.schedules[1]) !== undefined ? (new Date(Number(`${e.schedules[1].seconds}000`)) > Date.now()) : (e.schedules && e.schedules[0]) !== undefined ? (new Date(Number(`${e.schedules[0].seconds}000`)) > Date.now()) : true)})
            }/> 
            : 
            <Finished setData={setHadData} events={eve.filter(e => (e.schedules && e.schedules[1]) !== undefined ? (new Date(Number(`${e.schedules[1].seconds}000`)) < Date.now()) : (e.schedules && e.schedules[0]) !== undefined ? (new Date(Number(`${e.schedules[0].seconds}000`)) < Date.now()) : false)}/>
            }
          </div>
          <div className={`transition-all ${hasData ? "w-1/3" : "w-0"}`}>
            <AdminDetailbox id={hasData} requestListUpdate={loadData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventlist;
