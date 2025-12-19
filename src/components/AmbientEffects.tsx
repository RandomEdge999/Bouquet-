import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AmbientEffectsProps {
    isActive?: boolean;
}

export const AmbientEffects: React.FC<AmbientEffectsProps> = ({ isActive = false }) => {
    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="fixed inset-0 pointer-events-none z-[100] overflow-hidden mix-blend-screen"
                >
                    {/* Cloud Transition Layer - White on Black asset with Screen Blend Mode */}
                    {/* This eliminates all artifacts/checkerboards by treating black as transparent */}
                    <motion.div
                        initial={{ scale: 1.1, x: '10%' }}
                        animate={{ scale: 1.2, x: '-10%' }}
                        transition={{
                            duration: 8,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url('${import.meta.env.BASE_URL}cloud_transition_overlay_black_bg.png')`,
                            willChange: 'transform, opacity'
                        }}
                    />

                    {/* Optional Fog Layer for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-50" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
