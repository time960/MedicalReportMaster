import logo from "../../assets/img/landingPage/logo.png";
import dashboard from "../../assets/img/dashboard/dashboard.jpeg";
import reports from "../../assets/img/dashboard/report2_pbl.png";
import patient_history from "../../assets/img/dashboard/patient_history.jpeg";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import logoutimg from "../../assets/img/dashboard/logout.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const DashboardSidebar = (props) => {
  const navigate = useNavigate();
  const logout = async () => {
    const res = await axios.get("https://medical-record-rxyo.onrender.com" + "/logout", {
      withCredentials: true,
      credentials: "include",
    });
    props.settoastCondition({
      status: "success",
      message: "Logged out Successfully!!!",
    });
    props.setToastShow(true);
    navigate("/");
  };
  console.log(props);
  const [Toggle, setToggle] = useState("Dashboard");
  return (
    <div className="h-screen overflow-y-hidden w-screen grid grid-cols-12">
      <div className="side_bar bg-white shadow col-span-2">
        <div className="flex m-2 mt-4  ">
          <Link className="logo" to="/">
            <img
              src={logo}
              className="w-16"
              alt="logo"
              style={{ width: "10rem" }}
            ></img>
          </Link>
          {/* <div className="heading font-poppins font-bold text-xl  ">
            <Link to="/">
              <h1>Doctor's Dashboard</h1>
            </Link>
          </div> */}
        </div>
        <nav>
          {/* DashBoard */}
          <Link
            to="/doctor/dashboard"
            onClick={() => setToggle("Dashboard")}
            className={
              Toggle === "Dashboard" ? "text-gray-900" : "text-gray-400"
            }
          >
            <div className="flex m-2 mt-8 ">
              <div className="w-6 ml-4  ">
                <img src={dashboard} alt="dashbord"></img>
              </div>
              <div className="font-poppins font-bold ml-4">
                <h1>Dashboard</h1>
              </div>
            </div>
          </Link>
          {/* Reports */}
          <Link
            to="/doctor/reports"
            onClick={() => setToggle("Reports")}
            className={Toggle === "Reports" ? "text-gray-900" : "text-gray-400"}
          >
            <div className="flex m-2 mt-6">
              <div className="w-6 ml-4  ">
                <img src={reports} alt="report"></img>
              </div>
              <div className="font-poppins font-bold ml-4">
                <h1>Reports</h1>
              </div>
            </div>
          </Link>
          
          <Link
            to="/doctor/profile"
            onClick={() => setToggle("doctor-profile")}
            className={Toggle === "doctor-profile" ? "text-gray-900" : "text-gray-400"}
          >
            <div className="flex m-2 mt-6">
              <div className="w-6 ml-3">
                <img src={patient_profile} alt="profile-icon"></img>
              </div>
              <div className="font-poppins font-bold ml-4">
                <h1>Profile</h1>
              </div>
            </div>
          </Link>
        </nav>

        <div className=" mx-auto mt-56 py-1    bg-primary  rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary w-2/5  ">
          <button className="font-bold  flex items-center" onClick={logout}>
            <img src={logoutimg} className="h-4 px-2 " alt="logout"></img>logout
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default DashboardSidebar;
