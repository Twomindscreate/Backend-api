import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import AddTeams from "./components/Dashboard/AddTeams";
import AddMembers from "./components/Dashboard/AddMembers";
import AddProject from "./components/Dashboard/AddProject";
import AddTask from "./components/Dashboard/AddTask";
import CreateProfile from "./components/Dashboard/CreateProfile";

import PrivateRoute from "./Routing/PrivateRoute";


import "./main.css";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
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
    <Route
      path="/add-teams"
      element={
        <PrivateRoute>
          <AddTeams />
        </PrivateRoute>
      }
    />
    <Route
      path="add-members"
      element={
        <PrivateRoute>
          <AddMembers />
        </PrivateRoute>
      }
    />

    <Route
      path="/add-projects"
      element={
        <PrivateRoute>
          <AddProject />
        </PrivateRoute>
      }
    />

    <Route
      path="/add-tasks"
      element={
        <PrivateRoute>
          <AddTask />
        </PrivateRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <PrivateRoute>
          <CreateProfile />
        </PrivateRoute>
      }
    />

 
  </Routes>
);

export default App;
