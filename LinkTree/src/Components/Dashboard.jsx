import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashContent from "./Dashboard/Dashcontent";
import PhoneView from "./Dashboard/PhoneView"; // Import PhoneView component
import "./Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("Links"); // Default section
  const [showPhoneView, setShowPhoneView] = useState(false); // State to toggle PhoneView

  const [bio, setBio] = useState("");
  const [phoneHeaderColor, setPhoneHeaderColor] = useState("#000000");
  const [layout, setLayout] = useState(localStorage.getItem("layout") || "stack");
  const [shadowStyle, setShadowStyle] = useState(localStorage.getItem("shadowStyle") || "shadow-soft");
  const [borderStyle, setBorderStyle] = useState(localStorage.getItem("borderStyle") || "border-rounded");
  const [buttonStyle, setButtonStyle] = useState(localStorage.getItem("buttonStyle") || "button-fill");
  const [linkBgColor, setLinkBgColor] = useState(localStorage.getItem("linkBgColor") || "#FFFFFF");
  const [linkFontColor, setLinkFontColor] = useState(localStorage.getItem("linkFontColor") || "#000000");
  const [font, setFont] = useState(localStorage.getItem("font") || "DM Sans");
  const [phoneFontColor, setPhoneFontColor] = useState(localStorage.getItem("phoneFontColor") || "#D9D9D9");
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem("selectedTheme") || "air-snow");
  const [selectedLiTheme, setSelectedLiTheme] = useState(localStorage.getItem("selectedLiTheme") || "airsnowli");

  return (
    <div className="dash">
      {!showPhoneView ? (
        <>
          <div className="l">
            <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
          </div>
          <div className="r">
          <DashContent 
              activeSection={activeSection}
              setShowPhoneView={setShowPhoneView}
              bio={bio}
              setBio={setBio}
              phoneHeaderColor={phoneHeaderColor}
              setPhoneHeaderColor={setPhoneHeaderColor}
              layout={layout}
              setLayout={setLayout}
              shadowStyle={shadowStyle}
              setShadowStyle={setShadowStyle}
              borderStyle={borderStyle}
              setBorderStyle={setBorderStyle}
              buttonStyle={buttonStyle}
              setButtonStyle={setButtonStyle}
              linkBgColor={linkBgColor}
              setLinkBgColor={setLinkBgColor}
              linkFontColor={linkFontColor}
              setLinkFontColor={setLinkFontColor}
              font={font}
              setFont={setFont}
              phoneFontColor={phoneFontColor}
              setPhoneFontColor={setPhoneFontColor}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              selectedLiTheme={selectedLiTheme}
              setSelectedLiTheme={setSelectedLiTheme}
            />
          </div>
          <div className="p">
            <button className="ppp" onClick={() => setShowPhoneView(true)}>
              <img src="eye.png" alt="Preview" /> Preview
            </button>
          </div>
          <div className="d">
            <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
          </div>
        </>
      ) : (
        <div className="phone-view-container">
           <PhoneView 
            setShowPhoneView={setShowPhoneView}
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
            selectedLiTheme={selectedLiTheme}
          />
          <button className="close-btn" onClick={() => setShowPhoneView(false)}>X</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
