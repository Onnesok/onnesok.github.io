'use client';

import { hardwareProjects } from '../data/projects';
import { motion } from 'framer-motion';
import ImmersiveSliderWidget from './ImmersiveSliderWidget';

export default function HardwareProjectsSection() {
    return (
        <section id="hardware-projects" className="overflow-hidden hardware-theme" style={{ backgroundColor: '#020203', position: 'relative', padding: '2rem 5vw 5rem' }}>
            <div className="ambient-glow" style={{ top: '20%', right: '-10%', background: 'rgba(139, 92, 246, 0.05)' }}></div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }}
            >
                <h2 className="heading-2 text-gradient-alt" style={{ marginBottom: '1rem' }}>Featured Hardware</h2>
                <p className="text-secondary" style={{ fontSize: '1.1rem' }}>
                    Cinematic views of autonomous systems and bionics.
                </p>
            </motion.div>

            <ImmersiveSliderWidget projects={hardwareProjects} />

            <div className="flex-center" style={{ marginTop: '4rem', position: 'relative', zIndex: 1 }}>
                <a href="https://github.com/Onnesok?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-primary">
                    View GitHub Repositories
                </a>
            </div>
        </section>
    );
}
