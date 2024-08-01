// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import Home from "./pages/HomePage";
// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Sidebar from "./components/Sidebar";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import PrivateRoute from "./components/PrivateRoute";
// import Logout from "./components/auth/Logout";
// import Profile from "./pages/Profile";

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/home" element={<Home />} />
//       <Route path="/logout" element={<Logout />} />
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             <Sidebar /> {/* Include other components if needed */}
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="/profile"
//         element={
//           <PrivateRoute>
//             <Profile />
//           </PrivateRoute>
//         }
//       />
//     </Routes>
//   </Router>
// );

// export default App;

// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/auth/Logout";
import Profile from "./pages/Profile";
import CreateTeam from "./components/team/CreateTeam";
import CreateProfile from "./components/profile/CreateProfile";
const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/profile" element={<CreateProfile />} />
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Sidebar />
        </PrivateRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      }
    />
    {/* Optionally, add a catch-all route */}
    <Route path="*" element={<Home />} />
  </Routes>
);

export default App;
