import React, { useEffect, useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Fetch user details from backend
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        if (!token) return; // If no token, return

        const response = await fetch("http://localhost:3000/api/user-details", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
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
          <button className="active">
            <img src="linkicon.png" alt="Links" className="menu-icon" />
            <span>Links</span>
          </button>
          <button>
            <img src="appicon.png" alt="Appearance" className="menu-icon" />
            <span>Appearance</span>
          </button>
          <button>
            <img src="analicon.png" alt="Analytics" className="menu-icon" />
            <span>Analytics</span>
          </button>
          <button>
            <img src="settingicon.png" alt="Settings" className="menu-icon" />
            <span>Settings</span>
          </button>
        </ul>
      </div>

      {/* Profile Section */}
      <div className="dashfooter">
        <div className="profile">
          <img src="emo.png" alt="User Avatar" className="avatar" />
          <span className="name-side">{fullName || "Loading..."}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
