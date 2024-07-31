// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./pages/HomePage";
// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Sidebar from "./components/Sidebar";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/dashboard" element={<Sidebar />} />
//     </Routes>
//   </Router>
// );

// export default App;

import React from "react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateMember from "./components/member/CreateMember";
import CreateProfile from "./components/profile/CreateProfile";

import CreateTask from "./components/task/CreateTask";

const App = () => {
  return (
    <Router>
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/add-team" component={CreateTask} />

          <Route path="/add-project" component={CreateProfile} />

          <Route path="/add-members" component={CreateMember} />

          <Route path="/" exact component={Sidebar} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
