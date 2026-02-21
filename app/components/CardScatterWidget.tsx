'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedProject } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';

// Pre-calc random positions so hydration matches
const scatterPositions = [
    { top: "10%", left: "5%", rotation: -10 },
    { top: "40%", left: "25%", rotation: 5 },
    { top: "15%", left: "50%", rotation: 12 },
    { top: "50%", left: "70%", rotation: -8 },
    { top: "5%", left: "80%", rotation: 15 },
    { top: "60%", left: "10%", rotation: -15 },
];

export default function CardScatterWidget({ projects }: { projects: FeaturedProject[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeZIndex, setActiveZIndex] = useState(10);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Provide a simple list on mobile, scatter on desktop
    return (
        <div className="card-scatter-wrapper">
            {/* Desktop Draggable Physics Canvas */}
            <div className="card-scatter-canvas hide-mobile" ref={containerRef}>
                {projects.map((project, index) => {
                    const pos = scatterPositions[index % scatterPositions.length];
                    const Controls = useAnimation(); // Allows us to programatically reset position if needed

                    return (
                        <motion.div
                            key={`desktop-${project.slug}`}
                            drag
                            dragConstraints={containerRef}
                            dragElastic={0.5}
                            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                            onDragStart={() => setActiveZIndex(prev => prev + 1)}
                            onHoverStart={() => setActiveZIndex(prev => prev + 1)}
                            initial={{
                                top: pos.top,
                                left: pos.left,
                                rotate: mounted ? pos.rotation : 0,
                                opacity: 0,
                                scale: 0.8,
                                zIndex: index
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotate: pos.rotation,
                                zIndex: activeZIndex
                            }}
                            whileHover={{
                                scale: 1.05,
                                rotate: 0,
                                zIndex: activeZIndex + 10,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ cursor: "grabbing" }}
                            className="scatter-card"
                            style={{ position: 'absolute' }}
                            onClick={() => setActiveZIndex(prev => prev + 1)}
                        >
                            <div className="scatter-card-inner">
                                <Link href={`/projects/software/${project.slug}`} className="scatter-img-wrapper" draggable={false}>
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        style={{ objectFit: 'cover', pointerEvents: 'none' }}
                                        className="scatter-img"
                                    />
                                    <div className="scatter-overlay">
                                        <ArrowUpRight size={24} className="scatter-explore-icon" />
                                    </div>
                                </Link>

                                <div className="scatter-content">
                                    <div className="scatter-header">
                                        <span className="scatter-category">{project.categoryLabel}</span>
                                    </div>
                                    <h3 className="scatter-title">{project.title}</h3>
                                    <div className="scatter-tech">
                                        {project.technologies.slice(0, 2).map((tech, i) => (
                                            <span key={i} className="scatter-dot" title={tech}></span>
                                        ))}
                                        {project.technologies.length > 2 && <span className="scatter-dot-more">+{project.technologies.length - 2}</span>}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Mobile Simple Stack Alternative (Since dragging UI is awkward on touch phones) */}
            <div className="card-scatter-mobile show-mobile">
                {projects.map((project, index) => (
                    <div key={`mobile-${project.slug}`} className="scatter-mobile-card">
                        <Link href={`/projects/software/${project.slug}`} className="scatter-mobile-link">
                            <div className="scatter-mobile-img-wrapper">
                                <Image src={project.imageUrl} alt={project.title} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="scatter-mobile-content">
                                <span className="scatter-category">{project.categoryLabel}</span>
                                <h3 className="scatter-title">{project.title}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
}
