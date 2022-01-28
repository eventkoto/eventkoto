import { useState } from "react";

import SidebarAdmin from "../Sidebar/sidebaradmin";
import { FormInput } from "../../../components/Forms/FormInput";
import { FormTextArea } from "../../../components/Forms/FormTextArea";
import { FormDate } from "../../../components/Forms/FormDate";
import { FormFilePick } from "../../../components/Forms/FormFilepick";
import { FormTime } from "../../../components/Forms/FormTime";
import { FormCheckbox } from "../../../components/Forms/FormCheckBox";
import { FormFilePickMultiple } from "../../../components/Forms/FormFilepickmultiple";
import { FireAuth } from "../../../libs/firebase/auth";
import { FireDBRawEvents, FireDBQueryEvents } from "../../../libs/firebase/db_events";
import { FormTextAreaMinimal } from "../../../components/Forms/FormTextAreaMinimal";
import { useNavigate, useParams } from "react-router-dom";
import { CompLoading } from "../../../components/Loading";
import { categories } from "../../../libs/list_categories";
import { CompSidebar } from "../../../components/SideBar";

const InsightsEvent = () => {

  let params = useParams()

  const [loading, setLoading] = useState(true)
  const [acct, setAcct] = useState(true)
  const [doc, setDoc] = useState(true)

  // Related To Form Management
  
  async function loadData() {
    
    let _acct = await FireAuth.getUser();
    let _doc = await FireDBQueryEvents.getOne(params.id, false, true, true, true)

    setAcct(_acct)
    setDoc(_doc)
   
    setLoading(false)
  }

  useState(() => {
    loadData();
  }, []);

  return (
    <div className="createevent">
      <CompSidebar />
      <div className="event-main">
        <div className="titleadmin">EVENT INSIGHTS</div>

        <CompLoading enabled={loading} />

        {
          console.log(doc)
        }
        {
          !loading &&
          <div className="w-10/12 mx-auto pb-28">
            <div className="mb-12">
              <h1 className="text-4xl border-b w-fit border-b-black pb-2 mb-3">Event Information</h1>
              
              <p className="text-xl my-3">Title : <b>{doc.title}</b></p>
              <p className="text-xl my-3">Organization : <b>{doc.organization}</b></p>
              <p className="text-xl my-3">Overview : <div dangerouslySetInnerHTML={{ __html: doc.overview }} /></p>
            </div>
            <div className="mb-12">
              <h1 className="text-4xl border-b w-fit border-b-black pb-2 mb-3">Engagement (Summary)</h1>
              
              <h3 className="text-xl my-3">Interested People : <b>{doc.interested_count}</b></h3>
              <h3 className="text-xl my-3">Attended People : <b>{doc.attendance_count}</b></h3>
              <h3 className="text-xl my-3">Average Ratings : <b>{doc.ratings}/5</b></h3>
              <h3 className="text-xl my-3">Conversion Rate : <b>{Math.floor(doc.attendance_count / doc.interested_count * 100 * 100 )/ 100} %</b></h3>
            </div>
            <div className="mb-12">
              <h1 className="text-4xl border-b w-fit border-b-black pb-2 mb-3">Engagement (Details)</h1>
              
              <h3 className="text-xl my-3">People Interested</h3>
              {
                doc.interested.map((e,i) => <div key={`int_${i}`} className="ml-3 p-3 border-l border-l-blue-500 pl-4">{e.user_name} ({e.user_snap.organization})</div>)
              }
              
              <h3 className="text-xl my-3">People Attended</h3>
              {
                doc.attendance.map((e,i) => <div key={`int_${i}`} className="ml-3 p-3 border-l border-l-blue-500 pl-4">{e.user_name} ({e.user_snap.organization})</div>)
              }
              
              <h3 className="text-xl my-3">People Ratings</h3>
              {
                doc.ratings_list.map((e,i) => <div key={`int_${i}`} className="ml-3 p-3 border-l border-l-blue-500 pl-4">{e.user_name} ({e.user_snap.organization}) - <b>{e.ratings}</b> Stars</div>)
              }
            </div>
            
          </div> 
        }

      </div>
    </div>
  );
};

export default InsightsEvent;
