import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingComp.css";

const SettingComp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("https://linktree-backend-0abv.onrender.com/api/user-details", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (data.success) {
          setUserData({
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            password: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("https://linktree-backend-0abv.onrender.com/api/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);

        // ✅ Redirect to login if password was changed
        if (data.passwordChanged) {
          localStorage.removeItem("token"); // Clear token
          navigate("/login"); // Redirect to login
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong!");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-container">
        <h2 className="settings-title">Edit Profile</h2>

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First name</label>
            <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={userData.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="New password (leave blank to keep unchanged)" value={userData.password} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Confirm new password" value={userData.confirmPassword} onChange={handleChange} />
          </div>

          <div className="bbt">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingComp;
