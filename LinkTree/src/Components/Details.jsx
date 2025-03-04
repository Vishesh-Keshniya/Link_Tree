import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";  // ✅ Import ToastContainer & toast
import "react-toastify/dist/ReactToastify.css";  // ✅ Import Toast styles
import "./Details.css";

const Details = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ Category to Image Mapping
  const categoryImages = {
    "Business": "b.png",
    "Creative": "c.png",
    "Education": "e.png",
    "Entertainment": "en.png",
    "Fashion & Beauty": "f.png",
    "Food & Beverage": "fo.png",
    "Government & Politics": "G.png",
    "Health & Wellness": "h.png",
    "Non-Profit": "n.png",
    "Other": "n.png",
    "Tech": "t.png",
    "Travel & Tourism": "tr.png"
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User not found. Please sign up again.");
      navigate("/signup");
    }
  }, [navigate]);

  // ✅ Validate Inputs
  const validateInputs = () => {
    let newErrors = {};

    if (!username.trim() || username.length < 3 || !/^\w+$/.test(username)) {
      newErrors.username = "Username must be at least 3 characters (letters, numbers, underscores only).";
    }

    if (!selectedCategory) {
      newErrors.selectedCategory = "Please select a category.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ If no errors, return true
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      toast.warn("⚠️ Please fill in all required fields.");
      return; // Stop if inputs are invalid
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User not found. Please sign up again.");
      return;
    }

    const requestData = { userId, username, category: selectedCategory };

    try {
      const response = await fetch("https://linktree-backend-0abv.onrender.com/api/update-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("✅ Details updated successfully!");
        localStorage.removeItem("userId");
        setTimeout(() => navigate("/login"), 2000); // ✅ Redirect after 2 seconds
      } else {
        toast.error(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="container-us">
      <ToastContainer position="top-center" autoClose={3000} />  {/* ✅ Add ToastContainer Here */}

      <div className="left-us">
        <div className="logo-us">
          <img src="sparklogo.png" alt="Spark Logo" /> SPARK
        </div>
        <div className="card-us">
          <h1>Tell us about yourself</h1>
          <p>For a personalized Spark experience</p>

          <input
            type="text"
            placeholder="Choose a username"
            className="input-field-us"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <p>Select one category that best describes your Linktree:</p>
          <div className="categories-us">
            {Object.keys(categoryImages).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-button-us ${selectedCategory === category ? "selected-us" : ""}`}
              >
                <img src={categoryImages[category]} alt={category} className="category-icon-us" />
                {category}
              </button>
            ))}
          </div>
          {errors.selectedCategory && <p className="error">{errors.selectedCategory}</p>}

          <button className="continue-button-us" onClick={handleSubmit}>
            Continue
          </button>
        </div>
      </div>

      {/* ✅ Dynamically Update Background Image Based on Selected Category */}
      <div className="right-us">
        <img
          src="wallpaper.png"
          alt="Category Background"
          className="background-image-us"
        />
      </div>
    </div>
  );
};

export default Details;
