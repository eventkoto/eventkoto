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

const CreateEvent = () => {

  let navigate = useNavigate()
  let params = useParams()

  const [loading, setLoading] = useState(true)

  // Related To Form Management
  
  
  let formTemplate = {
    title: "",
    overview: "",
    schedules_start: "",
    schedules_end: "",
    detail: "",
    splash_image: {},
    event_images: [],
  }

  let [imHolder, setImHolder] = useState({
    splash : "",
    extra: []
  })

  for (const [k, ] of Object.entries(categories)) {
    formTemplate[`cat_${k}`] = false
  }

  const [ form, setForm ] = useState({})

  const setValue = (what) => (e) => setForm({...form, [what]: e})

  // Related to Page Publishing
  async function publishPage(publish = false){
    let cats = Object.keys(categories).filter(e => form[`cat_${e}`])
    //console.log(cats)
    let dat = FireDBRawEvents.data.eventTemplate(
      prof.uid, form.title, prof.organization, form.overview, [new Date(form.schedules_start), new Date(form.schedules_end)], form.detail, cats, form.splash_image, form.event_images, publish
    )
    console.log(form)
    console.log(dat)

    setLoading(true)
    setTimeout(async () => {
      try{
        await FireDBRawEvents.update(params.id, dat)
        console.log(dat)
        navigate("/admin")
      }catch(e){
        console.log(e)
      }
    }, 10)
    
  }

  // Related to Account Fetching
  const [prof, setProf] = useState({});

  async function loadData() {
    
    let data = await FireAuth.getUser();
    let doc = await FireDBQueryEvents.getOne(params.id)
    console.log(doc);
    let nForm = {
      title: doc.title || "",
      overview: doc.overview || "",
      detail: doc.details || "",
    }

    if (doc.schedules && doc.schedules[0]){
      nForm.schedules_start = new Date(Number(`${doc.schedules[0].seconds}000`)).toISOString().substring(0,16)
    }

    if (doc.schedules && doc.schedules[1]){
      nForm.schedules_end = new Date(Number(`${doc.schedules[1].seconds}000`)).toISOString().substring(0,16)
    }

    let fT = JSON.parse(JSON.stringify(formTemplate))

    for (const [k, ] of Object.entries(categories)) {
      fT[`cat_${k}`] = doc.categories ? doc.categories.indexOf(k) > -1 : false
    }
    
    console.log({...fT, ...nForm})
    let s = {
      "creator_id": "iEzWQ9nMt0UiFbRjJmiOokCLN4O2",
      "title": "A Talk About Robots",
      "splash_image": "https://firebasestorage.googleapis.com/v0/b/eventkotoweb.appspot.com/o/events%2F793d1d07_2de6_4a69_a3ad_a330903f53ab_b8f2211dcace4b36d871bd76f73b2c59.jpg?alt=media&token=60e45cb4-b7fa-4a34-ab44-48eda7b98e7e",
      "published": true,
      "categories": [
          "other"
      ],
      "overview": "<p>A Piercing Light Though A Hazy Topic</p>",
      "event_date": {
          "seconds": 1641772800,
          "nanoseconds": 0
      },
      "created_at": 1641816488144,
      "organization": "Neutral",
      "schedules": [
          {
              "seconds": 1641816420,
              "nanoseconds": 0
          },
          {
              "seconds": 1641787620,
              "nanoseconds": 0
          }
      ],
      "details": "<h1>The Future Is Here!</h1><p><br></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu ex nec dolor gravida elementum sed at tellus. Proin in quam ut nunc lacinia luctus at ac purus. Phasellus sollicitudin viverra enim. Nullam ultricies eleifend mi, a fermentum mauris mollis ut. Etiam id pulvinar eros. Aenean sed mi in nisi rhoncus tincidunt vitae a ligula. Phasellus sed dolor malesuada, sagittis ex in, mollis nisl. Aenean luctus sapien nisl. Aenean a imperdiet sem.</p><p><br></p><p>Etiam blandit tincidunt mauris tincidunt rutrum. Nunc consequat orci felis, ut eleifend est aliquet sit amet. Nam neque lorem, bibendum in purus et, vehicula laoreet nisl. Maecenas eu dapibus massa. Duis gravida nec odio eu interdum. Integer nec augue a nulla laoreet scelerisque sodales ut purus. Aliquam erat volutpat. Donec convallis finibus nisl, nec tempor neque facilisis non. Sed sed pellentesque odio. Fusce sed mauris mollis, consectetur orci et, viverra lectus. Donec leo neque, laoreet sed sollicitudin ac, congue non tellus. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In eu feugiat mauris, sed consectetur nisi. Aliquam erat volutpat.</p>",
      "creator": "iEzWQ9nMt0UiFbRjJmiOokCLN4O2",
      "event_images": [
          "https://firebasestorage.googleapis.com/v0/b/eventkotoweb.appspot.com/o/events%2Fad257c86_25d9_4789_9438_0e2f47099d20_Healthcare-Nanotechnology.jpg?alt=media&token=7a44e429-dc87-43f0-8c6c-c85059f045b6",
          "https://firebasestorage.googleapis.com/v0/b/eventkotoweb.appspot.com/o/events%2F8f862a80_186f_4c8b_b82d_6951e74f0410_NanBubble-57a2b9e23df78c3276770cea.jpg?alt=media&token=55e98a34-48be-43e3-aa33-66d2dea41392"
      ],
      "uid": "5INezgt2Ms4p6TD3ehAj"
    }

    setImHolder({
      splash: doc.splash_image,
      extra: doc.event_images,

    })
    setForm({...fT, ...nForm});
    setProf(data)
    setLoading(false)
  }

  useState(() => {
    loadData();
  }, []);

  return (
    <div className="createevent">
      <CompSidebar />
      <div className="event-main">
        <div className="titleadmin">EDIT EVENT</div>

        <CompLoading enabled={loading} />

        {
          form.title &&
          
          <div className="flex w-full h-max pr-8">

            <div className="w-2/3 p-3">
              
              <FormInput big title="Title" value={form.title} setValue={setValue("title")} placeholder="Dawn of the New Future"/>
              <br/>

              <FormFilePick holderImage={imHolder.splash} title="Cover Photo" setValue={setValue("splash_image")}/>
              <br/>

              <FormTextAreaMinimal title="Overview" value={form.overview} setValue={setValue("overview")} placeholder="This first line of text here will be used as catch phrase on Thumbnail Displays"/>
              <br/>
              
              <FormTextArea title="Details" value={form.detail} setValue={setValue("detail")} placeholder="Tell us about your event. How could we attend it? What should we expect?"/>
              <br/>

              <FormFilePickMultiple holderImg={imHolder.extra} title="Extra Photos" setValue={setValue("event_images")}/>
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
                    <button className="p-3 bg-red-200 text-black m-1" onClick={publishPage.bind(this, false)}>Save As Draft</button>
                    <button className="p-3 bg-red-600 text-white m-1" onClick={publishPage.bind(this, true)}>Publish</button>
                </div>
              </div>
              
              
                

            </div>

          </div>
        }

      </div>
    </div>
  );
};

export default CreateEvent;
