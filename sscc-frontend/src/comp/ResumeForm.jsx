import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const ResumeForm = ({ resumeData, setResumeData }) => {
    // New state for AI suggestions and loading status
    const [aiSuggestions, setAiSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFieldChange = (section, e) => {
        const { value } = e.target;
        setResumeData(prevData => ({
            ...prevData,
            [section]: value,
        }));
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
        setResumeData(prevData => ({
            ...prevData,
            [section]: [...prevData[section], newItem],
        }));
    };

    const removeArrayItem = (section, index) => {
        setResumeData(prevData => {
            const newArray = prevData[section].filter((_, i) => i !== index);
            return { ...prevData, [section]: newArray };
        });
    };

    // New: Function to add an AI-generated point to the resume
    const addSuggestionToResume = (suggestion, jobIndex) => {
        setResumeData(prevData => {
            const newExperience = [...prevData.experience];
            const currentDetails = newExperience[jobIndex].details;
            
            // Add the new point and clear the suggestions
            const newDetails = [...currentDetails, suggestion];
            newExperience[jobIndex].details = newDetails;
            
            return { ...prevData, experience: newExperience };
        });
        setAiSuggestions([]); // Clear suggestions after one is added
    };

    // New: Async function to call the backend API
    const handleGenerateAIContent = async (jobTitle, company, jobIndex) => {
        setIsLoading(true);
        setAiSuggestions([]); // Clear previous suggestions
        try {
            const response = await fetch('/api/generate-resume-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobTitle, company })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.success) {
                // Split the string into an array of bullet points
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

    return (
        <div className="resume-form-container">
            {/* Contact Information */}
            <h3 className="form-section-header1">Contact Information</h3>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={resumeData.contact.name || ''}
                    onChange={(e) => handleObjectChange('contact', 'name', e)}
                />
                <input
                    type="text"
                    placeholder="Job Title"
                    value={resumeData.contact.title || ''}
                    onChange={(e) => handleObjectChange('contact', 'title', e)}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={resumeData.contact.phone || ''}
                    onChange={(e) => handleObjectChange('contact', 'phone', e)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={resumeData.contact.email || ''}
                    onChange={(e) => handleObjectChange('contact', 'email', e)}
                />
                <input
                    type="text"
                    placeholder="LinkedIn Profile"
                    value={resumeData.contact.linkedin || ''}
                    onChange={(e) => handleObjectChange('contact', 'linkedin', e)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={resumeData.contact.location || ''}
                    onChange={(e) => handleObjectChange('contact', 'location', e)}
                />
            </div>

            {/* Professional Summary */}
            <h3 className="form-section-header">Professional Summary</h3>
            <div className="form-group">
                <textarea
                    placeholder="Write a brief professional summary..."
                    value={resumeData.summary || ''}
                    onChange={(e) => handleFieldChange('summary', e)}
                ></textarea>
            </div>

            {/* Work Experience */}
            <h3 className="form-section-header">
                Work Experience
                <button type="button" onClick={() => addArrayItem('experience', { title: '', company: '', startDate: '', endDate: '', details: [''] })} className="add-button">
                    <FaPlus />
                </button>
            </h3>
            {resumeData.experience.map((job, index) => (
                <div key={index} className="form-entry">
                    <div className="entry-header">
                        <h4>Job #{index + 1}</h4>
                        <button type="button" onClick={() => removeArrayItem('experience', index)} className="remove-button">
                            <FaTrash />
                        </button>
                    </div>
                    <input type="text" placeholder="Job Title" value={job.title || ''} onChange={(e) => handleArrayChange('experience', index, e, 'title')} />
                    <input type="text" placeholder="Company" value={job.company || ''} onChange={(e) => handleArrayChange('experience', index, e, 'company')} />
                    
                    {/* New: "Generate with AI" Button */}
                    <button 
                        type="button" 
                        className="ai-button" 
                        onClick={() => handleGenerateAIContent(job.title, job.company, index)}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Generating...' : '✨ Generate with AI'}
                    </button>
                    
                    {/* New: Display AI Suggestions */}
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
                    <textarea placeholder="Job details (one per line)..." value={job.details.join('\n')} onChange={(e) => {
                        const newDetails = e.target.value.split('\n');
                        setResumeData(prevData => {
                            const newArray = [...prevData.experience];
                            newArray[index] = { ...newArray[index], details: newDetails };
                            return { ...prevData, experience: newArray };
                        });
                    }}></textarea>
                </div>
            ))}

            {/* All other sections (Education, Skills, etc.) remain the same */}
            <h3 className="form-section-header">
                Education
                <button type="button" onClick={() => addArrayItem('education', { degree: '', university: '', startDate: '', endDate: '' })} className="add-button">
                    <FaPlus />
                </button>
            </h3>
            {resumeData.education.map((edu, index) => (
                <div key={index} className="form-entry">
                    <div className="entry-header">
                        <h4>Education #{index + 1}</h4>
                        <button type="button" onClick={() => removeArrayItem('education', index)} className="remove-button">
                            <FaTrash />
                        </button>
                    </div>
                    <input type="text" placeholder="Degree" value={edu.degree || ''} onChange={(e) => handleArrayChange('education', index, e, 'degree')} />
                    <input type="text" placeholder="University" value={edu.university || ''} onChange={(e) => handleArrayChange('education', index, e, 'university')} />
                    <div className="date-group">
                        <input type="text" placeholder="Start Date" value={edu.startDate || ''} onChange={(e) => handleArrayChange('education', index, e, 'startDate')} />
                        <input type="text" placeholder="End Date" value={edu.endDate || ''} onChange={(e) => handleArrayChange('education', index, e, 'endDate')} />
                    </div>
                </div>
            ))}
            
            <h3 className="form-section-header">
                Skills
                <button type="button" onClick={() => addArrayItem('skills', '')} className="add-button">
                    <FaPlus />
                </button>
            </h3>
            {resumeData.skills.map((skill, index) => (
                <div key={index} className="form-entry">
                    <div className="entry-header">
                        <h4>Skill #{index + 1}</h4>
                        <button type="button" onClick={() => removeArrayItem('skills', index)} className="remove-button">
                            <FaTrash />
                        </button>
                    </div>
                    <input type="text" placeholder="e.g., JavaScript, React, CSS" value={skill || ''} onChange={(e) => handleArrayChange('skills', index, e)} />
                </div>
            ))}
            
            <h3 className="form-section-header">
                Projects
                <button type="button" onClick={() => addArrayItem('projects', { name: '', description: '' })} className="add-button">
                    <FaPlus />
                </button>
            </h3>
            {resumeData.projects.map((project, index) => (
                <div key={index} className="form-entry">
                    <div className="entry-header">
                        <h4>Project #{index + 1}</h4>
                        <button type="button" onClick={() => removeArrayItem('projects', index)} className="remove-button">
                            <FaTrash />
                        </button>
                    </div>
                    <input type="text" placeholder="Project Name" value={project.name || ''} onChange={(e) => handleArrayChange('projects', index, e, 'name')} />
                    <textarea placeholder="Description..." value={project.description || ''} onChange={(e) => handleArrayChange('projects', index, e, 'description')} />
                </div>
            ))}
            
            <h3 className="form-section-header">
                Awards & Certifications
                <button type="button" onClick={() => addArrayItem('awards', { name: '', description: '' })} className="add-button">
                    <FaPlus />
                </button>
            </h3>
            {resumeData.awards.map((award, index) => (
                <div key={index} className="form-entry">
                    <div className="entry-header">
                        <h4>Award #{index + 1}</h4>
                        <button type="button" onClick={() => removeArrayItem('awards', index)} className="remove-button">
                            <FaTrash />
                        </button>
                    </div>
                    <input type="text" placeholder="Award/Certification Name" value={award.name || ''} onChange={(e) => handleArrayChange('awards', index, e, 'name')} />
                    <textarea placeholder="Description..." value={award.description || ''} onChange={(e) => handleArrayChange('awards', index, e, 'description')} />
                </div>
            ))}
            
            <h3 className="form-section-header">
                Languages
                <button type="button" onClick={() => addArrayItem('languages', '')} className="add-button">
                    <FaPlus />
                </button>
            </h3>
            {resumeData.languages.map((language, index) => (
                <div key={index} className="form-entry">
                    <div className="entry-header">
                        <h4>Language #{index + 1}</h4>
                        <button type="button" onClick={() => removeArrayItem('languages', index)} className="remove-button">
                            <FaTrash />
                        </button>
                    </div>
                    <input type="text" placeholder="e.g., English, Spanish" value={language || ''} onChange={(e) => handleArrayChange('languages', index, e)} />
                </div>
            ))}
            
            <h3 className="form-section-header">
                Interests
                <button type="button" onClick={() => addArrayItem('interests', '')} className="add-button">
                    <FaPlus />
                </button>
            </h3>
            {resumeData.interests.map((interest, index) => (
                <div key={index} className="form-entry">
                    <div className="entry-header">
                        <h4>Interest #{index + 1}</h4>
                        <button type="button" onClick={() => removeArrayItem('interests', index)} className="remove-button">
                            <FaTrash />
                        </button>
                    </div>
                    <input type="text" placeholder="e.g., Photography, Hiking" value={interest || ''} onChange={(e) => handleArrayChange('interests', index, e)} />
                </div>
            ))}
        </div>
    );
};

export default ResumeForm;