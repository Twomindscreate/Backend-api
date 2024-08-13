import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import VerifyEmail from "./components/Auth/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Test from "./components/test/Test";
import ResetPassword from "./components/Auth/ResetPassword";
import "semantic-ui-css/semantic.min.css";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import { UserContext } from "./context/ContextApi";
import Sidebar from "./components/Sidebar/Sidebar";
import EnterNewPassword from "./components/Auth/EnterNewPassword";
import "./App.css";
function App() {
  const [userInfo, setUserInfo] = useState();
  return (
    <div className="App">
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <>
          <Router>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/otp/verify" element={<VerifyEmail />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/test" element={<Test />} />
              <Route path="/dashboard" element={<Sidebar />} />
              <Route path="/new" element={<EnterNewPassword />} />

              <Route
                path="/password-reset-confirm/:uid/:token"
                element={<ResetPassword />}
              />
            </Routes>
          </Router>
        </>
      </UserContext.Provider>
    </div>
  );
}

export default App;
