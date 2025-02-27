import React, { useEffect, useState } from "react";
import "./DashContent.css";
import PhoneView from "./PhoneView";
import Profile from "./Profile";
import Appearance from "../Appearance";

const DashContent = ({ activeSection }) => {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [phoneHeaderColor, setPhoneHeaderColor] = useState("#000000");
  const [layout, setLayout] = useState("stack");
  const [shadowStyle, setShadowStyle] = useState("shadow-soft");
  const [borderStyle, setBorderStyle] = useState("border-rounded");
  const [buttonStyle, setButtonStyle] = useState("button-fill");
  const [linkBgColor, setLinkBgColor] = useState("");
  const [linkFontColor, setLinkFontColor] = useState("#000000");
  const [font, setFont] = useState("DM Sans");
  const [phoneFontColor, setPhoneFontColor] = useState("#D9D9D9");

  // Default theme settings
  const [selectedTheme, setSelectedTheme] = useState("air-snow"); 
  const [selectedLiTheme, setSelectedLiTheme] = useState("airsnowli");

  // Fetch user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:3000/api/user-details", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
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

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Links Section */}
        {activeSection === "Links" && (
          <>
            <div className="mobile-preview">
              <PhoneView 
                bio={bio}
                phoneHeaderColor={phoneHeaderColor} 
                layout={layout} 
                shadowStyle={shadowStyle}
                borderStyle={borderStyle}
                buttonStyle={buttonStyle}
                linkBgColor={linkBgColor}
                linkFontColor={linkFontColor}
                font={font}
                phoneFontColor={phoneFontColor} 
                selectedTheme={selectedTheme}
                selectedLiTheme={selectedLiTheme} // ✅ Pass `selectedLiTheme`
              />
            </div>
            <div className="profile-section">
              <Profile 
                bio={bio} 
                setBio={setBio} 
                phoneHeaderColor={phoneHeaderColor} 
                setPhoneHeaderColor={setPhoneHeaderColor} 
              />
            </div>
          </>
        )}

        {/* Appearance Section */}
        {activeSection === "Appearance" && (
          <>
            <div className="mobile-preview">
              <PhoneView 
                bio={bio}
                phoneHeaderColor={phoneHeaderColor} 
                layout={layout} 
                shadowStyle={shadowStyle}
                borderStyle={borderStyle}
                buttonStyle={buttonStyle}
                linkBgColor={linkBgColor}
                linkFontColor={linkFontColor}
                font={font}
                phoneFontColor={phoneFontColor} 
                selectedTheme={selectedTheme}
                selectedLiTheme={selectedLiTheme} // ✅ Pass `selectedLiTheme`
              />
            </div>
            <div className="profile-section">
              <Appearance 
                setLayout={setLayout} 
                setShadowStyle={setShadowStyle}
                setBorderStyle={setBorderStyle}
                setButtonStyle={setButtonStyle}
                setLinkBgColor={setLinkBgColor}
                setLinkFontColor={setLinkFontColor}
                setFont={setFont}
                setPhoneFontColor={setPhoneFontColor} 
                setSelectedTheme={setSelectedTheme} // ✅ Allow changing theme
                setSelectedLiTheme={setSelectedLiTheme} // ✅ Allow changing `li` theme
              />
            </div>
          </>
        )}

        {/* Other Sections */}
        {activeSection === "Analytics" && <h2>Analytics Section (Coming Soon)</h2>}
        {activeSection === "Settings" && <h2>Settings Section (Coming Soon)</h2>}
      </div>
    </div>
  );
};

export default DashContent;
