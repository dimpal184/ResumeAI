import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

// Define base styles and theme-specific styles in a single StyleSheet object.
// This is the core logic that translates your CSS into @react-pdf/renderer styles.
const getStyles = (theme) => {
    // Base styles that apply to all templates
    const baseStyles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#FFFFFF',
        },
        leftColumn: {
            width: '35%',
            padding: '28pt 18pt',
        },
        rightColumn: {
            width: '65%',
            padding: '28pt 18pt',
        },
        section: {
            marginBottom: '15pt',
        },
        sectionTitle: {
            fontSize: '12pt',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: '10pt',
            paddingBottom: '5pt',
        },
        contactItem: {
            fontSize: '8.5pt',
            marginBottom: '7pt',
        },
        experienceItem: {
            marginBottom: '15pt',
        },
        itemTitle: {
            fontSize: '10pt',
            fontWeight: 'bold',
        },
        itemSubTitle: {
            fontSize: '9pt',
            fontStyle: 'italic',
            color: '#666',
        },
        itemDates: {
            fontSize: '9pt',
            color: '#888',
            marginBottom: '5pt',
        },
        detailsList: {
            marginLeft: '10pt',
            marginTop: '5pt',
        },
        detailItem: {
            fontSize: '9pt',
            lineHeight: 1.5,
        },
        summaryText: {
            fontSize: '9pt',
            lineHeight: 1.6,
        },
        list: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        listItem: {
            fontSize: '9pt',
            marginRight: '10pt',
            marginBottom: '5pt',
        },
    });

    // Theme-specific styles to be merged with base styles
    let themeStyles = {};
    switch (theme) {
        case 'professional':
            themeStyles = StyleSheet.create({
                page: { fontFamily: 'Helvetica' },
                leftColumn: { backgroundColor: '#f8f9fa', borderRight: '1pt solid #e9ecef' },
                rightColumn: { backgroundColor: '#ffffff', borderLeft: '5pt solid #2c3e50' },
                name: { fontSize: '22pt', fontWeight: 'bold', color: '#2c3e50', letterSpacing: '-1pt' },
                title: { fontSize: '12pt', color: '#7f8c8d' },
                sectionTitle: { color: '#2c3e50', borderBottom: '2pt solid #34495e' },
            });
            break;
        case 'creative':
            themeStyles = StyleSheet.create({
                page: { fontFamily: 'Times-Roman', backgroundColor: '#f0f4f7' },
                leftColumn: { backgroundColor: '#ffffff' },
                rightColumn: { backgroundColor: '#e4e7ea' },
                name: { fontSize: '25pt', fontWeight: 'extrabold', color: '#4a4e69' },
                title: { fontSize: '11pt', color: '#7a8698', fontStyle: 'italic' },
                sectionTitle: { color: '#4a4e69', fontSize: '13pt', borderBottom: '3pt dashed #7a8698', paddingBottom: '5pt' },
            });
            break;
        case 'technical':
            themeStyles = StyleSheet.create({
                page: { fontFamily: 'Courier', color: '#212529', backgroundColor: '#ffffff' },
                leftColumn: { backgroundColor: '#f8f9fa', borderRight: '2pt solid #6c757d' },
                name: { fontSize: '24pt', fontWeight: 'bold', color: '#212529', textTransform: 'uppercase', letterSpacing: '1pt' },
                title: { fontSize: '12pt', color: '#495057' },
                sectionTitle: { color: '#343a40', borderBottom: '2pt solid #343a40', paddingBottom: '2pt' },
            });
            break;
        case 'elegant':
            themeStyles = StyleSheet.create({
                page: { fontFamily: 'Times-Roman', backgroundColor: '#fcfcfc', color: '#4a4a4a' },
                leftColumn: { backgroundColor: '#ffffff', borderRight: '1pt solid #ddd' },
                name: { fontSize: '25pt', fontWeight: 'semibold', color: '#2c3e50', letterSpacing: '1pt', borderBottom: '2pt solid #c9d1d9', paddingBottom: '5pt' },
                title: { fontSize: '12pt', color: '#7f8c8d' },
                sectionTitle: { color: '#2c3e50', fontWeight: 'bold', fontSize: '11pt' },
            });
            break;
        case 'minimalist':
            themeStyles = StyleSheet.create({
                page: { fontFamily: 'Helvetica', backgroundColor: '#ffffff', color: '#333' },
                leftColumn: { backgroundColor: '#ffffff', borderRight: '2pt solid #222' },
                name: { fontSize: '28pt', fontWeight: 'light', color: '#222', marginBottom: 0 },
                sectionTitle: { fontSize: '12pt', fontWeight: 'normal', textTransform: 'none', letterSpacing: 0, borderBottom: '2pt solid #555', paddingBottom: '5pt' },
            });
            break;
        case 'business':
            themeStyles = StyleSheet.create({
                page: { fontFamily: 'Times-Roman', backgroundColor: '#ffffff', color: '#444' },
                leftColumn: { backgroundColor: '#e9eff5', borderRight: '1pt solid #c8d3e0' },
                rightColumn: { backgroundColor: '#ffffff', borderLeft: '5pt solid #2c3e50' },
                name: { fontSize: '22pt', fontWeight: 'bold', color: '#2c3e50', letterSpacing: '0.5pt' },
                title: { fontSize: '11pt', color: '#7f8c8d', fontStyle: 'italic' },
                sectionTitle: { color: '#2c3e50', borderBottom: '2pt solid #34495e', paddingBottom: '3pt' },
            });
            break;
        case 'design':
            themeStyles = StyleSheet.create({
                page: { fontFamily: 'Helvetica', backgroundColor: '#f5f5f5', color: '#333' },
                leftColumn: { backgroundColor: '#ffffff', borderRight: '4pt solid #a9b9c9' },
                name: { fontSize: '28pt', fontWeight: 'extrabold', color: '#2c3e50', lineHeight: 1 },
                title: { fontSize: '12pt', fontWeight: 'medium', color: '#888' },
                sectionTitle: { color: '#4a4a4a', fontSize: '14pt', letterSpacing: '1pt' },
            });
            break;
        case 'engineering':
            themeStyles = StyleSheet.create({
                page: { fontFamily: 'Helvetica', backgroundColor: '#ffffff', color: '#212529' },
                leftColumn: { backgroundColor: '#f7f9fc', borderRight: '1pt solid #e9ecef' },
                name: { fontSize: '24pt', fontWeight: 'bold', color: '#2c3e50', letterSpacing: '1pt', textTransform: 'uppercase' },
                title: { fontSize: '12pt', color: '#495057' },
                sectionTitle: { color: '#2c3e50', borderBottom: '2pt solid #2c3e50', paddingBottom: '2pt' },
            });
            break;
        case 'leadership':
            themeStyles = StyleSheet.create({
                page: { fontFamily: 'Helvetica', backgroundColor: '#fcfcfc', color: '#333' },
                leftColumn: { backgroundColor: '#ffffff', borderRight: '1pt solid #e0e0e0' },
                name: { fontSize: '28pt', fontWeight: 'extrabold', color: '#2c3e50', letterSpacing: '-1pt' },
                title: { fontSize: '15pt', fontWeight: 'medium', color: '#7f8c8d' },
                sectionTitle: { color: '#2c3e50', fontSize: '15pt', textTransform: 'none', borderBottom: '2pt solid #7f8c8d', paddingBottom: '3pt' },
            });
            break;
        default:
            themeStyles = {};
            break;
    }

    // Merge base styles with theme-specific styles
    return StyleSheet.create({ ...baseStyles, ...themeStyles });
};

