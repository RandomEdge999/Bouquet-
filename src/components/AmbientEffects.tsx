import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingHeart {
    id: number;
    x: number;
    delay: number;
    duration: number;
    size: number;
}

export const AmbientEffects: React.FC = () => {
    const [hearts, setHearts] = useState<FloatingHeart[]>([]);

    useEffect(() => {
        // Generate initial floating hearts
        const initialHearts: FloatingHeart[] = [];
        for (let i = 0; i < 8; i++) {
            initialHearts.push({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 5,
                duration: 8 + Math.random() * 6,
                size: 10 + Math.random() * 14
            });
        }
        setHearts(initialHearts);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Ambient glow spots */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(251,207,232,0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)'
                }}
            />
            <div
                className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(253,242,248,0.2) 0%, transparent 70%)',
                    filter: 'blur(50px)'
                }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(254,205,211,0.08) 0%, transparent 60%)',
                    filter: 'blur(80px)'
                }}
            />

            {/* Floating hearts */}
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute text-rose-200/40"
                    style={{
                        left: `${heart.x}%`,
                        fontSize: heart.size,
                        bottom: '-30px'
                    }}
                    animate={{
                        y: [0, -window.innerHeight - 100],
                        x: [0, Math.sin(heart.id) * 50, 0],
                        rotate: [0, 360],
                        opacity: [0, 0.6, 0.6, 0]
                    }}
                    transition={{
                        duration: heart.duration,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    ♥
                </motion.div>
            ))}

            {/* Subtle sparkle dots */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-white/30"
                    style={{
                        left: `${10 + (i * 7) % 80}%`,
                        top: `${15 + (i * 11) % 70}%`
                    }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.2, 0.5]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            ))}
        </div>
    );
};
