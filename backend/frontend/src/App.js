import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/auth/Logout";
import Profile from "./pages/Profile";
import CreateTeam from "./components/team/CreateTeam";
import CreateProfile from "./components/profile/CreateProfile";
import "./App.css";

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
          <Dashboard />
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
    <Route
      path="/teams"
      element={
        <PrivateRoute>
          <CreateTeam />
        </PrivateRoute>
      }
    />
    {/* Optionally, add a catch-all route */}
    {/* <Route path="*" element={<Home />} /> */}
  </Routes>
);

export default App;
