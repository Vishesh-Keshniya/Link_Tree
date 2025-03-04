import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ setActiveSection, activeSection }) => {
  const [fullName, setFullName] = useState("");
  const [profileImage, setProfileImage] = useState("emo.png"); // Default avatar
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("https://linktree-backend-0abv.onrender.com/api/user-details", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (data.success) {
          setFullName(`${data.user.firstName} ${data.user.lastName}`);
          setProfileImage(data.user.image || "emo.png"); // Set profile image or default
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
          <button className={`menu-btn ${activeSection === "Links" ? "active" : ""}`} onClick={() => setActiveSection("Links")}>
            <img src="linkicon.png" alt="Links" className="menu-icon" />
            <span>Links</span>
          </button>
          <button className={`menu-btn ${activeSection === "Appearance" ? "active" : ""}`} onClick={() => setActiveSection("Appearance")}>
            <img src="appicon.png" alt="Appearance" className="menu-icon" />
            <span>Appearance</span>
          </button>
          <button className={`menu-btn ${activeSection === "Analytics" ? "active" : ""}`} onClick={() => setActiveSection("Analytics")}>
            <img src="analicon.png" alt="Analytics" className="menu-icon" />
            <span>Analytics</span>
          </button>
          <button className={`menu-btn ${activeSection === "Settings" ? "active" : ""}`} onClick={() => setActiveSection("Settings")}>
            <img src="settingicon.png" alt="Settings" className="menu-icon" />
            <span>Settings</span>
          </button>
        </ul>
      </div>

      {/* Profile Section */}
      <div className="dashfooter">
        {showLogout && (
          <button className="logout-btn" onClick={handleLogout}>
            <img src="out.png" alt="Logout" /> Sign out
          </button>
        )}
        <button className="profile" onClick={() => setShowLogout(!showLogout)}>
          <img 
            src={profileImage} 
            alt="User Avatar" 
            className="avatar"
            onError={(e) => { e.target.src = "emo.png"; }} // Fallback to default image
          />
          <span className="name-side">{fullName || "Loading..."}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
  