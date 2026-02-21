'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';
import { FeaturedProject } from '../data/projects';

interface ProjectShowcaseWidgetProps {
    projects: FeaturedProject[];
    categoryPath: 'software' | 'hardware';
    accentColorVar: string; // e.g., '--primary-accent'
}

export default function ProjectShowcaseWidget({ projects, categoryPath, accentColorVar }: ProjectShowcaseWidgetProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); // Default first item expanded on desktop

    return (
        <div className="project-widget-container">
            {projects.slice(0, 5).map((project, index) => {
                const isActive = hoveredIndex === index;

                return (
                    <motion.div
                        key={project.slug}
                        className={`project-widget-panel ${isActive ? 'active' : ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            layout: { duration: 0.4, type: "spring", stiffness: 200, damping: 25 }
                        }}
                    >
                        <div className="widget-panel-bg">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="widget-panel-img"
                            />
                            <div className="widget-panel-overlay"></div>
                        </div>

                        {/* Collapsed State (Vertical Title) */}
                        <AnimatePresence>
                            {!isActive && (
                                <motion.div
                                    className="widget-collapsed-content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="widget-icon-wrapper" style={{ color: `var(${accentColorVar})` }}>
                                        <Terminal size={24} />
                                    </div>
                                    <h3 className="widget-collapsed-title">{project.title}</h3>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Expanded State */}
                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    className="widget-expanded-content"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <div className="widget-expanded-header">
                                        <span className="widget-badge" style={{ color: `var(${accentColorVar})`, borderColor: `var(${accentColorVar})` }}>
                                            {project.categoryLabel}
                                        </span>
                                    </div>
                                    <div className="widget-expanded-body">
                                        <h3 className="widget-expanded-title">{project.title}</h3>
                                        <p className="widget-expanded-desc">{project.description}</p>

                                        <div className="widget-tech-stack">
                                            {project.technologies.slice(0, 3).map(tech => (
                                                <span key={tech} className="widget-tech-pill">{tech}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <Link href={`/projects/${categoryPath}/${project.slug}`} className="widget-explore-btn" style={{ background: `var(${accentColorVar})` }}>
                                        <span>Explore details</span>
                                        <ArrowRight size={18} />
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
}
