'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Mail, Download } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    canvasWidth: number;
    canvasHeight: number;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update(newCanvasWidth: number, newCanvasHeight: number) {
        this.canvasWidth = newCanvasWidth;
        this.canvasHeight = newCanvasHeight;
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvasWidth) this.x = 0;
        else if (this.x < 0) this.x = this.canvasWidth;

        if (this.y > this.canvasHeight) this.y = 0;
        else if (this.y < 0) this.y = this.canvasHeight;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function HeroSection() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Advanced Particle Animation Background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const init = () => {
            resizeCanvas();
            particles = [];
            const particleCount = Math.min(window.innerWidth / 15, 100);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx!.beginPath();
                        ctx!.strokeStyle = `rgba(0, 229, 255, ${1 - distance / 120})`;
                        ctx!.lineWidth = 0.5;
                        ctx!.moveTo(particles[i].x, particles[i].y);
                        ctx!.lineTo(particles[j].x, particles[j].y);
                        ctx!.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx!.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(canvas.width, canvas.height);
                particles[i].draw(ctx!);
            }
            connectParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        window.addEventListener('resize', init);

        return () => {
            window.removeEventListener('resize', init);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="hero-section">
            <canvas ref={canvasRef} className="hero-canvas" />

            <div className="container hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
                    className="hero-text-wrapper"
                >
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="hero-subtitle"
                    >
                        Hello, I am
                    </motion.h2>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3, duration: 0.6 }}
                        className="heading-1 hero-title text-gradient"
                    >
                        Ratul Hasan
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                        className="heading-2 hero-title"
                    >
                        Passionate Developer & Robotics Enthusiast
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7, duration: 0.8 }}
                        className="hero-description text-secondary"
                    >
                        I craft seamless digital experiences and engineer sophisticated hardware solutions. Bridging the gap between code and robotics to solve real-world problems.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.9, duration: 0.5 }}
                        className="hero-actions"
                    >
                        <a href="#software-projects" className="btn btn-primary">
                            View Work <ArrowDown size={18} />
                        </a>
                        <a href="#contact" className="btn btn-secondary">
                            <Mail size={18} /> Contact Me
                        </a>
                        <a href="/Ratul_Hasan_CV.pdf" download className="btn btn-secondary">
                            <Download size={18} /> Download CV
                        </a>
                    </motion.div>
                </motion.div>
            </div>
            <div className="hero-scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>
        </section >
    );
}
