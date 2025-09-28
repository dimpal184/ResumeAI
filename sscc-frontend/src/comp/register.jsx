import { useState } from "react";
import "./register.css";

function Register() {
const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree: false
});


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Registration failed!");
        return;
      }

      alert("Registration successful!");
      // Optional: redirect to login page
      window.location.href = "/login";
    } catch (err) {
      alert("Server error, please try again later");
    }
  };

  return (
    
    <div className="register-container">
      <div className="register-box">
        {/* Logo */}
       <div className="merge2">


          <div className="logo2">
      <span className="icon">✓</span>
    </div>

          <h2>ResumeAI</h2></div>

        <h3>Create Your Account</h3>
        <p className="subtitle">
          Join thousands of job seekers who trust ResumeAI to land their dream jobs
        </p>

        <form onSubmit={handleSubmit}>
          <div className="big">
          <div className="name-row"><div className="labell" >First Name</div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          <div className="labell" 
           
              
            
          >Last Name</div>  <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div></div>
            <div className="big">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          /></div>
            <div className="big">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            required
          /></div>
          {/* <small>Must be at least 8 characters with uppercase, lowercase, and numbers</small> */}
        <div className="big">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          </div>
          <div className="terms">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <span>
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </span>
          </div>

          <button type="submit" className="create-btn">Create Account</button>
        </form>

        <div className="divider">Or continue with</div>
        {/* <div className="social-buttons">
          <button className="google-btn">Google</button>
          <button className="linkedin-btn">LinkedIn</button>
        </div> */}

        <p className="footer">
          Already have an account? <a href="/login">Sign in here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
