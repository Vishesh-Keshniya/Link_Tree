import React, { useState, useRef, useEffect } from "react";
import "./Appearance.css";

function Appearance({
  setLayout,
  setShadowStyle,
  setBorderStyle,
  setButtonStyle,
  setLinkBgColor,
  setLinkFontColor,
  setFont,
  setPhoneFontColor,
  setSelectedTheme,
  setSelectedLiTheme,
}) {
  // State for layout
  const [isLoading, setIsLoading] = useState(true);

  // State for layout
  const [activeLayout, setActiveLayoutState] = useState(null); // 🚀 Default to null

  // State for colors
  const [linkBgColor, setLocalLinkBgColor] = useState("");
  const [linkFontColor, setLocalLinkFontColor] = useState("");
  const [phoneFontColor, setLocalPhoneFontColor] = useState("");

  // State for fonts
  const [selectedFont, setSelectedFont] = useState("");
  const [showDropdown, setShowDropdown] = useState("");

  // State for themes
  const [isThemeActive, setIsThemeActive] = useState(false);
  const [selectedTheme, setSelectedThemeState] = useState("");
  const [selectedLiTheme, setSelectedLiThemeState] = useState("");

  // State for button style and shadow style
  const [buttonStyle, setLocalButtonStyle] = useState("");
  const [shadowStyle, setLocalShadowStyle] = useState("");
  // Refs for color pickers
  const linkBgColorInputRef = useRef(null);
  const linkFontColorInputRef = useRef(null);
  const phoneFontColorInputRef = useRef(null);


  
  // Fetch saved settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("https://linktree-backend-0abv.onrender.com/api/get-appearance", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        
        if (data.settings) {
          setActiveLayoutState(data.settings.layout);
          setLayout(data.settings.layout); // ✅ Sync with parent
          
          setLocalLinkBgColor(data.settings.linkBgColor);
          setLinkBgColor(data.settings.linkBgColor); // ✅ Sync with parent
          
          setLocalLinkFontColor(data.settings.linkFontColor);
          setLinkFontColor(data.settings.linkFontColor); // ✅ Sync with parent
          
          setLocalPhoneFontColor(data.settings.phoneFontColor);
          setPhoneFontColor(data.settings.phoneFontColor); // ✅ Sync with parent
          
          setSelectedFont(data.settings.selectedFont);
          setFont(data.settings.selectedFont); // ✅ Sync with parent
          
          setSelectedThemeState(data.settings.selectedTheme || "");
          setSelectedTheme(data.settings.selectedTheme || ""); // ✅ Sync with parent
          
          setSelectedLiThemeState(data.settings.selectedLiTheme || "");
          setSelectedLiTheme(data.settings.selectedLiTheme || ""); // ✅ Sync with parent
          
          setLocalButtonStyle(data.settings.buttonStyle || "solid");
          setButtonStyle(data.settings.buttonStyle || "solid"); // ✅ Sync with parent
          
          setLocalShadowStyle(data.settings.shadowStyle || "soft");
          setShadowStyle(data.settings.shadowStyle || "soft"); // ✅ Sync with parent
          
          setIsThemeActive(!!data.settings.selectedTheme);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
  
    fetchSettings();
  }, []);
  

  // Handle layout change
  const handleLayoutChange = (layoutType) => {
    setActiveLayoutState(layoutType);
    setLayout(layoutType);
  };

  // Handle font selection
  const handleFontSelect = (font) => {
    setSelectedFont(font);
    setFont(font);
    setShowDropdown(false);
  };
  // Handle button style change
const handleButtonStyleChange = (style) => {
  setLocalButtonStyle(style); // Update local state
  setButtonStyle(style); // Update parent component state
};

