'use client';

import { softwareProjects } from '../data/projects';
import { motion } from 'framer-motion';
import BannerAccordionWidget from './BannerAccordionWidget';

export default function SoftwareProjectsSection() {
    return (
        <section id="software-projects" className="overflow-hidden" style={{ backgroundColor: '#030305', position: 'relative', padding: '5rem 5vw' }}>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '3rem' }}
            >
                <h2 className="heading-2 text-gradient" style={{ marginBottom: '1rem' }}>Featured Software</h2>
                <p className="text-secondary" style={{ fontSize: '1.1rem' }}>
                    Hover to expand our digital architectures.
                </p>
            </motion.div>

            <BannerAccordionWidget projects={softwareProjects} />

        </section>
    );
}
