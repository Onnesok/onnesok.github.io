'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedProject } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';

// Single Interactive Card Component for the Grid
const BentoCard = ({ project, index }: { project: FeaturedProject; index: number }) => {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position relative to card center (-1 to 1)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

    // Parallax layers
    const parallaxZ_bg = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);
    const parallaxZ_content = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXObj = e.clientX - rect.left;
        const mouseYObj = e.clientY - rect.top;
        const xPct = mouseXObj / width - 0.5;
        const yPct = mouseYObj / height - 0.5;
        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    // Make the first item span 2 columns/rows if it's the feature
    const isFeature = index === 0;

    return (
        <motion.div
            className={`bento-cell ${isFeature ? 'feature-cell' : ''}`}
            style={{ perspective: 1000 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <Link
                href={`/projects/software/${project.slug}`}
                ref={cardRef}
                className="bento-card-interactive"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    className="bento-card-inner"
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                >
                    {/* Background Layer */}
                    <motion.div
                        className="bento-bg-layer"
                        style={{ zIndex: 0, transform: `translateZ(${parallaxZ_bg}) scale(1.1)` }}
                    >
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className={`bento-img ${isHovered ? 'hovered' : ''}`}
                        />
                        <div className="bento-overlay"></div>
                    </motion.div>

                    {/* Content Layer (Pops out in 3D) */}
                    <motion.div
                        className="bento-content-layer"
                        style={{ zIndex: 10, transform: `translateZ(40px)` }}
                    >
                        <div className="bento-header">
                            <span className="bento-category">{project.categoryLabel}</span>
                            <motion.div
                                className="bento-arrow"
                                animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowUpRight size={24} />
                            </motion.div>
                        </div>

                        <div className="bento-footer">
                            <h3 className="bento-title">{project.title}</h3>
                            {isFeature && (
                                <p className="bento-desc">{project.description}</p>
                            )}
                            <div className="bento-tech">
                                {project.technologies.slice(0, 3).map(tech => (
                                    <span key={tech} className="bento-pill">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Link>
        </motion.div>
    );
};

export default function BentoGridWidget({ projects }: { projects: FeaturedProject[] }) {
    return (
        <div className="bento-grid-container">
            {projects.map((project, index) => (
                <BentoCard key={project.slug} project={project} index={index} />
            ))}
        </div>
    );
}
