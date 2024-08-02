import React, { useState, useContext } from "react";
import { OverlayTrigger, Popover, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import taskManagementImage from "../../assets/image/3.webp";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

const Sidebar = ({ children }) => {
  console.log("-----------------", children);
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);
  const { profile } = useContext(ProfileContext);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "edit-profile":
        navigate("/profile");
        break;
      case "dashboard":
        navigate("/dashboard");
        break;
      case "add-team":
        navigate("/teams");
        break;
      case "add-task":
        navigate("/task");
        break;
      case "add-project":
        navigate("/projects/add");
        break;
      case "notifications":
        navigate("/notifications");
        break;
      case "add-members":
        navigate("/members/add");
        break;
      case "logout":
        logout();
        break;
      default:
        break;
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">User Details</Popover.Header>
      <Popover.Body>
        <strong>Name:</strong> {auth?.user?.username || "Guest"}
        <br />
        <strong>Email:</strong> {profile?.email || "N/A"}
        <br />
        <strong>Phone:</strong> {profile?.phone || "N/A"}
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="app-container">
      <Navbar bg="dark" variant="dark" className="navbar-custom">
        <Button
          variant="dark"
          onClick={toggleSidebar}
          className="sidebar-toggle"
        >
          <i className="fas fa-bars"></i>
        </Button>
        <Navbar.Brand href="#">Task Manager</Navbar.Brand>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <div className="profile-icon">
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
        className={`sidebar d-flex flex-column ${
          expanded ? "expanded" : "collapsed"
        }`}
      >
        <nav className="nav flex-column">
          <a
            href="#"
            className={`nav-link ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => handleTabClick("dashboard")}
          >
            <i className="fas fa-tachometer-alt icon"></i>
            {expanded && <span>Dashboard</span>}
          </a>
          <a
            href="#"
            className={`nav-link ${activeTab === "add-team" ? "active" : ""}`}
            onClick={() => handleTabClick("add-team")}
          >
            <i className="fas fa-users icon"></i>
            {expanded && <span>Add Team</span>}
          </a>
          <a
            href="#"
            className={`nav-link ${activeTab === "add-task" ? "active" : ""}`}
            onClick={() => handleTabClick("add-task")}
          >
            <i className="fas fa-tasks icon"></i>
            {expanded && <span>Add Task</span>}
          </a>
          <a
            href="#"
            className={`nav-link ${
              activeTab === "add-project" ? "active" : ""
            }`}
            onClick={() => handleTabClick("add-project")}
          >
            <i className="fas fa-folder-plus icon"></i>
            {expanded && <span>Add Project</span>}
          </a>
          <a
            href="#"
            className={`nav-link ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => handleTabClick("notifications")}
          >
            <i className="fas fa-bell icon"></i>
            {expanded && <span>Notifications</span>}
          </a>
          <a
            href="#"
            className={`nav-link ${
              activeTab === "add-members" ? "active" : ""
            }`}
            onClick={() => handleTabClick("add-members")}
          >
            <i className="fas fa-user-plus icon"></i>
            {expanded && <span>Add Members</span>}
          </a>
          <a
            href="#"
            className={`nav-link ${
              activeTab === "edit-profile" ? "active" : ""
            }`}
            onClick={() => handleTabClick("edit-profile")}
          >
            <i className="fas fa-user-edit icon"></i>
            {expanded && <span>Edit Profile</span>}
          </a>
        </nav>
        <hr className="separator" />
        <a
          href="#"
          className={`nav-link logout-link ${
            activeTab === "logout" ? "active" : ""
          }`}
          onClick={() => handleTabClick("logout")}
        >
          <i className="fas fa-sign-out-alt icon"></i>
          {expanded && <span>Logout</span>}
        </a>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
