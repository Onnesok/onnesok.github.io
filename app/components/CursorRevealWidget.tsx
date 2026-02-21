'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedProject } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';

export default function CursorRevealWidget({ projects }: { projects: FeaturedProject[] }) {
    const [hoveredProject, setHoveredProject] = useState<FeaturedProject | null>(null);

    // Smooth physics for the mouse follower
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Offset the image so the cursor is in the center
            cursorX.set(e.clientX - 200); // Half of image width (400px)
            cursorY.set(e.clientY - 150); // Half of image height (300px)
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [cursorX, cursorY]);

    return (
        <div className="cursor-reveal-container">

            {/* The Floating Image that follows the cursor */}
            <motion.div
                className="floating-cursor-image"
                style={{
                    x: cursorX,
                    y: cursorY,
                    opacity: hoveredProject ? 1 : 0,
                    scale: hoveredProject ? 1 : 0.8,
                }}
            >
                {/* We use an internal container to switch the image smoothly */}
                <div className="floating-img-wrapper">
                    {hoveredProject && (
                        <>
                            <Image
                                key={hoveredProject.slug} // Key forces re-render for smooth transition
                                src={hoveredProject.imageUrl}
                                alt="Project Preview"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="floating-img"
                            />
                            <div className="floating-img-overlay">
                                <span className="floating-tech">{hoveredProject.technologies[0]}</span>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>

            {/* The Massive Typography List */}
            <div className="reveal-list">
                <div className="reveal-list-header">
                    <span>Index</span>
                    <span>Project Name</span>
                    <span className="hide-mobile">Domain</span>
                </div>
                {projects.map((project, index) => (
                    <Link
                        key={project.slug}
                        href={`/projects/software/${project.slug}`}
                        className="reveal-list-item"
                        onMouseEnter={() => setHoveredProject(project)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <div className="reveal-index">0{index + 1}</div>
                        <h3 className="reveal-title">{project.title}</h3>
                        <div className="reveal-category hide-mobile">{project.categoryLabel}</div>
                        <div className="reveal-arrow-wrapper">
                            <ArrowUpRight className="reveal-arrow" size={32} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