const MyResumePDF = ({ resumeData, theme }) => {
    const styles = getStyles(theme);

    const { 
        contact = {}, 
        summary = "", 
        experience = [], 
        education = [], 
        skills = [],
        projects = [],
        awards = [],
        languages = [],
        interests = []
    } = resumeData || {};

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Left Column */}
                <View style={styles.leftColumn}>
                    {/* Contact Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>CONTACT</Text>
                        <View style={styles.contactInfo}>
                            <Text style={styles.name}>{contact.name || "YOUR NAME"}</Text>
                            <Text style={styles.title}>{contact.title || "Your Job Title"}</Text>
                            <Text style={styles.contactItem}>{contact.phone || "(123) 456-7890"}</Text>
                            <Text style={styles.contactItem}>{contact.email || "email@example.com"}</Text>
                            <Link src={`https://${contact.linkedin}`} style={styles.contactItem}>
                                {contact.linkedin || "linkedin.com/in/profile"}
                            </Link>
                            <Text style={styles.contactItem}>{contact.location || "City, State"}</Text>
                        </View>
                    </View>

                    {/* Skills Section */}
                    {skills.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>SKILLS</Text>
                            <View style={styles.list}>
                                {skills.map((skill, index) => (
                                    <Text key={index} style={styles.listItem}>{skill}</Text>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Education Section */}
                    {education.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>EDUCATION</Text>
                            {education.map((edu, index) => (
                                <View key={index} style={styles.experienceItem}>
                                    <Text style={styles.itemTitle}>{edu.degree || "Degree Name"}</Text>
                                    <Text style={styles.itemSubTitle}>{edu.university || "University Name"}</Text>
                                    <Text style={styles.itemDates}>{edu.startDate} - {edu.endDate || "Present"}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Languages Section */}
                    {languages.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>LANGUAGES</Text>
                            <View style={styles.list}>
                                {languages.map((lang, index) => (
                                    <Text key={index} style={styles.listItem}>{lang}</Text>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Interests Section */}
                    {interests.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>INTERESTS</Text>
                            <View style={styles.list}>
                                {interests.map((interest, index) => (
                                    <Text key={index} style={styles.listItem}>{interest}</Text>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                {/* Right Column */}
                <View style={styles.rightColumn}>
                    {/* Summary Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>SUMMARY</Text>
                        <Text style={styles.summaryText}>{summary || "A compelling summary of your professional background and career goals."}</Text>
                    </View>

                    {/* Work Experience Section */}
                    {experience.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
                            {experience.map((job, index) => (
                                <View key={index} style={styles.experienceItem}>
                                    <Text style={styles.itemTitle}>{job.title || "Job Title"}</Text>
                                    <Text style={styles.itemSubTitle}>{job.company || "Company Name"}{job.location && ` | ${job.location}`}</Text>
                                    <Text style={styles.itemDates}>{job.startDate} - {job.endDate || "Present"}</Text>
                                    <View style={styles.detailsList}>
                                        {Array.isArray(job.details) && job.details.map((detail, detailIndex) => (
                                            <Text key={detailIndex} style={styles.detailItem}>• {detail}</Text>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Projects Section */}
                    {projects.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>PROJECTS</Text>
                            {projects.map((project, index) => (
                                <View key={index} style={styles.experienceItem}>
                                    <Text style={styles.itemTitle}>{project.name || "Project Name"}</Text>
                                    <Text style={styles.summaryText}>{project.description || "Brief description of the project."}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Awards Section */}
                    {awards.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>AWARDS & CERTIFICATIONS</Text>
                            {awards.map((award, index) => (
                                <View key={index} style={styles.experienceItem}>
                                    <Text style={styles.itemTitle}>{award.name || "Award Name"}</Text>
                                    <Text style={styles.summaryText}>{award.description || "Brief description of the achievement."}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};

export default MyResumePDF;