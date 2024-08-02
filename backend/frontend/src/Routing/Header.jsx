import React from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <Navbar color="light" light expand="md">
      <Link to="/" className="navbar-brand">
        Task Scheduler
      </Link>
      <Nav className="ml-auto" navbar>
        {user ? (
          <>
            <NavItem>
              <NavLink tag={Link} to="/task">
                Tasks
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/project/create">
                Create Project
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/logout">
                Logout
              </NavLink>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <NavLink tag={Link} to="/register">
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/login">
                Login
              </NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
