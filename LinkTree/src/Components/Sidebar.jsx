import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ setActiveSection, activeSection }) => {
  const [fullName, setFullName] = useState("");
  const [showLogout, setShowLogout] = useState(false); // ✅ Toggle state for logout button
  const navigate = useNavigate(); // ✅ For navigation

  useEffect(() => {
    // Fetch user details from backend
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("https://linktree-backend-0abv.onrender.com/api/user-details", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (data.success) {
          setFullName(`${data.user.firstName} ${data.user.lastName}`);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="midd">
        <div className="logod">
          <img src="sparklogo.png" alt="Spark Logo" className="logo-icond" />
          <h2>Spark</h2>
        </div>

        {/* Navigation Menu */}
        <ul className="menu">
          <button className={activeSection === "Links" ? "active" : ""} onClick={() => setActiveSection("Links")}>
            <img src="linkicon.png" alt="Links" className="menu-icon" />
            <span>Links</span>
          </button>
          <button className={activeSection === "Appearance" ? "active" : ""} onClick={() => setActiveSection("Appearance")}>
            <img src="appicon.png" alt="Appearance" className="menu-icon" />
            <span>Appearance</span>
          </button>
          <button className={activeSection === "Analytics" ? "active" : ""} onClick={() => setActiveSection("Analytics")}>
            <img src="analicon.png" alt="Analytics" className="menu-icon" />
            <span>Analytics</span>
          </button>
          <button className={activeSection === "Settings" ? "active" : ""} onClick={() => setActiveSection("Settings")}>
            <img src="settingicon.png" alt="Settings" className="menu-icon" />
            <span>Settings</span>
          </button>
        </ul>
      </div>
{/* ✅ Logout Button (Toggled) */}

      {/* Profile Section */}
      <div className="dashfooter">
      {showLogout && (
          <button className="logout-btn" onClick={handleLogout}>
          <img src="out.png"></img> Sign out
          </button>
        )}
        <button className="profile" onClick={() => setShowLogout(!showLogout)}> {/* ✅ Toggle logout button */}
          <img src="emo.png" alt="User Avatar" className="avatar" />
          <span className="name-side">{fullName || "Loading..."}</span>
        </button>

        
      </div>
    </div>
  );
};

export default Sidebar;
