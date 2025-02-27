import React, { useState, useRef } from "react";
import "./Appearance.css";

function Appearance({ setLayout, setShadowStyle, setBorderStyle, setButtonStyle, setLinkBgColor, setLinkFontColor, setFont, setPhoneFontColor, setSelectedTheme, setSelectedLiTheme }) {



  const [selectedFont, setSelectedFont] = useState("DM Sans");
  const [showDropdown, setShowDropdown] = useState(false);


  const [activeLayout, setActiveLayoutState] = useState("stack");

  
  const [linkBgColor, setLocalLinkBgColor] = useState("#D9D9D9");
  const [linkFontColor, setLocalLinkFontColor] = useState("#F5F5F3");
  const linkBgColorInputRef = useRef(null);
  const linkFontColorInputRef = useRef(null);
  const [phoneFontColor, setLocalPhoneFontColor] = useState("#000000");

  const phoneFontColorInputRef = useRef(null);

  const handleThemeChange = (theme, liTheme) => {
    setSelectedTheme(theme);
    setSelectedLiTheme(liTheme);
  };



  const handleFontSelect = (font) => {
    setSelectedFont(font);
    setFont(font); // Update state in DashContent
    setShowDropdown(false);
  };


  const handleLayoutChange = (layoutType) => {
    setActiveLayoutState(layoutType);
    setLayout(layoutType); // Update state in `DashContent`
  };
  // Function to trigger color picker when clicking preview box
  const handleLinkBgColorClick = () => linkBgColorInputRef.current?.click();
  const handleLinkFontColorClick = () => linkFontColorInputRef.current?.click();
  const handlePhoneFontColorClick = () => phoneFontColorInputRef.current?.click();

  return (
    <div>
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
            <button className="button-fill solid"  onClick={() => setButtonStyle("button-fill solid") }><img src="1.png"></img></button>
            <button className="button-fill solid-round"  onClick={() => setButtonStyle("button-fill solid-round")}><img src="2.png"></img></button>
            <button className="button-fill outlined-round" onClick={() => setButtonStyle("button-fill outlined-round")}><img src="3.png"></img></button>
          </div>

          {/* Outline Buttons */}
          <div className="textss">Outline</div>
          <div className="button-row">
            <button className="button-outline" onClick={() => setButtonStyle("button-outline")}><img src="21.png"></img></button>
            <button className="button-outline-round" onClick={() => setButtonStyle("button-outline-round")}><img src="22.png"></img></button>
            <button className="button-outline-thick" onClick={() => setButtonStyle("button-outline-thick")}><img src="23.png"></img></button>
          </div>

          {/* Hard Shadow Buttons */}
          <div className="textss">Hard Shadow</div>
          <div className="button-row">
            <button className="button-hard-shadow" onClick={() => setButtonStyle("button-hard-shadow")}><img src="31.png"></img></button>
            <button className="button-hard-shadow-round" onClick={() => setButtonStyle("button-hard-shadow-round")}><img src="32.png"></img></button>
            <button className="button-hard-shadow-thick" onClick={() => setButtonStyle("button-hard-shadow-thick")}><img src="33.png"></img></button>
          </div>

          {/* Soft Shadow Buttons */}
          <div className="textss">Soft Shadow</div>
          <div className="button-row">
            <button className="button-soft-shadow"  onClick={() => setButtonStyle("button-soft-shadow")}></button>
            <button className="button-soft-shadow-round" onClick={() => setButtonStyle("button-soft-shadow-round")}></button>
            <button className="button-soft-shadow-dotted" onClick={() => setButtonStyle("button-soft-shadow-dotted")}></button>
          </div>

          {/* Special Buttons */}
          <div className="textss">Special</div>
          <div className="button-row">
            <button className="button-special-wavy" onClick={() => setButtonStyle("button-special-wavy")}><img src="51.png"></img></button>
            <button className="button-special-zigzag" onClick={() => setButtonStyle("button-special-zigzag")}><img src="52.png"></img></button>
            <button className="button-special-double-outline" onClick={() => setButtonStyle("button-special-double-outline")}><img src="53.png"></img></button>
          </div>
          <div className="button-row">
            <button className="button-special-solid-rounded" onClick={() => setButtonStyle("button-special-solid-rounded")}></button>
            <button className="button-special-thin-outline" onClick={() => setButtonStyle("button-special-thin-outline")}><img src="62.png"></img></button>
            <button className="button-special-filled" onClick={() => setButtonStyle("button-special-filled")}><img src="63.png"></img></button>
          </div>

          {/* Button Color Picker */}
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
              value={linkBgColor}
              onChange={(e) => {
                setLocalLinkBgColor(e.target.value);
                setLinkBgColor(e.target.value); // Update global state
              }}
              className="color-input"
            />
            <span className="color-placeholder">{linkBgColor}</span>
              </div>
            </div>
          </div>

          {/* Button Font Color Picker */}
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



        <h2 className="title">Fonts</h2>

        <div className="font-app">
    

      {/* Font Selection */}
      <div className="font-box" onClick={() => setShowDropdown(!showDropdown)}>
        <div className="font-content">
          <div className="font-preview">Aa</div>
          <span className="font-name" style={{ fontFamily: selectedFont }}>
            {selectedFont}
          </span>
        </div>
      </div>

      {/* Dropdown for Font Selection */}
      {showDropdown && (
        <ul className="dropdown">
        {["DM Sans", "Poppins", "Roboto", "Montserrat", "Lato", "Open Sans"].map((font, index) => (
          <li key={index} onClick={() => handleFontSelect(font)} style={{ fontFamily: font }}>
            {font}
          </li>
        ))}
      </ul>
      )}

      {/* Color Picker Section */}
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
    setPhoneFontColor(e.target.value); // ✅ Update global font color
  }}
  
  className="color-input"
/>
            <span className="color-placeholder">{phoneFontColor}</span>
          </div>
        </div>
      </div>





      
    </div>






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

      </div>
    </div>
  );
}

export default Appearance;