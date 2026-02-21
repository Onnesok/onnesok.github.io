'use client';

import { Smartphone, Bot, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutSection() {
    const experiences = [
        { title: "Mobile & App Development", icon: <Smartphone size={24} />, desc: "Building fluid cross-platform applications with a focus on seamless user experiences, utilizing Flutter and native technologies." },
        { title: "Robotics Engineering", icon: <Bot size={24} />, desc: "Designing AI-driven autonomous systems, smart hardware, and bridging the gap between mechanical design and software control." },
        { title: "Modern Web Technologies", icon: <Code size={24} />, desc: "Crafting scalable, high-performance frontends with Next.js, React, and robust backend architectures." },
    ];

    const skillCategories = [
        { title: "Core Languages", skills: ['Python', 'C/C++', 'JavaScript', 'TypeScript', 'Dart', 'HTML/CSS'] },
        { title: "Frameworks & Tools", skills: ['React', 'Next.js', 'Flutter', 'ROS', 'Node.js', 'Tailwind CSS'] },
        { title: "Hardware & IoT", skills: ['Arduino', 'Raspberry Pi', 'Circuit Design', 'Sensors', 'ESP32'] },
        { title: "Engineering Practices", skills: ['3D Modeling', 'Git', 'Machine Learning', 'Problem Solving'] },
    ];

    return (
        <>
            {/* ── ABOUT ME ── */}
            <section id="about" style={{ position: 'relative', padding: '5rem 5vw', overflow: 'hidden' }}>
                <div className="ambient-glow" style={{ top: '10%', left: '-5%', background: 'rgba(0, 229, 255, 0.06)' }} />
                <div className="ambient-glow" style={{ bottom: '10%', right: '-5%', background: 'rgba(139, 92, 246, 0.06)' }} />

                <div className="about-grid" style={{ position: 'relative', zIndex: 1, alignItems: 'center' }}>
                    {/* Left: bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="heading-2 text-gradient" style={{ marginBottom: '1.5rem' }}>About Me</h2>
                        <div className="text-secondary" style={{ lineHeight: '1.85', display: 'flex', flexDirection: 'column', gap: '1.1rem', fontSize: '1.05rem' }}>
                            <p>I am Ratul Hasan, a passionate tech enthusiast and creator from Bangladesh, specializing in game development, robotics, AI integration, and software automation. I have extensive experience building projects with Godot Engine, ranging from 2D and 3D games to web-based and mobile platforms, often leveraging AI to accelerate development and optimize workflows.</p>
                            <p>Beyond game development, I have hands-on experience in robotics projects, where I design, program, and integrate intelligent systems for real-world and simulated applications. I also implement automation solutions, connecting data systems with interactive tools to improve efficiency and user experience.</p>
                            <p>I am continuously exploring new technologies and frameworks, combining creativity with technical expertise to bring innovative ideas to life.</p>
                        </div>
                    </motion.div>

                    {/* Right: focus cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                className="focus-item hover-glow"
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                            >
                                <div className="focus-icon-wrapper">{exp.icon}</div>
                                <div className="focus-text-content">
                                    <h3 className="focus-title">{exp.title}</h3>
                                    <p className="focus-desc">{exp.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TECHNICAL ARSENAL ── */}
            <section id="tech-stack" style={{ position: 'relative', padding: '5rem 5vw', overflow: 'hidden' }}>
                <div className="ambient-glow" style={{ top: '20%', right: '-5%', background: 'rgba(245, 158, 11, 0.06)' }} />
                <div className="ambient-glow" style={{ bottom: '10%', left: '-5%', background: 'rgba(0, 229, 255, 0.05)' }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ marginBottom: '3rem' }}
                    >
                        <h2 className="heading-2 text-gradient-alt" style={{ marginBottom: '1rem' }}>Technical Arsenal</h2>
                        <p className="text-secondary" style={{ fontSize: '1.1rem' }}>
                            The tools, languages, and frameworks I leverage to bring ideas to life across digital and physical mediums.
                        </p>
                    </motion.div>

                    <div className="skills-grid">
                        {skillCategories.map((category, idx) => (
                            <motion.div
                                key={idx}
                                className="skill-category-group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <h4 className="skill-category-title">{category.title}</h4>
                                <div className="skill-tags">
                                    {category.skills.map(skill => (
                                        <span key={skill} className="skill-tag">
                                            <span className="skill-dot" />
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
