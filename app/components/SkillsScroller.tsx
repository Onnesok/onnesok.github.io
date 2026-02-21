'use client';

import Image from 'next/image';

type Skill = {
    label: string;
    icon: string; // URL
    invert?: boolean; // invert white icons on dark bg if needed
};

const row1: Skill[] = [
    { label: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { label: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { label: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { label: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { label: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
    { label: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { label: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
    { label: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    { label: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { label: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    { label: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { label: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];

const row2: Skill[] = [
    { label: 'Arduino', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg' },
    { label: 'Raspberry Pi', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg' },
    { label: 'ESP32', icon: 'https://cdn.simpleicons.org/espressif/E7352C' },
    { label: 'ROS', icon: 'https://cdn.simpleicons.org/ros/22314E', invert: true },
    { label: 'Machine Learning', icon: 'https://cdn.simpleicons.org/tensorflow/FF6F00' },
    { label: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { label: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { label: 'Godot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-plain.svg' },
    { label: '3D Modeling', icon: 'https://cdn.simpleicons.org/blender/F5792A' },
    { label: 'HTML/CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { label: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { label: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
];

export default function SkillsScroller() {
    return (
        <section className="skills-scroller-section">
            <p className="skills-scroller-label">
                <span className="text-gradient">Tech Stack</span>
                <span className="skills-scroller-subtitle"> — tools I build with</span>
            </p>

            <div className="skills-scroller-wrapper">
                {/* Row 1 — scrolls left */}
                <div className="skills-track-container">
                    <div className="skills-track skills-track-forward">
                        {[...row1, ...row1].map((skill, i) => (
                            <SkillBadge key={i} skill={skill} />
                        ))}
                    </div>
                </div>

                {/* Row 2 — scrolls right */}
                <div className="skills-track-container">
                    <div className="skills-track skills-track-reverse">
                        {[...row2, ...row2].map((skill, i) => (
                            <SkillBadge key={i} skill={skill} alt />
                        ))}
                    </div>
                </div>
            </div>

            <div className="skills-fade-left" />
            <div className="skills-fade-right" />
        </section>
    );
}

function SkillBadge({ skill, alt }: { skill: Skill; alt?: boolean }) {
    return (
        <div className={`skill-badge ${alt ? 'skill-badge-alt' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={skill.icon}
                alt={skill.label}
                width={22}
                height={22}
                className={`skill-badge-icon ${skill.invert ? 'skill-badge-icon-invert' : ''}`}
            />
            <span className="skill-badge-label">{skill.label}</span>
        </div>
    );
}
