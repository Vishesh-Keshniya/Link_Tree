import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

import Details from "./Components/Details"; // Add new component
import Dashboard from './Components/Dashboard';

function AppRoutes() { // ✅ Rename component
  return (
    <Router>
      <div className="App">
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Details/>} />
          <Route path= "/dashboard" element={<Dashboard/>} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes; // ✅ Rename export
