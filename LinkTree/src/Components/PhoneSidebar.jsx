import React from "react";
import "./PhoneSidebar.css";

const PhoneSidebar = ({ setActiveSection, activeSection }) => {
  return (
    <div className="phone-sidebar">
      <button
        className={activeSection === "Links" ? "active" : ""}
        onClick={() => setActiveSection("Links")}
      >
        <img src="linkicon.png" alt="Links" className="menu-icon" />
        <span>Links</span>
      </button>
      <button
        className={activeSection === "Appearance" ? "active" : ""}
        onClick={() => setActiveSection("Appearance")}
      >
        <img src="appicon.png" alt="Appearance" className="menu-icon" />
        <span>Appearance</span>
      </button>
      <button
        className={activeSection === "Analytics" ? "active" : ""}
        onClick={() => setActiveSection("Analytics")}
      >
        <img src="analicon.png" alt="Analytics" className="menu-icon" />
        <span>Analytics</span>
      </button>
      <button
        className={activeSection === "Settings" ? "active" : ""}
        onClick={() => setActiveSection("Settings")}
      >
        <img src="settingicon.png" alt="Settings" className="menu-icon" />
        <span>Settings</span>
      </button>
    </div>
  );
};

export default PhoneSidebar;
