import React, { useState, useEffect } from "react";
import "./EditModal.css";

const EditModal = ({ closeModal, activeTab, addNewEntry, entry, updateEntry }) => {
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [currentTab, setCurrentTab] = useState(activeTab || "link");
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(""); // New state for icon
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  // **Load data when editing an entry**
  useEffect(() => {
    if (entry) {
      setIsEditing(true);
      setLinkTitle(entry.title || "");
      setLinkUrl(entry.url || "");
      setSelectedApp(entry.tag || "");
      setSelectedIcon(entry.icon || ""); // Load icon if available
      setCurrentTab(entry.type || "link");
      setIsEnabled(entry.enabled || false);
    }
  }, [entry]);

  // **Close modal when clicking outside**
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay-edit")) {
      closeModal();
    }
  };

  // **Validate form before submitting**
  const validateForm = () => {
    if (!selectedApp) {
      setError("Please select an application.");
      return false;
    }
    setError("");
    return true;
  };

  // **Handle updating an existing entry**
  const handleUpdate = async () => {
    if (!validateForm()) return;

    const updatedEntry = {
      ...entry,
      title: linkTitle,
      url: linkUrl,
      tag: selectedApp,
      icon: selectedIcon, // Include icon in update
      type: currentTab,
      enabled: isEnabled,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/edit-entry/${entry._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEntry),
      });

      const data = await response.json();
      if (data.success) {
        updateEntry(updatedEntry);
        alert("Entry updated successfully!");
        closeModal();
      } else {
        alert("Failed to update entry: " + data.message);
      }
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  return (
    <div className="modal-overlay-edit" onClick={handleOverlayClick}>
      <div className="modal-container-edit">
        <div className="tab-container-edit">
          <button className={`tab-btn-edit ${currentTab === "link" ? "active" : ""}`} onClick={() => setCurrentTab("link")}>
            <img src="addlink.png" alt="Add Link" /> Add Link
          </button>
        </div>

        <div className="modal-content-edit">
          <h3>Edit Entry Social Links</h3>

          <form>
            <div className="link-title-edit">
              <input
                className="ip-edit"
                type="text"
                placeholder="Title"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                required
              />
            </div>

            <div className="link-title-edit">
              <input
                className="ip-edit"
                type="text"
                placeholder="URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                required
              />
            </div>

            <h4>Applications <span className="required">*</span></h4>
            <div className="app-grid-edit">
              {["Instagram", "Facebook", "Youtube", "X"].map((app) => (
                <div className="modal-ic-edit" key={app}>
                  <button
                    type="button"
                    className={`ic-btn-edit ${selectedApp === app ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedApp(app);
                      setSelectedIcon(`${app.toLowerCase()}.png`); // Update icon based on selection
                    }}
                  >
                    <img src={`${app.toLowerCase()}.png`} alt={app} />
                  </button>
                  <p>{app}</p>
                </div>
              ))}
            </div>

            {error && <p className="error-message-edit">{error}</p>}
          </form>

          <div className="toggle-container-edit">
            <label className="switch-edit">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={isEditing ? handleUpdate : null} // Handle toggle
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
