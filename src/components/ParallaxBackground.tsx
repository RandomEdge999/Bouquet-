import React from 'react';
import { motion } from 'framer-motion';

export const ParallaxBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Deep Atmospheric Layer - Replaces simple gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 via-rose-100/30 to-rose-200/20 mix-blend-overlay" />

            {/* Floating Blurred Petals (Background) */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`petal-bg-${i}`}
                    className="absolute opacity-30 blur-md"
                    style={{
                        width: 30 + Math.random() * 40,
                        height: 30 + Math.random() * 40,
                        backgroundColor: i % 2 === 0 ? '#fda4af' : '#fecdd3', // Rose-300/200
                        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}

            {/* Shimmering 'Bokkeh' Lights */}
            <div className="absolute top-0 left-0 w-full h-1/2 opacity-40">
                <motion.div
                    className="absolute top-[10%] left-[20%] w-64 h-64 bg-yellow-100/20 rounded-full blur-[80px]"
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-[30%] right-[15%] w-96 h-96 bg-rose-200/20 rounded-full blur-[100px]"
                    animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.1, 1, 1.1] }}
                    transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                />
            </div>
        </div>
    );
};
