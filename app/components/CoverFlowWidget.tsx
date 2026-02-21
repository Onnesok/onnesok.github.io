'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeaturedProject } from '../data/projects';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Cpu } from 'lucide-react';

export default function CoverFlowWidget({ projects }: { projects: FeaturedProject[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const next = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <div className="coverflow-widget-container">
            <div className="coverflow-track">
                {projects.map((project, i) => {
                    // Calculate offset from center (-2, -1, 0, 1, 2)
                    let offset = i - currentIndex;

                    // Handle wrapping for infinite feel
                    if (offset > projects.length / 2) offset -= projects.length;
                    if (offset < -projects.length / 2) offset += projects.length;

                    const absOffset = Math.abs(offset);
                    const isCenter = offset === 0;

                    // Values for 3D Transform
                    const zIndex = 100 - absOffset;
                    const scale = isCenter ? 1 : Math.max(0.6, 1 - (absOffset * 0.2));
                    // X-axis spread based on offset (e.g. 0, 300, 600)
                    const x = offset * 250;
                    // Rotate cards towards center
                    const rotateY = offset * -25;
                    const opacity = absOffset > 2 ? 0 : 1;

                    // Dimming for depth
                    const brightness = isCenter ? 1 : Math.max(0.4, 1 - (absOffset * 0.3));

                    return (
                        <motion.div
                            key={project.slug}
                            className={`coverflow-card ${isCenter ? 'active' : ''}`}
                            initial={false}
                            animate={{ x, scale, zIndex, opacity, rotateY, filter: `brightness(${brightness})` }}
                            transition={{ type: "spring", stiffness: 250, damping: 25 }}
                            onClick={() => {
                                if (offset !== 0) {
                                    setDirection(offset > 0 ? 1 : -1);
                                    setCurrentIndex(i);
                                }
                            }}
                            style={{ pointerEvents: opacity === 0 ? 'none' : 'auto' }}
                        >
                            <div className="coverflow-img-wrapper">
                                <Image
                                    src={project.imageUrl}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    alt={project.title}
                                />
                                <div className="coverflow-overlay"></div>
                                <div className="coverflow-badge">{project.categoryLabel}</div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Context Panel for Active Item */}
            <div className="coverflow-context-panel">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        className="coverflow-info"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="coverflow-title">{projects[currentIndex].title}</h3>
                        <p className="coverflow-desc">{projects[currentIndex].description}</p>
                        <div className="coverflow-actions">
                            <Link href={`/projects/hardware/${projects[currentIndex].slug}`} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--tertiary-accent) 0%, var(--secondary-accent) 100%)' }}>
                                <Cpu size={18} /> Deep Dive
                            </Link>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="coverflow-controls">
                    <button onClick={prev} className="coverflow-btn"><ChevronLeft size={24} /></button>
                    <div className="coverflow-indicator">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </div>
                    <button onClick={next} className="coverflow-btn"><ChevronRight size={24} /></button>
                </div>
            </div>
        </div>
    );
}
