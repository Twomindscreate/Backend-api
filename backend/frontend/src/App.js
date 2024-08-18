import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage.jsx";
import VerifyEmail from "./components/Auth/VerifyEmail.jsx";
import ForgetPassword from "./components/Auth/ForgetPassword.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import EnterNewPassword from "./components/Auth/EnterNewPassword.jsx";
import ResetPassword from "./components/Auth/ResetPassword.jsx";
import Login from "./components/Auth/Login.jsx";
import "semantic-ui-css/semantic.min.css";
import Register from "./components/Auth/Register.jsx";

import "./App.css";

function App() {
  return (
    <div className="App">
      <>
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp/verify" element={<VerifyEmail />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/dashboard" element={<Sidebar />} />
            <Route path="/new" element={<EnterNewPassword />} />

            <Route
              path="/password-reset-confirm/:uid/:token"
              element={<ResetPassword />}
            />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
