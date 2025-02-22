import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  // State Variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = { firstName, lastName, email, password };

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (result.success) {
        localStorage.setItem("userId", result.userId);
        console.log("Stored userId:", result.userId);
        navigate("/register"); // ✅ Redirect to details page
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1>Sign up to your Spark</h1>

        <div className="mid-part">
          {/* ✅ Fix: Use div instead of p */}
          <div className="create-account">
            <span>Create an account</span>
            <button className="sign-2" onClick={() => navigate("/login")}>
              Sign in instead
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

            <label>Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            <div className="terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                By creating an account, I agree to the{" "}
                <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>.
              </label>
            </div>

            <button className="signupbtn2" type="submit">Create an account</button>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="signup-right">
        <div className="image-overlay"></div>
        <img src="wallpaper.png" alt="Signup Art" />
      </div>
    </div>
  );
};

export default Signup;
