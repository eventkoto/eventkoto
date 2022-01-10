import SidebarAdmin from "../Sidebar/sidebaradmin";
import '../../../styles/admin.css'
import { useState } from "react";
import SelectEvent from "./SelectEvent";


const EditEvent = () => {
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 2,
            }}
        />
    );
        
    const [Edit, setEdit] = useState(true)

    const toggleEdit = () => {
        setEdit(!Edit)
    }

    return (  
        <div className="createevent">
            <SidebarAdmin /> 

        <div className="event-main">
            <div className="titleadmin">EDIT EVENT</div>
            <div className="hrline"><ColoredLine color="#262626" /></div>
            <div className="selectevent"><p>Select Event: </p><SelectEvent /></div>
            <div className="addevent"> 
            <div className="adddetails">
            <div className="column1">

            <p>Title:</p>
            <input
            className="inputText"
            placeholder="Name"
            type="text"
            required
            /> 

            <p>Date:</p>
            <input
            className="inputText"
            placeholder="Schedule"
            type="date"
            required
            /> 

            <p>Schedule:</p>
            <input
            className="inputTextShort"
            placeholder="Name"
            type="time"
            required
            /> 

            <input
            className="inputTextShort"
            placeholder="Name"
            type="time"
            required
            />

            <p>Conference Link:</p>
            <input
            className="inputText"
            placeholder="Name"
            type="text"
            required
            />

            <p>Category:</p>
            <select className="selectdetails">
                    <option disable selected>Select Category</option>
                    <option value="honda"> Horror</option>
                    <option value="honda"> Yaoi</option>
            </select>
            </div>

            <div className="column2">

            <p>Overview:</p>
            <textarea 
            className="inputText"
            name="Overview" 
            />

            <p>Other Details:</p>
            <textarea 
            className="inputText"
            name="Overview" 
            />
            </div>   
            </div>

            <div className="preview">

            <p>Banner Image:</p>
            <input
            className="inputFile"
            placeholder="Name"
            type="file"
            required
            />

            <p>Thumbnail Image:</p>
            <input
            className="inputFile"
            placeholder="Name"
            type="file"
            required
            />

            <p>PREVIEW:</p>
            <div className="previewbanner"> </div>
            <div className="previewthumb"></div>
            </div>
            </div>
            <div className="buttonevent">
            { Edit ? <button className="detail_button" onClick={toggleEdit}>Edit Event</button> 
            : <button className="detail_button"  onClick={toggleEdit}>Save Event</button> }
            </div>
           </div>
           </div>
    );
}
 
export default EditEvent