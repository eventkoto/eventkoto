import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FireDBQueryEvents } from "../../libs/firebase/db_events";
import Sidebar from "../dashboard/sidebar";
import {parseDate} from "../../libs/parseDate"
import { CompLoading } from "../../components/Loading";
import { FireEventInteraction } from "../../libs/firebase/event_interact";
import { FireAuth } from "../../libs/firebase/auth";
import { CompSidebar } from "../../components/SideBar";

export function ViewEvent() {
  
  let params = useParams()

  const [acct, setAcct] = useState({})
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  const [inte, setInt] = useState(false)
  const [attn, setAttn] = useState(false)
  const [rat, setRat] = useState(0)

  async function firstFetch(){
    

  }
  
  async function fetchData() {
    
    let acct = await FireAuth.getUser()
    let doc = await FireDBQueryEvents.getOne(params.id, false, true, true, true)
    //console.log(doc)
    //console.log(doc)
    setData(doc)
    setAcct(acct)

    //console.log(await FireEventInteraction.check("Interesteds", {user_id : acct.uid, event_id : doc.uid}))

    setInt(await FireEventInteraction.check("Interesteds", {user_id : acct.uid, event_id : doc.uid}))
    setAttn(await FireEventInteraction.check("Attendance", {user_id : acct.uid, event_id : doc.uid}))
    setRat(await FireEventInteraction.check("Ratings", {user_id : acct.uid, event_id : doc.uid}))

    setLoading(false)
  }

  useEffect(() => {
    firstFetch()
    fetchData()
  }, [])

  async function setAction(act){
    switch(act){
      case "int":
        setLoading(true)
        //console.log(acct, data)
        await FireEventInteraction.toggleInterested(FireEventInteraction.data.interested(acct.uid, acct, acct.name, data.uid, data, data.title))
        fetchData()
        break;
      case "atn":
        setLoading(true)
        //console.log(acct, data)
        await FireEventInteraction.toggleAttendance(FireEventInteraction.data.attendance(acct.uid, acct, acct.name, data.uid, data, data.title))
        fetchData()
        break;
      default:
        act = act.split("_")[1]
        await FireEventInteraction.rate(FireEventInteraction.data.rating(acct.uid, acct, acct.name, data.uid, data, data.title, act))
        setLoading(true)
        fetchData()
        break;
    }
  }

  return (
    <div className="dashboard">
      <CompSidebar />
      <CompLoading enabled={loading} />
      {
        data.title &&
        <div className="dashboard-main w-full">
          
          <div className="w-10/12 mx-auto bg-white px-2">

            <img src={data.splash_image} className="w-full h-[50vh] object-cover" alt="splash" />

            <div className="flex mt-4">
              <div className="flex-1 text-red-500 text-3xl text-center">
                <p className="">♥ {data.interested_count}</p>
                
              </div>
              <div className="flex-1 text-red-500 text-xl text-center">
                <p className="">{ data.ratings > 0 ? [...new Array(Math.ceil(data.ratings))].map((e => "⭐")) : "--No Ratings Yet--" }</p>
                
              </div>
              <div className="flex-1 text-red-500 text-3xl text-center">
                <p className="">✋ {data.attendance_count}</p>
                
              </div>
              
            </div>
            <h1 className="text-6xl font-bold mt-5 text-center">{data.title}</h1>
            <h2 className="text-2xl text-red-600 text-center">by {data.organization}</h2>
            
            
            <div className="flex my-4">
              <div className="flex-1 text-center">
                <button onClick={setAction.bind(this, "int")} className="p-2 bg-blue-500 text-white rounded-lg mr-2">{inte ? "Interested" : "Not Interested"}</button>
                <button onClick={setAction.bind(this, "atn")} className="p-2 bg-blue-500 text-white rounded-lg mr-2">{attn ? "Attended" : "Not Attended"}</button>
                <div className="m-2 border w-fit mx-auto">
                  <button onClick={setAction.bind(this, "s_1")} className="mr-2">⭐</button>
                  <button onClick={setAction.bind(this, "s_2")} className="mr-2">⭐</button>
                  <button onClick={setAction.bind(this, "s_3")} className="mr-2">⭐</button>
                  <button onClick={setAction.bind(this, "s_4")} className="mr-2">⭐</button>
                  <button onClick={setAction.bind(this, "s_5")} className="mr-2">⭐</button>
                </div>
                
              </div>
              <div className="flex-1 text-center"><strong>Starts On:</strong> {parseDate(Number(`${data.schedules[0].seconds}000`))}</div>
              { data.schedules[1] && <div className="flex-1 text-center"><strong>Ends On:</strong> {parseDate(Number(`${data.schedules[1].seconds}000`))}</div> }
            </div>
            
            <div className="ql-snow">
              <div
                className="ql-editor text-xl ml-0 pl-0 text-center"
                dangerouslySetInnerHTML={{ __html: data.overview }}
              ></div>

              <div className="border-b-2 border-red-900 my-4"></div>

              <div
                className="ql-editor text-xl ml-0 pl-0 mt-4"
                dangerouslySetInnerHTML={{ __html: data.details }}
              ></div>

              <div className="border-b-2 border-red-900 my-4"></div>
              
              <img src={data.splash_image} className="w-full p-5 object-cover" alt="splash" />
              <div className="flex flex-wrap justify-center">
                {
                  data.event_images && data.event_images.map((e,i) => 
                    <img key={`evim_${i}`} src={e} className="w-1/2 p-5" alt="splash" />
                  )
                }
              </div>
              
              
              <div className="pb-40"></div>


            </div>

          </div>
          
        </div>
      }
      
    </div>
  );
}
