'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedProject } from '../data/projects';
import { ArrowLeft, ArrowRight, ArrowUpRight, Video, Gamepad2 } from 'lucide-react';

export default function ImmersiveSliderWidget({ projects }: { projects: FeaturedProject[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const autoPlayTimer = setInterval(() => {
            paginate(1);
        }, 5000); // Auto slide every 5 seconds

        return () => clearInterval(autoPlayTimer);
    }, [currentIndex, isHovered]);

    const slideVariants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
                scale: 1.2,
                filter: 'blur(10px)',
                skewX: direction > 0 ? -10 : 10
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1.05,
            filter: 'blur(0px)',
            skewX: 0
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0,
                scale: 0.9,
                filter: 'blur(10px)',
                skewX: direction < 0 ? -10 : 10
            };
        }
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex >= projects.length) nextIndex = 0;
            if (nextIndex < 0) nextIndex = projects.length - 1;
            return nextIndex;
        });
    };

    const activeProject = projects[currentIndex];

    // Split title into words for staggered animation
    const titleWords = activeProject.title.split(' ');

    return (
        <div
            className="immersive-slider-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="slider-bg-wrapper">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.4 },
                            scale: { duration: 1.2, ease: "easeOut" },
                            filter: { duration: 0.8 },
                            skewX: { duration: 0.5 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="slider-slide"
                    >
                        <Image
                            src={activeProject.imageUrl}
                            alt={activeProject.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                            className="slider-image"
                        />
                        {/* Dramatic vignette overlay */}
                        <div className="slider-vignette"></div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="slider-content-layer">
                <div className="slider-header">
                    <div className="slider-counter">
                        <span className="current">0{currentIndex + 1}</span>
                        <span className="divider">/</span>
                        <span className="total">0{projects.length}</span>
                    </div>
                    <div className="slider-category">
                        {activeProject.categoryLabel}
                    </div>
                </div>

                <div className="slider-main-content">
                    <h2 className="slider-huge-title">
                        {titleWords.map((word, i) => (
                            <div key={`${currentIndex}-${i}`} className="word-mask">
                                <motion.span
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 + (i * 0.1), ease: [0.33, 1, 0.68, 1] }}
                                >
                                    {word}&nbsp;
                                </motion.span>
                            </div>
                        ))}
                    </h2>

                    <motion.div
                        key={`desc-${currentIndex}`} // Force re-render on slide change
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="slider-details-group">
                            <p className="slider-desc">{activeProject.description}</p>

                            <div className="slider-tech">
                                {activeProject.technologies.slice(0, 3).map(tech => (
                                    <span key={tech} className="slider-pill">{tech}</span>
                                ))}
                            </div>

                            <div className="project-actions" style={{ marginTop: '1rem' }}>
                                <Link href={`/projects/hardware/${activeProject.slug}`} className="slider-explore-btn">
                                    Explore Details <ArrowUpRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="slider-navigation desktop-only-flex">
                    <button className="slider-nav-btn" onClick={() => paginate(-1)}>
                        <ArrowLeft size={24} />
                    </button>
                    <button className="slider-nav-btn" onClick={() => paginate(1)}>
                        <ArrowRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
