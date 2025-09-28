import { useState } from "react";
import "./login.css"; 

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {   // ✅ corrected endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Login failed!");
        return;
      }

      if (data.token) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user)); // ✅ save user
  alert(`Welcome ${data.user.name}!`);
  window.location.href = "/dashboard";
}

    } catch (err) {
      alert("Server error, please try again later");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="merge">


          <div className="logo-circle">
      <span className="checkmark">✓</span>
    </div>

          <h2>ResumeAI</h2></div>
          <p>Welcome Back</p>
          <span>Sign in to your account to continue optimizing your career</span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>

        <div className="part">

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          /></div>
          <div className="part">

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
          </div>
          <div className="login-options">
            <label className="remember-label">
              <input type="checkbox" 
              // styles={{
              //   Height:"200px",
              // }}
              
              /><p className="pa"> Remember me</p> 
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary">Sign In</button>
        </form>

        {/* <div className="divider">Or continue with</div>

        <div className="social-login">
          <button className="btn-google">🌐 Google</button>
          <button className="btn-linkedin">in LinkedIn</button>
        </div> */}

        <p className="signup-text">
          Don't have an account?{" "}
          <a href="/register">Sign up here</a>
        </p>

        <small>
          By signing in, you agree to our <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>
        </small>
      </div>
    </div>
  );
}


export default Login;
