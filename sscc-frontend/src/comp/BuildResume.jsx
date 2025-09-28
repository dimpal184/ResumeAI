import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaPlusCircle, FaCloudUploadAlt, FaTrash, FaPlus, FaDownload, FaMagic, FaSave } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';
import { useSearchParams } from 'react-router-dom';
import './BuildResume.css';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import MyResumePDF from './MyResumePDF'; // Import the new PDF component

import ResumeTemplate from './ResumeTemplate';

const ResumeForm = ({ resumeData, setResumeData, onGenerateAIContent, isLoading, aiSuggestions, addSuggestionToResume }) => {
    const handleTextChange = (section, field, e) => {
        const { value } = e.target;
        setResumeData(prevData => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value
            }
        }));
    };

    const handleArrayChange = (section, index, field, e) => {
        const { value } = e.target;
        setResumeData(prevData => {
            const newArray = [...prevData[section]];
            newArray[index] = { ...newArray[index], [field]: value };
            return { ...prevData, [section]: newArray };
        });
    };

    const handleSingleFieldArrayChange = (section, index, e) => {
        const { value } = e.target;
        setResumeData(prevData => {
            const newArray = [...prevData[section]];
            newArray[index] = value;
            return { ...prevData, [section]: newArray };
        });
    };

    const addArrayItem = (section, itemTemplate) => {
        setResumeData(prevData => ({
            ...prevData,
            [section]: [...(prevData[section] || []), itemTemplate]
        }));
    };

    const removeArrayItem = (section, index) => {
        setResumeData(prevData => ({
            ...prevData,
            [section]: (prevData[section] || []).filter((_, i) => i !== index)
        }));
    };

    const addDetailPoint = (jobIndex) => {
        setResumeData(prevData => {
            const newExperience = [...prevData.experience];
            const currentDetails = newExperience[jobIndex].details || [];
            newExperience[jobIndex].details = [...currentDetails, ''];
            return { ...prevData, experience: newExperience };
        });
    };

    const removeDetailPoint = (jobIndex, detailIndex) => {
        setResumeData(prevData => {
            const newExperience = [...prevData.experience];
            const newDetails = (newExperience[jobIndex].details || []).filter((_, i) => i !== detailIndex);
            newExperience[jobIndex].details = newDetails;
            return { ...prevData, experience: newExperience };
        });
    };

    return (
        <div className="resume-form-container">
            <h3>Contact Information</h3>
            <form>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={resumeData.contact?.name || ''}
                    onChange={(e) => handleTextChange('contact', 'name', e)}
                />
                <input
                    type="text"
                    placeholder="Job Title"
                    value={resumeData.contact?.title || ''}
                    onChange={(e) => handleTextChange('contact', 'title', e)}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={resumeData.contact?.phone || ''}
                    onChange={(e) => handleTextChange('contact', 'phone', e)}
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={resumeData.contact?.email || ''}
                    onChange={(e) => handleTextChange('contact', 'email', e)}
                />
                <input
                    type="text"
                    placeholder="LinkedIn Profile"
                    value={resumeData.contact?.linkedin || ''}
                    onChange={(e) => handleTextChange('contact', 'linkedin', e)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={resumeData.contact?.location || ''}
                    onChange={(e) => handleTextChange('contact', 'location', e)}
                />
            </form>

            <h3 className="form-section-header">Professional Summary</h3>
            <textarea
                className="summary-textarea"
                placeholder="Write a brief professional summary..."
                value={resumeData.summary || ''}
                onChange={(e) => setResumeData(prevData => ({ ...prevData, summary: e.target.value }))}
            ></textarea>

            <h3 className="form-section-header">
                Work Experience
                <button
                    type="button"
                    onClick={() => addArrayItem('experience', { title: '', company: '', startDate: '', endDate: '', details: [''] })}
                    className="add-button"
                >
                    <FaPlus />
                </button>
            </h3>
            {(resumeData.experience || []).map((job, index) => (
                <div key={index} className="form-entry">
                    <div className="entry-header">
                        <h4>Job #{index + 1}</h4>
                        <button type="button" onClick={() => removeArrayItem('experience', index)} className="remove-button">
                            <FaTrash />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Job Title"
                        value={job.title || ''}
                        onChange={(e) => handleArrayChange('experience', index, 'title', e)}
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        value={job.company || ''}
                        onChange={(e) => handleArrayChange('experience', index, 'company', e)}
                    />
                    <button
                        type="button"
                        className="ai-button"
                        onClick={() => onGenerateAIContent(job.title, job.company, index)}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span> Generating...
                            </>
                        ) : (
                            <>
                                <FaMagic className="ai-button-icon" /> Generate with AI
                            </>
                        )}
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
                    <div className="date-inputs">
                        <input type="text" placeholder="Start Date" value={job.startDate || ''} onChange={(e) => handleArrayChange('experience', index, 'startDate', e)} />
                        <input type="text" placeholder="End Date" value={job.endDate || ''} onChange={(e) => handleArrayChange('experience', index, 'endDate', e)} />
                    </div>
                    {Array.isArray(job.details) && job.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="detail-row">
                            <textarea
                                placeholder="Key responsibility/achievement..."
                                value={detail || ''}
                                onChange={(e) => {
                                    const newDetails = [...job.details];
                                    newDetails[detailIndex] = e.target.value;
                                    handleArrayChange('experience', index, 'details', { target: { value: newDetails } });
                                }}
                            ></textarea>
                            {job.details.length > 1 && (
                                <button type="button" onClick={() => removeDetailPoint(index, detailIndex)} className="remove-detail">
                                    <FaTrash />
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => addDetailPoint(index)} className="add-detail">
                        <FaPlus /> Add Point
                    </button>
                </div>
            ))}
            <h3 className="form-section-header">
                Education
                <button
                    type="button"
                    onClick={() => addArrayItem('education', { degree: '', university: '', startDate: '', endDate: '' })}
                    className="add-button"
                >
                    <FaPlus />
                </button>
            </h3>
            {(resumeData.education || []).map((edu, index) => (
                <div key={index} className="form-entry">
                    <div className="entry-header">
                        <h4>Education #{index + 1}</h4>
                        <button type="button" onClick={() => removeArrayItem('education', index)} className="remove-button">
                            <FaTrash />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree || ''}
                        onChange={(e) => handleArrayChange('education', index, 'degree', e)}
                    />
                    <input
                        type="text"
                        placeholder="University"
                        value={edu.university || ''}
                        onChange={(e) => handleArrayChange('education', index, 'university', e)}
                    />
                    <div className="date-inputs">
                        <input type="text" placeholder="Start Date" value={edu.startDate || ''} onChange={(e) => handleArrayChange('education', index, 'startDate', e)} />
                        <input type="text" placeholder="End Date" value={edu.endDate || ''} onChange={(e) => handleArrayChange('education', index, 'endDate', e)} />
                    </div>
                </div>
            ))}
            <h3 className="form-section-header">
                Skills
                <button
                    type="button"
                    onClick={() => addArrayItem('skills', '')}
                    className="add-button"
                >
                    <FaPlus />
                </button>
            </h3>
            {(resumeData.skills || []).map((skill, index) => (
                <div key={index} className="form-entry single-field-entry">
                    <input
                        type="text"
                        placeholder="Skill (e.g., JavaScript, Project Management)"
                        value={skill || ''}
                        onChange={(e) => handleSingleFieldArrayChange('skills', index, e)}
                    />
                    <button type="button" onClick={() => removeArrayItem('skills', index)} className="remove-button">
                        <FaTrash />
                    </button>
                </div>
            ))}
            <h3 className="form-section-header">
                Projects
                <button
                    type="button"
                    onClick={() => addArrayItem('projects', { name: '', description: '' })}
                    className="add-button"
                >
                    <FaPlus />
                </button>
            </h3>
            {(resumeData.projects || []).map((project, index) => (
                <div key={index} className="form-entry">
                    <div className="entry-header">
                        <h4>Project #{index + 1}</h4>
                        <button type="button" onClick={() => removeArrayItem('projects', index)} className="remove-button">
                            <FaTrash />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Project Name"
                        value={project.name || ''}
                        onChange={(e) => handleArrayChange('projects', index, 'name', e)}
                    />
                    <textarea
                        placeholder="Project description..."
                        value={project.description || ''}
                        onChange={(e) => handleArrayChange('projects', index, 'description', e)}
                    ></textarea>
                </div>
            ))}
            <h3 className="form-section-header">
                Awards
                <button
                    type="button"
                    onClick={() => addArrayItem('awards', { name: '', description: '' })}
                    className="add-button"
                >
                    <FaPlus />
                </button>
            </h3>
            {(resumeData.awards || []).map((award, index) => (
                <div key={index} className="form-entry">
                    <div className="entry-header">
                        <h4>Award #{index + 1}</h4>
                        <button type="button" onClick={() => removeArrayItem('awards', index)} className="remove-button">
                            <FaTrash />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Award Name"
                        value={award.name || ''}
                        onChange={(e) => handleArrayChange('awards', index, 'name', e)}
                    />
                    <textarea
                        placeholder="Award description..."
                        value={award.description || ''}
                        onChange={(e) => handleArrayChange('awards', index, 'description', e)}
                    ></textarea>
                </div>
            ))}
            <h3 className="form-section-header">
                Languages
                <button
                    type="button"
                    onClick={() => addArrayItem('languages', '')}
                    className="add-button"
                >
                    <FaPlus />
                </button>
            </h3>
            {(resumeData.languages || []).map((language, index) => (
                <div key={index} className="form-entry single-field-entry">
                    <input
                        type="text"
                        placeholder="Language (e.g., Spanish - Fluent)"
                        value={language || ''}
                        onChange={(e) => handleSingleFieldArrayChange('languages', index, e)}
                    />
                    <button type="button" onClick={() => removeArrayItem('languages', index)} className="remove-button">
                        <FaTrash />
                    </button>
                </div>
            ))}
            <h3 className="form-section-header">
                Interests
                <button
                    type="button"
                    onClick={() => addArrayItem('interests', '')}
                    className="add-button"
                >
                    <FaPlus />
                </button>
            </h3>
            {(resumeData.interests || []).map((interest, index) => (
                <div key={index} className="form-entry single-field-entry">
                    <input
                        type="text"
                        placeholder="Interest (e.g., Hiking, Chess)"
                        value={interest || ''}
                        onChange={(e) => handleSingleFieldArrayChange('interests', index, e)}
                    />
                    <button type="button" onClick={() => removeArrayItem('interests', index)} className="remove-button">
                        <FaTrash />
                    </button>
                </div>
            ))}
        </div>
    );
};

