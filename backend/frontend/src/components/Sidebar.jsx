import React, { useState } from "react";
import { OverlayTrigger, Popover, Navbar, Button } from "react-bootstrap";
import "./App.css";
import taskManagementImage from "../assets/image/3.webp";
import Logout from "./auth/Logout";
const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">User Details</Popover.Header>
      <Popover.Body>
        <strong>Name:</strong> John Doe
        <br />
        <strong>Email:</strong> john.doe@example.com
        <br />
        <strong>Phone:</strong> (123) 456-7890
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
        <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
        <OverlayTrigger trigger="hover" placement="left" overlay={popover}>
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
        <Logout />
        <nav className="nav flex-column">
          <a
            href="#dashboard"
            className={`nav-link ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => handleTabClick("dashboard")}
          >
            <i className="fas fa-tachometer-alt icon"></i>
            {expanded && <span>Dashboard</span>}
          </a>

          <a
            href="#add-team"
            className={`nav-link ${activeTab === "add-team" ? "active" : ""}`}
            onClick={() => handleTabClick("add-team")}
          >
            <i className="fas fa-users icon"></i>
            {expanded && <span>Add Team</span>}
          </a>
          <a
            href="#add-task"
            className={`nav-link ${activeTab === "add-task" ? "active" : ""}`}
            onClick={() => handleTabClick("add-task")}
          >
            <i className="fas fa-tasks icon"></i>
            {expanded && <span>Add Task</span>}
          </a>
          <a
            href="#add-project"
            className={`nav-link ${
              activeTab === "add-project" ? "active" : ""
            }`}
            onClick={() => handleTabClick("add-project")}
          >
            <i className="fas fa-folder-plus icon"></i>
            {expanded && <span>Add Project</span>}
          </a>
          <a
            href="#notifications"
            className={`nav-link ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => handleTabClick("notifications")}
          >
            <i className="fas fa-bell icon"></i>
            {expanded && <span>Notifications</span>}
          </a>
          <a
            href="#add-members"
            className={`nav-link ${
              activeTab === "add-members" ? "active" : ""
            }`}
            onClick={() => handleTabClick("add-members")}
          >
            <i className="fas fa-user-plus icon"></i>
            {expanded && <span>Add Members</span>}
          </a>
          <a
            href="#edit-profile"
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
          href="#logout"
          className={`nav-link logout-link ${
            activeTab === "logout" ? "active" : ""
          }`}
          onClick={() => handleTabClick("logout")}
        >
          <i className="fas fa-sign-out-alt icon"></i>
          {expanded && <span>Logout</span>}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
