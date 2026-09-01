'use client';

import { motion } from 'framer-motion';
import { MapPin, Hexagon, Layers } from 'lucide-react';

const workExperience = [
    {
        id: "onnesok",
        company: "Onnesok",
        role: "Founder",
        period: "2020 – Present",
        endYear: 9999,
        startYear: 2020,
        location: "Dhaka, Bangladesh",
        summary: "Leading an independent tech venture dedicated to building scalable software and immersive gaming experiences, reaching 100K+ users.",
        color: "#00e5ff"
    },
    {
        id: "rs-inst",
        company: "BRAC UNIVERSITY RS",
        role: "App Dev Instructor",
        period: "2024 – Present",
        endYear: 9999,
        startYear: 2024,
        location: "On-site",
        summary: "Instructing and mentoring students in mobile application development, focusing on cross-platform frameworks and ecosystem best practices.",
        color: "#10b981"
    },
    {
        id: "sdp-dev",
        company: "BRAC SKILL DEVELOPMENT PROGRAM",
        role: "Student Developer",
        period: "2025 – 2026",
        endYear: 2026,
        startYear: 2025,
        location: "Hybrid",
        summary: "Collaborating on software initiatives within the SDP ecosystem, enhancing technical infrastructure and student engagement tools.",
        color: "#8b5cf6"
    },
    {
        id: "robotics",
        company: "Robotics Club, BRACU",
        role: "Secretary",
        period: "2022 – 2026",
        endYear: 2026,
        startYear: 2022,
        location: "On-site",
        summary: "Leading RPM initiatives and managing high-impact robotics projects and community events at the club level.",
        color: "#fbbf24"
    },
    {
        id: "duburi",
        company: "BRACU DUBURI",
        role: "Mechanical Engineer",
        period: "2022 – 2023",
        endYear: 2023,
        startYear: 2022,
        location: "On-site",
        summary: "3D design and mechanical engineering for Bangladesh's first Autonomous Underwater Vehicle (AUV).",
        color: "#3b82f6"
    },
    {
        id: "ecollab",
        company: "Ecollab International",
        role: "Facilitator",
        period: "2025 – 2026",
        endYear: 2026,
        startYear: 2025,
        location: "Hybrid",
        summary: "Facilitating international climate collaboration across 6 countries and managing multi-national digital communications.",
        color: "#fb7185"
    },
    {
        id: "biose",
        company: "BIOSE",
        role: "Research Member",
        period: "2024 – 2025",
        endYear: 2025,
        startYear: 2024,
        location: "On-site",
        summary: "Applying AI to revolutionize biomedical research and multi-modal healthcare reasoning for global healthcare impact.",
        color: "#a855f7"
    },
    {
        id: "roboway",
        company: "Roboway Labs",
        role: "Co-Founder",
        period: "2023 – 2025",
        endYear: 2025,
        startYear: 2023,
        location: "Hybrid",
        summary: "Engineering AI-driven robotics solutions, including the Pixi humanoid robot platform series.",
        color: "#f43f5e"
    },
    {
        id: "learners-boosters",
        company: "Learners' Boosters",
        role: "Lecturer",
        period: "2025 – Present",
        endYear: 9999,
        startYear: 2025,
        location: "Remote / Hybrid",
        summary: "Mentoring and teaching hands-on App Development, Robotics, and AI to future tech leaders, bridging the gap between academia and industry.",
        color: "#fbbf24"
    },
    {
        id: "cse-ra",
        company: "Department of CSE, BRAC University",
        role: "Research Assistant",
        period: "2026 – Present",
        endYear: 9999,
        startYear: 2026,
        location: "On-site",
        summary: "Departmental Research Assistant in Computer Science and Engineering, supporting faculty-led research and academic projects across the CSE department under the supervision of Dr. Md. Golam Rabiul Alam.",
        color: "#f97316"
    }
];

type WorkItem = (typeof workExperience)[number] | null;

const leadOrder = ['cse-ra', 'rs-inst', 'onnesok', 'learners-boosters'];

const sortedExperience = [...workExperience].sort((a, b) => {
    const aLead = leadOrder.indexOf(a.id);
    const bLead = leadOrder.indexOf(b.id);
    if (aLead !== -1 || bLead !== -1) {
        if (aLead === -1) return 1;
        if (bLead === -1) return -1;
        return aLead - bLead;
    }
    if (b.endYear !== a.endYear) return b.endYear - a.endYear;
    return b.startYear - a.startYear;
});

const COLS = 3;
const paddedExperience: WorkItem[] = [...sortedExperience];
while (paddedExperience.length % COLS !== 0) {
    paddedExperience.push(null);
}
while (paddedExperience.length < 12) {
    paddedExperience.push(null);
}

const rowCount = paddedExperience.length / COLS;
const snakeOrder: WorkItem[] = [];
for (let row = 0; row < rowCount; row++) {
    const slice = paddedExperience.slice(row * COLS, row * COLS + COLS);
    snakeOrder.push(...(row % 2 === 1 ? [...slice].reverse() : slice));
}

