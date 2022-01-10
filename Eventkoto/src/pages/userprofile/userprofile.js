
import '../../styles/index.css'
import Sidebar from '../dashboard/sidebar';
import '../../styles/userprofile.css'
import { useState } from 'react';


const UserProfile = () => {
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
        <div className="dashboard">
        <Sidebar />
 
        <div className="dashboard-main">
        <div className="title">USER PROFILE</div>
        <div className="hrline"><ColoredLine color="#262626" /></div>
        <div className="userprofile"> 
        <div className="userdetails">
            <h2>Name here</h2>
            <p>E-mail here</p>
            <p>Program Here</p>
            <p>Organization Here</p>
        </div>
        <div className="detail_display">
            <div className="row1">
            <p>Name</p>
            <input
              className="inputText"
              placeholder="Name"
              type="text"
              required
            />

            <p>E-mail</p>
            <input
            className="inputText"
            placeholder="E-mail"
            type="text"
            required
            />
            </div>
            
            <div className="row2">
            <p>Program</p>
            <input
            className="inputText"
            placeholder="Program"
            type="text"
            required
            />
        
            <p>Organization</p>
            <input
            className="inputText"
            placeholder="Organization"
            type="text"
            required
            />
            </div>

            <div className="row3">
            <p>Student ID</p>
            <input
            className="inputText"
            placeholder="Student ID"
            type="text"
            required
            />
            </div>
        </div>
        
        <div className="button_display">
        { Edit ? 
        <button className="detail_button" onClick={toggleEdit}>Edit Details</button> :         
        <button className="detail_button" onClick={toggleEdit}>Save Details</button>
       }
        </div>
        </div>
        </div>
        </div>
     );
}
 
export default UserProfile;