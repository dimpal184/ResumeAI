import React, { useState } from 'react';

// Main application component that manages state and page flow
const App = () => {
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
        skills: [""]
    });

    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [currentPage, setCurrentPage] = useState('template_selection');

    const handleUseTemplate = (templateName) => {
        setSelectedTemplate(templateName);
        setCurrentPage('builder');
    };
    
    const handleStartFromScratch = () => {
        setSelectedTemplate('blank'); 
        setCurrentPage('builder');
    };

    const handleBackToTemplates = () => {
        setCurrentPage('template_selection');
        setResumeData({
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
            skills: [""]
        });
    };

    if (currentPage === 'builder') {
        return <ResumeBuilder resumeData={resumeData} setResumeData={setResumeData} selectedTemplate={selectedTemplate} onBack={handleBackToTemplates} />;
    }

    return <TemplateSelection onSelectTemplate={handleUseTemplate} onStartFromScratch={handleStartFromScratch} />;
};

// Component for the template selection screen
const TemplateSelection = ({ onSelectTemplate, onStartFromScratch }) => (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6 font-sans antialiased">
        <header className="w-full max-w-7xl flex items-center justify-between mb-8">
            <div className="logo-section flex items-center mx-auto md:mx-0">
                <img src="https://placehold.co/40x40/000000/FFFFFF?text=R" alt="ResumeAI Logo" className="logo mr-2 rounded-lg" />
                <h2 className="text-2xl font-bold text-gray-800">ResumeAI</h2>
            </div>
        </header>

        <main className="w-full max-w-7xl">
            <h1 className="text-4xl font-extrabold text-center text-gray-900">Build Your Resume</h1>
            <p className="text-center text-gray-600 mt-2 mb-8">Choose a template to get started or create from scratch</p>
            <div className="options-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="option-card bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform hover:scale-105 cursor-pointer" onClick={() => onSelectTemplate('professional')}>
                    <div className="option-header flex items-center justify-center text-blue-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '3rem', height: '3rem' }}>
                            <path d="M12 4.5a.75.75 0 0 1 .75.75v6h6a.75.75 0 0 1 0 1.5h-6v6a.75.75 0 0 1-1.5 0v-6h-6a.75.75 0 0 1 0-1.5h6v-6a.75.75 0 0 1 .75-.75z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">Professional</h3>
                    <p className="text-gray-500 mt-2">A clean and classic layout for a formal look.</p>
                </div>

                <div className="option-card bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform hover:scale-105 cursor-pointer" onClick={() => onSelectTemplate('blank')}>
                    <div className="option-header flex items-center justify-center text-gray-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '3rem', height: '3rem' }}>
                            <path fillRule="evenodd" d="M16.5 4.478a.75.75 0 0 0-1.28-.515L12 6.845l-3.22-2.882a.75.75 0 0 0-1.28.515l-.75 9.5a.75.75 0 0 0 .584.723l1.972.336a.75.75 0 0 1 .69.754l-.45 4.5a.75.75 0 0 0 1.5 0l.375-3.75h.94l.375 3.75a.75.75 0 0 0 1.5 0l-.45-4.5a.75.75 0 0 1 .69-.754l1.972-.336a.75.75 0 0 0 .584-.723l-.75-9.5zM12 8.428l1.79-1.604.475 5.992-2.265.385-2.265-.385.475-5.992L12 8.428z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">Blank</h3>
                    <p className="text-gray-500 mt-2">Start with a blank canvas and minimal styling.</p>
                </div>

                <div className="option-card bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform hover:scale-105 cursor-pointer" onClick={() => onSelectTemplate('creative')}>
                    <div className="option-header flex items-center justify-center text-purple-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '3rem', height: '3rem' }}>
                            <path d="M12 1.5a.75.75 0 0 0-.75.75V3h-2.25a.75.75 0 0 0-.75.75v3h-.75a.75.75 0 0 0-.75.75v3h-.75a.75.75 0 0 0-.75.75v2.25a.75.75 0 0 0 .75.75h.75v3h.75a.75.75 0 0 0 .75.75v3h2.25a.75.75 0 0 0 .75.75h2.25a.75.75 0 0 0 .75-.75h.75v-3h.75a.75.75 0 0 0 .75-.75v-3h.75a.75.75 0 0 0 .75-.75V8.25a.75.75 0 0 0-.75-.75h-.75V5.25a.75.75 0 0 0-.75-.75h-.75V2.25a.75.75 0 0 0-.75-.75h-2.25z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">Creative</h3>
                    <p className="text-gray-500 mt-2">A modern and visually striking design with a focus on color and typography.</p>
                </div>
            </div>
        </main>
    </div>
);


