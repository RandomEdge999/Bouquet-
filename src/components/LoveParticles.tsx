import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    type: 'heart' | 'sparkle' | 'petal';
    size: number;
    rotation: number;
}

export const LoveParticles: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    const addParticle = useCallback((x: number, y: number) => {
        const types: Particle['type'][] = ['heart', 'sparkle', 'petal'];
        const type = types[Math.floor(Math.random() * types.length)];
        const id = Date.now() + Math.random();
        const size = 16 + Math.random() * 12;
        const rotation = Math.random() * 360;

        setParticles(prev => [...prev, { id, x, y, type, size, rotation }]);

        setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== id));
        }, 2500);
    }, []);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // Main particle at cursor
            addParticle(e.clientX, e.clientY);

            // Burst of particles around click
            const burstCount = 4 + Math.floor(Math.random() * 3);
            for (let i = 0; i < burstCount; i++) {
                setTimeout(() => {
                    addParticle(
                        e.clientX + (Math.random() - 0.5) * 80,
                        e.clientY + (Math.random() - 0.5) * 80
                    );
                }, i * 60);
            }
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [addParticle]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            <AnimatePresence>
                {particles.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{
                            opacity: 0,
                            scale: 0.3,
                            x: p.x,
                            y: p.y,
                            rotate: p.rotation
                        }}
                        animate={{
                            opacity: [0.9, 0.7, 0],
                            scale: [0.5, 1.2, 0.8],
                            y: p.y - 100 - Math.random() * 80,
                            x: p.x + (Math.random() - 0.5) * 60,
                            rotate: p.rotation + (Math.random() - 0.5) * 180
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                            duration: 1.5 + Math.random() * 0.5,
                            ease: "easeOut"
                        }}
                        className="absolute drop-shadow-md"
                        style={{
                            marginLeft: -p.size / 2,
                            marginTop: -p.size / 2,
                            fontSize: p.size
                        }}
                    >
                        {p.type === 'heart' && <HeartIcon />}
                        {p.type === 'sparkle' && <SparkleIcon />}
                        {p.type === 'petal' && <PetalIcon />}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

const HeartIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" className="text-rose-500">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const SparkleIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
    </svg>
);

const PetalIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" className="text-pink-300">
        <ellipse cx="12" cy="10" rx="4" ry="8" transform="rotate(-15 12 10)" />
    </svg>
);
