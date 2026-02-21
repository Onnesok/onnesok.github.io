'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedProject } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';

export default function SplitScrollWidget({ projects }: { projects: FeaturedProject[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Track scroll progress through this specific container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Determine which project should be active based on scroll progress
    // If we have 4 projects, 
    // 0.00-0.25 -> Project 0
    // 0.25-0.50 -> Project 1
    // etc.
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const index = Math.min(
                Math.floor(latest * projects.length),
                projects.length - 1
            );
            setActiveIndex(index);
        });
        return () => unsubscribe();
    }, [scrollYProgress, projects.length]);

    // Optional progress bar logic
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const activeProject = projects[activeIndex];

    return (
        <div className="split-scroll-container" ref={containerRef}>

            {/* PROGRESS BAR - Left Edge */}
            <motion.div
                className="split-progress-bar"
                style={{ scaleY }}
            />

            {/* STICKY LEFT COLUMN (Details) */}
            <div className="split-sticky-col">
                <div className="split-sticky-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, position: 'absolute' }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="split-info-panel"
                        >
                            <span className="split-category">{activeProject.categoryLabel}</span>
                            <h3 className="split-title">{activeProject.title}</h3>
                            <p className="split-desc">{activeProject.description}</p>

                            <div className="split-tech">
                                {activeProject.technologies.slice(0, 4).map(tech => (
                                    <span key={tech} className="split-pill">{tech}</span>
                                ))}
                                {activeProject.technologies.length > 4 && (
                                    <span className="split-pill empty">+{activeProject.technologies.length - 4}</span>
                                )}
                            </div>

                            <Link href={`/projects/software/${activeProject.slug}`} className="split-explore-btn">
                                Explore Details <ArrowUpRight size={18} />
                            </Link>

                        </motion.div>
                    </AnimatePresence>

                    {/* Section Index Counter */}
                    <div className="split-counter">
                        <div className="split-counter-inner">
                            0{activeIndex + 1} <span className="dim">/ 0{projects.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SCROLLING RIGHT COLUMN (Images) */}
            <div className="split-scroll-col">
                {projects.map((project, index) => {
                    return (
                        <div key={project.slug} className="split-image-panel">
                            <motion.div
                                className={`split-image-wrapper ${activeIndex === index ? 'active' : ''}`}
                                initial={{ filter: 'grayscale(100%) blur(4px)', scale: 0.95 }}
                                whileInView={{ filter: 'grayscale(0%) blur(0px)', scale: 1 }}
                                viewport={{ margin: "-40% 0px -40% 0px" }} // Triggers when roughly centered
                                transition={{ duration: 0.6 }}
                            >
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="split-img"
                                />
                                <div className="split-img-overlay"></div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
