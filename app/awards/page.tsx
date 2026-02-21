'use client';

import { motion } from 'framer-motion';
import { Award, Trophy, Star, TrendingUp, ChevronLeft, Hexagon, Layers, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { allMilestones, Milestone } from '../data/milestones';

export default function AwardsPage() {
    return (
        <main className="awards-page-root">
            {/* Immersive Background */}
            <div className="awards-bg">
                <div className="bg-glow purple" />
                <div className="bg-glow cyan" />
                <div className="bg-mesh" />
            </div>

            <div className="container-awards">
                {/* Navbar-style Header */}
                <header className="awards-header-nav">
                    <Link href="/" className="back-btn-premium">
                        <div className="back-btn-icon">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="back-btn-text">Return to Odyssey</span>
                    </Link>
                    <div className="nav-brand-logo">
                        <span className="brand-accent">ONNESOK</span>
                        <span className="brand-suffix">/HONORS</span>
                    </div>
                </header>

                {/* Hero Content */}
                <section className="awards-hero-section">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="hero-badge">Verified Achievements</div>
                        <h1 className="hero-heading text-gradient">The Hall of Honors</h1>
                        <p className="hero-description text-secondary">
                            A curated exhibition of technical triumphs, engineering excellence, and professional recognition.
                        </p>
                    </motion.div>
                </section>

                {/* Awards Gallery Grid */}
                <div className="awards-masonry-grid">
                    {allMilestones.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="milestone-entry-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                            <div className="entry-glass-panel">
                                {item.image ? (
                                    <div className="entry-visual-area image">
                                        <img src={item.image} alt={item.title} className="entry-main-img" />
                                        <div className="entry-img-overlay">
                                            <div className="entry-tag-chip" style={{ background: item.color }}>{item.tag}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="entry-visual-area icon" style={{ background: `linear-gradient(135deg, #0a0a0f, ${item.color}10)` }}>
                                        <div className="entry-icon-hub">
                                            <Hexagon size={120} strokeWidth={0.5} className="hub-rotation-ring" style={{ color: item.color }} />
                                            <div className="hub-inner-symbol" style={{ color: item.color }}>
                                                {getIconForType(item.type)}
                                            </div>
                                        </div>
                                        <div className="entry-tag-chip icon-tag" style={{ border: `1px solid ${item.color}50`, color: item.color }}>{item.tag}</div>
                                    </div>
                                )}

                                <div className="entry-content">
                                    <div className="entry-header-row">
                                        <h3 className="entry-title">{item.title}</h3>
                                        <div className="entry-accent-line" style={{ background: item.color }} />
                                    </div>
                                    <h4 className="entry-subtitle" style={{ color: item.color }}>{item.subtitle}</h4>
                                    <p className="entry-description text-secondary">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <footer className="awards-page-footer">
                <div className="footer-line" />
                <p>© 2026 Onnesok, all rights reserved. built with ❤️</p>
            </footer>

            <style jsx>{`
                .awards-page-root {
                    background: #020204;
                    min-height: 100vh;
                    color: white;
                    position: relative;
                    overflow-x: hidden;
                    font-family: 'Inter', system-ui, sans-serif;
                }

                /* Background Effects */
                .awards-bg {
                    position: fixed;
                    inset: 0;
                    z-index: 0;
                    pointer-events: none;
                }

                .bg-glow {
                    position: absolute;
                    width: 60vw;
                    height: 60vh;
                    border-radius: 50%;
                    filter: blur(120px);
                    opacity: 0.06;
                }

                .bg-glow.purple {
                    top: -10%;
                    right: -10%;
                    background: #8b5cf6;
                }

                .bg-glow.cyan {
                    bottom: -10%;
                    left: -10%;
                    background: #00e5ff;
                }

                .bg-mesh {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                }

                /* Layout */
                .container-awards {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 4rem;
                    position: relative;
                    z-index: 10;
                }

                /* Nav Header */
                .awards-header-nav {
                    padding: 2.5rem 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .back-btn-premium {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    padding: 0.75rem 1.5rem 0.75rem 0.75rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 100px;
                    color: white;
                    text-decoration: none;
                    transition: all 0.4s ease;
                }

                .back-btn-premium:hover {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(255, 255, 255, 0.2);
                    transform: translateX(-5px);
                }

                .back-btn-icon {
                    width: 36px;
                    height: 36px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .back-btn-text {
                    font-size: 0.85rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                }

                .nav-brand-logo {
                    font-weight: 950;
                    letter-spacing: 4px;
                    font-size: 1rem;
                }

                .brand-suffix {
                    opacity: 0.4;
                    margin-left: 2px;
                }

                /* Hero */
                .awards-hero-section {
                    text-align: center;
                    padding: 8rem 0;
                }

                .hero-badge {
                    display: inline-block;
                    padding: 0.5rem 1.25rem;
                    background: rgba(0, 229, 255, 0.1);
                    border: 1px solid rgba(0, 229, 255, 0.2);
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #00e5ff;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 2rem;
                }

                .hero-heading {
                    font-size: 4.5rem;
                    font-weight: 950;
                    margin-bottom: 1.5rem;
                    letter-spacing: -3px;
                }

                .hero-description {
                    font-size: 1.2rem;
                    max-width: 650px;
                    margin: 0 auto;
                    line-height: 1.7;
                    opacity: 0.8;
                }

                /* Centered Grid Layout */
                .awards-masonry-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, 380px);
                    justify-content: center;
                    gap: 3.5rem;
                    margin-bottom: 8rem;
                }

                .milestone-entry-card {
                    height: 100%;
                }

                .entry-glass-panel {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    background: rgba(10, 10, 15, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    overflow: hidden;
                    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                }

                .entry-glass-panel:hover {
                    background: rgba(15, 15, 20, 0.6);
                    border-color: rgba(255, 255, 255, 0.15);
                    transform: translateY(-10px);
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
                }

                .entry-visual-area {
                    position: relative;
                    height: 280px;
                    overflow: hidden;
                }

                .entry-main-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.7;
                    transition: all 0.8s ease;
                }

                .entry-glass-panel:hover .entry-main-img {
                    opacity: 1;
                    transform: scale(1.05);
                }

                .entry-img-overlay {
                    position: absolute;
                    inset: 0;
                    padding: 1.5rem;
                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-end;
                }

                .entry-tag-chip {
                    padding: 0.4rem 1rem;
                    border-radius: 8px;
                    font-size: 0.65rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: white;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
                }

                .entry-visual-area.icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .entry-icon-hub {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hub-rotation-ring {
                    animation: spinAxis 40s linear infinite;
                    opacity: 0.2;
                }

                .hub-inner-symbol {
                    position: absolute;
                    opacity: 0.8;
                }

                @keyframes spinAxis {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .entry-content {
                    padding: 2.5rem;
                    flex: 1;
                }

                .entry-header-row {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                    margin-bottom: 0.75rem;
                }

                .entry-title {
                    font-size: 1.6rem;
                    font-weight: 900;
                    color: white;
                    line-height: 1.2;
                }

                .entry-accent-line {
                    height: 1px;
                    flex: 1;
                    opacity: 0.3;
                }

                .entry-subtitle {
                    font-size: 0.9rem;
                    font-weight: 750;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 1.5rem;
                }

                .entry-description {
                    font-size: 1rem;
                    line-height: 1.8;
                    opacity: 0.75;
                }

                .awards-page-footer {
                    text-align: center;
                    padding: 10rem 0 5rem;
                }

                .footer-line {
                    width: 60px;
                    height: 2px;
                    background: rgba(255,255,255,0.1);
                    margin: 0 auto 2rem;
                }

                .awards-page-footer p {
                    font-size: 0.8rem;
                    opacity: 0.4;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }

                /* Responsive */
                @media (max-width: 1200px) {
                    .awards-masonry-grid {
                        gap: 2rem;
                    }
                    .hero-heading {
                        font-size: 3.5rem;
                    }
                    .container-awards {
                        padding: 0 2rem;
                    }
                }

                @media (max-width: 768px) {
                    .hero-heading {
                        font-size: 2.5rem;
                        letter-spacing: -1px;
                    }
                    .awards-masonry-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    .awards-hero-section {
                        padding: 4rem 0;
                    }
                    .entry-title {
                        font-size: 1.4rem;
                    }
                    .entry-content {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </main>
    );
}

function getIconForType(type: Milestone['type']) {
    switch (type) {
        case 'honor': return <Award size={48} />;
        case 'robotics': return <Hexagon size={48} />;
        case 'software': return <TrendingUp size={48} />;
        case 'summit': return <Star size={48} />;
        case 'funding': return <Trophy size={48} />;
        default: return <Award size={48} />;
    }
}
