'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedProject } from '../data/projects';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

export default function AppleCarouselWidget({ projects }: { projects: FeaturedProject[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of container width
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    return (
        <div className="apple-carousel-wrapper">

            {/* Elegant Floating Navigation Controls */}
            <div className="apple-carousel-controls">
                <button
                    className={`apple-nav-btn ${!canScrollLeft ? 'disabled' : ''}`}
                    onClick={() => scroll('left')}
                    aria-label="Previous project"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    className={`apple-nav-btn ${!canScrollRight ? 'disabled' : ''}`}
                    onClick={() => scroll('right')}
                    aria-label="Next project"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* The Scrolling Track */}
            <div
                className="apple-carousel-track hide-scrollbar"
                ref={scrollContainerRef}
                onScroll={handleScroll}
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={project.slug}
                        className="apple-carousel-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link href={`/projects/software/${project.slug}`} className="apple-card-link">

                            {/* Image Background */}
                            <div className="apple-card-img-wrapper">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="apple-card-img"
                                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 800px"
                                />
                                <div className="apple-card-gradient"></div>
                            </div>

                            {/* Content Overlay */}
                            <div className="apple-card-content">
                                <div className="apple-card-header">
                                    <span className="apple-card-category">{project.categoryLabel}</span>
                                    <div className="apple-card-arrow-bg">
                                        <ArrowUpRight size={20} className="apple-card-arrow" />
                                    </div>
                                </div>

                                <div className="apple-card-body">
                                    <h3 className="apple-card-title">{project.title}</h3>
                                    <p className="apple-card-desc">{project.description}</p>

                                    <div className="apple-card-tech">
                                        {project.technologies.slice(0, 3).map(tech => (
                                            <span key={tech} className="apple-tech-pill">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </Link>
                    </motion.div>
                ))}

                {/* Spacer block so the last card doesn't stuck to the right edge */}
                <div className="apple-carousel-spacer"></div>
            </div>
        </div>
    );
}
