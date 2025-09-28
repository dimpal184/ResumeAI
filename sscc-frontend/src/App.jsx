import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './comp/sidebar';
import Dashboard from './comp/dashboard';
import Login from './comp/login';
import Register from './comp/Register';
import Home from './comp/home';
import ProtectedRoute from './comp/protectedRoute';
import ResumeBuilder from './comp/ResumeBuilder';

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      {/* <div className="app-container">
        {isAuthenticated && <Sidebar />}
        <div className="main-content"> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
          </Routes>
    </Router>
  );
}

export default App;
