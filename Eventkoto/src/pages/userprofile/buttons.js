import { useState } from "react";

const toggleEdit = () => {
    setEdit(!Edit)
}
const EditButtons = () => {
    return ( 
        <button className="detail_button" onClick={toggleEdit}>HAHA Details</button>
     );
}
 
export default EditButtons;