import React, { useEffect, useState } from "react";
import "./DashContent.css";
import PhoneView from "./PhoneView";
import Profile from "./Profile";
import Appearance from "../Appearance";
import Analytics from "../Analytics";
import SettingComp from "../SettingComp";
import { useNavigate } from "react-router-dom";


const DashContent = ({ activeSection }) => {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [phoneHeaderColor, setPhoneHeaderColor] = useState("#FFFFFF");
  const [layout, setLayout] = useState(localStorage.getItem("layout") || "stack");
  const [shadowStyle, setShadowStyle] = useState(localStorage.getItem("shadowStyle") || "shadow-soft");
  const [borderStyle, setBorderStyle] = useState(localStorage.getItem("borderStyle") || "border-rounded");
  const [buttonStyle, setButtonStyle] = useState(localStorage.getItem("buttonStyle") || "button-fill");
  const [linkBgColor, setLinkBgColor] = useState(localStorage.getItem("linkBgColor") || "#FFFFFF");
  const [linkFontColor, setLinkFontColor] = useState(localStorage.getItem("linkFontColor") || "#000000");
  const [font, setFont] = useState(localStorage.getItem("font") || "DM Sans");
  const [phoneFontColor, setPhoneFontColor] = useState(localStorage.getItem("phoneFontColor") || "#FFFFFF");
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem("selectedTheme") || "air-snow");
  const [selectedLiTheme, setSelectedLiTheme] = useState(localStorage.getItem("selectedLiTheme") || "airsnowli");
  const [userId, setUserId] = useState(null); 
  const [loading, setLoading] = useState(true);
    const [showLogout, setShowLogout] = useState(false); 
    const navigate = useNavigate();


  useEffect(() => {
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
          setBio(data.user.bio || "");
          setUserId(data.user._id); 

          if (data.user.settings) {
            setLayout(data.user.settings.layout || "stack");
            setShadowStyle(data.user.settings.shadowStyle || "shadow-soft");
            setBorderStyle(data.user.settings.borderStyle || "border-rounded");
            setButtonStyle(data.user.settings.buttonStyle || "button-fill");
            setLinkBgColor(data.user.settings.linkBgColor || "#FFFFFF");
            setLinkFontColor(data.user.settings.linkFontColor || "#FFFFFF");
            setFont(data.user.settings.font || "DM Sans");
            setPhoneFontColor(data.user.settings.phoneFontColor || "#FFFFFF");
            setSelectedTheme(data.user.settings.selectedTheme || "air-snow");
            setSelectedLiTheme(data.user.settings.selectedLiTheme || "airsnowli");
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    localStorage.setItem("layout", layout);
    localStorage.setItem("shadowStyle", shadowStyle);
    localStorage.setItem("borderStyle", borderStyle);
    localStorage.setItem("buttonStyle", buttonStyle);
    localStorage.setItem("linkBgColor", linkBgColor);
    localStorage.setItem("linkFontColor", linkFontColor);
    localStorage.setItem("font", font);
    localStorage.setItem("phoneFontColor", phoneFontColor);
    localStorage.setItem("selectedTheme", selectedTheme);
    localStorage.setItem("selectedLiTheme", selectedLiTheme);
  }, [layout, shadowStyle, borderStyle, buttonStyle, linkBgColor, linkFontColor, font, phoneFontColor, selectedTheme, selectedLiTheme]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {}
      <div className="header">
        <h2>
          Hi, <b className="name-cont">{fullName || "Loading..."}</b>!
          <p className="pp">Congratulations, You got a great response today.</p>
        </h2>
        <button className="share-btn">
          <img src="share.png" alt="Share Icon" /> <a href="https://link-tree-eta-beryl.vercel.app/">Share </a>
        </button>
      </div>

      <nav className="phone-nav">
        <div className="navlogo">
          <img src="navlog.png"></img>
        </div>
        <div className="navav">
          <button onClick={() => setShowLogout(!showLogout)}><img src="ava.png"></img></button>

        </div>
        {showLogout && (
          <button className="logout-btn-ph" onClick={handleLogout}>
          <img src="out.png"></img> Sign out
          </button>
        )}

      </nav>

      {}
      <div className="dashboard-content">
        {activeSection === "Links" && (
          <>
            <div className="mobile-preview">
              <PhoneView
                bio={bio}
                userId={userId} 
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
                selectedLiTheme={selectedLiTheme}
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

        {activeSection === "Appearance" && (
          <>
            <div className="mobile-preview">
              <PhoneView
                bio={bio}
                userId={userId} 
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
                selectedLiTheme={selectedLiTheme}
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
                setSelectedTheme={setSelectedTheme}
                setSelectedLiTheme={setSelectedLiTheme}
              />
            </div>
          </>
        )}

      </div>
      {activeSection === "Analytics" && <Analytics/>}

{activeSection === "Settings" && <SettingComp/>}

    </div>
  );
};

export default DashContent;