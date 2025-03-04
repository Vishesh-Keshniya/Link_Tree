import React, { useState, useEffect } from "react";
import "./Profile.css";
import AddModal from "./modals/AddModal"; 
import EditModal from "./modals/EditModal"; 
import EditModalShop from "./modals/EditModalShop";


const Profile = ({ bio, setBio , phoneHeaderColor, setPhoneHeaderColor }) => {
  const [color, setColor] = useState("#F8F8F8");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditModalShop, setShowEditModalShop] = useState(false);
  const [activeTab, setActiveTab] = useState("link"); 
  const [links, setLinks] = useState([]); 
  const [showLinks, setShowLinks] = useState(() => localStorage.getItem("activeTab") !== "shop");
  const [profileImage, setProfileImage] = useState("ava.png"); 
  const [username, setUsername] = useState(""); 
  const [editEntry, setEditEntry] = useState(null); 
  useEffect(() => {
    localStorage.setItem("activeTab", showLinks ? "link" : "shop");
  }, [showLinks]);

  useEffect(() => {
    fetchUserData();
  }, []);


  useEffect(() => {
    fetchUserData();
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        window.location.href = "/login";
        return;
      }

      const response = await fetch("https://linktree-backend-0abv.onrender.com/api/user", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setUsername(data.user.username || "");  // ✅ Ensure it's never null
        setBio(data.user.bio || "");  // ✅ Ensure it's never null
        setProfileImage(data.user.image || "ava.png"); 
        setPhoneHeaderColor(data.user.settings.phoneHeaderColor || "#FFFFFF");

        const userLinks = [
          ...data.user.addLinks.map(link => ({ ...link, type: "link", saveMode: false })), 
          ...data.user.addShop.map(shop => ({ ...shop, type: "shop", saveMode: false }))
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

  const deleteLink = async (id, type) => {
    const linkToDelete = links.find((link) => link._id === id);
    if (!linkToDelete) {
      alert("Error: Entry not found.");
      return;
    }
  
    if (linkToDelete.saveMode) {
      alert("Please turn off the save mode before deleting.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      console.log("Deleting entry:", id, "Type:", type);
  
      const response = await fetch(`https://linktree-backend-0abv.onrender.com/api/entries/${id}?type=${type}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      console.log("Delete response:", data);
  
      if (data.success) {
        setLinks(links.filter((link) => link._id !== id)); // Update the state
      } else {
        console.error("Failed to delete:", data.message);
        alert("Failed to delete. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("An error occurred while deleting. Please try again.");
    }
  };
  
  const filteredLinks = links.filter(link => showLinks ? link.type === "link" : link.type === "shop");

  const handleLinkClick = async (linkId, type) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized. Please log in.");
        return;
      }
  
      // Send request to API to increment clicks
      const response = await fetch("https://linktree-backend-0abv.onrender.com/api/increment-clicks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ linkId, type }),
      });
  
      const data = await response.json();
      
      if (!data.success) {
        console.error("Error incrementing clicks:", data.message);
        return;
      }
  
      // ✅ Update click count in the state
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link._id === linkId ? { ...link, clicks: (link.clicks || 0) + 1 } : link
        )
      );
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  const handlePhoneHeaderColorChange = (e) => {
    setPhoneHeaderColor(e.target.value); // ✅ Updates Phone Header in real-time
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized. Please log in.");
        return;
      }
  
      const formData = new FormData();
      formData.append("image", file);
  
      const uploadRes = await fetch("https://linktree-backend-0abv.onrender.com/api/upload-profile-image", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
  
      const data = await uploadRes.json();
      if (data.success) {
        console.log("Uploaded Image URL:", data.image);
        
        // ✅ Store new image in local storage
        localStorage.setItem("profileImage", data.image);
  
        // ✅ Refresh the page after image upload
        window.location.reload();  // Force refresh after setting image
      } else {
        console.error("Image upload failed:", data);
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  const handleRemoveImage = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized. Please log in.");
        return;
      }
  
      const response = await fetch("https://linktree-backend-0abv.onrender.com/api/remove-profile-image", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
  
      const data = await response.json();
      if (data.success) {
        console.log("Profile image removed successfully");
  
        // ✅ Reset profile image to default
        setProfileImage("ava.png");
  
        // ✅ Remove from localStorage
        localStorage.removeItem("profileImage");
  
        // ✅ Refresh the page
        window.location.reload();
      } else {
        console.error("Failed to remove image:", data.message);
        alert("Failed to remove image. Please try again.");
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };
  

  const handleSaveSettings = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized. Please log in.");
        return;
      }

      const response = await fetch("https://linktree-backend-0abv.onrender.com/api/update-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phoneHeaderColor, bio }),
      });

      const data = await response.json();
      if (data.success) {
        window.location.reload();
        alert("Settings saved successfully!");
      } else {
        alert("Failed to save settings. Please try again.");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };
  
  return (
    <div className="profile-container">
      <h3 className="bannp">Profile</h3>
      <div className="profile-card">
        <div className="profile-header">
          <div>
          <img
  src={profileImage}
  alt="User Avatar"
  className="profile-img"
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = "https://linktree-backend-0abv.onrender.com/uploads/ava.png"; // Fallback image
  }}
/>

          </div>
          <div className="profile-header-btn">
          <input
  type="file"
  accept="image/*"
  className="custom-file-input"
  onChange={handleImageUpload}
/>


            <button className="remove-btn" onClick={handleRemoveImage}>Remove</button>
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
              <textarea
                placeholder="Add bio here"
                className="bioarea"
                value={bio} 
                onChange={(e) => setBio(e.target.value)} // ✅ Updates in real-time
              ></textarea>

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
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick(link._id, link.type)}
                  >
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
      deleteLink(link._id, link.type); // ✅ Pass the type here
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
          <div className="banner"  style={{ backgroundColor: phoneHeaderColor }}>
            <img src={profileImage} alt="User Avatar" className="banner-pic" />
            <h4 className="aname">@{username}</h4>
            <p className="sname">{bio}</p>
          </div>
        </div>

        <div className="bg-selector">
          <p>Custom Background Color</p>
          <div className="color-options">
            <span className="color-circle black" onClick={() => setPhoneHeaderColor("#000000")}></span>
            <span className="color-circle white" onClick={() => setPhoneHeaderColor("#FFFFFF")}></span>
            <span className="color-circle brown" onClick={() => setPhoneHeaderColor("#302600")}></span>
          </div>
          <div className="color-picker-p">
          <div className="color-box" 
             style={{ backgroundColor: phoneHeaderColor }} 
             onClick={() => document.getElementById("phoneHeaderColorInput").click()}></div>
            <input type="color" 
               id="phoneHeaderColorInput" 
               value={phoneHeaderColor} 
               onChange={handlePhoneHeaderColorChange} 
               className="hidden-color-input" />
        <input type="text" value={phoneHeaderColor} className="color-code" readOnly />
          </div>
          
        </div>
        
      </div>

      <div className="save-part">
       <button className="save_btn" onClick={handleSaveSettings}>Save</button>
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