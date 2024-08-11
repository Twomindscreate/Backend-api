import React, { useState, useContext } from "react";
import { OverlayTrigger, Popover, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import taskManagementImage from "../../assets/image/3.webp";
// import { AuthContext } from "../../context/AuthContext";
// import { ProfileContext } from "../../context/ProfileContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

const Sidebar = () => {
  console.log("This is side bar");
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const navigate = useNavigate();
  // const { auth, logout } = useContext(AuthContext);
  // const { profile } = useContext(ProfileContext);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "profile":
        navigate("/profile");
        break;
      case "dashboard":
        navigate("/dashboard");
        break;
      case "add-team":
        navigate("/add-teams");
        break;
      case "add-task":
        navigate("/add-tasks");
        break;
      case "add-project":
        navigate("/add-projects");
        break;

      case "add-members":
        navigate("/add-members");
        break;
      // case "logout":
      //   logout();
      //   navigate("/");
      //   break;
      default:
        break;
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">User Details</Popover.Header>
      {/* <Popover.Body>
        <strong>Name:</strong> {auth?.user?.username || "Guest"}
        <br />
        <strong>Email:</strong> {profile?.email || "N/A"}
        <br />
        <strong>Phone:</strong> {profile?.phone || "N/A"}
      </Popover.Body> */}
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
          {/* <div className="profile-icon-wrapper">
            <img
              src={taskManagementImage}
              alt="User Profile"
              className="rounded-circle img-thumbnail"
              style={{ width: "30px", height: "30px" }}
            />
          </div> */}
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
        {/* <a
          href="#"
          className={`nav-link-custom logout-link-custom ${
            activeTab === "logout" ? "active" : ""
          }`}
          onClick={() => handleTabClick("logout")}
        >
          <i className="fas fa-sign-out-alt icon-custom"></i>
          {expanded && <span>Logout</span>}
        </a> */}
      </div>
      {/* <div className="content-area">{children}</div> */}
    </div>
  );
};

export default Sidebar;
