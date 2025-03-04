import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PublicProfileView.css";

const PublicPhoneView = () => {
  const { userId } = useParams();
  const [links, setLinks] = useState([]);
  const [shopLinks, setShopLinks] = useState([]);
  const [showShopLinks, setShowShopLinks] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("ava.png");
  const [bio, setBio] = useState("");
  const [phoneHeaderColor, setPhoneHeaderColor] = useState("#FFFFFF");
  const [layout, setLayout] = useState("stack");
  const [shadowStyle, setShadowStyle] = useState("shadow-soft");
  const [borderStyle, setBorderStyle] = useState("border-rounded");
  const [buttonStyle, setButtonStyle] = useState("button-fill");
  const [linkBgColor, setLinkBgColor] = useState("#D9D9D9");
  const [linkFontColor, setLinkFontColor] = useState("#F5F5F3");
  const [font, setFont] = useState("DM Sans");
  const [phoneFontColor, setPhoneFontColor] = useState("#000000");
  const [selectedTheme, setSelectedTheme] = useState("air-snow");
  const [selectedLiTheme, setSelectedLiTheme] = useState("airsnowli");
  const [loading, setLoading] = useState(true);

  // Icon mapping
  const iconMapping = {
    "youtube.png": "https://linktree-backend-0abv.onrender.com/uploads/youtube.png",
    "fb.png": "https://linktree-backend-0abv.onrender.com/uploads/fb.png",
    "x.png": "https://linktree-backend-0abv.onrender.com/uploads/x.png",
    "instr.png": "https://linktree-backend-0abv.onrender.com/uploads/instagram.png",
    "swiggi.png": "https://linktree-backend-0abv.onrender.com/uploads/swiggi.png",
    "flipkart.png": "https://linktree-backend-0abv.onrender.com/uploads/flipkart.png",
    "zomato.png": "https://linktree-backend-0abv.onrender.com/uploads/zomato.png",
    "shop.png": "https://linktree-backend-0abv.onrender.com/uploads/shop.png",
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://linktree-backend-0abv.onrender.com/api/public/user-data/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user data.");

      const data = await response.json();
      console.log("🔹 API Response:", data);

      if (data.success) {
        setUserName(data.user.username || "User");
        setProfileImage(
          data.user.image && data.user.image.trim() !== ""
            ? data.user.image
            : "https://linktree-backend-0abv.onrender.com/uploads/ava.png"
        );
        setBio(data.user.bio || "");

        // Map icon filenames to their corresponding URLs
        const processedLinks = data.links.map(link => ({
          ...link,
          icon: iconMapping[link.icon] || "https://linktree-backend-0abv.onrender.com/uploads/default-icon.png",
        }));
        const processedShopLinks = data.shopLinks.map(link => ({
          ...link,
          icon: iconMapping[link.icon] || "https://linktree-backend-0abv.onrender.com/uploads/default-icon.png",
        }));

        setLinks(processedLinks);
        setShopLinks(processedShopLinks);

        console.log("Processed Links:", processedLinks);
        console.log("Processed Shop Links:", processedShopLinks);

        if (data.user.settings) {
          setPhoneHeaderColor(data.user.settings.phoneHeaderColor || "#FFFFFF");
          setLayout(data.user.settings.layout || "stack");
          setShadowStyle(data.user.settings.shadowStyle || "shadow-soft");
          setBorderStyle(data.user.settings.borderStyle || "border-rounded");
          setButtonStyle(data.user.settings.buttonStyle || "button-fill");
          setLinkBgColor(data.user.settings.linkBgColor || "#D9D9D9");
          setLinkFontColor(data.user.settings.linkFontColor || "#F5F5F3");
          setFont(data.user.settings.font || "DM Sans");
          setPhoneFontColor(data.user.settings.phoneFontColor || "#000000");
          setSelectedTheme(data.user.settings.selectedTheme || "air-snow");
          setSelectedLiTheme(data.user.settings.selectedLiTheme || "airsnowli");
        }
      } else {
        console.error("Error fetching user data:", data.message);
      }
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`phone-container-pb ${selectedTheme}`} style={{ fontFamily: font, color: phoneFontColor }}>
      {/* Profile Section */}
      <div className={`phone-profile ${selectedTheme}`} style={{ backgroundColor: phoneHeaderColor }}>
        <div className="phone-header-pb">
          <div><img
  src={profileImage}
  alt="User Avatar"
  className="profile-img"
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = "https://linktree-backend-0abv.onrender.com/uploads/ava.png"; // Fallback image
  }}
/>
</div>
          <h3 className="phonetitle" style={{ fontFamily: font, color: phoneFontColor }}>
            @{userName}
          </h3>
          <p className="phone-bio" style={{ fontFamily: font, color: phoneFontColor }}>
            {bio}
          </p>
        </div>
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
      <ul className={`phone-links ${layout}`}>
        {(showShopLinks ? shopLinks : links).length > 0 ? (
          (showShopLinks ? shopLinks : links).map((link, index) => (
            <li
              className={`link-item ${showShopLinks ? "shop" : ""} ${selectedLiTheme} ${shadowStyle} ${borderStyle} ${buttonStyle} ${selectedTheme}`}
              style={{ backgroundColor: linkBgColor }}
              key={index}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: linkBgColor, color: linkFontColor }}
              >
                <div className="linksss">
                  <div className="licon">
                    <img
                      src={link.icon} // Use the dynamically set icon URL
                      alt={link.title || "Website"}
                      onError={(e) => {
                        e.target.src = "https://linktree-backend-0abv.onrender.com/uploads/default-icon.png"; // Fallback if the icon fails to load
                      }}
                    />
                  </div>
                  <span className="link-title" style={{ color: linkFontColor }}>
                    {link.title
                      ? link.title.length > 10
                        ? link.title.slice(0, 10) + "..."
                        : link.title
                      : "Website Link"}
                  </span>
                </div>
              </a>
              {showShopLinks && (
                <button className="shop-now-btn" onClick={() => window.open(link.url, "_blank")}>
                  <div>
                    <img src="shopg.png" alt="Shop Icon" />
                  </div>
                  <div>Buy Now</div>
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
        <p className="spark-logo">
          <img src="https://linktree-backend-0abv.onrender.com/uploads/sparklogo.png" alt="Spark" style={{ fontFamily: font, color: phoneFontColor }} /> SPARK
        </p>
      </div>
    </div>
  );
};

export default PublicPhoneView;