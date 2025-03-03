import React, { useState } from "react";
import "./AddModal.css";

const AddModal = ({ closeModal, activeTab, addNewEntry }) => {
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab); 
  const [selectedApp, setSelectedApp] = useState(""); 
  const [error, setError] = useState(""); 

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  const handleSubmit = async () => {
    if (!selectedApp) {
      setError("Please select an application.");
      return;
    }
  
    if (!linkTitle || !linkUrl) {
      setError("Please fill in all fields.");
      return;
    }
  
    const iconMap = {
      Instagram: "instr.png",
      Facebook: "fb.png",
      YouTube: "ytr.png",
      X: "x.png",
      Swiggi: "swiggi.png",
      Flipkart: "flipkart.png",
      Zomato: "zomato.png",
      Other: "shop.png",
    };
  
    const entry = {
      title: linkTitle,
      url: linkUrl,
      type: currentTab, 
      tag: selectedApp,
      icon: iconMap[selectedApp] || "default.png",
    };
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized. Please log in.");
        return;
      }
  
      const response = await fetch("https://linktree-backend-0abv.onrender.com/api/add-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(entry),
      });
  
      const data = await response.json();
  
      if (data.success) {
        addNewEntry(entry); 
        alert("Entry added successfully!");
        closeModal(); // Close the modal
        window.location.reload(); // Refresh the page
      } else {
        alert("Failed to add entry: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the entry.");
    }
  };
  
  // Function to handle toggle switch change
  const handleToggleChange = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      handleSubmit(); // Submit the form when the toggle is enabled
    }
  };

  // Function to handle application icon click
  const handleAppClick = (appName) => {
    setSelectedApp(appName); // Set the selected application name
    setError(""); // Clear any previous error message
  };

  // Function to reset input fields
  const handleDeleteClick = () => {
    setLinkTitle(""); // Reset link title
    setLinkUrl(""); // Reset link URL
    setSelectedApp(""); // Reset selected app
    setError(""); // Clear any error message
  };

  // Function to copy the link URL to the clipboard
  const handleCopyClick = () => {
    if (linkUrl) {
      navigator.clipboard.writeText(linkUrl) // Copy the URL to the clipboard
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => alert("Failed to copy link."));
    } else {
      alert("No link to copy.");
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
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

          <form>
            <div className="link-title">
              <input
                className="ip"
                type="text"
                placeholder={currentTab === "link" ? "Link Title" : "Shop Title"}
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                required
              />
              
              {/* Toggle switch for both "Link" and "Shop" */}
              <div className="toggle-container">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={handleToggleChange} // Use the new handler
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
                required
              />
              {/* Copy Button */}
              <button type="button" onClick={handleCopyClick}>
                <img src="copy.png" alt="Copy" />
              </button>
              {/* Delete Button */}
              <button type="button" onClick={handleDeleteClick}>
                <img src="del.png" alt="Delete" />
              </button>
            </div>

            <h4>Applications</h4>

            {/* Show app-grid for "Add Link" */}
            {currentTab === "link" && (
              <div className="app-grid">
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "Instagram" ? "selected" : ""}`}
                    onClick={() => handleAppClick("Instagram")} // Handle Instagram click
                  >
                    <img src="instr.png" alt="Instagram" />
                  </button> 
                  <p>Instagram</p>
                </div>
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "Facebook" ? "selected" : ""}`}
                    onClick={() => handleAppClick("Facebook")} // Handle Facebook click
                  >
                    <img src="fb.png" alt="Facebook" />
                  </button> 
                  <p>Facebook</p>
                </div>
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "YouTube" ? "selected" : ""}`}
                    onClick={() => handleAppClick("YouTube")} // Handle YouTube click
                  >
                    <img src="ytr.png" alt="YouTube" />
                  </button> 
                  <p>YouTube</p>
                </div>
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "X" ? "selected" : ""}`}
                    onClick={() => handleAppClick("X")} // Handle X click
                  >
                    <img src="x.png" alt="X" />
                  </button> 
                  <p>X</p>
                </div>
              </div>
            )}

            {/* Show app-grid-shop for "Add Shop" */}
            {currentTab === "shop" && (
              <div className="app-grid-shop">
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "Swiggi" ? "selected" : ""}`}
                    onClick={() => handleAppClick("Swiggi")} // Handle Swiggi click
                  >
                    <img src="swiggi.png" alt="Swiggi" />
                  </button> 
                  <p>Swiggi</p>
                </div>
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "Flipkart" ? "selected" : ""}`}
                    onClick={() => handleAppClick("Flipkart")} // Handle Flipkart click
                  >
                    <img src="flipkart.png" alt="Flipkart" />
                  </button> 
                  <p>Flipkart</p>
                </div>
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "Zomato" ? "selected" : ""}`}
                    onClick={() => handleAppClick("Zomato")} // Handle Zomato click
                  >
                    <img src="zomato.png" alt="Zomato" />
                  </button> 
                  <p>Zomato</p>
                </div>
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "Other" ? "selected" : ""}`}
                    onClick={() => handleAppClick("Other")} // Handle Other click
                  >
                    <img src="shop.png" alt="Other" />
                  </button> 
                  <p>Other</p>
                </div>
              </div>
            )}

            {/* Display error message if no application is selected */}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModal;