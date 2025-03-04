import React, { useState } from "react";
import "./AddModal.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
        toast.success("✅ Entry added successfully!", { autoClose: 2000 });
        setTimeout(() => {
          closeModal(); // Close the modal
          window.location.reload(); // Refresh the page
        }, 2000);
      } else {
        toast.error(`❌ Failed to add entry: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ An error occurred while adding the entry.");
    }
  };
  

  const handleToggleChange = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      handleSubmit(); 
    }
  };

  const handleAppClick = (appName) => {
    setSelectedApp(appName); 
    setError(""); 
  };

  const handleDeleteClick = () => {
    setLinkTitle(""); 
    setLinkUrl(""); 
    setSelectedApp(""); 
    setError(""); 
  };

  const handleCopyClick = () => {
    if (linkUrl) {
      navigator.clipboard.writeText(linkUrl) 
        .then(() => toast.success("✅ Link copied to clipboard!", { autoClose: 2000 }))
        .catch(() => toast.error("❌ Failed to copy link."));
    } else {
      toast.warning("⚠️ No link to copy.");
    }
  };
  

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="modal-container">
        {}
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

        {}
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

              {}
              <div className="toggle-container">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={handleToggleChange} 
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
              {}
              <button type="button" onClick={handleCopyClick}>
                <img src="copy.png" alt="Copy" />
              </button>
              {}
              <button type="button" onClick={handleDeleteClick}>
                <img src="del.png" alt="Delete" />
              </button>
            </div>

            <h4>Applications</h4>

            {}
            {currentTab === "link" && (
              <div className="app-grid">
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "Instagram" ? "selected" : ""}`}
                    onClick={() => handleAppClick("Instagram")} 
                  >
                    <img src="instr.png" alt="Instagram" />
                  </button> 
                  <p>Instagram</p>
                </div>
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "Facebook" ? "selected" : ""}`}
                    onClick={() => handleAppClick("Facebook")} 
                  >
                    <img src="fb.png" alt="Facebook" />
                  </button> 
                  <p>Facebook</p>
                </div>
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "YouTube" ? "selected" : ""}`}
                    onClick={() => handleAppClick("YouTube")} 
                  >
                    <img src="ytr.png" alt="YouTube" />
                  </button> 
                  <p>YouTube</p>
                </div>
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "X" ? "selected" : ""}`}
                    onClick={() => handleAppClick("X")} 
                  >
                    <img src="x.png" alt="X" />
                  </button> 
                  <p>X</p>
                </div>
              </div>
            )}

            {}
            {currentTab === "shop" && (
              <div className="app-grid-shop">
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "Swiggi" ? "selected" : ""}`}
                    onClick={() => handleAppClick("Swiggi")} 
                  >
                    <img src="swiggi.png" alt="Swiggi" />
                  </button> 
                  <p>Swiggi</p>
                </div>
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "Flipkart" ? "selected" : ""}`}
                    onClick={() => handleAppClick("Flipkart")} 
                  >
                    <img src="flipkart.png" alt="Flipkart" />
                  </button> 
                  <p>Flipkart</p>
                </div>
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "Zomato" ? "selected" : ""}`}
                    onClick={() => handleAppClick("Zomato")} 
                  >
                    <img src="zomato.png" alt="Zomato" />
                  </button> 
                  <p>Zomato</p>
                </div>
                <div className="modal-ic">
                  <button 
                    type="button" 
                    className={`ic-btn ${selectedApp === "Other" ? "selected" : ""}`}
                    onClick={() => handleAppClick("Other")} 
                  >
                    <img src="shop.png" alt="Other" />
                  </button> 
                  <p>Other</p>
                </div>
              </div>
            )}

            {}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModal;