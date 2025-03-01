import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

import Details from "./Components/Details"; // Add new component
import Dashboard from './Components/Dashboard';
import PhoneView from "./Components/Dashboard/PhoneView"
import PublicProfileView from "./Components/Dashboard/PublicProfileView"

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
          <Route path="/phone-view/:userId" element={<PhoneView/>} />
          <Route path="/public-profile/:userId" element={<PublicProfileView />} />
          
          
         
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes; // ✅ Rename export
