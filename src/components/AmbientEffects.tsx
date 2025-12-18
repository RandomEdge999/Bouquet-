import React from 'react';
import { motion } from 'framer-motion';

export const AmbientEffects: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Soft winter ambient glow spots */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(185,28,28,0.06) 0%, transparent 70%)',
                    filter: 'blur(80px)'
                }}
            />
            <div
                className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(21,128,61,0.05) 0%, transparent 70%)',
                    filter: 'blur(70px)'
                }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    filter: 'blur(100px)'
                }}
            />

            {/* Subtle floating light particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`light-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-white/20"
                    style={{
                        left: `${15 + (i * 10) % 70}%`,
                        top: `${20 + (i * 12) % 60}%`,
                        filter: 'blur(1px)'
                    }}
                    animate={{
                        opacity: [0.1, 0.4, 0.1],
                        scale: [1, 1.5, 1],
                        y: [0, -20, 0]
                    }}
                    transition={{
                        duration: 4 + i * 0.5,
                        delay: i * 0.8,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            ))}
        </div>
    );
};
