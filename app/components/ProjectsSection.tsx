'use client';

import { useState } from 'react';
import { Github, PlayCircle, ExternalLink } from 'lucide-react';
import { hardwareProjects, softwareProjects } from '../data/projects';
import Image from 'next/image';

export default function ProjectsSection() {
    const [activeTab, setActiveTab] = useState<'hardware' | 'software'>('software');

    const projects = activeTab === 'hardware' ? hardwareProjects : softwareProjects;

    return (
        <section id="projects" className="section-padding" style={{ backgroundColor: 'var(--bg-dark)' }}>
            <div className="container">
                <div className="projects-header">
                    <h2 className="heading-1 text-gradient" style={{ marginBottom: '1rem' }}>Featured Projects</h2>
                    <p className="about-text text-center">A showcase of my best work in robotics and software development</p>
                </div>

                <div className="modern-tabs-container">
                    <div className="modern-tabs">
                        <button
                            className={`modern-tab ${activeTab === 'software' ? 'active' : ''}`}
                            onClick={() => setActiveTab('software')}
                        >
                            Software Engineering
                        </button>
                        <button
                            className={`modern-tab ${activeTab === 'hardware' ? 'active' : ''}`}
                            onClick={() => setActiveTab('hardware')}
                        >
                            Hardware & Robotics
                        </button>
                    </div>
                </div>

                <div className="featured-projects-list">
                    {projects.map((project, index) => (
                        <div
                            key={`${project.title}-${index}`}
                            className={`featured-project-card ${index % 2 !== 0 ? 'reversed' : ''} animate-fade-in`}
                            style={{ animationDelay: `${(index % 3) * 150}ms` }}
                        >
                            <div className="project-visual">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="project-img"
                                />
                                <div className="project-visual-overlay"></div>
                            </div>

                            <div className="project-info">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>

                                <div className="project-tech-stack">
                                    {project.technologies.map(tech => (
                                        <span key={tech} className="tech-pill">{tech}</span>
                                    ))}
                                </div>

                                <div className="project-links">
                                    {project.demoUrl && (
                                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" aria-label="Live Demo">
                                            <ExternalLink size={18} /> Live Preview
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" aria-label="GitHub Repository">
                                            <Github size={18} /> Source Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex-center" style={{ marginTop: '5rem' }}>
                    <a href="https://github.com/Onnesok?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large">
                        Explore All Projects on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
