import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Details.css";

const Details = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");

  const categories = [
    "Business",
    "Creative",
    "Education",
    "Entertainment",
    "Fashion & Beauty",
    "Food & Beverage",
    "Government & Politics",
    "Health & Wellness",
    "Non-Profit",
    "Other",
    "Tech",
    "Travel & Tourism"
  ];

  // ✅ Check if userId exists in localStorage
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User not found. Please sign up again.");
      navigate("/signup"); // Redirect user back to signup
    }
  }, [navigate]);

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId"); // Retrieve user ID from storage

    if (!userId) {
      setError("User not found. Please sign up again.");
      return;
    }

    const requestData = { userId, username, category: selectedCategory };

    try {
      const response = await fetch("http://localhost:3000/api/update-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Details updated successfully!");
        localStorage.removeItem("userId"); // ✅ Clear userId after details are set
        navigate("/login"); // ✅ Redirect to login page after updating details
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="container-us">
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

          <p>Select one category that best describes your Linktree:</p>
          <div className="categories-us">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-button-us ${selectedCategory === category ? "selected-us" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="continue-button-us" onClick={handleSubmit}>
            Continue
          </button>
        </div>
      </div>
      <div className="right-us">
        <img src="wallpaper.png" alt="Background" className="background-image-us" />
      </div>
    </div>
  );
};

export default Details;
