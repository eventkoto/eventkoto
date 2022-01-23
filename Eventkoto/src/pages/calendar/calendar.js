import { useState } from "react";
import { CompLoading } from "../../components/Loading";
import { CompSidebar } from "../../components/SideBar";
import { FireAuth } from "../../libs/firebase/auth";
import { FireDBQueryEvents } from "../../libs/firebase/db_events";
import { FireDBInterested } from "../../libs/firebase/db_interested";
import AdminDetailbox from "../Org Acc/Event list/Detailbox";
import Detailbox from "./Detailbox";
import Finished from "./eventlist-finished";
import Upcoming from "./eventlist-upcoming";

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

    let rawRatingsList = await FireDBInterested.query(auth.uid, "user");
    const ratingsList = [];
    rawRatingsList.forEach((doc) => {
      ratingsList.push({ ...doc.data().event_snap, uid: doc.data().event_id });
    });

    setLoading(false);
    setEve(ratingsList);
  }

  useState(() => {
    loadData();
  }, []);

  const [hasData, setHadData] = useState(false);

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
            {switchpages ? (
              <Upcoming
                setData={setHadData}
                events={eve.filter((e) => {
                  return e.event_date !== undefined
                    ? new Date(Number(`${e.event_date.seconds}000`)) >
                        Date.now()
                    : true;
                })}
              />
            ) : (
              <Finished
                setData={setHadData}
                events={eve.filter((e) => {
                  return e.event_date !== undefined
                    ? new Date(Number(`${e.event_date.seconds}000`)) <
                        Date.now()
                    : true;
                })}
              />
            )}
          </div>
          <div className={`transition-all ${hasData ? "w-1/3" : "w-0"}`}>
            <Detailbox id={hasData} requestListUpdate={loadData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventlist;
