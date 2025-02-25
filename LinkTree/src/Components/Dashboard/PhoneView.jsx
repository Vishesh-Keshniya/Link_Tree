import React, { useEffect, useState } from "react";
import "./PhoneView.css";

const PhoneView = ({ bio, phoneHeaderColor }) => {
  const [links, setLinks] = useState([]);
  const [shopLinks, setShopLinks] = useState([]);
  const [showShopLinks, setShowShopLinks] = useState(false);
  const [userName, setUserName] = useState("");

  // Fetch user details (name)
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      const response = await fetch("http://localhost:3000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await response.json();
      if (data.success) {
        setUserName(data.user.username || "User"); // ✅ Correctly access `username`
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  
  // Fetch regular links
  const fetchLinks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:3000/api/user-links", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setLinks(data.links);
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  // Fetch shop links
  const fetchShopLinks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:3000/api/user-links-shop", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setShopLinks(data.shopLinks);
      }
    } catch (error) {
      console.error("Error fetching shop links:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchLinks();
    const intervalId = setInterval(fetchLinks, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (showShopLinks) {
      fetchShopLinks();
    }
  }, [showShopLinks]);

  return (
    <div className="phone-container">
      {/* Profile Section */}
      <div className="phone-profile" style={{ backgroundColor: phoneHeaderColor }}>
        <div className="phone-header">
          <button className="share-btn-ph"><img src="shareicon.png" alt="Share" /></button>
        </div>
        <img src="ava.png" alt="User Avatar" className="profile-img" />
        <h3 className="phonetitle">@{userName || "User"}</h3>
        <p className="phone-bio">{bio}</p>
      </div>

      {/* Navigation Buttons */}
      <div className="phone-buttons">
        <button
          className={`btn-link ${!showShopLinks ? "active" : ""}`}
          onClick={() => setShowShopLinks(false)}
        >
          Links
        </button>
        <button
          className={`btn-shop ${showShopLinks ? "active" : ""}`}
          onClick={() => setShowShopLinks(true)}
        >
          Shop
        </button>
      </div>

      {/* Links Section */}
      <ul className="phone-links">
  {(showShopLinks ? shopLinks : links).length > 0 ? (
    (showShopLinks ? shopLinks : links).map((link, index) => (
      <li className={`link-item ${showShopLinks ? "shop" : ""}`} key={index}>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          <div className="linksss">
            <div className="licon">
              <img src={link.icon} alt={link.title || "Website"} />
            </div>
            <span>
              {link.title?.length > 10 ? link.title.slice(0, 15) + "..." : link.title || "Website Link"}
            </span>
          </div>
        </a>

        {/* ✅ "Shop Now" Button (Only for Shop Links) */}
        {showShopLinks && (
          <button className="shop-now-btn" onClick={() => window.open(link.url, "_blank")}>
          <div><img src="shopg.png"></img></div><div>Buy Now</div>
          </button>
        )}
      </li>
    ))
  ) : (
    <p>Add {showShopLinks ? "shop" : "regular"} links</p>
  )}
</ul>


      {/* Connect Button */}
      <div className="phone-connect">
        <button className="connect-btn">Get Connected</button>
        <p className="spark-logo"><img src="sparklogo.png" alt="Spark" /> SPARK</p>
      </div>
    </div>
  );
};

export default PhoneView;
