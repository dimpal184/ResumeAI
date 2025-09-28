import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Optional: your styles

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="sidebar">
      <h2>ResumeAI</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/build">Build Resume</Link></li>
          <li><Link to="/resumes">My Resumes</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>

      {/* ✅ This is where your logout button goes */}
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
