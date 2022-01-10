import '../../../styles/dropdown.css'

const SelectEvent = () => {

    return ( 
        <div className="selectevent">
            <select class="select_edit">
                    <option disable selected>Select Event</option>
                    <option value="honda"> Horror</option>
                    <option value="honda"> Yaoi</option>
            </select>
        </div>
     );
}
 
export default SelectEvent;