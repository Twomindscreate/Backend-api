import React, { useState } from "react";
import { OverlayTrigger, Popover, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import taskManagementImage from "../../assets/images/forget_otp.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AxiosInstance from "../../Api/AxiosInstance";
import "./Sidebar.css";
import { toast } from "react-toastify";
import CreateUpdate from "../Team/CreateUpdate";
import Login from "../Auth/Login";
import ForgetPassword from "../Auth/ForgetPassword";
import CreateTask from "../Task/CreateTask";
import CreateProject from "../Project/CreateProject";
import DisplayProfile from "../Profile/DisplayProfile";
import Dashboard from "../../pages/Dashboard/Dashboard";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refresh = JSON.parse(localStorage.getItem("refresh_token"));
    const res = await AxiosInstance.post("logout/", {
      refresh_token: refresh,
    });
    if (res.status === 204) {
      localStorage.clear();
      navigate("/");
      toast.warn("Logout successful");
    }
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "logout") {
      handleLogout();
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">User Details</Popover.Header>
      <Popover.Body>
        <strong>Name:</strong>{" "}
        {user ? <p>{user.full_name}</p> : <p>Not available</p>}
        <strong>Email:</strong>{" "}
        {user ? <p>{user.email}</p> : <p>Not available</p>}
        <strong>Phone:</strong> <p>6556589556</p>
      </Popover.Body>
    </Popover>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "add-team":
        return <CreateUpdate />;
      case "add-task":
        return <CreateTask />;
      case "add-project":
        return <CreateProject />;
      case "add-members":
        return <ForgetPassword />;
      case "profile":
        return <DisplayProfile />;

      default:
        return <Login />;
    }
  };

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

      <div className="content-area">{renderContent()}</div>
    </div>
  );
};

export default Sidebar;
