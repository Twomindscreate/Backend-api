// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  
    <Router>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      
    </Router>
  
);

export default App;

// tDOM.render(<App />, document.getElementById("root"));
