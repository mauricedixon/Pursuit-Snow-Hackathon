import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const SnowParticles = ({ score }) => {
    // Determine intensity based on score
    const intensity = useMemo(() => {
        if (score < 20) return 'none';
        if (score < 50) return 'light';
        if (score < 80) return 'medium';
        return 'blizzard';
    }, [score]);

    if (intensity === 'none') return null;

    const particleCount = intensity === 'light' ? 20 : intensity === 'medium' ? 60 : 150;

    // Generate static particles to avoid re-renders impacting performance
    const particles = useMemo(() => {
        return Array.from({ length: particleCount }).map((_, i) => ({
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 2,
            size: Math.random() * 4 + 2,
        }));
    }, [particleCount]);

    const isBlizzard = intensity === 'blizzard';

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full opacity-80"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        top: -10
                    }}
                    animate={{
                        y: ['0vh', '100vh'],
                        x: isBlizzard ? [0, -200] : [0, 20], // Horizontal wind for blizzard
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: isBlizzard ? p.duration * 0.5 : p.duration, // Faster in blizzard
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

export default SnowParticles;
