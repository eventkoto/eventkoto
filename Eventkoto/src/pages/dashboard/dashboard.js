import Sidebar from "./sidebar";
import DashboardMain from "./dashboard-main";
import Dashboard_tiles from "./dashboard-tiles";
import '../../styles/index.css'
import Dropdown from "./dropdown";


const Dashboard = () => {
    return ( 
        <div className="dashboard">
        <Sidebar />
 
        <div className="dashboard-main">
        <Dropdown />
            <DashboardMain />
            <Dashboard_tiles />
            <Dashboard_tiles />
            <Dashboard_tiles />
            <Dashboard_tiles />

        </div>
        </div>

     );
}
 
export default Dashboard;