import { Link } from "react-router-dom";
import { parseDate } from "../../libs/parseDate";


const Finished = ({ events, setData }) => {
    return ( 
        <div className="clndrLeft">
            {
                events.length > 0 ?
                events.map((e,i) => 
                    <div onClick={setData.bind(this, e.uid)} key={`up_${i}`} className="flex bg-white transform h-48 scale-90 rounded-xl overflow-hidden hover:scale-95 border hover:border-red-600 transition-all cursor-pointer shadow-lg">
                        <div className="flex-1 bg-blue-500 h-full">
                            <img src={e.splash_image} alt="splash" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-3/4 p-5">
                            <h2 className="text-3xl">{e.title}</h2>
                            <p className="text-red-600">by {e.organization}</p>
                            <div className="details">{e.event_date ? parseDate(Number(`${e.event_date.seconds}000`)) : "No Provided Schedule"}</div>
                        </div>
                    </div>
                )
                :
                <div className="text-center mt-5 ">No Finished Events Yet</div>
            }
        </div>
     );
}
 
export default Finished