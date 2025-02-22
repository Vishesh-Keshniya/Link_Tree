import React from "react";
import "./App.css";
import AppRoutes from "./AppRoutes"; // ✅ Change import name
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <div>
      <AppRoutes /> {/* ✅ Use new name */}
      
      
    </div>
  );
}

export default App;
