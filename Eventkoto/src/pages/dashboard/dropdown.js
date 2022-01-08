import '../../styles/dropdown.css'

const Dropdown = () => {

    return ( 
        <div className="dropdown">
            <select class="select">
                    <option disable selected>Filter List</option>
                    <option value="honda"> Horror</option>
                    <option value="honda"> Yaoi</option>
            </select>
        </div>
     );
}
 
export default Dropdown;