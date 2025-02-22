import React from "react";
import "./PhoneView.css";

const PhoneView = () => {
  return (
    <div className="phone-container">
      {/* Mobile Header */}
     

      {/* Profile Section */}
      <div className="phone-profile">
      <div className="phone-header">
        <button className="share-btn-ph"><img src="shareicon.png"></img></button>
      </div>
        <img src="ava.png" alt="User Avatar" className="profile-img" />
        <h3 className="phonetitle">@opopo_08</h3>
      </div>

      {/* Navigation Buttons */}
      <div className="phone-buttons">
        <button className="btn-link">link</button>
        <button className="btn-shop">Shop</button>
      </div>

      {/* Links Section */}
      <div className="phone-links">
        <div className="link-item youtube">
          <img src="ytr.png" alt="YouTube" />
          <span>Latest YouTube Video</span>
        </div>
        <div className="link-item instagram">
          <img src="instr.png" alt="Instagram" />
          <span>Latest Instagram Reel</span>
        </div>
      </div>


      {/* Connect Button */}
      <div className="phone-connect">
      <button className="connect-btn">Get Connected</button>

      {/* Branding */}
      <p className="spark-logo"><img src="sparklogo.png"></img> SPARK</p>
      </div>
    </div>
  );
};

export default PhoneView;
