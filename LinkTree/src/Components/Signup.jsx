import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css"; 
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let newErrors = {};

    if (!firstName.trim() || firstName.length < 2 || /\d/.test(firstName)) {
      newErrors.firstName = "First name must be at least 2 characters & contain only letters.";
    }
    
    if (!lastName.trim() || lastName.length < 2 || /\d/.test(lastName)) {
      newErrors.lastName = "Last name must be at least 2 characters & contain only letters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      newErrors.email = "Enter a valid email address.";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      newErrors.password = "Password must be 8+ chars with an uppercase, a number, and a special character.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const userData = { firstName, lastName, email, password };

    try {
      const response = await fetch("https://linktree-backend-0abv.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("✅ Signup Successful! Redirecting...", { autoClose: 2000 });
        localStorage.setItem("userId", result.userId);

        setTimeout(() => {
          navigate("/register");
        }, 2000); 
      } else {
        toast.error(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-center" autoClose={3000} />  

      <div className="signup-left">
        <div className="slo">
          <img src="sparklogo.png" alt="Logo" />
          <h2>SPARK</h2>
        </div>
        <h1>Sign up to your Spark</h1>

        <div className="mid-part">
          <div className="create-account">
            <span>Create an account</span>
            <button className="sign-2" onClick={() => navigate("/login")}>
              Sign in instead
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            {errors.firstName && <p className="error">{errors.firstName}</p>}

            <label>Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            {errors.lastName && <p className="error">{errors.lastName}</p>}

            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {errors.email && <p className="error">{errors.email}</p>}

            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {errors.password && <p className="error">{errors.password}</p>}

            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

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

      <div className="signup-right">
        <div className="image-overlay"></div>
        <img src="wallpaper.png" alt="Signup Art" />
      </div>
    </div>
  );
};

export default Signup;
