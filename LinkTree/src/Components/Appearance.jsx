import React, { useState, useRef } from "react";
import "./Appearance.css";

function Appearance() {
  const [activeLayout, setActiveLayout] = useState("stack");
  const [buttonColor, setButtonColor] = useState("#ffffff"); // Button color state
  const [buttonFontColor, setButtonFontColor] = useState("#888888"); // Button font color state
  const buttonColorInputRef = useRef(null); // Ref for button color input
  const buttonFontColorInputRef = useRef(null); // Ref for button font color input

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
              onClick={() => setActiveLayout("stack")}
            >
              <img src="stack.png" alt="Stack" />
            </button>
            Stack
          </div>
          <div className="lay-part">
            <button
              className={`lay-btn ${activeLayout === "grid" ? "active" : ""}`}
              onClick={() => setActiveLayout("grid")}
            >
              <img src="grid.png" alt="Grid" />
            </button>
            Grid
          </div>
          <div className="lay-part">
            <button
              className={`lay-btn ${activeLayout === "carousel" ? "active" : ""}`}
              onClick={() => setActiveLayout("carousel")}
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
            <button className="button-fill solid"></button>
            <button className="button-fill solid-round"></button>
            <button className="button-fill outlined-round"></button>
          </div>

          {/* Outline Buttons */}
          <div className="textss">Outline</div>
          <div className="button-row">
            <button className="button-outline"></button>
            <button className="button-outline-round"></button>
            <button className="button-outline-thick"></button>
          </div>

          {/* Hard Shadow Buttons */}
          <div className="textss">Hard Shadow</div>
          <div className="button-row">
            <button className="button-hard-shadow"></button>
            <button className="button-hard-shadow-round"></button>
            <button className="button-hard-shadow-thick"></button>
          </div>

          {/* Soft Shadow Buttons */}
          <div className="textss">Soft Shadow</div>
          <div className="button-row">
            <button className="button-soft-shadow"></button>
            <button className="button-soft-shadow-round"></button>
            <button className="button-soft-shadow-dotted"></button>
          </div>

          {/* Special Buttons */}
          <div className="textss">Special</div>
          <div className="button-row">
            <button className="button-special-wavy"></button>
            <button className="button-special-zigzag"></button>
            <button className="button-special-double-outline"></button>
          </div>
          <div className="button-row">
            <button className="button-special-solid-rounded"></button>
            <button className="button-special-thin-outline"></button>
            <button className="button-special-filled"></button>
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