import React, { useState, useRef } from "react";
import "./Appearance.css";


function Appearance({ setLayout, setShadowStyle, setBorderStyle ,setButtonStyle  })
{
  const [activeLayout, setActiveLayoutState] = useState("stack");

  
  const [buttonColor, setButtonColor] = useState("#ffffff"); // Button color state
  const [buttonFontColor, setButtonFontColor] = useState("#888888"); // Button font color state
  const buttonColorInputRef = useRef(null); // Ref for button color input
  const buttonFontColorInputRef = useRef(null); // Ref for button font color input


  const handleLayoutChange = (layoutType) => {
    setActiveLayoutState(layoutType);
    setLayout(layoutType); // Update state in `DashContent`
  };
  // Function to trigger color picker when clicking preview box
  const handleButtonColorClick = () => {
    if (buttonColorInputRef.current) {
      buttonColorInputRef.current.click();
    }
  };

  const handleButtonFontColorClick = () => {
    if (buttonFontColorInputRef.current) {
      buttonFontColorInputRef.current.click();
    }
  };

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
            <button className="button-fill solid"  onClick={() => setButtonStyle("button-fill solid")}><img src="1.png"></img></button>
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
            <label className="color-picker-label">Button Color</label>
            <div className="color-picker-container">
              <div
                className="color-preview"
                style={{ backgroundColor: buttonColor }}
                onClick={handleButtonColorClick}
              ></div>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  ref={buttonColorInputRef}
                  value={buttonColor}
                  onChange={(e) => setButtonColor(e.target.value)}
                  className="color-input"
                />
                <span className="color-placeholder">{buttonColor}</span>
              </div>
            </div>
          </div>

          {/* Button Font Color Picker */}
          <div className="color-picker">
            <label className="color-picker-label">Button Font Color</label>
            <div className="color-picker-container">
              <div
                className="color-preview"
                style={{ backgroundColor: buttonFontColor }}
                onClick={handleButtonFontColorClick}
              ></div>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  ref={buttonFontColorInputRef}
                  value={buttonFontColor}
                  onChange={(e) => setButtonFontColor(e.target.value)}
                  className="color-input"
                />
                <span className="color-placeholder">{buttonFontColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appearance;