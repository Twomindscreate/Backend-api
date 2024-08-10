import React from "react";
// import { Route, Routes } from "react-router-dom";
// import { Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import VerifyEmail from "./components/auth/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
// import PrivateRoute from "./Routing/PrivateRoute";
// import Dashboard from "./components/Dashboard/Dashboard";

import "semantic-ui-css/semantic.min.css";
import Register from "./components/auth/Register";
// import { Sidebar } from "semantic-ui-react";
import Dashboard from "./components/Dashboard/Dashboard";

// const App = () => (
//   <>
//     <ToastContainer />

//     <Routes>
//       <Route path="/" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/otp/verify" element={<VerifyEmail />} />
//       <Route path="/forget-password" element={<ForgetPassword />} />

//       <Route path="/dashboard" element={<Sidebar />} />

//       <Route
//         path="/password-reset-confirm/:uid/:token"
//         element={<ResetPassword />}
//       />
//     </Routes>
//   </>
// );

// export default App;

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp/verify" element={<VerifyEmail />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/password-reset-confirm/:uid/:token"
          element={<ResetPassword />}
        />
      </Routes>
    </Router>
  );
}

export default App;
