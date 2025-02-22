import React, { useEffect, useState } from "react";
import "./DashContent.css";
import PhoneView from "./PhoneView";
import Profile from "./Profile";

const DashContent = () => {
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
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="header">
        <h2>
          Hi, <b className="name-cont">{fullName || "Loading..."}</b>!
          <p className="pp">Congratulations, You got a great response today.</p>
        </h2>
        <button className="share-btn">
          <img src="share.png" alt="Share Icon" /> Share
        </button>
      </div>

      <div className="dashboard-content">
        {/* Mobile Preview */}
        <div className="mobile-preview">
          <PhoneView />
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default DashContent;