const allTemplates = [
    { name: 'professional', label: 'Professional', description: 'Modern and clean design', tag: 'Business', imageSrc: 'image_9762d5.png' },
    { name: 'creative', label: 'Creative', description: 'Bold and artistic layout', tag: 'Design', imageSrc: 'image_97c18c.png' },
    { name: 'technical', label: 'Technical', description: 'Skills-focused format', tag: 'Engineering', imageSrc: 'image_96ee36.png' },
    { name: 'elegant', label: 'Elegant', description: 'Classic and timeless design', tag: 'Timeless', new: true, imageSrc: 'image_9762d5.png' },
    { name: 'minimalist', label: 'Minimalist', description: 'Clean and simple design', tag: 'Modern', new: true, imageSrc: 'image_97c18c.png' },
    { name: 'business', label: 'Business', description: 'Professional and classic', tag: 'Business', imageSrc: 'image_96ee36.png' },
    { name: 'design', label: 'Design', description: 'Visually creative and dynamic', tag: 'Design', imageSrc: 'image_9762d5.png' },
    { name: 'engineering', label: 'Engineering', description: 'Focused on skills and clarity', tag: 'Engineering', imageSrc: 'image_97c18c.png' },
    { name: 'leadership', label: 'Leadership', description: 'Structured and achievement-oriented', tag: 'Leadership', imageSrc: 'image_96ee36.png' },
    { name: 'education', label: 'Education', description: 'Highlights academics and skills', tag: 'Education', imageSrc: 'image_9762d5.png' }
];

