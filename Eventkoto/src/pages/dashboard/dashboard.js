import Sidebar from "./sidebar";
import DashboardMain from "./dashboard-main";
import Dashboard_tiles from "./dashboard-tiles";
import '../../styles/index.css'
import Dropdown from "./dropdown";
import TileFiltered from "./dashboardTileFiltered";


const Dashboard = () => {
    const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

    return ( 
        <div className="dashboard">
        <Sidebar />
 
        <div className="dashboard-main">
        <Dropdown />
        <TileFiltered />
            {/* <DashboardMain />
            <Dashboard_tiles />
            <Dashboard_tiles />
            <Dashboard_tiles />
            <Dashboard_tiles /> */}

        </div>
        </div>

     );
}
 
export default Dashboard;