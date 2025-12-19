import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Point {
    x: number;
    y: number;
    id: number;
}

export const SparkleTrail: React.FC = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const countRef = useRef(0);
    const lastTimeRef = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            // OPTIMIZATION: Time-based throttle (max 30fps update for trail creation)
            if (now - lastTimeRef.current < 32) return;

            // Random throttle layer
            if (Math.random() > 0.6) return; // Stricter throttle

            lastTimeRef.current = now;

            const newPoint = {
                x: e.clientX,
                y: e.clientY,
                id: countRef.current++
            };

            setPoints(prev => [...prev.slice(-10), newPoint]); // Keep only last 10 (reduced from 15)
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
            <AnimatePresence>
                {points.map(point => (
                    <motion.div
                        key={point.id}
                        initial={{ opacity: 1, scale: 0.5, y: 0 }}
                        animate={{ opacity: 0, scale: 1.2, y: 10 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }} // Shorter duration
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            left: point.x,
                            top: point.y,
                            background: 'radial-gradient(circle, #fff 10%, rgba(255,220,230,0.8) 50%, transparent 80%)',
                            boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                            willChange: 'transform, opacity' // GPU Hint
                        }}
                    >
                        {/* Inner star shape - Simplified CSS */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/60 blur-[1px] rotate-45" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
