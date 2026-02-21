'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Fast counter from 0 to 100 in 800ms
        const duration = 800;
        const intervalTime = 16; // roughly 60fps
        const steps = duration / intervalTime;
        let currentStep = 0;

        const counterInterval = setInterval(() => {
            currentStep++;
            // Ease out quad for smoother counter
            const rawProgress = currentStep / steps;
            const easeOutProgress = rawProgress * (2 - rawProgress);
            const newProgress = Math.min(Math.round(easeOutProgress * 100), 100);

            setProgress(newProgress);

            if (currentStep >= steps) {
                clearInterval(counterInterval);
            }
        }, intervalTime);

        // Hide quickly after reaching 100%
        const handleLoad = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, duration + 200);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            clearInterval(counterInterval);
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="modern-loader-container"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="modern-loader-content">
                        {/* Minimalist Progress Ring */}
                        <div className="modern-ring-wrapper">
                            <svg className="modern-ring-svg" viewBox="0 0 100 100">
                                <circle className="modern-ring-track" cx="50" cy="50" r="48" />
                                <motion.circle
                                    className="modern-ring-fill"
                                    cx="50"
                                    cy="50"
                                    r="48"
                                    initial={{ strokeDasharray: "0 302" }}
                                    animate={{ strokeDasharray: `${(progress / 100) * 302} 302` }}
                                    transition={{ duration: 0.1, ease: "linear" }}
                                />
                            </svg>
                            <div className="modern-percentage-container">
                                <span className="modern-percentage">{progress}</span>
                            </div>
                        </div>

                        <div className="modern-loader-text-wrapper">
                            <motion.h1
                                className="modern-loader-brand text-gradient"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                ONNESOK
                            </motion.h1>
                            <motion.p
                                className="modern-loader-status"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                Loading Experience
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
