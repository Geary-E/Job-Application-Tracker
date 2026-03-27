import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import { Navigate, Link, Outlet, useOutletContext } from 'react-router-dom';
import DashboardLayOut from './DashboardLayOut';
import './styling/DashboardLayOut.css';
import './styling/Templates.css'; // testing : new CSS file
import axiosInstance from './axiosInstance';

const Templates = () => {

       const { user } = useOutletContext();
       const [templates, setTemplates] = useState([]); // state to hold templates data
       const [loading, setLoading] = useState(false); // state to track loading status 
       const [generating, setGenerating] = useState(false); // state to track if template generation is in progress 
       const [error, setError] = useState(null); // state to hold any error messages
       const [selectedTemplate, setSelectedTemplate] = useState(null); // state to track which template is selected for preview

       const resumes = templates.filter(t => t.is_resume);
       const coverLetters = templates.filter(t => !t.is_resume);

       useEffect(() => {
        fetchTemplates();   // fetching templates
       }, []);

       const fetchTemplates = async () => {
            setLoading(true);
        try {
            const response = await axiosInstance.get('user_templates/');
            setTemplates(response.data);
        } catch (err) {
            console.log("Error: ",err);
            setError('Failed to load templates.');
        } finally {
            setLoading(false);
        }
    };

       const handleGenerateResume = async () => {
        setGenerating(true);
        setError(null);
        try {
            await axiosInstance.post('generated_resume/');
            await fetchTemplates();
        } catch (err) {
            console.log("Error: ", err);
            setError('Failed to generate resume. Please try again.');
        } finally {
            setGenerating(false);
        }
    };

        const handleGenerateCoverLetter = async () => {
        const company = prompt('Enter company name (optional):');
        const jobTitle = prompt('Enter job title (optional):');
        setGenerating(true);
        setError(null);
        try {
            await axiosInstance.post('generated_resume/', {
                is_resume: false,
                company: company || '',
                job_title: jobTitle || '',
            });
            await fetchTemplates();
        } catch (err) {
            console.log("Error: ", err);
            setError('Failed to generate cover letter. Please try again.');
        } finally {
            setGenerating(false);
        }
    };

        const handleDelete = async (templateId) => {
            if (!window.confirm('Delete this template?')) return;
                try {
                    await axiosInstance.delete(`user_templates/${templateId}/`);
                    setTemplates(prev => prev.filter(t => t.id !== templateId));
                    if (selectedTemplate?.id === templateId) setSelectedTemplate(null);
                } catch (err) {
                    console.log("Error: ", err);
                    setError('Failed to delete template.');
            }
        };

        const handleToggleLike = async (template) => {
            try {
                await axiosInstance.patch(`user_templates/${template.id}/`, {
                liked: !template.liked,
                });
            setTemplates(prev =>
                prev.map(t => t.id === template.id ? { ...t, liked: !t.liked } : t)
            );
            } catch (err) {
                console.log("Error: ", err);
                setError('Failed to update template.');
            }
        };

        return (
        <div className="second-section">
            <div className="templates-header">
                <h1>Templates</h1>
                <div className="templates-actions"> {/* buttons to generate templates start */}
                    <button
                        className="btn-generate"
                        onClick={handleGenerateResume}
                        disabled={generating}
                    >
                        {generating ? 'Generating...' : '+ Generate Resume'}
                    </button>
                    <button
                        className="btn-generate btn-secondary"
                        onClick={handleGenerateCoverLetter}
                        disabled={generating}
                    >
                        {generating ? 'Generating...' : '+ Generate Cover Letter'}
                    </button>
                </div> {/* buttons to generate templates end */}

            </div>

            {error && <div className="templates-error">{error}</div>}

            <div className="templates-body">

                {/* LEFT: template list */}
                <div className="templates-list">
                    {loading && <p className="templates-loading">Loading templates...</p>}

                    {!loading && templates.length === 0 && (
                        <div className="templates-empty">
                            <p>No templates yet.</p>
                            <p>Generate a resume or cover letter to get started.</p>
                        </div>
                    )}

                    {resumes.length > 0 && (
                        <div className="template-group">
                            <h3 className="group-label">Resumes</h3><br/>
                            {resumes.map(template => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    isSelected={selectedTemplate?.id === template.id}
                                    onSelect={() => setSelectedTemplate(template)}
                                    onDelete={() => handleDelete(template.id)}
                                    onToggleLike={() => handleToggleLike(template)}
                                />
                            ))}<br/>
                        </div>
                    )}

                    {coverLetters.length > 0 && (
                        <div className="template-group">
                            <h3 className="group-label">Cover Letters</h3>
                            {coverLetters.map(template => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    isSelected={selectedTemplate?.id === template.id}
                                    onSelect={() => setSelectedTemplate(template)}
                                    onDelete={() => handleDelete(template.id)}
                                    onToggleLike={() => handleToggleLike(template)}
                                />
                            ))}
                        </div>
                    )}
                </div>
                    {/* Right: template preview */}
                    <div className="templates-preview">
                    {selectedTemplate ? (
                        <>
                        <div className="preview-header">
                            <div>
                                <h2>{selectedTemplate.title}</h2>
                                <span className={`type-badge ${selectedTemplate.is_resume ? 'resume' : 'cover'}`}>
                                    {selectedTemplate.is_resume ? 'Resume' : 'Cover Letter'}
                                </span>
                            </div>
                            <button
                                className="btn-copy"
                                onClick={() => navigator.clipboard.writeText(selectedTemplate.content)}
                            >
                                Copy Text
                            </button>
                            </div>
                            <pre className="preview-content">{selectedTemplate.title}</pre> {/* displaying title instead of content for testing */}
                        </>
                    ) : (
                        <div className="preview-empty">
                            <p>Select a template to preview it here.</p>
                        </div>
                    )}
                </div> {/* end of preview section */}
            </div>
        </div>
    );
};

// Small reusable card component
const TemplateCard = ({ template, isSelected, onSelect, onDelete, onToggleLike }) => (
    <div
        className={`template-list-item ${isSelected ? 'selected' : ''}`}
        onClick={onSelect}
    >
        <div className="tli-dot" style={{ background: template.is_resume ? '#f5c518' : '#4a9eff' }} />
        <div className="tli-info">
            <div className="tli-name">{template.title}</div>
            <div className="tli-meta">
                {new Date(template.created_at).toLocaleDateString()}
            </div>
        </div>
        <div className="tli-actions" onClick={e => e.stopPropagation()}>
            <button className="tli-btn" onClick={onToggleLike}>
                {template.liked ? '★' : '☆'}
            </button>
            <button className="tli-btn danger" onClick={onDelete}>✕</button>
        </div><br/>
    </div>
);

export default Templates;