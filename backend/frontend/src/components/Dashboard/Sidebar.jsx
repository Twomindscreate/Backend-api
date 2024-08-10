// import React, { useState, useContext, useEffect } from "react";
// import { OverlayTrigger, Popover, Navbar, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import taskManagementImage from "../../assets/images/forget_otp.jpg";

// import "@fortawesome/fontawesome-free/css/all.min.css";
// import AxiosInstance from "../../Api/AxiosInstance";
// import "./App.css";
// import { toast } from "react-toastify";

// const Sidebar = ({ children }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [activeTab, setActiveTab] = useState("");

//   const jwt = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (jwt && user && !user) {
//       navigate("/login");
//     } else {
//       getSomeData();
//     }
//   }, [jwt, user]);

//   const getSomeData = async () => {
//     const res = await AxiosInstance.get("get-something/");
//   };

//   const refresh = JSON.parse(localStorage.getItem("refresh_token"));

//   const handleLogout = async () => {
//     const refresh = localStorage.getItem("refresh_token");
//     const token = localStorage.getItem("token");

//     try {
//       const response = await AxiosInstance.post(
//         "logout/",
//         { refresh_token: refresh },
//         { headers: { Authorization: `Bearer ${token}` } } // Add Authorization header
//       );

//       if (response.status === 200) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("refresh_token");
//         localStorage.removeItem("user");
//         navigate("/login");
//         toast.warn("Logout successful");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//       if (error.response) {
//         toast.error(
//           error.response.data.detail || "An error occurred. Please try again."
//         );
//       } else {
//         toast.error("An error occurred. Please try again.");
//       }
//     }
//   };

