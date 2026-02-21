'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedProject } from '../data/projects';
import { ArrowUpRight, Video, Gamepad2 } from 'lucide-react';

export default function BannerAccordionWidget({ projects }: { projects: FeaturedProject[] }) {
    // Default to the first project being expanded
    const [activeIndex, setActiveIndex] = useState(0);

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
        </div>
    );
}