// Handle shadow style change

  // Handle theme change
  const handleThemeChange = (theme, liTheme) => {
    setSelectedThemeState(theme); // Update local theme state
    setSelectedLiThemeState(liTheme); // Update local link theme state
    setSelectedTheme(theme); // Update parent component state
    setSelectedLiTheme(liTheme); // Update parent component state
    setIsThemeActive(true); // Activate theme
  };

  // Handle link background color change
  const handleLinkBgColorClick = () => {
    setIsThemeActive(false);
    linkBgColorInputRef.current?.click();
  };

  // Handle link font color change
  const handleLinkFontColorClick = () => linkFontColorInputRef.current?.click();

  // Handle phone font color change
  const handlePhoneFontColorClick = () => phoneFontColorInputRef.current?.click();

  // Save appearance settings
  const saveAppearanceSettings = async () => {
    const settings = {
      layout: activeLayout,
      shadowStyle: shadowStyle, // Use local shadow style state
      borderStyle: "rounded", // Use local border style state (if applicable)
      buttonStyle: buttonStyle, // Use local button style state
      linkBgColor,
      linkFontColor,
      phoneFontColor,
      selectedFont,
      selectedTheme, // Use local theme state
      selectedLiTheme, // Use local link theme state
    };
  
    console.log("Sending settings:", settings); // Log the settings object
  
    try {
      const response = await fetch("https://linktree-backend-0abv.onrender.com/api/save-appearance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ settings }),
      });
  
      const data = await response.json(); // Parse the response body
  
      if (response.ok) {
        alert("Settings saved successfully!");
      } else {
        console.error("Backend error:", data.message || "Unknown error");
        alert(`Failed to save settings: ${data.message}`);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("An error occurred while saving settings.");
    }
  };
  return (
    <div className="al-container">
      {/* Layout Section */}
      <div className="layout-app">
        <h1>Layout</h1>
        <div className="lay-contaier">
          <div className="lay-part">
            <button
              className={`lay-btn ${activeLayout === "stack" ? "active" : ""}`}
              onClick={() => handleLayoutChange("stack")}
            >
              <img src="stack.png" alt="Stack" />
            </button>
            Stack
          </div>
          <div className="lay-part">
            <button
              className={`lay-btn ${activeLayout === "grid" ? "active" : ""}`}
              onClick={() => handleLayoutChange("grid")}
            >
              <img src="grid.png" alt="Grid" />
            </button>
            Grid
          </div>
          <div className="lay-part">
            <button
              className={`lay-btn ${activeLayout === "carousel" ? "active" : ""}`}
              onClick={() => handleLayoutChange("carousel")}
            >
              <img src="car.png" alt="Carousel" />
            </button>
            Carousel
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="buttons-app">
        <h1>Buttons</h1>
        <div className="buttons-container">
          {/* Fill Buttons */}
          <div className="textss">Fill</div>
          <div className="button-row">
            <button className="button-fill solid" onClick={() => handleButtonStyleChange("solid")}>
              <img src="1.png" alt="Solid" />
            </button>
            <button className="button-fill solid-round" onClick={() => handleButtonStyleChange("solid-round")}>
              <img src="2.png" alt="Solid Round" />
            </button>
            <button className="button-fill outlined-round" onClick={() => handleButtonStyleChange("round")}>
              <img src="3.png" alt="Outlined Round" />
            </button>
          </div>

          {/* Outline Buttons */}
          <div className="textss">Outline</div>
          <div className="button-row">
            <button className="button-outline" onClick={() => handleButtonStyleChange("out")}>
              <img src="21.png" alt="Outline" />
            </button>
            <button className="button-outline-round" onClick={() => handleButtonStyleChange("outr")}>
              <img src="22.png" alt="Outline Round" />
            </button>
            <button className="button-outline-thick" onClick={() => handleButtonStyleChange("outtt")}>
              <img src="23.png" alt="Outline Thick" />
            </button>
          </div>

          {/* Hard Shadow Buttons */}
          <div className="textss">Hard Shadow</div>
          <div className="button-row">
            <button className="button-hard-shadow" onClick={() => handleButtonStyleChange("hs1")}>
              <img src="31.png" alt="Hard Shadow" />
            </button>
            <button className="button-hard-shadow-round" onClick={() => handleButtonStyleChange("hs2")}>
              <img src="32.png" alt="Hard Shadow Round" />
            </button>
            <button className="button-hard-shadow-thick" onClick={() => handleButtonStyleChange("hs3")}>
              <img src="33.png" alt="Hard Shadow Thick" />
            </button>
          </div>

          {/* Soft Shadow Buttons */}
          <div className="textss">Soft Shadow</div>
          <div className="button-row">
            <button className="button-soft-shadow" onClick={() => handleButtonStyleChange("bs1")}>
            <img src="41.png" alt="Double Outline" />
            </button>
            
            <button className="button-soft-shadow-round" onClick={() => handleButtonStyleChange("bs2")}>
            <img src="42.png" alt="Double Outline" />
            </button>
            <button className="button-soft-shadow-dotted" onClick={() => handleButtonStyleChange("bs3")}>
            <img src="43.png" alt="Double Outline" />
            </button>
          </div>

          {/* Special Buttons */}
          <div className="textss">Special</div>
          <div className="button-row">
            <button className="button-special-wavy" onClick={() => handleButtonStyleChange("button-special-wavy")}>
              <img src="51.png" alt="Wavy" />
            </button>
            <button className="button-special-zigzag" onClick={() => handleButtonStyleChange("button-special-zigzag")}>
              <img src="52.png" alt="Zigzag" />
            </button>
            <button className="button-special-double-outline" onClick={() => handleButtonStyleChange("button-special-double-outline")}>
              <img src="53.png" alt="Double Outline" />
            </button>
          </div>
          <div className="button-row">
            <button className="button-special-solid-rounded" onClick={() => handleButtonStyleChange("sfr")}>
            <img src="61.png" alt="Filled" />
            </button>
            <button className="button-special-thin-outline" onClick={() => handleButtonStyleChange("srg")}>
              <img src="62.png" alt="Thin Outline" />
            </button>
            <button className="button-special-filled" onClick={() => handleButtonStyleChange("sf")}>
              <img src="63.png" alt="Filled" />
            </button>
          </div>

          {/* Button Color Pickers */}
          <div className="color-picker">
            <label className="color-picker-label">Link Background Color</label>
            <div className="color-picker-container">
              <div
                className="color-preview-app"
                style={{ backgroundColor: linkBgColor }}
                onClick={handleLinkBgColorClick}
              ></div>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  ref={linkBgColorInputRef}
                  value={isThemeActive ? "none" : linkBgColor}
                  onChange={(e) => {
                    if (!isThemeActive) {
                      setLocalLinkBgColor(e.target.value);
                      setLinkBgColor(e.target.value);
                    }
                  }}
                  className="color-input"
                  disabled={isThemeActive}
                />
                <span className="color-placeholder">{linkBgColor}</span>
              </div>
            </div>
          </div>

          <div className="color-picker">
            <label className="color-picker-label">Link Font Color</label>
            <div className="color-picker-container">
              <div
                className="color-preview"
                style={{ backgroundColor: linkFontColor }}
                onClick={handleLinkFontColorClick}
              ></div>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  ref={linkFontColorInputRef}
                  value={linkFontColor}
                  onChange={(e) => {
                    setLocalLinkFontColor(e.target.value);
                    setLinkFontColor(e.target.value);
                  }}
                  className="color-input"
                />
                <span className="color-placeholder">{linkFontColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Font Section */}
        <h2 className="title">Fonts</h2>
        <div className="font-app">
          <div className="font-box" onClick={() => setShowDropdown(!showDropdown)}>
            <div className="font-content">
              <div className="font-preview">Aa</div>
              <span className="font-name" style={{ fontFamily: selectedFont }}>
                {selectedFont}
              </span>
            </div>
          </div>

          {showDropdown && (
            <ul className="dropdown">
              {["DM Sans", "Poppins", "Roboto", "Montserrat", "Lato", "Open Sans"].map((font, index) => (
                <li key={index} onClick={() => handleFontSelect(font)} style={{ fontFamily: font }}>
                  {font}
                </li>
              ))}
            </ul>
          )}

          <div className="color-picker">
            <label className="color-picker-label">Font Color</label>
            <div className="color-picker-container">
              <div
                className="color-preview"
                style={{ backgroundColor: phoneFontColor }}
                onClick={handlePhoneFontColorClick}
              ></div>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  ref={phoneFontColorInputRef}
                  value={phoneFontColor}
                  onChange={(e) => {
                    setLocalPhoneFontColor(e.target.value);
                    setPhoneFontColor(e.target.value);
                  }}
                  className="color-input"
                />
                <span className="color-placeholder">{phoneFontColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <h2 className="title">Theme</h2>
        <div className="theme-container">
          <button className="theme-button air-snow" onClick={() => handleThemeChange("airsnow", "airsnowli")}>
            <img src="t1.png" alt="Air Snow" className="theme-img" />
            <span className="theme-label">Air Snow</span>
          </button>

          <button className="theme-button air-grey" onClick={() => handleThemeChange("airgrey", "airgreyli")}>
            <img src="t2.png" alt="Air Grey" className="theme-img" />
            <span className="theme-label">Air Grey</span>
          </button>

          <button className="theme-button air-smoke" onClick={() => handleThemeChange("airsmoke", "airsmokeli")}>
            <img src="t3.png" alt="Air Smoke" className="theme-img" />
            <span className="theme-label">Air Smoke</span>
          </button>

          <button className="theme-button air-black" onClick={() => handleThemeChange("airblack", "airblackli")}>
            <img src="t4.png" alt="Air Black" className="theme-img" />
            <span className="theme-label">Air Black</span>
          </button>

          <button className="theme-button mineral-blue" onClick={() => handleThemeChange("mineralblue", "mineralblueli")}>
            <img src="t5.png" alt="Mineral Blue" className="theme-img" />
            <span className="theme-label">Mineral Blue</span>
          </button>

          <button className="theme-button mineral-green" onClick={() => handleThemeChange("mineralgreen", "mineralgreenli")}>
            <img src="t6.png" alt="Mineral Green" className="theme-img" />
            <span className="theme-label">Mineral Green</span>
          </button>

          <button className="theme-button mineral-orange" onClick={() => handleThemeChange("mineralorange", "mineralorangeli")}>
            <img src="t7.png" alt="Mineral Orange" className="theme-img" />
            <span className="theme-label">Mineral Orange</span>
          </button>

          <button className="theme-button mineral-yellow" onClick={() => handleThemeChange("mineralyellow", "mineralyellowli")}>
            <img src="t8.png" alt="Mineral Yellow" className="theme-img" />
            <span className="theme-label">Mineral Yellow</span>
          </button>
        </div>

        {/* Save Button */}
       <div className="savedi"> <button className="appsave" onClick={saveAppearanceSettings}>Save</button></div>
      </div>
    </div>
  );
}

export default Appearance;