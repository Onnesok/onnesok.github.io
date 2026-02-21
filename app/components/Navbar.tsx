'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);

            // Determine active section
            const sections = ['about', 'work', 'achievements', 'software-projects', 'hardware-projects', 'contact'];
            let current = '';
            // Use middle of screen for more reliable detection
            const triggerPoints = window.innerHeight / 2;

            for (const sec of sections) {
                const el = document.getElementById(sec);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= triggerPoints && rect.bottom >= triggerPoints) {
                        current = sec;
                    }
                }
            }

            // Map both project sections back to the 'projects' nav item
            if (current === 'software-projects' || current === 'hardware-projects') {
                setActiveSection('projects');
            } else if (current) {
                setActiveSection(current);
            } else if (window.scrollY === 0) {
                setActiveSection('about') // fallback to top
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Work', href: '#work', id: 'work' },
        { name: 'Achievements', href: '#achievements', id: 'achievements' },
        { name: 'Projects', href: '#software-projects', id: 'projects' },
        { name: 'Contact', href: '#contact', id: 'contact' },
    ];

    return (
        <nav className={`navbar2 ${scrolled ? 'navbar2-scrolled' : ''}`}>
            <div className={`navbar2-pill ${mobileMenuOpen ? 'mobile-menu-active-pill' : ''}`}>
                {/* Logo */}
                <Link href="/" className="navbar2-logo" onClick={() => setMobileMenuOpen(false)}>
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-name text-gradient">ONNESOK</span>
                    <span className="logo-bracket">/&gt;</span>
                </Link>

                {/* Desktop Links */}
                <div className="navbar2-links desktop-only">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`navbar2-link ${activeSection === link.id ? 'active' : ''}`}
                        >
                            {activeSection === link.id && (
                                <motion.div
                                    layoutId="navbar-active-pill"
                                    className="navbar2-active-bg"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <span className="navbar2-link-text">{link.name}</span>
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="navbar2-actions desktop-only">
                    <a
                        href="https://github.com/Onnesok"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="navbar2-github-btn"
                    >
                        <Github size={16} />
                        GitHub
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`navbar2-mobile-toggle mobile-only ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <motion.div
                        animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.div>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="navbar2-mobile-dropdown"
                    >
                        <div className="navbar2-mobile-menu">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                    className="w-full"
                                >
                                    <Link
                                        href={link.href}
                                        className={`navbar2-mobile-link ${activeSection === link.id ? 'active' : ''}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + navLinks.length * 0.1 }}
                                className="navbar2-mobile-actions"
                            >
                                <a
                                    href="https://github.com/Onnesok"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="navbar2-github-btn mobile-github-btn"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Github size={20} />
                                    <span>GitHub Profile</span>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
