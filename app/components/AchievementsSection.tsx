'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { allMilestones } from '../data/milestones';

// Only show top 6 on the home page
const recentMilestones = allMilestones.filter(m => m.image).slice(0, 6);

export default function AchievementsSection() {
    return (
        <section id="achievements" className="section-padding" style={{ position: 'relative', overflow: 'hidden', padding: '10rem 0' }}>
            <div className="container-wide">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="milestone-header"
                >
                    <h2 className="heading-2 text-gradient" style={{ marginBottom: '4rem' }}>Recent Milestone</h2>
                </motion.div>

                {/* Grid Layout */}
                <div className="milestone-gallery-grid">
                    {recentMilestones.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="milestone-glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="milestone-img-wrapper">
                                <img src={item.image} alt={item.title} className="milestone-img" />
                                <div className="milestone-img-overlay">
                                    <div className="milestone-tag" style={{ background: item.color }}>{item.tag}</div>
                                </div>
                            </div>

                            <div className="milestone-body">
                                <div className="milestone-main">
                                    <h3 className="milestone-title">{item.title}</h3>
                                    <h4 className="milestone-subtitle" style={{ color: item.color }}>{item.subtitle}</h4>
                                    <p className="milestone-desc">{item.description}</p>
                                </div>
                                <div className="milestone-action">
                                    <div className="milestone-indicator" style={{ background: item.color }} />
                                    <span>Verified Milestone</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Perfectly Centered Sharp CTA */}
                <div className="cta-action-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <Link href="/awards" className="cyber-sharp-btn">
                            <span className="btn-glitch-text">Explore Full Honors Gallery</span>
                            <div className="btn-icon-square">
                                <ArrowRight size={18} />
                            </div>

                            {/* Decorative Elements */}
                            <div className="btn-corner tl" />
                            <div className="btn-corner tr" />
                            <div className="btn-corner bl" />
                            <div className="btn-corner br" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                .container-wide {
                    max-width: 1440px;
                    margin: 0 auto;
                    padding: 0 4rem;
                }

                .milestone-header {
                    text-align: center;
                    margin-bottom: 8rem;
                }

                .milestone-gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 3rem;
                }

                .milestone-glass-card {
                    background: rgba(10, 10, 15, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 8px; /* Slightly Sharper */
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.4s ease;
                }

                .milestone-glass-card:hover {
                    background: rgba(15, 15, 25, 0.6);
                    border-color: rgba(255, 255, 255, 0.15);
                    transform: translateY(-10px);
                }

                .milestone-img-wrapper {
                    position: relative;
                    height: 240px;
                    width: 100%;
                    overflow: hidden;
                    background: #000;
                }

                .milestone-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s ease;
                    opacity: 0.8;
                }

                .milestone-glass-card:hover .milestone-img {
                    transform: scale(1.05);
                    opacity: 1;
                }

                .milestone-img-overlay {
                    position: absolute;
                    inset: 0;
                    padding: 1.5rem;
                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-end;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.3), transparent);
                }

                .milestone-tag {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: white;
                    padding: 0.35rem 0.8rem;
                    border-radius: 2px;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                }

                .milestone-body {
                    padding: 2rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .milestone-title {
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 0.5rem;
                }

                .milestone-subtitle {
                    font-size: 0.8rem;
                    font-weight: 700;
                    margin-bottom: 1.25rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .milestone-desc {
                    font-size: 0.9rem;
                    line-height: 1.6;
                    opacity: 0.6;
                    margin-bottom: 2rem;
                }

                .milestone-action {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.4);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .milestone-indicator {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                /* CTA Section Implementation */
                .cta-action-center {
                    margin-top: 10rem;
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }

                .cyber-sharp-btn {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    padding: 1.25rem 3rem;
                    background: rgba(10, 10, 15, 0.8);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    min-width: 340px;
                }

                .btn-glitch-text {
                    font-size: 1rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                }

                .btn-icon-square {
                    width: 40px;
                    height: 40px;
                    background: var(--primary-accent);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #000;
                    transition: transform 0.3s ease;
                }

                .cyber-sharp-btn:hover {
                    background: rgba(15, 15, 25, 1);
                    border-color: var(--primary-accent);
                    transform: translateY(-4px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }

                .cyber-sharp-btn:hover .btn-icon-square {
                    transform: scale(1.1) translateX(5px);
                }

                /* Square Corners Design */
                .btn-corner {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    border-color: var(--primary-accent);
                    border-style: solid;
                    transition: all 0.3s ease;
                    opacity: 0.5;
                }

                .tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
                .tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
                .bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
                .br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

                .cyber-sharp-btn:hover .btn-corner {
                    opacity: 1;
                    width: 15px;
                    height: 15px;
                }

                @media (max-width: 1200px) {
                    .milestone-gallery-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .container-wide { padding: 0 1.5rem; }
                    .milestone-gallery-grid { grid-template-columns: 1fr; gap: 2.5rem; }
                    .milestone-header { margin-bottom: 4rem; }
                    .cyber-sharp-btn {
                        min-width: 100%;
                        padding: 1rem 1.5rem;
                        justify-content: space-between;
                    }
                }
            `}</style>
        </section>
    );
}
