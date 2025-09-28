import React from 'react';
import { FaPhone, FaEnvelope, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import './ResumeTemplate.css';

const ResumeTemplate = React.forwardRef(({ resumeData, theme }, ref) => {
    // Destructure data for easier use, providing default values to prevent errors
    const { contact = {}, summary = "", experience = [], education = [], skills = [],
        projects = [], // Add projects
        awards = [],   // Add awards
        languages = [], // Add languages
        interests = []  // Add interests
    } = resumeData || {};

    return (
        <div className={`resume-template-container ${theme}`} ref={ref}>
            <div className="left-column">
                <section className="contact-section resume-section">
                    <h2 className="section-title">CONTACT</h2>
                    <div className="contact-info">
                        <p className="name">{contact.name || "YOUR NAME"}</p>
                        <p className="title">{contact.title || "Your Job Title"}</p>
                        <div className="contact-item"><FaPhone /><p>{contact.phone || "(123) 456-7890"}</p></div>
                        <div className="contact-item"><FaEnvelope /><p>{contact.email || "email@example.com"}</p></div>
                        <div className="contact-item"><FaLinkedin /><p>{contact.linkedin || "linkedin.com/in/profile"}</p></div>
                        <div className="contact-item"><FaMapMarkerAlt /><p>{contact.location || "City, State"}</p></div>
                    </div>
                </section>
                
                {skills.length > 0 && (
                    <section className="skills-section resume-section">
                        <h2 className="section-title">SKILLS</h2>
                        <ul className="skills-list">
                            {skills.map((skill, index) => (
                                <li key={index} className="skill-item">{skill}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {education.length > 0 && (
                    <section className="education-section resume-section">
                        <h2 className="section-title">EDUCATION</h2>
                        {education.map((edu, index) => (
                            <div key={index} className="education-item">
                                <h4 className="item-title">{edu.degree || "Degree Name"}</h4>
                                <p className="university">{edu.university || "University Name"}</p>
                                <p className="dates">{edu.startDate} - {edu.endDate || "Present"}</p>
                            </div>
                        ))}
                    </section>
                )}

                {languages.length > 0 && (
                    <section className="languages-section resume-section">
                        <h2 className="section-title">LANGUAGES</h2>
                        <ul className="languages-list">
                            {languages.map((lang, index) => (
                                <li key={index} className="language-item">{lang}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {interests.length > 0 && (
                    <section className="interests-section resume-section">
                        <h2 className="section-title">INTERESTS</h2>
                        <ul className="interests-list">
                            {interests.map((interest, index) => (
                                <li key={index} className="interest-item">{interest}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            <div className="right-column">
                <section className="summary-section resume-section">
                    <h2 className="section-title">SUMMARY</h2>
                    <p className="summary-text">{summary || "A compelling summary of your professional background and career goals."}</p>
                </section>
                
                {experience.length > 0 && (
                    <section className="experience-section resume-section">
                        <h2 className="section-title">WORK EXPERIENCE</h2>
                        {experience.map((job, index) => (
                            <div key={index} className="experience-item">
                                <h4 className="item-title">{job.title || "Job Title"}</h4>
                                <p className="company-info">{job.company || "Company Name"}{job.location && ` | ${job.location}`}</p>
                                <p className="dates">{job.startDate} - {job.endDate || "Present"}</p>
                                <ul className="details-list">
                                    {Array.isArray(job.details) && job.details.map((detail, detailIndex) => (
                                        <li key={detailIndex} className="detail-item">{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {projects.length > 0 && (
                    <section className="projects-section resume-section">
                        <h2 className="section-title">PROJECTS</h2>
                        {projects.map((project, index) => (
                            <div key={index} className="project-item">
                                <h4 className="item-title">{project.name || "Project Name"}</h4>
                                <p className="project-description">{project.description || "Brief description of the project."}</p>
                            </div>
                        ))}
                    </section>
                )}

                {awards.length > 0 && (
                    <section className="awards-section resume-section">
                        <h2 className="section-title">AWARDS & CERTIFICATIONS</h2>
                        {awards.map((award, index) => (
                            <div key={index} className="award-item">
                                <h4 className="item-title">{award.name || "Award Name"}</h4>
                                <p className="award-description">{award.description || "Brief description of the achievement."}</p>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
});

export default ResumeTemplate;
