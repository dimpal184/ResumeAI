import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaHome,
    FaPlusCircle,
    FaFileAlt,
    FaUser,
    FaCogs,
    FaSignOutAlt,
    FaSearch,
    FaFilter,
    FaCheckCircle,
    FaBolt,
} from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "./Dashboard.css";
import ProfilePage from "./ProfilePage";
import BuildResume from "./BuildResume";
import MyResumes from "./MyResumes"; // <-- New: Import MyResumes component

// Register necessary Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [username, setUsername] = useState("");
    // Add 'my-resumes' to the view states
    const [currentView, setCurrentView] = useState("dashboard");
    const navigate = useNavigate();

    // useEffect hook to handle user authentication
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
        } else {
            const parsedUser = JSON.parse(storedUser);
            setUsername(parsedUser.name);
        }
    }, [navigate]);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Handler to change the view
    const handleViewChange = (view) => {
        setCurrentView(view);
    };

    // Function to get initials from a full name
    const getInitials = (name) => {
        if (!name) return "";
        const parts = name.split(" ");
        if (parts.length > 1) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return parts[0][0].toUpperCase();
    };

    // Data for the charts
    const lineData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            label: "Resume Strength",
            data: [65, 72, 78, 85, 90, 95],
            borderColor: "#007bff",
            backgroundColor: "#007bff",
            tension: 0.3,
            fill: false,
            pointRadius: 5,
        }, ],
    };

    const barData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            label: "Applications",
            data: [7, 12, 14, 16, 20, 22],
            backgroundColor: "#000",
        }, ],
    };

    return (
        <div className="maincontainer">
            {/* Top Navbar */}
            <div className="navcontainer">
                <div className="merge3">
                    <div className="logo-circle2">
                        <span className="checkmark2">✓</span>
                    </div>
                    <h2>ResumeAI</h2>
                </div>
                <div className="nav-right">
                    <div className="dropdown">
                        <span className="dropdown-icon">⌄</span>
                        <span className="help-text">Help</span>
                    </div>
                    <div className="profile-circle">{getInitials(username)}</div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="innermain">
                {/* Sidebar */}
                <div className="sidebar">
                    <ul className="menu">
                        <li className={`menu-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => handleViewChange('dashboard')}>
                            <FaHome className="icon" />
                            <span className="text">Dashboard</span>
                        </li>
                        <li className={`menu-item ${currentView === 'build-resume' ? 'active' : ''}`} onClick={() => handleViewChange('build-resume')}>
                            <FaPlusCircle className="icon" />
                            <span className="text">Build Resume</span>
                        </li>
                        {/* New: Add onClick handler for My Resumes */}
                        <li className={`menu-item ${currentView === 'my-resumes' ? 'active' : ''}`} onClick={() => handleViewChange('my-resumes')}>
                            <FaFileAlt className="icon" />
                            <span className="text">My Resumes</span>
                        </li>
                        <li className={`menu-item ${currentView === 'profile' ? 'active' : ''}`} onClick={() => handleViewChange('profile')}>
                            <FaUser className="icon" />
                            <span className="text">Profile</span>
                        </li>
                        <li className="menu-item">
                            <FaCogs className="icon" />
                            <span className="text">Settings</span>
                        </li>
                    </ul>
                    <div className="logout" onClick={handleLogout}>
                        <FaSignOutAlt className="icon" />
                        <span className="text">Logout</span>
                    </div>
                </div>

                {/* Right-side Content */}
                <div className="rightside">
                    {/* Conditionally render the correct component based on state */}
                    {currentView === 'dashboard' && (
                        <>
                            {/* Dashboard Header */}
                            <h1>Welcome back, {username}!</h1>
                            <p>Here's your resume optimization dashboard</p>

                            {/* Top Cards Section */}
                            <div className="cards-container">
                                <div className="card">
                                    <h3>Total Resumes</h3>
                                    <p className="number">8</p>
                                    <span className="subtext">+2 this month</span>
                                </div>
                                <div className="card">
                                    <h3>Job Matches</h3>
                                    <p className="number">24</p>
                                    <span className="subtext">+12 new this week</span>
                                </div>
                                <div className="card">
                                    <h3>Average Score</h3>
                                    <p className="number">85%</p>
                                    <span className="subtext">+5% improvement</span>
                                </div>
                                <div className="card">
                                    <h3>Profile Views</h3>
                                    <p className="number">127</p>
                                    <span className="subtext">+23 this week</span>
                                </div>
                            </div>
                            
                            {/* Main Charts Section */}
                            <div className="charts-container">
                                <div className="chart">
                                    <h4>Resume Strength Over Time</h4>
                                    <p className="chart-subtext">Your resume optimization progress</p>
                                    <Line data={lineData} />
                                </div>
                                <div className="chart">
                                    <h4>Applications vs Responses</h4>
                                    <p className="chart-subtext">Track your job application success rate</p>
                                    <Bar data={barData} />
                                    <div className="bar-chart-details">
                                        <div className="detail-item">
                                            <p className="detail-label">Response Rate</p>
                                            <p className="detail-value">56%</p>
                                        </div>
                                        <div className="detail-item">
                                            <p className="detail-label">This Month</p>
                                            <p className="detail-value">14/25</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Filter and Jobs section */}
                            <div className="filter-bar">
                                <div className="search-input">
                                    <FaSearch className="icon" />
                                    <input type="text" placeholder="Search resumes or jobs..." />
                                </div>
                                <div className="dropdowns">
                                    <div className="filter-dropdown">
                                        <span>Location</span>
                                        <span className="dropdown-arrow">⌄</span>
                                    </div>
                                    <div className="filter-dropdown">
                                        <span>Match Score</span>
                                        <span className="dropdown-arrow">⌄</span>
                                    </div>
                                    <div className="filter-dropdown">
                                        <span>Salary</span>
                                        <span className="dropdown-arrow">⌄</span>
                                    </div>
                                </div>
                                <button className="clear-filters-button">
                                    <FaFilter className="icon" />
                                    <span>Clear Filters</span>
                                </button>
                            </div>

                            <div className="dashboard-layout">
                                <div className="recent-resumes-section">
                                    <div className="section-header">
                                        <h3>Recent Resumes</h3>
                                        <a href="#" className="view-all" onClick={() => handleViewChange('my-resumes')}>View All</a>
                                    </div>
                                    <p>Your latest resume projects</p>
                                    <div className="resume-list">
                                        {/* Resume Items */}
                                        <div className="resume-item">
                                            <h4>Software Engineer Resume</h4>
                                            <p className="date">2 days ago</p>
                                            <span className="status complete">Complete 92%</span>
                                        </div>
                                        <div className="resume-item">
                                            <h4>Product Manager Resume</h4>
                                            <p className="date">1 week ago</p>
                                            <span className="status in-progress">In Progress 78%</span>
                                        </div>
                                        <div className="resume-item">
                                            <h4>Data Analyst Resume</h4>
                                            <p className="date">2 weeks ago</p>
                                            <span className="status complete">Complete 85%</span>
                                        </div>
                                    </div>
                                    <button className="create-new-button" onClick={() => handleViewChange('build-resume')}>
                                        <FaPlusCircle /> Create New Resume
                                    </button>
                                </div>
                                <div className="recommended-jobs-section">
                                    <h3>Recommended Jobs</h3>
                                    <p>AI-matched opportunities for you</p>
                                    <div className="job-list">
                                        {/* Job Items */}
                                        <div className="job-item">
                                            <h4>Senior Frontend Developer</h4>
                                            <p className="company">TechCorp • San Francisco, CA</p>
                                            <p className="salary">$120k - 160k</p>
                                            <span className="match-score">95% match</span>
                                            <div className="match-bar-container">
                                                <div className="match-bar" style={{ width: '95%' }}></div>
                                            </div>
                                        </div>
                                        <div className="job-item">
                                            <h4>Full Stack Engineer</h4>
                                            <p className="company">StartupXYZ • Remote</p>
                                            <p className="salary">$100k - 140k</p>
                                            <span className="match-score">88% match</span>
                                            <div className="match-bar-container">
                                                <div className="match-bar" style={{ width: '88%' }}></div>
                                            </div>
                                        </div>
                                        <div className="job-item">
                                            <h4>React Developer</h4>
                                            <p className="company">InnovateTech • Austin, TX</p>
                                            <p className="salary">$90k - 130k</p>
                                            <span className="match-score">82% match</span>
                                            <div className="match-bar-container">
                                                <div className="match-bar" style={{ width: '82%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Quick Actions Section */}
                            <div className="quick-actions-container">
                                <h2>Quick Actions</h2>
                                <p>Get started with common tasks</p>
                                <div className="action-cards-grid">
                                    <div className="action-card" onClick={() => handleViewChange('build-resume')}>
                                        <FaPlusCircle className="action-icon blue" />
                                        <h3>Build New Resume</h3>
                                        <p>Start from scratch or template</p>
                                    </div>
                                    <div className="action-card">
                                        <FaCheckCircle className="action-icon green" />
                                        <h3>ATS Optimization</h3>
                                        <p>Improve resume scanning</p>
                                    </div>
                                    <div className="action-card">
                                        <FaBolt className="action-icon purple" />
                                        <h3>AI Analysis</h3>
                                        <p>Get personalized insights</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    
                    {/* Conditionally render MyResumes, Profile, or BuildResume */}
                    {currentView === 'my-resumes' && <MyResumes onBackToDashboard={() => handleViewChange('dashboard')} />}
                    {currentView === 'profile' && <ProfilePage username={username} />}
                    {currentView === 'build-resume' && <BuildResume onBackToDashboard={() => handleViewChange('dashboard')} />}
                        
                </div>
            </div>
        </div>
    );
};

export default Dashboard;