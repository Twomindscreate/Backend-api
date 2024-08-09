// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import VerifyEmail from "./components/auth/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Dashboard from "./components/Dashboard/Sidebar";

import "semantic-ui-css/semantic.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Register from "./components/auth/Register";
import { Sidebar } from "semantic-ui-react";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/" element={<Sidebar />}> */}
        <Route path="/abc" element={<Dashboard />} />
        {/* </Route> */}

        <Route path="/otp/verify" element={<VerifyEmail />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route
          path="/password-reset-confirm/:uid/:token"
          element={<ResetPassword />}
        />
      </Routes>
    </Router>
  );
}

export default App;
