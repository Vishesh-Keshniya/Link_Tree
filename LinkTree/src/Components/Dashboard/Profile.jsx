import React, { useState, useEffect } from "react";
import "./Profile.css";
import AddModal from "./modals/AddModal"; 
import EditModal from "./modals/EditModal"; 
import EditModalShop from "./modals/EditModalShop";

const Profile = () => {
  const [color, setColor] = useState("#000000");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditModalShop, setShowEditModalShop] = useState(false); // State for Shop edit modal
  const [activeTab, setActiveTab] = useState("link"); 
  const [links, setLinks] = useState([]); 
  const [showLinks, setShowLinks] = useState(true); 
  const [username, setUsername] = useState(""); 
  const [editEntry, setEditEntry] = useState(null); 

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        window.location.href = "/login";
        return;
      }

      const response = await fetch("http://localhost:3000/api/user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setUsername(data.user.username);
        const userLinks = [
          ...data.user.addLinks.map(link => ({ ...link, type: "link", saveMode: false })), // Add saveMode property
          ...data.user.addShop.map(shop => ({ ...shop, type: "shop", saveMode: false })) // Add saveMode property
        ];
        setLinks(userLinks);
      } else {
        console.error("Failed to fetch user data:", data.message);
        if (data.message === "Invalid token") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEditClick = (entry) => {
    if (entry.saveMode) {
      alert("Please turn off the save mode for this link to edit.");
      return;
    }
    setEditEntry(entry);
    if (entry.type === "link") {
      setShowEditModal(true); // Show EditModal for Link entries
      setShowEditModalShop(false);
    } else if (entry.type === "shop") {
      setShowEditModalShop(true); // Show EditModalShop for Shop entries
      setShowEditModal(false);
    }
  };

  const updateEntry = (updatedEntry) => {
    setLinks(links.map(link => (link._id === updatedEntry._id ? updatedEntry : link)));
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleAddLinkClick = () => {
    setActiveTab("link");
    setShowAddModal(true);
  };

  const handleAddShopClick = () => {
    setActiveTab("shop");
    setShowAddModal(true);
  };

  const toggleLink = (id) => {
    setLinks(links.map(link => link._id === id ? { ...link, active: !link.active } : link));
  };

  const toggleSaveMode = (id) => {
    setLinks(links.map(link => link._id === id ? { ...link, saveMode: !link.saveMode } : link));
  };

  const addNewEntry = (newEntry) => {
    setLinks([...links, { ...newEntry, saveMode: false }]); // Add saveMode property to new entry
  };

  const deleteLink = async (id) => {
    const linkToDelete = links.find((link) => link._id === id);
    if (linkToDelete.saveMode) {
      alert("Please turn off the save mode for this link to delete.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      console.log("Deleting link with ID:", id); // Debugging
      const response = await fetch(`http://localhost:3000/api/links/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      console.log("Delete response:", data); // Debugging
      if (data.success) {
        setLinks(links.filter((link) => link._id !== id)); // Update the state to remove the deleted link
      } else {
        console.error("Failed to delete link:", data.message);
        alert("Failed to delete link. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting link:", error);
      alert("An error occurred while deleting the link. Please try again.");
    }
  };
  const filteredLinks = links.filter(link => showLinks ? link.type === "link" : link.type === "shop");

  return (
    <div className="profile-container">
      <h3 className="bannp">Profile</h3>
      <div className="profile-card">
        <div className="profile-header">
          <div>
            <img src="ava.png" alt="User Avatar" className="profile-img" />
          </div>
          <div className="profile-header-btn">
            <button className="pick-image">Pick an image</button>
            <button className="remove-btn">Remove</button>
          </div>
        </div>

        <div className="profile-details">
          <div className="pt">
            <label>Profile Title</label>
            <label>{username}</label> 
          </div>
          <div>
            <div className="biopart">
              <label>Bio</label>
              <textarea placeholder="Add bio here" className="bioarea"></textarea>
              <p className="bio-count">0 / 80</p>
            </div>
          </div>
        </div>
      </div>

      <div className="add-section">
        <button 
          className={`add-link ${showLinks ? "active" : ""}`} 
          onClick={() => setShowLinks(true)}
          style={{ 
            backgroundColor: showLinks ? "#28A263" : "", 
            color: showLinks ? "white" : "black"  // ✅ White text when active
          }}
        >
          <img src="addlink.png" alt="" /> Add Link
        </button>
        
        <button 
          className={`add-shop ${!showLinks ? "active" : ""}`} 
          onClick={() => setShowLinks(false)}
          style={{ 
            backgroundColor: !showLinks ? "#28A263" : "", 
            color: !showLinks ? "white" : "black"  // ✅ White text when active
          }}
        >
          <img src="addlink.png" alt="" /> Add Shop
        </button>
        <button className="add-btn" onClick={showLinks ? handleAddLinkClick : handleAddShopClick}>+ Add</button>

        <ul className="link-list">
          {filteredLinks.map((link) => (
            <li key={link._id} className="link-card">
              <div className="link-content">
                <div className="link-header">
                  <strong>{link.tag}</strong>
                  <button 
                    onClick={() => {
                      if (link.saveMode) {
                        alert("Please turn off the save mode for this link to edit.");
                      } else {
                        handleEditClick(link);
                      }
                    }}
                  >
                    <img src="edit.png" alt="Edit" />
                  </button>
                </div> 
                <div className="link-url">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                  <button 
                    onClick={() => {
                      if (link.saveMode) {
                        alert("Please turn off the save mode for this link to edit.");
                      } else {
                        handleEditClick(link);
                      }
                    }}
                  >
                    <img src="edit.png" alt="Edit" />
                  </button>
                </div>
                <div className="link-stats">
                  <img src="clicks.png" alt="Clicks" /> {link.clicks || 0} clicks
                </div>
              </div>
              <div className="link-actions">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={link.saveMode}
                    onChange={() => toggleSaveMode(link._id)}
                  />
                  <span className="slider round"></span>
                </label>
                <button 
                  onClick={() => {
                    if (link.saveMode) {
                      alert("Please turn off the save mode for this link to delete.");
                    } else {
                      deleteLink(link._id);
                    }
                  }}
                >
                  <img src="del.png" alt="Delete" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="bann">Banner</h3>
      <div className="banner-card">
        <div className="banner-preview">
          <div className="banner">
            <img src="bannerpic.png" alt="User Avatar" className="banner-pic" />
            <h4 className="aname">@opopo_08</h4>
            <p className="sname">/opopo_08</p>
          </div>
        </div>

        <div className="bg-selector">
          <p>Custom Background Color</p>
          <div className="color-options">
            <span className="color-circle black"></span>
            <span className="color-circle white"></span>
            <span className="color-circle brown"></span>
          </div>
          <div className="color-picker">
            <div className="color-box" style={{ backgroundColor: color }} onClick={() => document.getElementById("colorInput").click()}></div>
            <input type="color" id="colorInput" value={color} onChange={handleColorChange} className="hidden-color-input" />
            <input type="text" value={color} className="color-code" />
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddModal 
          closeModal={() => setShowAddModal(false)} 
          activeTab={activeTab} 
          addNewEntry={addNewEntry} 
        />
      )}

      {showEditModal && (
        <EditModal
          closeModal={() => setShowEditModal(false)}
          entry={editEntry}
          updateEntry={updateEntry} 
        />
      )}

      {showEditModalShop && (
        <EditModalShop
          closeModal={() => setShowEditModalShop(false)}
          entry={editEntry}
          updateEntry={updateEntry} 
        />
      )}
    </div>
  );
};

export default Profile;