import Sidebar from "./sidebar";
import DashboardMain from "./dashboard-main";
import DashboardTiles from "./dashboard-tiles";
import { useState } from "react";
import { CompLoading } from "../../components/Loading";
import { categories } from "../../libs/list_categories";
import { CompSidebar } from "../../components/SideBar";

const Dashboard = () => {

    
  const [loading, setLoading] = useState(true)

  return (
    <div className="dashboard">
      <CompSidebar />
        
      <CompLoading enabled={loading} />
      <div className="dashboard-main">
        <DashboardMain triggerDone={setLoading.bind(this, false)} />
        <DashboardTiles name="Recently Released" />
        {
            Object.keys(categories).map((e,i) => {
                return(<DashboardTiles key={`tiles_${i}`} name={`Latest in ${categories[e]}`} category={e}/>)
            })
        }
      </div>
    </div>
  );
};

export default Dashboard;