// Component for the resume form and preview
const ResumeBuilder = ({ resumeData, setResumeData, selectedTemplate, onBack }) => {

    const ResumeForm = ({ resumeData, setResumeData }) => {
        // Handler for basic text inputs (contact and summary)
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

        // Handler for array items (experience, education, skills)
        const handleArrayChange = (section, index, field, e) => {
            const { value } = e.target;
            setResumeData(prevData => {
                const newArray = [...prevData[section]];
                newArray[index] = { ...newArray[index], [field]: value };
                return { ...prevData, [section]: newArray };
            });
        };

        const addArrayItem = (section, itemTemplate) => {
            setResumeData(prevData => ({
                ...prevData,
                [section]: [...prevData[section], itemTemplate]
            }));
        };

        const removeArrayItem = (section, index) => {
            setResumeData(prevData => ({
                ...prevData,
                [section]: prevData[section].filter((_, i) => i !== index)
            }));
        };
    
        const handleSkillsChange = (index, e) => {
            const { value } = e.target;
            setResumeData(prevData => {
                const newSkills = [...prevData.skills];
                newSkills[index] = value;
                return { ...prevData, skills: newSkills };
            });
        };
    
        const addSkill = () => {
            setResumeData(prevData => ({
                ...prevData,
                skills: [...prevData.skills, ""]
            }));
        };
    
        const removeSkill = (index) => {
            setResumeData(prevData => ({
                ...prevData,
                skills: prevData.skills.filter((_, i) => i !== index)
            }));
        };

        return (
            <div className="resume-form-container p-6 bg-gray-50 rounded-lg shadow-inner overflow-y-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <form className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={resumeData.contact.name || ''}
                        onChange={(e) => handleTextChange('contact', 'name', e)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input 
                        type="text" 
                        placeholder="Job Title" 
                        value={resumeData.contact.title || ''}
                        onChange={(e) => handleTextChange('contact', 'title', e)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        value={resumeData.contact.phone || ''}
                        onChange={(e) => handleTextChange('contact', 'phone', e)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={resumeData.contact.email || ''}
                        onChange={(e) => handleTextChange('contact', 'email', e)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input 
                        type="text" 
                        placeholder="LinkedIn Profile" 
                        value={resumeData.contact.linkedin || ''}
                        onChange={(e) => handleTextChange('contact', 'linkedin', e)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input 
                        type="text" 
                        placeholder="Location" 
                        value={resumeData.contact.location || ''}
                        onChange={(e) => handleTextChange('contact', 'location', e)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </form>

                <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">Professional Summary</h3>
                <textarea
                    className="summary-textarea w-full px-4 py-2 border rounded-md h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Write a brief professional summary..."
                    value={resumeData.summary || ''}
                    onChange={(e) => setResumeData(prevData => ({ ...prevData, summary: e.target.value }))}
                ></textarea>

                <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2 flex items-center justify-between">
                    Work Experience
                    <button 
                        type="button" 
                        onClick={() => addArrayItem('experience', { title: '', company: '', startDate: '', endDate: '', details: [''] })}
                        className="add-button bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem' }}>
                            <path d="M12 4.5a.75.75 0 0 1 .75.75v6h6a.75.75 0 0 1 0 1.5h-6v6a.75.75 0 0 1-1.5 0v-6h-6a.75.75 0 0 1 0-1.5h6v-6a.75.75 0 0 1 .75-.75z" />
                        </svg>
                    </button>
                </h3>
                {resumeData.experience.map((job, index) => (
                    <div key={index} className="form-entry border p-4 rounded-lg mt-4 bg-white shadow-sm">
                        <div className="entry-header flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-700">Job #{index + 1}</h4>
                            <button type="button" onClick={() => removeArrayItem('experience', index)} className="remove-button text-red-500 hover:text-red-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem' }}>
                                    <path fillRule="evenodd" d="M16.5 4.478a.75.75 0 0 0-1.28-.515L12 6.845l-3.22-2.882a.75.75 0 0 0-1.28.515l-.75 9.5a.75.75 0 0 0 .584.723l1.972.336a.75.75 0 0 1 .69.754l-.45 4.5a.75.75 0 0 0 1.5 0l.375-3.75h.94l.375 3.75a.75.75 0 0 0 1.5 0l-.45-4.5a.75.75 0 0 1 .69-.754l1.972-.336a.75.75 0 0 0 .584-.723l-.75-9.5zM12 8.428l1.79-1.604.475 5.992-2.265.385-2.265-.385.475-5.992L12 8.428z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Job Title" 
                            value={job.title || ''}
                            onChange={(e) => handleArrayChange('experience', index, 'title', e)}
                            className="w-full px-3 py-1 mb-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                        <input 
                            type="text" 
                            placeholder="Company" 
                            value={job.company || ''}
                            onChange={(e) => handleArrayChange('experience', index, 'company', e)}
                            className="w-full px-3 py-1 mb-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                        <div className="date-inputs flex space-x-2 mb-2">
                            <input type="text" placeholder="Start Date" value={job.startDate || ''} onChange={(e) => handleArrayChange('experience', index, 'startDate', e)} className="w-1/2 px-3 py-1 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                            <input type="text" placeholder="End Date" value={job.endDate || ''} onChange={(e) => handleArrayChange('experience', index, 'endDate', e)} className="w-1/2 px-3 py-1 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                        </div>
                        <h5 className="font-medium text-gray-600 mt-2">Details:</h5>
                        {Array.isArray(job.details) && job.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="detail-row flex items-center space-x-2 mt-1">
                                <textarea
                                    placeholder="Key responsibility/achievement..."
                                    value={detail || ''}
                                    onChange={(e) => {
                                        const newDetails = [...job.details];
                                        newDetails[detailIndex] = e.target.value;
                                        setResumeData(prevData => {
                                            const newExperience = [...prevData.experience];
                                            newExperience[index].details = newDetails;
                                            return { ...prevData, experience: newExperience };
                                        });
                                    }}
                                    className="w-full px-3 py-1 border rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                                ></textarea>
                                {job.details.length > 1 && (
                                    <button type="button" onClick={() => {
                                        const newDetails = job.details.filter((_, i) => i !== detailIndex);
                                        setResumeData(prevData => {
                                            const newExperience = [...prevData.experience];
                                            newExperience[index].details = newDetails;
                                            return { ...prevData, experience: newExperience };
                                        });
                                    }} className="remove-detail text-red-400 hover:text-red-600 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem' }}>
                                            <path fillRule="evenodd" d="M16.5 4.478a.75.75 0 0 0-1.28-.515L12 6.845l-3.22-2.882a.75.75 0 0 0-1.28.515l-.75 9.5a.75.75 0 0 0 .584.723l1.972.336a.75.75 0 0 1 .69.754l-.45 4.5a.75.75 0 0 0 1.5 0l.375-3.75h.94l.375 3.75a.75.75 0 0 0 1.5 0l-.45-4.5a.75.75 0 0 1 .69-.754l1.972-.336a.75.75 0 0 0 .584-.723l-.75-9.5zM12 8.428l1.79-1.604.475 5.992-2.265.385-2.265-.385.475-5.992L12 8.428z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={() => {
                            setResumeData(prevData => {
                                const newExperience = [...prevData.experience];
                                newExperience[index].details = [...newExperience[index].details, ''];
                                return { ...prevData, experience: newExperience };
                            });
                        }} className="add-detail mt-2 text-blue-500 hover:text-blue-700 transition-colors text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem', display: 'inline-block', marginRight: '0.25rem' }}>
                                <path d="M12 4.5a.75.75 0 0 1 .75.75v6h6a.75.75 0 0 1 0 1.5h-6v6a.75.75 0 0 1-1.5 0v-6h-6a.75.75 0 0 1 0-1.5h6v-6a.75.75 0 0 1 .75-.75z" />
                            </svg> Add Point
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    const ResumeTemplate = ({ resumeData, theme }) => {
        const { contact = {}, summary = "", experience = [], education = [], skills = [] } = resumeData || {};

        const renderProfessionalTemplate = () => (
            <div className="resume-template-container w-full h-full p-8 bg-white shadow-xl rounded-lg">
                <header className="w-full bg-blue-800 text-white p-8 rounded-t-lg">
                    <h1 className="text-4xl font-bold font-serif text-center">{contact.name || "YOUR NAME"}</h1>
                    <p className="text-xl text-center mt-2 opacity-80">{contact.title || "Your Job Title"}</p>
                </header>
                <main className="main-body p-8 border border-gray-200 border-t-0 rounded-b-lg">
                    <section className="summary-section mb-6">
                        <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-1 text-gray-800">SUMMARY</h2>
                        <p className="mt-2 text-gray-700">{summary || "A compelling summary of your professional background and career goals."}</p>
                    </section>
                    <section className="experience-section mb-6">
                        <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-1 text-gray-800">WORK EXPERIENCE</h2>
                        {experience.map((job, index) => (
                            <div key={index} className="experience-item mt-4">
                                <h4 className="font-semibold text-lg text-gray-900">{job.title || "Job Title"}</h4>
                                <p className="company-info text-sm text-gray-600">{job.company || "Company Name"} | {job.location || "City, State"}</p>
                                <p className="dates text-xs text-gray-500 italic mt-1">{job.startDate} - {job.endDate || "Present"}</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                                    {Array.isArray(job.details) && job.details.map((detail, detailIndex) => (
                                        <li key={detailIndex}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                    <section className="education-section mb-6">
                        <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-1 text-gray-800">EDUCATION</h2>
                        {education.map((edu, index) => (
                            <div key={index} className="education-item mt-4">
                                <h4 className="font-semibold text-lg text-gray-900">{edu.degree || "Degree Name"}</h4>
                                <p className="university text-sm text-gray-600">{edu.university || "University Name"}</p>
                                <p className="dates text-xs text-gray-500 italic mt-1">{edu.startDate} - {edu.endDate || "Present"}</p>
                            </div>
                        ))}
                    </section>
                    <section className="skills-section mb-6">
                        <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-1 text-gray-800">SKILLS</h2>
                        <ul className="list-disc pl-5 mt-2 flex flex-wrap gap-x-6 text-gray-700">
                            {skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </section>
                    <section className="contact-section">
                        <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-1 text-gray-800">CONTACT</h2>
                        <div className="flex flex-col space-y-2 mt-4 text-gray-700">
                            <div className="contact-item flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem', color: '#3b82f6' }}>
                                    <path d="M1.5 8.67v8.58c0 1.545 1.488 2.585 2.807 1.832L9 16.632V7.124L4.307 4.636A2.25 2.25 0 0 0 1.5 6.273v2.397zM16.5 7.124v9.508l4.693 2.5a2.25 2.25 0 0 0 2.807-1.832V8.67c0-1.545-1.488-2.585-2.807-1.832L16.5 7.124zM7.5 7.668V19.5a2.25 2.25 0 0 0 3.935 1.545l4.582-2.502a.75.75 0 0 0 .002-1.341l-1.97-1.115a.75.75 0 0 1-.362-.647V8.599a.75.75 0 0 1 .36-.645l1.97-1.115a.75.75 0 0 0-.002-1.342l-4.582-2.502A2.25 2.25 0 0 0 7.5 5.568V7.668z" />
                                </svg>
                                <p>{contact.phone || "(123) 456-7890"}</p>
                            </div>
                            <div className="contact-item flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem', color: '#3b82f6' }}>
                                    <path d="M1.5 8.67v8.58c0 1.545 1.488 2.585 2.807 1.832L9 16.632V7.124L4.307 4.636A2.25 2.25 0 0 0 1.5 6.273v2.397zM16.5 7.124v9.508l4.693 2.5a2.25 2.25 0 0 0 2.807-1.832V8.67c0-1.545-1.488-2.585-2.807-1.832L16.5 7.124zM7.5 7.668V19.5a2.25 2.25 0 0 0 3.935 1.545l4.582-2.502a.75.75 0 0 0 .002-1.341l-1.97-1.115a.75.75 0 0 1-.362-.647V8.599a.75.75 0 0 1 .36-.645l1.97-1.115a.75.75 0 0 0-.002-1.342l-4.582-2.502A2.25 2.25 0 0 0 7.5 5.568V7.668z" />
                                </svg>
                                <p>{contact.email || "email@example.com"}</p>
                            </div>
                            <div className="contact-item flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem', color: '#3b82f6' }}>
                                    <path d="M12.454 12.01l-1.492 1.492-3.64-3.64a.75.75 0 0 1 0-1.06l1.492-1.492a.75.75 0 0 1 1.06 0l2.148 2.148 2.148-2.148a.75.75 0 0 1 1.06 0l1.492 1.492a.75.75 0 0 1 0 1.06l-3.64 3.64z" />
                                </svg>
                                <p>{contact.linkedin || "linkedin.com/in/profile"}</p>
                            </div>
                            <div className="contact-item flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem', color: '#3b82f6' }}>
                                    <path d="M12.003 2.5a.75.75 0 0 0-.75.75v3.132l-.248.165a.75.75 0 0 0-.007 1.258l2.996 1.73a.75.75 0 0 0 .754-.002l2.99-1.728a.75.75 0 0 0 .004-1.258l-.248-.165V3.25a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75z" />
                                    <path d="M12.003 2.5a.75.75 0 0 0-.75.75v3.132l-.248.165a.75.75 0 0 0-.007 1.258l2.996 1.73a.75.75 0 0 0 .754-.002l2.99-1.728a.75.75 0 0 0 .004-1.258l-.248-.165V3.25a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75z" />
                                    <path d="M12.003 2.5a.75.75 0 0 0-.75.75v3.132l-.248.165a.75.75 0 0 0-.007 1.258l2.996 1.73a.75.75 0 0 0 .754-.002l2.99-1.728a.75.75 0 0 0 .004-1.258l-.248-.165V3.25a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75z" />
                                    <path d="M12.003 2.5a.75.75 0 0 0-.75.75v3.132l-.248.165a.75.75 0 0 0-.007 1.258l2.996 1.73a.75.75 0 0 0 .754-.002l2.99-1.728a.75.75 0 0 0 .004-1.258l-.248-.165V3.25a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75z" />
                                    <path d="M12.003 2.5a.75.75 0 0 0-.75.75v3.132l-.248.165a.75.75 0 0 0-.007 1.258l2.996 1.73a.75.75 0 0 0 .754-.002l2.99-1.728a.75.75 0 0 0 .004-1.258l-.248-.165V3.25a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75z" />
                                    <path d="M12.003 2.5a.75.75 0 0 0-.75.75v3.132l-.248.165a.75.75 0 0 0-.007 1.258l2.996 1.73a.75.75 0 0 0 .754-.002l2.99-1.728a.75.75 0 0 0 .004-1.258l-.248-.165V3.25a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75z" />
                                    <path d="M12.003 2.5a.75.75 0 0 0-.75.75v3.132l-.248.165a.75.75 0 0 0-.007 1.258l2.996 1.73a.75.75 0 0 0 .754-.002l2.99-1.728a.75.75 0 0 0 .004-1.258l-.248-.165V3.25a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75z" />
                                    <path d="M12.003 2.5a.75.75 0 0 0-.75.75v3.132l-.248.165a.75.75 0 0 0-.007 1.258l2.996 1.73a.75.75 0 0 0 .754-.002l2.99-1.728a.75.75 0 0 0 .004-1.258l-.248-.165V3.25a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75z" />
                                    <path d="M12.003 2.5a.75.75 0 0 0-.75.75v3.132l-.248.165a.75.75 0 0 0-.007 1.258l2.996 1.73a.75.75 0 0 0 .754-.002l2.99-1.728a.75.75 0 0 0 .004-1.258l-.248-.165V3.25a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75z" />
                                </svg>
                                <p>{contact.location || "City, State"}</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        );

        const renderBlankTemplate = () => (
            <div className="resume-template-container w-full h-full p-8 bg-white shadow-xl rounded-lg blank-template">
                <header className="blank-template-header text-center">
                    <h1 className="text-4xl blank-template-name">{contact.name || "YOUR NAME"}</h1>
                    <p className="text-lg blank-template-title mt-1">{contact.title || "Your Job Title"}</p>
                    <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-500 blank-template-contact-icons">
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 4.5c.75 0 1.5.38 1.95.95l6.5 6.5c.7.7.7 1.8 0 2.5l-6.5 6.5c-.5.5-1.2.75-1.95.75h-5.5c-1.5 0-2.75-1.25-2.75-2.75v-10.5c0-1.5 1.25-2.75 2.75-2.75h5.5zm-5.5 1.5c-.75 0-1.25.5-1.25 1.25v10.5c0 .75.5 1.25 1.25 1.25h5.5l5.5-5.5-5.5-5.5h-5.5z"/>
                            </svg>
                            <span>{contact.phone || "(123) 456-7890"}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                            </svg>
                            <span>{contact.email || "email@example.com"}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8 17H5v-7h3v7zM6.5 8.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zM19 17h-3v-4.5c0-1.24-.76-1.75-1.5-1.75s-1.5.51-1.5 1.75V17h-3v-7h3v1.5c.5-1.5 2-2.5 3-2.5 2.5 0 4 1.5 4 4v4H19z"/>
                            </svg>
                            <span>{contact.linkedin || "linkedin.com/in/profile"}</span>
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    <section className="mb-6">
                        <h2 className="text-2xl font-bold blank-template-section-title">Summary</h2>
                        <p className="blank-template-text">{summary || "A brief overview of your professional background, skills, and career goals. This section should be tailored to the specific job you are applying for and highlight your most relevant qualifications."}</p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-bold blank-template-section-title">Work Experience</h2>
                        {experience.map((job, index) => (
                            <div key={index} className="experience-item mt-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-lg blank-template-text">{job.title || "Job Title"}</h4>
                                        <p className="text-sm text-gray-500">{job.company || "Company Name"}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 italic">{job.startDate} - {job.endDate || "Present"}</p>
                                </div>
                                <ul className="list-disc pl-5 mt-2 space-y-1 blank-template-text">
                                    {Array.isArray(job.details) && job.details.map((detail, detailIndex) => (
                                        <li key={detailIndex}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-bold blank-template-section-title">Education</h2>
                        {education.map((edu, index) => (
                            <div key={index} className="education-item mt-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-lg blank-template-text">{edu.degree || "Degree Name"}</h4>
                                        <p className="text-sm text-gray-500">{edu.university || "University Name"}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 italic">{edu.startDate} - {edu.endDate || "Present"}</p>
                                </div>
                            </div>
                        ))}
                    </section>
                    
                    <section className="mb-6">
                        <h2 className="text-2xl font-bold blank-template-section-title">Skills</h2>
                        <ul className="list-disc pl-5 mt-2 flex flex-wrap gap-x-6 blank-template-text">
                            {skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </section>
                </main>
            </div>
        );

        // Render the correct template based on the selected theme
        if (theme === 'professional') {
            return renderProfessionalTemplate();
        } else if (theme === 'blank') {
            return renderBlankTemplate();
        }
        return renderProfessionalTemplate();
    };

    const handleDownload = () => {
        // This is the simplest cross-browser way to "download" a resume.
        // It opens the browser's print dialog, which offers a "Save as PDF" option.
        window.print();
    };

    return (
        <div className="app-container min-h-screen bg-gray-100 font-sans antialiased flex flex-col items-center p-6">
            <header className="w-full max-w-7xl flex items-center justify-between mb-8">
                <div className="logo-section flex items-center mx-auto md:mx-0">
                    <img src="https://placehold.co/40x40/000000/FFFFFF?text=R" alt="ResumeAI Logo" className="logo mr-2 rounded-lg" />
                    <h2 className="text-2xl font-bold text-gray-800">ResumeAI</h2>
                </div>
            </header>

            <main className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-column">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">Build Your Resume</h1>
                        <button onClick={onBack} className="back-button text-sm text-blue-600 hover:text-blue-800 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                            </svg>
                            Back to templates
                        </button>
                    </div>
                    <p className="text-gray-600 mb-6">Fill out the form below to create your resume. The preview on the right will update in real-time.</p>
                    <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
                </div>
                <div className="preview-column md:sticky md:top-6 self-start">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Live Preview</h2>
                        <button
                            onClick={handleDownload}
                            className="download-button px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-colors"
                        >
                            Download PDF
                        </button>
                    </div>
                    <div className="resume-preview h-[85vh] overflow-y-auto bg-gray-200 p-4 rounded-lg shadow-xl">
                        <ResumeTemplate resumeData={resumeData} theme={selectedTemplate} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
