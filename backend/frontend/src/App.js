import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./dashboard";
import PrivateRoute from "./Routing/PrivateRoute";
import Sidebar from "./components/sidebar/Sidebar";
import "./main.css";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Sidebar />} />

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
