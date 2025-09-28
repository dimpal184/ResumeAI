import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaEnvelope, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import "./Profile.css";

// Accept 'username' as a prop
const ProfilePage = ({ username }) => {
    const [user, setUser] = useState({
        fullName: "",
        username: "",
        email: "",
        location: "San Francisco, CA",
        country: "United States",
    });

    useEffect(() => {
        if (username) {
            // Assuming username is the full name, you can set other details here
            // This is a basic example; you might fetch more data from an API
            setUser({
                fullName: username,
                username: username.toLowerCase().replace(/\s/g, ''),
                email: `${username.toLowerCase().replace(/\s/g, '')}@example.com`,
                location: "San Francisco, CA",
                country: "United States",
            });
        }
    }, [username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Saving user data:", user);
        alert("Profile updated successfully!");
    };

    const getInitials = (name) => {
        if (!name) return "";
        const parts = name.split(" ");
        if (parts.length > 1) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return parts[0][0].toUpperCase();
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                {/* Dynamically display user initials */}
                <div className="profile-picture">{getInitials(user.fullName)}</div>
                <h2>{user.fullName}</h2>
                <p>{user.email}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-section">
                    <h3>Account Settings</h3>
                    <div className="form-group">
                        <label>Username</label>
                        <div className="input-with-icon">
                            <FaUser className="form-icon" />
                            <input type="text" name="username" value={user.username} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-with-icon">
                            <FaLock className="form-icon" />
                            <input type="password" placeholder="********" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-with-icon">
                            <FaEnvelope className="form-icon" />
                            <input type="email" name="email" value={user.email} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Personal Details</h3>
                    <div className="form-group">
                        <label>Full Name</label>
                        <div className="input-with-icon">
                            <FaUser className="form-icon" />
                            <input type="text" name="fullName" value={user.fullName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <div className="input-with-icon">
                            <FaMapMarkerAlt className="form-icon" />
                            <input type="text" name="location" value={user.location} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <div className="input-with-icon">
                            <FaGlobe className="form-icon" />
                            <input type="text" name="country" value={user.country} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <button type="submit" className="save-button">Save Changes</button>
            </form>
        </div>
    );
};

export default ProfilePage;