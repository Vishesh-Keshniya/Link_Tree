import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashContent from "./Dashboard/Dashcontent";
import "./Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("Links"); // Default section

  return (
    <div className="dash">
      <div className="l">
        <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      </div>
      <div className="r">
        <DashContent activeSection={activeSection} />
      </div>
    </div>
  );
}

export default Dashboard;
