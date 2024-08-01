import { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Sidebar from "./components/Sidebar";
// import { AddTeam, Team, Details } from "./Team";
import SessionDetails from "./utils/session-util";

// Example of checking authentication status (you can replace with your actual logic)
const isAuthenticated = () => {
  console.log();
  return localStorage.getItem("isLoggedIn") === "true";
};

// Custom route for protected routes that require authentication
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? (
    <>
      <Sidebar />
      {element}
    </>
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

const NavRoutes = () => {
  const { accesToken, refreshToken } = SessionDetails();
  // const location = useLocation();
  // const navigateTo = useNavigate();
  // useEffect(() => {
  //   if (!accesToken || !refreshToken) {
  //     navigateTo("/lgoin");
  //     return;
  //   }
  // }, [location]);

  return (
    <Suspense fallback={`Loading...`}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={
                <>
                  <Register />
                </>
              }
            />

            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            {/* <Route
              path="/blogs"
              element={<PrivateRoute element={<Blogs />} />}
            />
            <Route
              path="/teams"
              element={<PrivateRoute element={<Team />} />}
            />
            <Route
              path="/add-team"
              element={<PrivateRoute element={<AddTeam />} />}
            />
            <Route
              path="/contact"
              element={<PrivateRoute element={<Contact />} />}
            />
            <Route
              path="/details/:userId"
              element={<PrivateRoute element={<Details />} />}
            />

            <Route path="*" element={<PrivateRoute element={<NoPage />} />} /> */}
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
};

export default NavRoutes;