export default function WorkSection() {
    return (
        <section id="work" className="section-padding" style={{ position: 'relative', overflow: 'hidden', background: '#030305' }}>
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '8rem' }}
                >
                    <h2 className="heading-2 text-gradient" style={{ marginBottom: '1.5rem' }}>Professional Milestone</h2>
                    <div className="status-badge">
                        <Layers size={14} /> Chronological Odyssey
                    </div>
                </motion.div>

                <div className="snake-grid-container">
                    <svg className="snake-path-svg" viewBox="0 0 1000 1320" preserveAspectRatio="none">
                        <motion.path
                            d="M 166 130 L 500 130 L 833 130 C 950 130, 950 430, 833 430 L 500 430 L 166 430 C 50 430, 50 730, 166 730 L 500 730 L 833 730 C 950 730, 950 1030, 833 1030 L 500 1030 L 166 1030"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.03)"
                            strokeWidth="50"
                            strokeLinecap="round"
                        />
                        <motion.path
                            d="M 166 130 L 500 130 L 833 130 C 950 130, 950 430, 833 430 L 500 430 L 166 430 C 50 430, 50 730, 166 730 L 500 730 L 833 730 C 950 730, 950 1030, 833 1030 L 500 1030 L 166 1030"
                            fill="none"
                            stroke="url(#snake-gradient-sorted)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray="10, 15"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 4, ease: "easeInOut" }}
                        />
                        <defs>
                            <linearGradient id="snake-gradient-sorted" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00e5ff" />
                                <stop offset="50%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#f43f5e" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="snake-items-wrapper">
                        {snakeOrder.map((work, index) => {
                            const rowIndex = Math.floor(index / 3);
                            if (!work) {
                                return <div key={`ghost-${index}`} className="snake-item snake-item-ghost" aria-hidden="true" />;
                            }
                            return (
                                <motion.div
                                    key={work.id}
                                    className={`snake-item row-${rowIndex + 1}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="snake-node">
                                        <div className="node-glow" style={{ background: work.color }} />
                                        <div className="node-point" style={{ background: work.color }} />
                                        <Hexagon size={40} strokeWidth={1} className="node-hex-ring" style={{ color: work.color, opacity: 0.2 }} />
                                    </div>
                                    <div className="snake-card glass-panel-interactive">
                                        <div className="card-accent-rail" style={{ background: work.color }} />
                                        <div className="card-header-row">
                                            <span className="card-period-tag">{work.period}</span>
                                        </div>
                                        <h3 className="card-role-main">{work.role}</h3>
                                        <h4 className="card-company-sub" style={{ color: work.color }}>{work.company}</h4>
                                        <p className="card-summary-body">{work.summary}</p>
                                        <div className="card-footer-meta">
                                            <MapPin size={10} /> <span>{work.location}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .container-wide {
                    max-width: 1440px;
                    margin: 0 auto;
                    padding: 0 4rem;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.6rem 1.8rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 100px;
                    color: white;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-top: 1.5rem;
                }

                .snake-grid-container {
                    position: relative;
                    width: 100%;
                    max-width: 1440px;
                    margin: 0 auto;
                    min-height: 1320px;
                }

                .snake-path-svg {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    pointer-events: none;
                }

                .snake-items-wrapper {
                    position: relative;
                    z-index: 2;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(4, 260px);
                    gap: 6rem 3rem;
                }

                .snake-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }

                .snake-item-ghost {
                    visibility: hidden;
                    pointer-events: none;
                }

                .snake-node {
                    position: relative;
                    width: 16px;
                    height: 16px;
                    background: #030305;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                }

                .node-glow {
                    position: absolute;
                    inset: -8px;
                    border-radius: 50%;
                    opacity: 0.2;
                    filter: blur(10px);
                }

                .node-point {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                }

                .node-hex-ring {
                    position: absolute;
                    animation: spinHex 20s linear infinite;
                }

                @keyframes spinHex {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .snake-card {
                    width: 100%;
                    max-width: 100%;
                    padding: 1.5rem;
                    background: rgba(10, 10, 15, 0.95);
                    text-align: left;
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }

                .snake-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    border-color: rgba(255,255,255,0.2);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.6);
                }

                .card-accent-rail {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    opacity: 0.8;
                }

                .card-period-tag {
                    font-size: 0.6rem;
                    font-weight: 800;
                    color: var(--text-muted);
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.25rem 0.6rem;
                    border-radius: 4px;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                }

                .card-role-main {
                    font-size: 1.1rem;
                    font-weight: 900;
                    color: white;
                    margin-top: 0.75rem;
                    line-height: 1.2;
                }

                .card-company-sub {
                    font-size: 0.8rem;
                    font-weight: 700;
                    margin-top: 0.2rem;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .card-summary-body {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    line-height: 1.5;
                    margin-bottom: 1.25rem;
                    opacity: 0.85;
                }

                .card-footer-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.7rem;
                    color: var(--text-muted);
                }

                @media (max-width: 1200px) {
                    .container-wide { padding: 0 2rem; }
                    .snake-items-wrapper { gap: 4rem 2rem; }
                }

                @media (max-width: 1024px) {
                    .snake-items-wrapper {
                        grid-template-columns: 1fr;
                        grid-template-rows: auto;
                        gap: 2rem;
                    }
                    .snake-path-svg {
                        display: none;
                    }
                    .snake-grid-container {
                        min-height: auto;
                    }
                    .snake-item {
                        width: 100%;
                    }
                    .snake-item-ghost {
                        display: none;
                    }
                    .snake-card {
                        max-width: 100%;
                    }
                }
            `}</style>
        </section>
    );
}
