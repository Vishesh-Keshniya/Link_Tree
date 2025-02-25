import React, { useEffect, useState } from "react";
import "./DashContent.css";
import PhoneView from "./PhoneView";
import Profile from "./Profile";
import Appearance from "../Appearance";

const DashContent = ({ activeSection }) => {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [phoneHeaderColor, setPhoneHeaderColor] = useState("#3d2f23");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:3000/api/user-details", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setFullName(`${data.user.firstName} ${data.user.lastName}`);
          setBio(data.user.bio || "");
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
        {activeSection === "Links" && (
          <>
            <div className="mobile-preview">
              <PhoneView bio={bio} phoneHeaderColor={phoneHeaderColor} />
            </div>
            <div className="profile-section">
              <Profile bio={bio} setBio={setBio} phoneHeaderColor={phoneHeaderColor} setPhoneHeaderColor={setPhoneHeaderColor} />
            </div>
          </>
        )}

        {/* ✅ Now, Appearance also includes PhoneView */}
        {activeSection === "Appearance" && (
          <>
            <div className="mobile-preview">
              <PhoneView bio={bio} phoneHeaderColor={phoneHeaderColor} />
            </div>
            <div className="profile-section">
              <Appearance />
            </div>
          </>
        )}

        {activeSection === "Analytics" && <h2>Analytics Section (Coming Soon)</h2>}
        {activeSection === "Settings" && <h2>Settings Section (Coming Soon)</h2>}
      </div>
    </div>
  );
};

export default DashContent;
