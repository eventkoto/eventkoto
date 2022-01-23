import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CompPopUp } from "../../components/PopUp";
import { FireDBQueryEvents, FireDBRawEvents } from "../../libs/firebase/db_events";
import { parseDate } from "../../libs/parseDate";

const Detailbox = ({ id, requestListUpdate = () => {} }) => {
  let [loading, setLoading] = useState(false);
  let [eData, setEData] = useState(false);
  let [tab, setTab] = useState(0);

  async function fetchData() {
    let data = await FireDBQueryEvents.getOne(id, true, true, true, true);
    //console.log(data);
    setEData(data);
    setLoading(Boolean(data.uid) && (data.uid === id))
  }

  useEffect(() => {
    if(id) fetchData(id);
    setLoading(Boolean(eData.uid) && (eData.uid === id))
  }, [id]);

  return (
    <div className="clndrRight sticky top-14">
      {(loading) ?
      eData && (
        <div className="flex flex-col h-[33rem] border bg-white shadow-lg rounded-xl overflow-hidden">

          <div className="flex-1 w-full h-1/5 bg-red-500">
            <img
              src={eData.splash_image}
              alt="splash"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="h-4/5 p-3">
            <h2 className="text-3xl">{eData.title}</h2>
            <h2 className="text-xl text-red-600">
              by {eData.creator.organization}
            </h2>
            <Link to={`/view/${eData.uid}`}>
                <button className="p-2 bg-red-700 text-white rounded-lg">View Original Post</button>
            </Link>
            <hr className="my-2" />
            <div className="flex">
              <div
                onClick={setTab.bind(this, 0)}
                className="flex-1 text-center text-sm cursor-pointer hover:text-red-500"
              >
                Overview
              </div>
              <div
                onClick={setTab.bind(this, 1)}
                className="flex-1 text-center text-sm cursor-pointer hover:text-red-500"
              >
                Details
              </div>
              <div
                onClick={setTab.bind(this, 2)}
                className="flex-1 text-center text-sm cursor-pointer hover:text-red-500"
              >
                Schedule
              </div>
            </div>
            <div className="p-2 h-full overflow-auto">
              {tab === 0 ? (
                <>
                  <div className="ql-snow">
                    <div
                      className="ql-editor"
                      dangerouslySetInnerHTML={{ __html: eData.overview }}
                    ></div>
                    <div className="mb-40"></div>
                  </div>
                </>
              ) : tab === 1 ? (
                <>
                  <div className="ql-snow">
                    <div
                      className="ql-editor"
                      dangerouslySetInnerHTML={{ __html: eData.details }}
                    ></div>
                    <div className="mb-40"></div>
                  </div>
                </>
              ) : tab === 2 ? (
                <>
                  <p className="font-bold">Event Starts on</p>
                  { eData.schedules && eData.schedules[0] && <p>{parseDate(Number(`${eData.schedules[0].seconds}000`))}</p> }

                  <br/>

                  <p className="font-bold">Event Ends on</p>
                  { eData.schedules && eData.schedules[1] && <p>{parseDate(Number(`${eData.schedules[1].seconds}000`))}</p> }
                </>
              ) : (
                <>
                </>
              )}
            </div>
          </div>
        </div>
      )
      :
      <div className="text-4xl w-full h-40 flex justify-center items-center">
        <div className="w-5 h-5 animate-spin bg-red-600"></div>
      </div>
      }
    </div>
  );
};

export default Detailbox;
