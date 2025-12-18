import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Snowflake {
    id: number;
    x: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
}

export const SnowEffect: React.FC = () => {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

    useEffect(() => {
        // Generate snowflakes
        const flakes: Snowflake[] = [];
        for (let i = 0; i < 50; i++) {
            flakes.push({
                id: i,
                x: Math.random() * 100,
                size: 4 + Math.random() * 12,
                duration: 8 + Math.random() * 12,
                delay: Math.random() * 10,
                drift: (Math.random() - 0.5) * 100
            });
        }
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {snowflakes.map((flake) => (
                <motion.div
                    key={flake.id}
                    className="absolute text-white"
                    style={{
                        left: `${flake.x}%`,
                        top: '-20px',
                        fontSize: flake.size,
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                        opacity: 0.7 + Math.random() * 0.3
                    }}
                    animate={{
                        y: [0, window.innerHeight + 50],
                        x: [0, flake.drift, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: flake.duration,
                        delay: flake.delay,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    ❄
                </motion.div>
            ))}
        </div>
    );
};
