import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import AddTeams from "./components/Dashboard/AddTeams";
import PrivateRoute from "./Routing/PrivateRoute";

import "./main.css";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/addteams"
      element={
        <PrivateRoute>
          <AddTeams />
        </PrivateRoute>
      }
    />
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />

    {/* Optionally, add a catch-all route */}
    {/* <Route path="*" element={<Home />} /> */}
  </Routes>
);

export default App;
