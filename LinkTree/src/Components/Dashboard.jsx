import React, { useEffect, useState } from "react"; 
import Sidebar from "./Sidebar";
import DashContent from "./Dashboard/Dashcontent";
import PhoneView from "./Dashboard/PhoneView"; 
import "./Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("Links"); 
  const [showPhoneView, setShowPhoneView] = useState(false); 
  const [userId, setUserId] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [bio, setBio] = useState("");
  const [phoneHeaderColor, setPhoneHeaderColor] = useState("#FFFFFF");
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. User not authenticated.");
          setLoading(false);
          return;
        }

        const response = await fetch("https://linktree-backend-0abv.onrender.com/api/user-details", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        console.log("API Response:", data); 

        if (data.success && data.user) {
          setUserId(data.user._id || ""); 
          setBio(data.user.bio || "");
        } else {
          console.error("Invalid user data received:", data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

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
              userId={userId} 
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
            userId={userId} // ✅ Pass userId to PhoneView
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