const BuildResume = ({ onBackToDashboard }) => {
    const [searchParams] = useSearchParams();
    const resumeId = searchParams.get('id');

    const [resumeData, setResumeData] = useState({
        contact: {
            name: "",
            title: "",
            phone: "",
            email: "",
            linkedin: "",
            location: ""
        },
        summary: "",
        experience: [{ title: "", company: "", startDate: "", endDate: "", details: [""] }],
        education: [{ degree: "", university: "", startDate: "", endDate: "" }],
        skills: [""],
        projects: [{ name: "", description: "" }],
        awards: [{ name: "", description: "" }],
        languages: [""],
        interests: [""]
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const resumeRef = useRef(null);

    const [isSaving, setIsSaving] = useState(false);

    const [aiSuggestions, setAiSuggestions] = useState({ index: null, suggestions: [] });
    const [isLoading, setIsLoading] = useState(false);
    
    const API_BASE_URL = 'http://localhost:5000/api';

    const fetchResume = async (id) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("User not authenticated.");
            }
            const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` },
                cache: 'no-store' 
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success && data.resume) {
                const fetchedResumeData = data.resume.data ?? {};
                setResumeData(prevData => ({
                    ...prevData,
                    ...fetchedResumeData,
                    contact: {
                        ...prevData.contact,
                        ...(fetchedResumeData.contact ?? {})
                    },
                    experience: fetchedResumeData.experience || [],
                    education: fetchedResumeData.education || [],
                    skills: fetchedResumeData.skills || [],
                    projects: fetchedResumeData.projects || [],
                    awards: fetchedResumeData.awards || [],
                    languages: fetchedResumeData.languages || [],
                    interests: fetchedResumeData.interests || []
                }));
                setSelectedTemplate(fetchedResumeData.selectedTemplate || 'professional');
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to load resume: Invalid data structure.' });
            }
        } catch (error) {
            console.error("Error fetching resume:", error);
            setMessage({ type: 'error', text: 'Failed to load resume. ' + error.message });
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (resumeId) {
            fetchResume(resumeId);
        } else {
            setLoading(false);
        }
    }, [resumeId]);

    const handleUseTemplate = (templateName) => {
        setSelectedTemplate(templateName);
    };

    const handleStartFromScratch = () => {
        setResumeData({
            contact: { name: "", title: "", phone: "", email: "", linkedin: "", location: "" },
            summary: "",
            experience: [{ title: "", company: "", startDate: "", endDate: "", details: [""] }],
            education: [{ degree: "", university: "", startDate: "", endDate: "" }],
            skills: [""],
            projects: [{ name: "", description: "" }],
            awards: [{ name: "", description: "" }],
            languages: [""],
            interests: [""]
        });
        setSelectedTemplate('professional');
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    const filteredTemplates = activeFilter === 'All'
        ? allTemplates
        : allTemplates.filter(template => template.tag === activeFilter);

    const handleDownloadPDF = () => {
        const element = resumeRef.current;
        if (element) {
            element.classList.add('pdf-export-mode');

            const opt = {
                margin: [0.5, 2.5, 0.5, 0.5],
                filename: 'my-resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 7,
                    width: 750,
                    windowWidth: 750,
                },
                jsPDF: { unit: 'pt', format: 'a3', orientation: 'portrait' }
            };

            html2pdf().from(element).set(opt).save().finally(() => {
                element.classList.remove('pdf-export-mode');
            });
        }
    };

    const addSuggestionToResume = (suggestion, jobIndex) => {
        setResumeData(prevData => {
            const newExperience = [...prevData.experience];
            const currentDetails = newExperience[jobIndex].details || [];
            const newDetails = [...currentDetails, suggestion];
            newExperience[jobIndex].details = newDetails;
            return { ...prevData, experience: newExperience };
        });
        setAiSuggestions({ index: null, suggestions: [] });
    };

    const handleGenerateAIContent = async (jobTitle, company, jobIndex) => {
        setIsLoading(true);
        setAiSuggestions({ index: null, suggestions: [] });
        try {
            const response = await fetch('http://localhost:5000/api/generate-resume-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobTitle, company })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const data = await response.json();
            if (data.success) {
                setAiSuggestions({ index: jobIndex, suggestions: data.suggestions });
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

  const saveResumeToDatabase = async () => {
    setIsSaving(true);
    setMessage(null);
    const resumeTitle = resumeData.contact?.name || "Untitled Resume";
    const method = resumeId ? 'PUT' : 'POST';
    const url = resumeId ? `${API_BASE_URL}/save-resume/${resumeId}` : `${API_BASE_URL}/save-resume`;

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage({ type: 'error', text: 'You must be logged in to save a resume.' });
            setIsSaving(false);
            return;
        }

        const response = await fetch(url, {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                resumeId: resumeId,
                title: resumeTitle,
                data: { ...resumeData, selectedTemplate }
            }),
        });

        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
            // If not successful, get the response text (which might be HTML)
            const errorText = await response.text();
            console.error("Server responded with an error:", response.status, errorText);
            
            // Try to parse as JSON, but handle if it fails
            try {
                const errorData = JSON.parse(errorText);
                throw new Error(errorData.message || 'Failed to save resume.');
            } catch (jsonError) {
                // If parsing fails, use the raw text as the error message
                throw new Error(`Failed to save resume. Server responded with: ${errorText.substring(0, 100)}...`);
            }
        }

        // If the response is OK, proceed as normal
        const data = await response.json();
        alert(data.message); 
        if (data.resumeId && !resumeId) {
            window.history.pushState({}, '', `/build-resume?id=${data.resumeId}`);
        }

    } catch (error) {
        console.error("Error saving resume:", error);
        setMessage({ type: 'error', text: `Error saving resume: ${error.message}` });
    } finally {
        setIsSaving(false);
    }
};
    

    if (loading) {
        return <div className="loading-state">Loading...</div>;
    }

    if (selectedTemplate) {
        return (
            <div className="resume-editor-page">
                <div className="editor-sidebar2">
                    <a href="#" className="back-link" onClick={() => setSelectedTemplate(null)}>
                        <FaArrowLeft /> Back to Templates
                    </a>
 

                    {message && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                    <button 
                        className="save-button" 
                        onClick={saveResumeToDatabase}
                        disabled={isSaving}
                    >
                        <FaSave /> {isSaving ? "Saving..." : "Save Resume"}
                    </button>
                    <ResumeForm
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                        onGenerateAIContent={handleGenerateAIContent}
                        isLoading={isLoading}
                        aiSuggestions={aiSuggestions}
                        addSuggestionToResume={addSuggestionToResume}
                    />
                </div>
                <div className="resume-preview-area2" ref={resumeRef}>
                    
                     {/* <div className="resume-preview-container"></div> */}
                    
                    <ResumeTemplate resumeData={resumeData} theme={selectedTemplate} />
                    <button className="download-button" onClick={handleDownloadPDF}>
                        <FaDownload /> Download PDF
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="build-resume-container">
            <header className="page-header">
                <a href="#" className="back-link" onClick={onBackToDashboard}>
                    <FaArrowLeft /> Back to Dashboard
                </a>
               
            </header>
            <main className="main-content">
                <h1>Build Your Resume</h1>
                <p>Choose a template to get started or create from scratch</p>
                <div className="options-container">
                    <div className="option-card">
                        <div className="option-header">
                            <FaPlusCircle className="option-icon" />
                            <h3>Start from Scratch</h3>
                        </div>
                        <p>Build your resume from a blank template with AI guidance</p>
                        <button className="cta-button primary" onClick={handleStartFromScratch}>Create New Resume</button>
                    </div>
                    <div className="option-card">
                        <div className="option-header">
                            <FaCloudUploadAlt className="option-icon" />
                            <h3>Upload Existing Resume</h3>
                        </div>
                        <p>Import your current resume and let AI optimize it</p>
                        <button className="cta-button">Upload Resume</button>
                    </div>
                </div>
                <div className="templates-section">
                    <h2>Choose a Template</h2>
                    <div className="template-filters">
                        {['All', 'Business', 'Design', 'Engineering', 'Leadership', 'Education'].map(filter => (
                            <button
                                key={filter}
                                className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => handleFilterChange(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="templates-grid">
    {filteredTemplates.map(template => (
        <div
            key={template.name}
            className={`template-card ${template.new ? 'popular' : ''}`}
            onClick={() => handleUseTemplate(template.name)}
        >
            {template.new && <span className="popular-badge">New</span>}
            {template.imageSrc && (
                <img
                    src={template.imageSrc}
                    alt={`${template.label} Resume Template Preview`}
                    className={`template-preview ${template.name}`}
                />
            )}
            <h3>{template.label}</h3>
            <p className="template-description">{template.description}</p>
            <span className="template-tag">{template.tag}</span>
            <button className="use-template-button">Use This Template</button>
        </div>
    ))}
</div>
                </div>
            </main>
        </div>
    );
};

export default BuildResume;