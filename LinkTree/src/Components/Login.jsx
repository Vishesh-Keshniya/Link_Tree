import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";  // ✅ Import ToastContainer & toast
import "react-toastify/dist/ReactToastify.css";  // ✅ Import Toast styles
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ✅ Validate inputs before submission
  const validateInputs = () => {
    let newErrors = {};

    if (!username.trim() || username.length < 3 || !/^\w+$/.test(username)) {
      newErrors.username = "Username must be at least 3 characters (letters, numbers, underscores only).";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      newErrors.password = "Password must be 8+ chars, include an uppercase, a number, and a special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSuccess = async () => {
    try {
      const response = await fetch("https://linktree-backend-0abv.onrender.com/api/track-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error tracking login:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return; // Stop if inputs are invalid
    }

    const loginData = { username, password };

    try {
      const response = await fetch("https://linktree-backend-0abv.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("✅ Login Successful! Redirecting...", { autoClose: 2000 });
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.username);
        await handleLoginSuccess();

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000); // ✅ Redirect after 2 seconds
      } else {
        toast.error(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="signup-container-login">
      <ToastContainer position="top-center" autoClose={3000} />  {/* ✅ Add ToastContainer Here */}

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
            {errors.username && <p className="error">{errors.username}</p>}

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
            {errors.password && <p className="error">{errors.password}</p>}

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
