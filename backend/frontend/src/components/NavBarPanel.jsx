import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation } from "react-router-dom";
import useLogin from "../hooks/Authentication/useLogin";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { handleLogout } = useLogin();
  const products = useSelector((state) => state.cart);
  console.log("---products", products);
  const userDetails = JSON.parse(localStorage.getItem("user"));
  console.log(userDetails);
  const { pathname } = useLocation();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/" as={Link}>
          Task Manager
        </Navbar.Brand>

        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link
            to="/dashboard"
            as={Link}
            className={pathname.includes("/dashboard") ? "active" : ""}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            to="/cart"
            as={Link}
            className={pathname.includes("/teams") ? "active" : ""}
          >
            Cart
          </Nav.Link>
          <Nav.Link
            to="/teams"
            as={Link}
            className={pathname.includes("/teams") ? "active" : ""}
          >
            Teams
          </Nav.Link>
          <Nav.Link
            to="/tasks"
            as={Link}
            className={pathname.includes("/tasks") ? "active" : ""}
          >
            Tasks
          </Nav.Link>
        </Nav>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title={userDetails} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