//   const toggleSidebar = () => {
//     setExpanded(!expanded);
//   };

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     switch (tab) {
//       case "profile":
//         navigate("/forget-password");
//         break;
//       case "dashboard":
//         navigate("/dashboard");
//         break;
//       case "add-team":
//         navigate("/forget-password");
//         break;
//       case "add-task":
//         navigate("/forget-password");
//         break;
//       case "add-project":
//         navigate("/forget-password");
//         break;

//       case "add-members":
//         navigate("/forget-password");
//         break;
//       case "logout":
//         handleLogout();
//         navigate("/");
//         break;
//       default:
//         break;
//     }
//   };

//   const popover = (
//     <Popover id="popover-basic">
//       <Popover.Header as="h3">User Details</Popover.Header>
//       <Popover.Body>
//         <strong>Name:</strong> {user && <p>user.full_name</p>}
//         <br />
//         <strong>Email:</strong> {user && <p>user.email</p>}
//         <br />
//         <strong>Phone:</strong> <p>6556589556</p>
//       </Popover.Body>
//     </Popover>
//   );

//   return (
//     <div className="app-container">
//       <Navbar bg="dark" variant="dark" className="custom-navbar">
//         <Button
//           variant="dark"
//           onClick={toggleSidebar}
//           className="sidebar-toggle"
//         >
//           <i className="fas fa-bars"></i>
//         </Button>
//         <Navbar.Brand href="#" className="task-name">
//           Task Manager
//         </Navbar.Brand>
//         <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
//           <div className="profile-icon-wrapper">
//             <img
//               src={taskManagementImage}
//               alt="User Profile"
//               className="rounded-circle img-thumbnail"
//               style={{ width: "30px", height: "30px" }}
//             />
//           </div>
//         </OverlayTrigger>
//       </Navbar>
//       <div
//         className={`custom-sidebar d-flex flex-column ${
//           expanded ? "expanded" : "collapsed"
//         }`}
//       >
//         <nav className="sidebar-nav">
//           <a
//             href="#"
//             className={`nav-link-custom ${
//               activeTab === "dashboard" ? "active" : ""
//             }`}
//             onClick={() => handleTabClick("dashboard")}
//           >
//             <i className="fas fa-tachometer-alt icon-custom"></i>
//             {expanded && <span>Dashboard</span>}
//           </a>
//           <a
//             href="#"
//             className={`nav-link-custom ${
//               activeTab === "add-team" ? "active" : ""
//             }`}
//             onClick={() => handleTabClick("add-team")}
//           >
//             <i className="fas fa-users icon-custom"></i>
//             {expanded && <span>Add Team</span>}
//           </a>
//           <a
//             href="#"
//             className={`nav-link-custom ${
//               activeTab === "add-task" ? "active" : ""
//             }`}
//             onClick={() => handleTabClick("add-task")}
//           >
//             <i className="fas fa-tasks icon-custom"></i>
//             {expanded && <span>Add Task</span>}
//           </a>
//           <a
//             href="#"
//             className={`nav-link-custom ${
//               activeTab === "add-project" ? "active" : ""
//             }`}
//             onClick={() => handleTabClick("add-project")}
//           >
//             <i className="fas fa-folder-plus icon-custom"></i>
//             {expanded && <span>Add Project</span>}
//           </a>

//           <a
//             href="#"
//             className={`nav-link-custom ${
//               activeTab === "add-members" ? "active" : ""
//             }`}
//             onClick={() => handleTabClick("add-members")}
//           >
//             <i className="fas fa-user-plus icon-custom"></i>
//             {expanded && <span>Add Members</span>}
//           </a>

//           <a
//             href="#"
//             className={`nav-link-custom ${
//               activeTab === "profile" ? "active" : ""
//             }`}
//             onClick={() => handleTabClick("profile")}
//           >
//             <i className="fas fa-user-edit icon-custom"></i>
//             {expanded && <span>Profile</span>}
//           </a>
//         </nav>
//         <hr className="sidebar-separator" />
//         <a
//           href="#"
//           className={`nav-link-custom logout-link-custom ${
//             activeTab === "logout" ? "active" : ""
//           }`}
//           onClick={() => handleTabClick("logout")}
//         >
//           <i className="fas fa-sign-out-alt icon-custom"></i>
//           {expanded && <span>Logout</span>}
//         </a>
//       </div>
//       <div className="content-area">{children}</div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import { OverlayTrigger, Popover, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import taskManagementImage from "../../assets/images/forget_otp.jpg";

import "@fortawesome/fontawesome-free/css/all.min.css";
import AxiosInstance from "../../Api/AxiosInstance";
import "./App.css";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const jwt = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  console.log("jwt");
  console.log("userString");
  console.log("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwt || !user) {
      navigate("/login");
    } else {
      getSomeData();
    }
  }, [jwt, user, navigate]);

  const getSomeData = async () => {
    try {
      const res = await AxiosInstance.get("get-something/");
      // Handle response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh_token");
    const token = localStorage.getItem("token");

    try {
      const response = await AxiosInstance.post(
        "logout/",
        { refresh_token: refresh },
        { headers: { Authorization: `Bearer ${token}` } } // Add Authorization header
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        navigate("/login");
        toast.warn("Logout successful");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      if (error.response) {
        toast.error(
          error.response.data.detail || "An error occurred. Please try again."
        );
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "profile":
        navigate("/forget-password");
        break;
      case "dashboard":
        navigate("/dashboard");
        break;
      case "add-team":
        navigate("/forget-password");
        break;
      case "add-task":
        navigate("/forget-password");
        break;
      case "add-project":
        navigate("/forget-password");
        break;
      case "add-members":
        navigate("/forget-password");
        break;
      case "logout":
        handleLogout();
        navigate("/");
        break;
      default:
        break;
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">User Details</Popover.Header>
      <Popover.Body>
        <strong>Name:</strong>{" "}
        {user ? <p>{user.full_name}</p> : <p>Not available</p>}
        <br />
        <strong>Email:</strong>{" "}
        {user ? <p>{user.email}</p> : <p>Not available</p>}
        <br />
        <strong>Phone:</strong> <p>6556589556</p>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="app-container">
      <Navbar bg="dark" variant="dark" className="custom-navbar">
        <Button
          variant="dark"
          onClick={toggleSidebar}
          className="sidebar-toggle"
        >
          <i className="fas fa-bars"></i>
        </Button>
        <Navbar.Brand href="#" className="task-name">
          Task Manager
        </Navbar.Brand>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <div className="profile-icon-wrapper">
            <img
              src={taskManagementImage}
              alt="User Profile"
              className="rounded-circle img-thumbnail"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
        </OverlayTrigger>
      </Navbar>
      <div
        className={`custom-sidebar d-flex flex-column ${
          expanded ? "expanded" : "collapsed"
        }`}
      >
        <nav className="sidebar-nav">
          <a
            href="#"
            className={`nav-link-custom ${
              activeTab === "dashboard" ? "active" : ""
            }`}
            onClick={() => handleTabClick("dashboard")}
          >
            <i className="fas fa-tachometer-alt icon-custom"></i>
            {expanded && <span>Dashboard</span>}
          </a>
          <a
            href="#"
            className={`nav-link-custom ${
              activeTab === "add-team" ? "active" : ""
            }`}
            onClick={() => handleTabClick("add-team")}
          >
            <i className="fas fa-users icon-custom"></i>
            {expanded && <span>Add Team</span>}
          </a>
          <a
            href="#"
            className={`nav-link-custom ${
              activeTab === "add-task" ? "active" : ""
            }`}
            onClick={() => handleTabClick("add-task")}
          >
            <i className="fas fa-tasks icon-custom"></i>
            {expanded && <span>Add Task</span>}
          </a>
          <a
            href="#"
            className={`nav-link-custom ${
              activeTab === "add-project" ? "active" : ""
            }`}
            onClick={() => handleTabClick("add-project")}
          >
            <i className="fas fa-folder-plus icon-custom"></i>
            {expanded && <span>Add Project</span>}
          </a>
          <a
            href="#"
            className={`nav-link-custom ${
              activeTab === "add-members" ? "active" : ""
            }`}
            onClick={() => handleTabClick("add-members")}
          >
            <i className="fas fa-user-plus icon-custom"></i>
            {expanded && <span>Add Members</span>}
          </a>
          <a
            href="#"
            className={`nav-link-custom ${
              activeTab === "profile" ? "active" : ""
            }`}
            onClick={() => handleTabClick("profile")}
          >
            <i className="fas fa-user-edit icon-custom"></i>
            {expanded && <span>Profile</span>}
          </a>
        </nav>
        <hr className="sidebar-separator" />
        <a
          href="#"
          className={`nav-link-custom logout-link-custom ${
            activeTab === "logout" ? "active" : ""
          }`}
          onClick={() => handleTabClick("logout")}
        >
          <i className="fas fa-sign-out-alt icon-custom"></i>
          {expanded && <span>Logout</span>}
        </a>
      </div>
      {/* <div className="content-area">{children}</div> */}
    </div>
  );
};

export default Sidebar;
