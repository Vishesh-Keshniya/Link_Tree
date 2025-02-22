import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { username, password };

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Login Successful!");
        localStorage.setItem("token", result.token); // Store JWT token
        localStorage.setItem("username", result.username); // Store username
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="signup-container-login">
      <div className="signup-left-login">
        <div className="logo-login">
          <img src="sparklogo.png" alt="Spark Logo" /> SPARK™
        </div>
        <h1>Sign in to your Spark</h1>

        <div className="mid-part-login">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img className="hide" src="hide.png" alt="Hide" />
                ) : (
                  <img className="hide" src="hide.png" alt="Show" />
                )}
              </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login">Log in</button>
          </form>
        </div>

        <div>
          <p className="footer-text-login">
            <a href="#" className="forget">Forgot password?</a>
          </p>
          <p className="bottom">
            Don't have an account? <button className="sign-2" onClick={() => navigate("/signup")}>Sign up</button>
          </p>
        </div>
      </div>

      <div className="signup-right-login">
        <div className="image-overlay-login"></div>
        <img src="wallpaper.png" alt="Signup Art" />
      </div>
    </div>
  );
};

export default Login;
