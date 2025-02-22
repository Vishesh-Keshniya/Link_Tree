import React, { useState } from "react";
import "./AddModal.css";

const AddModal = ({ closeModal, activeTab }) => {
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab); // Track the active tab

  // Function to close modal if clicking outside
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        {/* Close button */}

        {/* Tabs for Add Link & Add Shop */}
        <div className="tab-container">
          <button 
            className={`tab-btn ${currentTab === "link" ? "active" : ""}`} 
            onClick={() => setCurrentTab("link")}
          >
            <img src="addlink.png" alt="Add Link" /> Add Link
          </button>
          <button 
            className={`tab-btn ${currentTab === "shop" ? "active" : ""}`} 
            onClick={() => setCurrentTab("shop")}
          >
            <img src="addlink.png" alt="Add Shop" /> Add Shop
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          <h3>{currentTab === "link" ? "Add a New Link" : "Add a New Shop"}</h3>

          <div className="link-title">
            <input
              className="ip"
              type="text"
              placeholder={currentTab === "link" ? "Link Title" : "Shop Title"}
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
            />
            
            {/* Toggle switch for both "Link" and "Shop" */}
            <div className="toggle-container">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isEnabled}
                  onChange={() => setIsEnabled(!isEnabled)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="link-title">
            <input
              className="ip"
              type="text"
              placeholder={currentTab === "link" ? "Link URL" : "Shop URL"}
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <button><img src="copy.png" alt="Copy" /></button>
            <button><img src="del.png" alt="Delete" /></button>
          </div>

          <h4>Applications</h4>

          {/* Show app-grid for "Add Link" */}
          {currentTab === "link" && (
            <div className="app-grid">
              <div className="modal-ic">
                <button className="ic-btn"><img src="instr.png" alt="Instagram" /></button> <p>Instagram</p>
              </div>
              <div className="modal-ic">
                <button className="ic-btn"><img src="fb.png" alt="Facebook" /></button> <p>Facebook</p>
              </div>
              <div className="modal-ic">
                <button className="ic-btn"><img src="ytr.png" alt="YouTube" /></button> <p>YouTube</p>
              </div>
              <div className="modal-ic">
                <button className="ic-btn"><img src="x.png" alt="X" /></button> <p>X</p>
              </div>
            </div>
          )}

          {/* Show app-grid-shop for "Add Shop" */}
          {currentTab === "shop" && (
            <div className="app-grid-shop">
              <div className="modal-ic">
                <button className="ic-btn"><img src="swiggi.png" alt="Swiggi" /></button> <p>Swiggi</p>
              </div>
              <div className="modal-ic">
                <button className="ic-btn"><img src="flipkart.png" alt="Flipkart" /></button> <p>Flipkart</p>
              </div>
              <div className="modal-ic">
                <button className="ic-btn"><img src="zomato.png" alt="Zomato" /></button> <p>Zomato</p>
              </div>
              <div className="modal-ic">
                <button className="ic-btn"><img src="shop.png" alt="Other" /></button> <p>Other</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddModal;
