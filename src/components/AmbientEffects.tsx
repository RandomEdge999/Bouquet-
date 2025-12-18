import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingElement {
    id: number;
    x: number;
    delay: number;
    duration: number;
    size: number;
    emoji: string;
}

export const AmbientEffects: React.FC = () => {
    const [elements, setElements] = useState<FloatingElement[]>([]);

    useEffect(() => {
        // Generate Christmas-themed floating elements
        const christmasEmojis = ['❄️', '⭐', '✨', '🎄', '❤️', '💚'];
        const initialElements: FloatingElement[] = [];
        for (let i = 0; i < 10; i++) {
            initialElements.push({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 8,
                duration: 10 + Math.random() * 8,
                size: 12 + Math.random() * 16,
                emoji: christmasEmojis[Math.floor(Math.random() * christmasEmojis.length)]
            });
        }
        setElements(initialElements);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Christmas ambient glow spots */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)',
                    filter: 'blur(60px)'
                }}
            />
            <div
                className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%)',
                    filter: 'blur(50px)'
                }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 60%)',
                    filter: 'blur(80px)'
                }}
            />

            {/* Floating Christmas elements */}
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    className="absolute"
                    style={{
                        left: `${el.x}%`,
                        fontSize: el.size,
                        bottom: '-30px',
                        opacity: 0.5
                    }}
                    animate={{
                        y: [0, -window.innerHeight - 100],
                        x: [0, Math.sin(el.id) * 40, 0],
                        rotate: [0, 180],
                        opacity: [0, 0.5, 0.5, 0]
                    }}
                    transition={{
                        duration: el.duration,
                        delay: el.delay,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    {el.emoji}
                </motion.div>
            ))}

            {/* Subtle sparkle dots in Christmas colors */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                        left: `${10 + (i * 7) % 80}%`,
                        top: `${15 + (i * 11) % 70}%`,
                        backgroundColor: i % 2 === 0 ? 'rgba(220, 38, 38, 0.4)' : 'rgba(22, 163, 74, 0.4)'
                    }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.3, 0.5]
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
