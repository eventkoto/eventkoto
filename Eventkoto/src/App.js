import { Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard"
import Calendar from "./pages/calendar/calendar";
import Upcoming from "./pages/calendar/eventlist-upcoming";
import Finished from "./pages/calendar/Detailbox";
import LoginPage from "./pages/Login/Loginpage";
import CreateAcc from "./pages/Login/CreateAcc";
import AuthPipe from './components/AuthPipe';
import UserProfile from "./pages/userprofile/userprofile";
import Eventlist from "./pages/Org Acc/Event list/eventlist";
import CreateEvent from "./pages/Org Acc/CreateEvent/createevent";
import EditEvent from "./pages/Org Acc/Edit Event/editevent";
import { ViewEvent } from "./pages/Event";

function App() {  

  return (
    <AuthPipe

      whileCheckingIfLoggedIn={
        <Route path="/loading" element={<div>Loading Page</div>} />
      }

      beforeLoggedIn={
        <>
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/create" element={<CreateAcc />} />
          <Route path="*" element={<Navigate to="/login"/>} />
        </>
      }

      afterLoggedIn={
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/calendar/upcoming" element={<Upcoming />} />
          <Route path="/calendar/finished" element={<Finished />} />
          <Route path="/userprofile" element={<UserProfile/>} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/view/:id" element={<ViewEvent />} />
          {/* ADMIN SIDE */}
          <Route path="/admin" element={<Eventlist />} />
          <Route path="/addevent" element={<CreateEvent />} />
          <Route path="/editevent/:id" element={<EditEvent />} />
          <Route path="*" element={<Navigate to="/"/>} />

        </>
      }
      
    />
  );
}


export default App;
