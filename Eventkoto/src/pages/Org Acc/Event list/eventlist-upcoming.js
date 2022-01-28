import { parseDate } from "../../../libs/parseDate";


const Upcoming = ({events, setData}) => {
    return ( 
        <div className="clndrLeft">
            {
                events.length > 0 ?
                events.map((e,i) => 
                    <div onClick={setData.bind(this, e.uid)} key={`up_${i}`}  className="flex bg-white transform h-64 scale-90 rounded-xl overflow-hidden hover:scale-95 border hover:border-red-600 transition-all cursor-pointer">
                        <div className="flex-1 bg-blue-500">
                            <img src={e.splash_image} alt="splash" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-3/4 p-5 h-fit">
                            <p className="font-bold">{e.published ? "Published" : "Draft"}</p>
                            <h2 className="text-3xl">{e.title}</h2>
                            <p className="text-red-600">by {e.organization}</p>
                            <div className="flex">
                                {e.schedules && e.schedules[0] && <div className="details flex-1">Starts on: {e.schedules ? parseDate(Number(`${e.schedules[0].seconds}000`)) : "No Provided Schedule"}</div>}
                                {e.schedules && e.schedules[1] && <div className="details flex-1">Ends at: {e.schedules ? parseDate(Number(`${e.schedules[1].seconds}000`)) : "No Provided Schedule"}</div>}
                            </div>
                            
                            
                        </div>
                    </div>
                )
                :
                <div className="text-center mt-5 ">No Upcominng Events</div>
            }
        </div>
     );
}
 
export default Upcoming