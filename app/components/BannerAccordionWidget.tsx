'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedProject } from '../data/projects';
import { motion } from 'framer-motion';
import { ArrowUpRight, Video, Gamepad2, X, Terminal } from 'lucide-react';

export default function BannerAccordionWidget({ projects }: { projects: FeaturedProject[] }) {
    // Default to the first project being expanded
    const [activeIndex, setActiveIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalProjects = projects.length + 1; // +1 for the 99+ card

    return (
        <div className="banner-accordion-container">
            {projects.map((project, index) => {
                const isActive = activeIndex === index;

                return (
                    <div
                        key={project.slug}
                        className={`banner-slice ${isActive ? 'active' : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => setActiveIndex(index)}
                    >
                        {/* Background Image Layer */}
                        <div className="banner-bg-wrapper">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className={`banner-bg-img ${isActive ? 'zoomed' : ''}`}
                            />
                            {/* Gradient overlay to ensure text is always readable */}
                            <div className="banner-overlay"></div>
                        </div>

                        {/* Collapsed State Content (Vertical Text) */}
                        <div className="banner-collapsed-content">
                            <span className="banner-vert-text">{project.title}</span>
                            <span className="banner-vert-num">0{index + 1}</span>
                        </div>

                        {/* Expanded State Content */}
                        <div className="banner-expanded-content">
                            <div className="banner-expanded-header">
                                <span className="banner-category">{project.categoryLabel}</span>
                                <span className="banner-num-large">0{index + 1}</span>
                            </div>

                            <div className="banner-expanded-footer">
                                <h3 className="banner-title">{project.title}</h3>

                                <div className="banner-details">
                                    <p className="banner-desc">{project.description}</p>

                                    <div className="banner-tech">
                                        {project.technologies.slice(0, 4).map(tech => (
                                            <span key={tech} className="banner-pill">{tech}</span>
                                        ))}
                                    </div>

                                    <div className="project-actions">
                                        <Link href={`/projects/software/${project.slug}`} className="banner-explore-btn">
                                            Explore Architecture <ArrowUpRight size={18} style={{ marginLeft: '8px' }} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* The "99+ More" Special Slice */}
            <div
                className={`banner-slice more-slice ${activeIndex === projects.length ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(projects.length)}
                onClick={() => setActiveIndex(projects.length)}
            >
                <div className="banner-bg-wrapper">
                    <div className="more-bg-gradient" />
                    <div className="more-tech-grid" />
                    <div className="banner-overlay"></div>
                </div>

                <div className="banner-collapsed-content">
                    <span className="banner-vert-text">Explore Legacy</span>
                    <Terminal size={20} className="banner-vert-num" />
                </div>

                <div className="banner-expanded-content">
                    <div className="banner-expanded-header">
                        <span className="banner-category">Beyond Featured</span>
                        <span className="banner-num-large">99+</span>
                    </div>

                    <div className="banner-expanded-footer">
                        <h3 className="banner-title">99+ More Projects</h3>

                        <div className="banner-details">
                            <p className="banner-desc">
                                My digital odyssey spans hundreds of smaller experiments,
                                backend engines, and open-source contributions.
                            </p>

                            <div className="banner-tech">
                                <span className="banner-pill">Automation Bots</span>
                                <span className="banner-pill">E-commerce API</span>
                                <span className="banner-pill">Micro-Services</span>
                            </div>

                            <div className="project-actions">
                                <button onClick={() => setIsModalOpen(true)} className="banner-explore-btn">
                                    View Full Repository <ArrowUpRight size={18} style={{ marginLeft: '8px' }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Popup */}
            {isModalOpen && (
                <div className="more-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="more-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                            <X size={24} />
                        </button>

                        <div className="modal-body">
                            <h2 className="modal-title">The Depth of the Odyssey</h2>
                            <p className="modal-text">
                                Beyond these featured works lies a vast ecosystem of experiments, open-source contributions, and architectural prototypes.
                            </p>
                            <p className="modal-text">
                                Explore the complete digital archive and ongoing developments directly on GitHub.
                            </p>
                            <a
                                href="https://github.com/Onnesok"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="modal-cta-btn"
                                style={{ marginTop: '1.5rem' }}
                            >
                                Open GitHub Archive <ArrowUpRight size={18} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
