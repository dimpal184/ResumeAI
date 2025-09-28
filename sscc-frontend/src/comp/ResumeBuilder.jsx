// ResumeBuilder.js

// ResumeBuilder.js

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Save, Plus, Trash2 } from 'lucide-react';
import ResumeTemplate from './ResumeTemplate';
import './BuildResume.css';

const TEMPLATES = ['Professional', 'Creative', 'Technical', 'Elegant', 'Minimalist', 'Business', 'Design', 'Engineering', 'Leadership', 'Education'];

const ResumeBuilder = () => {
    const [searchParams] = useSearchParams();
    const resumeId = searchParams.get('id');
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const resumeRef = useRef();

    const initialResumeState = {
        contact: { name: '', title: '', phone: '', email: '', linkedin: '', location: '' },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        awards: [],
        languages: [],
        interests: [],
        selectedTemplate: 'Professional'
    };

    const [resumeData, setResumeData] = useState(initialResumeState);

    const API_BASE_URL = 'http://localhost:5000/api';

    const [aiSuggestions, setAiSuggestions] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            if (resumeId) {
                fetchResume(storedToken, resumeId);
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [resumeId]);

    const fetchResume = async (userToken, id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
                headers: { 'Authorization': `Bearer ${userToken}` },
                cache: 'no-store'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success && data.resume) {
                const fetchedResumeData = data.resume.data ?? {};

                const loadedData = {
                    ...initialResumeState,
                    ...fetchedResumeData,
                    contact: {
                        ...initialResumeState.contact,
                        ...(fetchedResumeData.contact ?? {})
                    }
                };
                setResumeData(loadedData);
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to load resume: Invalid data structure.' });
                setResumeData(initialResumeState);
            }
        } catch (error) {
            console.error("Error fetching resume:", error);
            setMessage({ type: 'error', text: 'Failed to load resume. ' + error.message });
            setResumeData(initialResumeState);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveResume = async () => {
    setLoading(true);
    setMessage(null);
    const resumeTitle = resumeData.contact?.name || "Untitled Resume";
    const method = resumeId ? 'PUT' : 'POST';
    const url = resumeId ? `${API_BASE_URL}/save-resume/${resumeId}` : `${API_BASE_URL}/save-resume`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: resumeTitle,
                data: resumeData
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to save resume.');
        }

        const data = await response.json();
        // Use alert() for success message
        alert(data.message); 

        if (data.resumeId && !resumeId) {
            window.history.pushState({}, '', `/build-resume?id=${data.resumeId}`);
        }
    } catch (error) {
        // Use alert() for error message
        alert(error.message);
    } finally {
        setLoading(false);
    }
};

    const handleFieldChange = (section, e) => {
        const { value } = e.target;
        setResumeData(prevData => ({ ...prevData, [section]: value }));
    };

    const handleObjectChange = (section, field, e) => {
        const { value } = e.target;
        setResumeData(prevData => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value
            }
        }));
    };

    const handleArrayChange = (section, index, e, subField) => {
        const { value } = e.target;
        setResumeData(prevData => {
            const newArray = [...prevData[section]];
            if (subField) {
                newArray[index] = { ...newArray[index], [subField]: value };
            } else {
                newArray[index] = value;
            }
            return { ...prevData, [section]: newArray };
        });
    };

    const addArrayItem = (section, newItem) => {
        setResumeData(prevData => ({ ...prevData, [section]: [...prevData[section], newItem] }));
    };

    const removeArrayItem = (section, index) => {
        setResumeData(prevData => {
            const newArray = prevData[section].filter((_, i) => i !== index);
            return { ...prevData, [section]: newArray };
        });
    };
    
    const removeDetail = (jobIndex, detailIndex) => {
        setResumeData(prevData => {
            const newExperience = [...prevData.experience];
            const newDetails = newExperience[jobIndex].details.filter((_, i) => i !== detailIndex);
            newExperience[jobIndex].details = newDetails;
            return { ...prevData, experience: newExperience };
        });
    };

    const addSuggestionToResume = (suggestion, jobIndex) => {
        setResumeData(prevData => {
            const newExperience = [...prevData.experience];
            const currentDetails = newExperience[jobIndex].details;
            const newDetails = [...currentDetails, suggestion];
            newExperience[jobIndex].details = newDetails;
            return { ...prevData, experience: newExperience };
        });
        setAiSuggestions({});
    };

    const handleGenerateAIContent = async (jobTitle, company, jobIndex) => {
        setIsLoading(true);
        setAiSuggestions({});
        try {
            const response = await fetch('http://localhost:5000/api/generate-resume-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobTitle, company })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.success) {
                const newSuggestions = data.suggestions.split('\n').filter(line => line.trim() !== '');
                setAiSuggestions({ index: jobIndex, suggestions: newSuggestions });
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error fetching AI content:", error);
            alert("Failed to get suggestions. Please check your network and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleTemplateChange = (template) => {
        setResumeData(prev => ({ ...prev, selectedTemplate: template }));
    };

    const handleDetailsChange = (section, index, e) => {
        const { value } = e.target;
        setResumeData(prevData => {
            const newArray = [...prevData[section]];
            newArray[index] = { ...newArray[index], details: value.split('\n') };
            return { ...prevData, [section]: newArray };
        });
    };

    return (
        <div className="resume-editor-page">
            <div className="main-container">
                <div className="editor-sidebar">
                    <div className="page-header">
                        <h1 className="logo-text">Resume AI</h1>
                    </div>

                    <div className="main-content">
                        {loading ? (
                            <div className="loading-state">
                                <p>Loading resume...</p>
                            </div>
                        ) : (
                            <>
                                {message && (
                                    <div className={`pop-up-message ${message.type}`}>
                                        {message.text}
                                    </div>
                                )}

                                <div className="form-section">
                                    <div className="form-section-header">
                                        <h3>Choose Template</h3>
                                    </div>
                                    <div className="template-filters">
                                        {TEMPLATES.map(template => (
                                            <button
                                                key={template}
                                                className={`filter-button ${resumeData.selectedTemplate.toLowerCase() === template.toLowerCase() ? 'active' : ''}`}
                                                onClick={() => handleTemplateChange(template)}
                                            >
                                                {template}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="resume-form-container">
                                    {/* Contact Information */}
                                    <div className="form-section">
                                        <div className="form-section-header">
                                            <h3>Contact Information</h3>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" placeholder="Full Name" value={resumeData.contact.name || ''} onChange={(e) => handleObjectChange('contact', 'name', e)} />
                                            <input type="text" placeholder="Job Title" value={resumeData.contact.title || ''} onChange={(e) => handleObjectChange('contact', 'title', e)} />
                                            <input type="text" placeholder="Phone" value={resumeData.contact.phone || ''} onChange={(e) => handleObjectChange('contact', 'phone', e)} />
                                            <input type="email" placeholder="Email" value={resumeData.contact.email || ''} onChange={(e) => handleObjectChange('contact', 'email', e)} />
                                            <input type="text" placeholder="LinkedIn Profile" value={resumeData.contact.linkedin || ''} onChange={(e) => handleObjectChange('contact', 'linkedin', e)} />
                                            <input type="text" placeholder="Location" value={resumeData.contact.location || ''} onChange={(e) => handleObjectChange('contact', 'location', e)} />
                                        </div>
                                    </div>
                                    
                                    {/* Professional Summary */}
                                    <div className="form-section">
                                        <div className="form-section-header">
                                            <h3>Professional Summary</h3>
                                        </div>
                                        <div className="form-group">
                                            <textarea placeholder="Write a brief professional summary..." value={resumeData.summary || ''} onChange={(e) => handleFieldChange('summary', e)}></textarea>
                                        </div>
                                    </div>

                                    {/* Work Experience */}
                                    <div className="form-section">
                                        <div className="form-section-header">
                                            <h3>Work Experience</h3>
                                            <button type="button" onClick={() => addArrayItem('experience', { title: '', company: '', startDate: '', endDate: '', details: [''] })} className="add-button"><Plus size={16} /></button>
                                        </div>
                                        {resumeData.experience.map((job, index) => (
                                            <div key={index} className="form-entry">
                                                <div className="entry-header">
                                                    <h4>Job #{index + 1}</h4>
                                                    <button type="button" onClick={() => removeArrayItem('experience', index)} className="remove-button"><Trash2 size={16} /></button>
                                                </div>
                                                <input type="text" placeholder="Job Title" value={job.title || ''} onChange={(e) => handleArrayChange('experience', index, e, 'title')} />
                                                <input type="text" placeholder="Company" value={job.company || ''} onChange={(e) => handleArrayChange('experience', index, e, 'company')} />
                                                
                                                <button 
                                                    type="button" 
                                                    className="ai-button" 
                                                    onClick={() => handleGenerateAIContent(job.title, job.company, index)}
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? 'Generating...' : '✨ Generate with AI'}
                                                </button>
                                                
                                                {aiSuggestions.suggestions && aiSuggestions.index === index && (
                                                    <div className="ai-suggestions-list">
                                                        <p>Select a point to add:</p>
                                                        <ul>
                                                            {aiSuggestions.suggestions.map((suggestion, sIndex) => (
                                                                <li key={sIndex} onClick={() => addSuggestionToResume(suggestion, index)}>
                                                                    {suggestion}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                
                                                <div className="date-group">
                                                    <input type="text" placeholder="Start Date" value={job.startDate || ''} onChange={(e) => handleArrayChange('experience', index, e, 'startDate')} />
                                                    <input type="text" placeholder="End Date" value={job.endDate || ''} onChange={(e) => handleArrayChange('experience', index, e, 'endDate')} />
                                                </div>
                                                <textarea placeholder="Job details (one per line)..." value={job.details.join('\n')} onChange={(e) => handleDetailsChange('experience', index, e)}></textarea>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Education */}
                                    <div className="form-section">
                                        <div className="form-section-header">
                                            <h3>Education</h3>
                                            <button type="button" onClick={() => addArrayItem('education', { degree: '', university: '', startDate: '', endDate: '' })} className="add-button"><Plus size={16} /></button>
                                        </div>
                                        {resumeData.education.map((edu, index) => (
                                            <div key={index} className="form-entry">
                                                <div className="entry-header">
                                                    <h4>Education #{index + 1}</h4>
                                                    <button type="button" onClick={() => removeArrayItem('education', index)} className="remove-button"><Trash2 size={16} /></button>
                                                </div>
                                                <input type="text" placeholder="Degree" value={edu.degree || ''} onChange={(e) => handleArrayChange('education', index, e, 'degree')} />
                                                <input type="text" placeholder="University" value={edu.university || ''} onChange={(e) => handleArrayChange('education', index, e, 'university')} />
                                                <div className="date-group">
                                                    <input type="text" placeholder="Start Date" value={edu.startDate || ''} onChange={(e) => handleArrayChange('education', index, e, 'startDate')} />
                                                    <input type="text" placeholder="End Date" value={edu.endDate || ''} onChange={(e) => handleArrayChange('education', index, e, 'endDate')} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Skills */}
                                    <div className="form-section">
                                        <div className="form-section-header">
                                            <h3>Skills</h3>
                                            <button type="button" onClick={() => addArrayItem('skills', { name: '' })} className="add-button"><Plus size={16} /></button>
                                        </div>
                                        {resumeData.skills.map((skill, index) => (
                                            <div key={index} className="form-entry">
                                                <div className="entry-header">
                                                    <h4>Skill #{index + 1}</h4>
                                                    <button type="button" onClick={() => removeArrayItem('skills', index)} className="remove-button"><Trash2 size={16} /></button>
                                                </div>
                                                <input type="text" placeholder="e.g., JavaScript, React, CSS" value={skill.name || ''} onChange={(e) => handleArrayChange('skills', index, e, 'name')} />
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Projects */}
                                    <div className="form-section">
                                        <div className="form-section-header">
                                            <h3>Projects</h3>
                                            <button type="button" onClick={() => addArrayItem('projects', { name: '', description: '' })} className="add-button"><Plus size={16} /></button>
                                        </div>
                                        {resumeData.projects.map((project, index) => (
                                            <div key={index} className="form-entry">
                                                <div className="entry-header">
                                                    <h4>Project #{index + 1}</h4>
                                                    <button type="button" onClick={() => removeArrayItem('projects', index)} className="remove-button"><Trash2 size={16} /></button>
                                                </div>
                                                <input type="text" placeholder="Project Name" value={project.name || ''} onChange={(e) => handleArrayChange('projects', index, e, 'name')} />
                                                <textarea placeholder="Description..." value={project.description || ''} onChange={(e) => handleArrayChange('projects', index, e, 'description')} />
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Awards & Certifications */}
                                    <div className="form-section">
                                        <div className="form-section-header">
                                            <h3>Awards & Certifications</h3>
                                            <button type="button" onClick={() => addArrayItem('awards', { name: '', description: '' })} className="add-button"><Plus size={16} /></button>
                                        </div>
                                        {resumeData.awards.map((award, index) => (
                                            <div key={index} className="form-entry">
                                                <div className="entry-header">
                                                    <h4>Award #{index + 1}</h4>
                                                    <button type="button" onClick={() => removeArrayItem('awards', index)} className="remove-button"><Trash2 size={16} /></button>
                                                </div>
                                                <input type="text" placeholder="Award/Certification Name" value={award.name || ''} onChange={(e) => handleArrayChange('awards', index, e, 'name')} />
                                                <textarea placeholder="Description..." value={award.description || ''} onChange={(e) => handleArrayChange('awards', index, e, 'description')} />
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Languages */}
                                    <div className="form-section">
                                        <div className="form-section-header">
                                            <h3>Languages</h3>
                                            <button type="button" onClick={() => addArrayItem('languages', { name: '' })} className="add-button"><Plus size={16} /></button>
                                        </div>
                                        {resumeData.languages.map((language, index) => (
                                            <div key={index} className="form-entry">
                                                <div className="entry-header">
                                                    <h4>Language #{index + 1}</h4>
                                                    <button type="button" onClick={() => removeArrayItem('languages', index)} className="remove-button"><Trash2 size={16} /></button>
                                                </div>
                                                <input type="text" placeholder="e.g., English, Spanish" value={language.name || ''} onChange={(e) => handleArrayChange('languages', index, e, 'name')} />
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Interests */}
                                    <div className="form-section">
                                        <div className="form-section-header">
                                            <h3>Interests</h3>
                                            <button type="button" onClick={() => addArrayItem('interests', { name: '' })} className="add-button"><Plus size={16} /></button>
                                        </div>
                                        {resumeData.interests.map((interest, index) => (
                                            <div key={index} className="form-entry">
                                                <div className="entry-header">
                                                    <h4>Interest #{index + 1}</h4>
                                                    <button type="button" onClick={() => removeArrayItem('interests', index)} className="remove-button"><Trash2 size={16} /></button>
                                                </div>
                                                <input type="text" placeholder="e.g., Photography, Hiking" value={interest.name || ''} onChange={(e) => handleArrayChange('interests', index, e, 'name')} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="resume-preview-area">
                    <div className="resume-preview-container">
                        <ResumeTemplate 
                            resumeData={resumeData} 
                            theme={resumeData.selectedTemplate.toLowerCase()} 
                            ref={resumeRef}
                        />
                    </div>
                    {/* Move the button to this section */}
                    <button class="preview-button" onClick={handleSaveResume} className="update-button">
                        <Save size={20} />
                        <span>{resumeId ? "Update" : "Save"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;