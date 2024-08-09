// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import VerifyEmail from "./components/auth/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Dashboard from "./components/Dashboard/Dashboard";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Register from "./components/auth/Register";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
