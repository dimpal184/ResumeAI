import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Download, Trash2, Plus, Search } from 'lucide-react';

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not logged in. Please log in to view your resumes.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/resumes`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch resumes.');
        }

        setResumes(data.resumes);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching resumes.');
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleEdit = (resumeId) => {
    navigate(`/resume-builder?id=${resumeId}`);
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
  
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/resumes/${resumeId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete the resume.');
      }
      
      setResumes(resumes.filter(r => r._id !== resumeId));
      alert('Resume deleted successfully.');
  
    } catch (err) {
      alert(err.message || 'An error occurred during deletion.');
    }
  };
  
  const handleNewResume = () => {
    navigate('/resume-builder');
  };

  const renderContent = () => {
    if (loading) {
      return <div className="text-center py-8 text-gray-500">Loading your resumes...</div>;
    }

    if (error) {
      return <div className="text-center py-8 text-red-600 font-medium">{error}</div>;
    }

    if (resumes.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-4">You have no saved resumes. Let's create one!</p>
          <button
            onClick={handleNewResume}
            className="inline-flex items-center space-x-2 py-2 px-4 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
          >
            <Plus size={20} />
            <span>Create New Resume</span>
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {resumes.map((resume) => (
          <div key={resume._id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center transition hover:shadow-lg">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">{resume.title || "Untitled Resume"}</h3>
              <p className="text-sm text-gray-500 mt-1">Last Modified: {new Date(resume.lastModified).toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-2 items-center">
              <button
                onClick={() => handleEdit(resume._id)}
                className="p-2 rounded-full text-blue-500 bg-blue-100 hover:bg-blue-200 transition"
                aria-label="Edit"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDelete(resume._id)}
                className="p-2 rounded-full text-red-500 bg-red-100 hover:bg-red-200 transition"
                aria-label="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">My Resumes</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex justify-between items-center">
        <div className="flex-1 max-w-lg">
          <label htmlFor="search-resumes" className="sr-only">Search resumes</label>
          <div className="relative text-gray-400 focus-within:text-gray-600">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={20} />
            </div>
            <input
              type="text"
              id="search-resumes"
              className="block w-full rounded-md pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search resumes by name..."
            />
          </div>
        </div>
        <button
          onClick={handleNewResume}
          className="ml-4 inline-flex items-center space-x-2 py-2 px-4 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
        >
          <Plus size={20} />
          <span>New Resume</span>
        </button>
      </div>

      <div className="mt-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default MyResumes;
