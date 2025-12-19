import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Snowflake {
    id: number;
    x: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
    opacity: number;
}

// SVG Snowflake shapes - real graphics, no emojis
const SnowflakeSVG: React.FC<{ size: number; opacity: number }> = ({ size, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
        <g stroke="white" strokeWidth="1.5" strokeLinecap="round">
            {/* Main cross */}
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            {/* Diagonals */}
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
            {/* Small branches */}
            <line x1="12" y1="2" x2="10" y2="5" />
            <line x1="12" y1="2" x2="14" y2="5" />
            <line x1="12" y1="22" x2="10" y2="19" />
            <line x1="12" y1="22" x2="14" y2="19" />
            <line x1="2" y1="12" x2="5" y2="10" />
            <line x1="2" y1="12" x2="5" y2="14" />
            <line x1="22" y1="12" x2="19" y2="10" />
            <line x1="22" y1="12" x2="19" y2="14" />
        </g>
    </svg>
);

// Simple dot snowflake for variety
const SnowDot: React.FC<{ size: number; opacity: number }> = ({ size, opacity }) => (
    <div
        style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: `rgba(255, 255, 255, ${opacity})`,
            boxShadow: `0 0 ${size}px rgba(255, 255, 255, 0.3)`
        }}
    />
);

export const SnowEffect: React.FC = () => {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

    useEffect(() => {
        const flakes: Snowflake[] = [];
        // OPTIMIZATION: Reduced from 60 to 35 for smoother mobile performance
        for (let i = 0; i < 35; i++) {
            flakes.push({
                id: i,
                x: Math.random() * 100,
                size: i % 3 === 0 ? 12 + Math.random() * 8 : 3 + Math.random() * 4,
                duration: 15 + Math.random() * 15, // Slower execution = less main thread work
                delay: Math.random() * 10,
                drift: (Math.random() - 0.5) * 50, // Reduced drift range
                opacity: 0.3 + Math.random() * 0.4
            });
        }
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {snowflakes.map((flake) => (
                <motion.div
                    key={flake.id}
                    className="absolute"
                    style={{
                        left: `${flake.x}%`,
                        top: '-30px',
                        willChange: 'transform' // GPU Hint
                    }}
                    animate={{
                        y: [0, typeof window !== 'undefined' ? window.innerHeight + 50 : 1000],
                        x: [0, flake.drift, flake.drift * 0.5],
                        rotate: flake.size > 8 ? [0, 360] : 0,
                    }}
                    transition={{
                        duration: flake.duration,
                        delay: flake.delay,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    {flake.size > 8 ? (
                        <SnowflakeSVG size={flake.size} opacity={flake.opacity} />
                    ) : (
                        <SnowDot size={flake.size} opacity={flake.opacity} />
                    )}
                </motion.div>
            ))}
        </div>
    );
};
