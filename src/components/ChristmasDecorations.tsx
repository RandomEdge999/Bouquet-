import React from 'react';
import { motion } from 'framer-motion';

export const ChristmasDecorations: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
            {/* Top Left - Christmas Lights String */}
            <div className="absolute top-0 left-0 right-0 flex justify-center">
                <motion.div
                    className="flex gap-4 md:gap-6 py-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="text-lg md:text-2xl"
                            animate={{
                                opacity: [0.5 + (i % 2) * 0.5, 1, 0.5 + (i % 2) * 0.5],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 1 + (i % 3) * 0.5,
                                delay: i * 0.1,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            {i % 4 === 0 ? '🔴' : i % 4 === 1 ? '🟢' : i % 4 === 2 ? '🟡' : '🔵'}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom Left Corner - Christmas Tree */}
            <motion.div
                className="absolute bottom-16 md:bottom-20 left-2 md:left-6 text-4xl md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
            >
                🎄
            </motion.div>

            {/* Presents near tree */}
            <motion.div
                className="absolute bottom-12 md:bottom-16 left-8 md:left-16 flex gap-1 md:gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
            >
                <span className="text-xl md:text-3xl">🎁</span>
                <span className="text-lg md:text-2xl">🎁</span>
            </motion.div>

            {/* Top corners - Holly */}
            <motion.div
                className="absolute top-12 md:top-16 left-2 md:left-4 text-2xl md:text-4xl"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                🍃
            </motion.div>
            <motion.div
                className="absolute top-14 md:top-20 right-2 md:right-4 text-xl md:text-3xl"
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
            >
                ❄️
            </motion.div>

            {/* Candy canes scattered */}
            <motion.div
                className="absolute top-1/3 left-2 md:left-4 text-xl md:text-2xl"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
                🍬
            </motion.div>

            {/* Stockings - desktop only */}
            <div className="hidden md:block">
                <motion.div
                    className="absolute bottom-32 left-4 text-3xl"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.4 }}
                >
                    🧦
                </motion.div>
            </div>

            {/* Bells decoration */}
            <motion.div
                className="absolute top-1/4 right-2 md:right-6 text-xl md:text-3xl"
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                🔔
            </motion.div>

            {/* Star burst effect near top */}
            <motion.div
                className="absolute top-8 left-1/2 -translate-x-1/2 text-2xl md:text-4xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                ⭐
            </motion.div>
        </div>
    );
};
