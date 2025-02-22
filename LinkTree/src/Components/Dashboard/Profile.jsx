import React from "react";
import "./Profile.css";
import { useState } from "react";
const Profile = () => {
    const [color, setColor] = useState("#000000");

    const handleColorChange = (e) => {
      setColor(e.target.value);
    };
  return (
    <div className="profile-container">
      {/* Profile Section */}
      <h3 className="bannp">Profile</h3>
      <div className="profile-card">
       
        <div className="profile-header">
         <div> <img src="ava.png" alt="User Avatar" className="profile-img" /> </div>
       <div className="profile-header-btn" >  
         <button className="pick-image">Pick an image</button>
          <button className="remove-btn">Remove</button> </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
         <div className="pt"> <label>Profile Title</label>
          <input type="text" className="ptt" placeholder="add title here"  />
          </div>
        <div>
            
           <div className="biopart">   <label>Bio</label>
          <textarea placeholder="add bio here" className="bioarea"></textarea>
          <p className="bio-count">0 / 80</p>
          </div>
          </div>
        </div>
      </div>

      {/* Add Link/Shop Section */}
      <div className="add-section">
        <button className="add-link"><img src="addlink.png" alt="" /> Add Link</button>
        <button className="add-shop"><img src="shoplink.png"></img>Add Shop</button>
        <button className="add-btn">+ Add</button>
      </div>

      {/* Banner Section */}
      <h3 className="bann">Banner</h3>
      <div className="banner-card">
      
        <div className="banner-preview">
          <div className="banner">
            <img src="bannerpic.png" alt="User Avatar" className="banner-pic" />
            <h4 className="aname">@opopo_08</h4>
            <p className="sname">/opopo_08</p>
          </div>
        </div>

        {/* Background Color Selector */}
        <div className="bg-selector">
          <p>Custom Background Color</p>
          <div className="color-options">
            <span className="color-circle black"></span>
            <span className="color-circle white"></span>
            <span className="color-circle brown"></span>
          </div>
          <div className="color-picker">
      {/* Color Box */}
      <div
        className="color-box"
        style={{ backgroundColor: color }}
        onClick={() => document.getElementById("colorInput").click()}
      ></div>

      {/* Hidden Color Input */}
      <input
        type="color"
        id="colorInput"
        value={color}
        onChange={handleColorChange}
        className="hidden-color-input"
      />

      {/* Hex Code Display */}
      <input type="text" value={color} className="color-code" />
    </div>
        </div>

        {/* Save Button */}
       <div className="save-part"> <button className="save-btn">Save</button></div>
      </div>
    </div>
  );
};

export default Profile;
