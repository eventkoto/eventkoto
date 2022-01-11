import "../../styles/index.css";
import Sidebar from "../dashboard/sidebar";
import "../../styles/userprofile.css";
import { useState } from "react";
import { FireAuth } from "../../libs/firebase/auth";
import { CompLoading } from "../../components/Loading";
import { CompSidebar } from "../../components/SideBar";

const UserProfile = () => {
  const [prof, setProf] = useState({});
  const [loading, setLoading] = useState(true)

  async function loadData() {
    let data = await FireAuth.getUser(true, true, true);
    //console.log(data);
    setProf(data);
    setLoading(false)
  }

  useState(() => {
    loadData();
  }, []);

  return (
    <div className="dashboard">
      <CompSidebar />
      
      <CompLoading enabled={loading} />

      <div className="dashboard-main">
        <div className="profileTitle">USER PROFILE</div>
        <div className="container ml-10 flex justify-center items-start h-[80vh] border-t-4 border-red-700 pt-10">
          <div className="flex flex-wrap mx-10">
            <div className="w-full md:mx-2">
              <div className="text-center p-3 bg-white shadow-lg border-b-2 border-red-700">
                <div className="image overflow-hidden"></div>
                <h1 className="text-gray-900 font-bold text-3xl leading-8 my-1">
                  {prof.name}
                </h1>
                <h3 className="text-gray-600 text-xl text-semibold leading-6">
                  {prof.program}
                </h3>
                <p className="text-xl text-gray-500 hover:text-gray-600 leading-6">
                  {prof.organization}
                </p>
              </div>
              <div className="my-4"></div>
            </div>
            <div className="w-full mx-2 h-64">
              <div className="p-3 rounded-sm bg-white shadow-lg">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Name</div>
                      <div className="px-4 py-2">{prof.name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Organization
                      </div>
                      <div className="px-4 py-2">{prof.organization}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Program</div>
                      <div className="px-4 py-2">{prof.program}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email</div>
                      <div className="px-4 py-2">{prof.email}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Student ID</div>
                      <div className="px-4 py-2">
                        {prof.email}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Programs Interested At</div>
                      <div className="px-4 py-2">
                        {prof.interested_count}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Attended Programs</div>
                      <div className="px-4 py-2">
                        {prof.attendance_count}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Programs Rated</div>
                      <div className="px-4 py-2">
                      {prof.ratings_count}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Joined</div>
                      <div className="px-4 py-2">
                        {new Date(prof.created_at).toUTCString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
