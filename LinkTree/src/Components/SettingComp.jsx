import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingComp.css";
import { toast, ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css"; 

const SettingComp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

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

  const validateInputs = () => {
    let newErrors = {};

    if (!userData.firstName.trim() || userData.firstName.length < 2 || /\d/.test(userData.firstName)) {
      newErrors.firstName = "First name must be at least 2 characters & contain only letters.";
    }

    if (!userData.lastName.trim() || userData.lastName.length < 2 || /\d/.test(userData.lastName)) {
      newErrors.lastName = "Last name must be at least 2 characters & contain only letters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.match(emailRegex)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (userData.password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!userData.password.match(passwordRegex)) {
        newErrors.password = "Password must be 8+ chars with an uppercase, a number, and a special character.";
      }

      if (userData.password !== userData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateInputs()) return;
  
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
        toast.success("✅ Profile updated successfully!", { autoClose: 2000 });
  
        if (data.passwordChanged) {
          localStorage.removeItem("token");
          setTimeout(() => navigate("/login"), 2000);
        }
      } else {
        toast.error(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("❌ Something went wrong!");
    }
  };
  

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  return (
    <div className="settings-wrapper">
       <ToastContainer position="top-center" autoClose={3000} />
      <div className="settings-container">
        <h2 className="settings-title">Edit Profile</h2>

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={userData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="New password (optional)" value={userData.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Confirm new password" value={userData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="bbt">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingComp;
