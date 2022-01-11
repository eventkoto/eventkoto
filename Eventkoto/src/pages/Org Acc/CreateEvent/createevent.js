import { useEffect, useState } from "react";

import SidebarAdmin from "../Sidebar/sidebaradmin";
import "../../../styles/admin.css";
import { FormInput } from "../../../components/Forms/FormInput";
import { FormTextArea } from "../../../components/Forms/FormTextArea";
import { FormDate } from "../../../components/Forms/FormDate";
import { FormFilePick } from "../../../components/Forms/FormFilepick";
import { FormTime } from "../../../components/Forms/FormTime";
import { FormCheckbox } from "../../../components/Forms/FormCheckBox";
import { FormFilePickMultiple } from "../../../components/Forms/FormFilepickmultiple";
import { FireAuth } from "../../../libs/firebase/auth";
import { FireDBRawEvents } from "../../../libs/firebase/db_events";
import { FormTextAreaMinimal } from "../../../components/Forms/FormTextAreaMinimal";
import { useNavigate } from "react-router-dom";
import { CompLoading } from "../../../components/Loading";
import { categories } from "../../../libs/list_categories";
import { CompSidebar } from "../../../components/SideBar";

const CreateEvent = () => {

  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // Related To Form Management
  let formTemplate = {
    title: "",
    overview: "",
    schedules_start: "",
    schedules_end: "",
    detail: "",
    categories: "",
    splash_image: {},
    event_images: [],
  }

  for (const [k, ] of Object.entries(categories)) {
    formTemplate[`cat_${k}`] = false
  }

  const [ form, setForm ] = useState(formTemplate)

  const setValue = (what) => (e) => setForm({...form, [what]: e})

  // Related to Page Publishing
  async function publishPage(publish = false){
    let cats = Object.keys(categories).filter(e => form[`cat_${e}`])
    //console.log(cats)
    let dat = FireDBRawEvents.data.eventTemplate(
      prof.uid, form.title, prof.organization, form.overview, [new Date(form.schedules_start), new Date(form.schedules_end)], form.detail, cats, form.splash_image, form.event_images, publish
    )
    setLoading(true)
    //console.log(dat)
    setTimeout(async () => {
      try{
        if ((await FireDBRawEvents.create(dat))){
          console.log(dat)
          navigate("/admin")
        }
        else{
          console.log("Error")
          setLoading(false)
        }
      }catch(e){
        console.log(e)
      }
    }, 10)
    
  }

  // Related to Account Fetching
  const [prof, setProf] = useState({});

  async function loadData() {
    let data = await FireAuth.getUser();
    //console.log(data);
    setProf(data);
  }

  useState(() => {
    loadData();
  }, []);

  return (
    <div className="createevent">
      <CompSidebar />
      <div className="event-main">
        <div className="titleadmin">ADD EVENT</div>

        <CompLoading enabled={loading} />
        

        <div className="flex w-full h-max pr-8">

            <div className="w-2/3 p-3">
              
              <FormInput big title="Title" value={form.title} setValue={setValue("title")} placeholder="Dawn of the New Future"/>
              <br/>

              <FormFilePick title="Cover Photo" setValue={setValue("splash_image")}/>
              <br/>

              <FormTextAreaMinimal title="Overview" value={form.overview} setValue={setValue("overview")} placeholder="This first line of text here will be used as catch phrase on Thumbnail Displays"/>
              <br/>
              
              <FormTextArea title="Details" value={form.detail} setValue={setValue("detail")} placeholder="Tell us about your event. How could we attend it? What should we expect?"/>
              <br/>

              <FormFilePickMultiple title="Extra Photos" setValue={setValue("event_images")}/>
              <br/>

            </div>
            <div className="flex-1 p-3 relative">

              <div className="sticky top-12 pr-6 min-h-[80vh]">
                <h3>Category</h3>
                <div className="flex flex-wrap">
                  {
                    Object.keys(categories).map((e,i) =>
                      <div className="w-1/2">
                        <FormCheckbox title={categories[e]} value={form[`cat_${e}`]} setValue={setValue(`cat_${e}`)} />
                      </div>
                    )
                  }
                </div>
                <br/>

                <h3>Dates</h3>
                <div className="flex flex-col">
                  <FormTime title="Event Start" value={form.schedules_start} setValue={setValue("schedules_start")}/>
                  <FormTime title="Event End" value={form.schedules_end} setValue={setValue("schedules_end")}/>
                </div>

                <div className="w-full flex justify-end">
                    <button className="p-3 bg-red-200 text-black m-1" onClick={publishPage.bind(this, false)}>Save</button>
                    <button className="p-3 bg-red-600 text-white m-1" onClick={publishPage.bind(this, true)}>Publish</button>
                </div>
              </div>
              
              
                

            </div>

          </div>

      </div>
    </div>
  );
};

export default CreateEvent;
