'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedProject } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';

export default function InteractiveListWidget({ projects }: { projects: FeaturedProject[] }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="interactive-list-wrapper">

            {/* The Text List */}
            <div className="interactive-list" onMouseLeave={() => setHoveredIndex(null)}>
                {projects.map((project, index) => {
                    const isHovered = hoveredIndex === index;
                    const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

                    return (
                        <Link
                            key={project.slug}
                            href={`/projects/software/${project.slug}`}
                            className={`interactive-list-row ${isDimmed ? 'dimmed' : ''} ${isHovered ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                        >
                            <div className="list-row-content">

                                <span className="list-row-meta hide-mobile">0{index + 1} // {project.categoryLabel}</span>

                                <h3 className="list-row-title">{project.title}</h3>

                                <div className="list-row-tech hide-mobile">
                                    {project.technologies.slice(0, 3).map(tech => (
                                        <span key={tech}>{tech}</span>
                                    ))}
                                </div>

                                <div className="list-row-icon hide-mobile">
                                    <ArrowUpRight size={24} />
                                </div>
                            </div>

                            {/* Mobile specific layout since list is simpler on narrow screens */}
                            <div className="list-row-mobile-cats show-mobile">
                                <span className="list-row-meta">0{index + 1} // {project.categoryLabel}</span>
                                <div className="list-row-icon">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* The Floating Image Reveal (Desktop Only) */}
            <div className="interactive-list-image-container hide-mobile">
                <AnimatePresence mode="wait">
                    {hoveredIndex !== null && (
                        <motion.div
                            key={projects[hoveredIndex].slug}
                            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                            className="list-hover-image-wrapper"
                        >
                            <Image
                                src={projects[hoveredIndex].imageUrl}
                                alt={projects[hoveredIndex].title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="list-hover-img"
                            />
                            <div className="list-image-overlay"></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    );
}
