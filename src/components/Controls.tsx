import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift } from 'lucide-react';

interface ControlsProps {
    onGenerate: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ onGenerate }) => {
    return (
        <motion.div
            className="z-40 flex flex-col items-end"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
        >
            <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={onGenerate}
                className="
                    group relative overflow-hidden
                    h-12 md:h-14 px-7 md:px-10 rounded-full 
                    bg-gradient-to-r from-rose-600 via-red-600 to-rose-700
                    text-white
                    flex items-center gap-3 md:gap-4
                    font-semibold text-sm md:text-base tracking-wide
                    shadow-xl hover:shadow-2xl
                    transition-all duration-300
                    border-2 border-rose-400/30
                "
            >
                {/* Animated shimmer effect */}
                <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    animate={{
                        x: ['-100%', '100%']
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: 'easeInOut'
                    }}
                />

                {/* Sparkle particles on hover */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.span
                        className="absolute top-1 left-4 text-yellow-200 text-xs"
                        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    >✦</motion.span>
                    <motion.span
                        className="absolute bottom-2 right-6 text-yellow-200 text-xs"
                        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                    >✦</motion.span>
                    <motion.span
                        className="absolute top-2 right-12 text-yellow-200 text-[10px]"
                        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                    >✦</motion.span>
                </span>

                {/* Gift icon with animation */}
                <motion.div
                    className="relative z-10"
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                    <Gift size={18} className="md:w-5 md:h-5" />
                </motion.div>

                {/* Text */}
                <span className="relative z-10 drop-shadow-sm">New Bouquet</span>

                {/* Sparkle icon */}
                <motion.div
                    className="relative z-10"
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Sparkles size={16} className="md:w-[18px] md:h-[18px] text-yellow-200" />
                </motion.div>

                {/* Glow effect */}
                <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        boxShadow: '0 0 30px rgba(244, 63, 94, 0.5), 0 0 60px rgba(244, 63, 94, 0.3)'
                    }}
                />
            </motion.button>

            {/* Decorative hint text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-right text-[10px] text-stone-400 mt-2 font-medium tracking-wide pr-4"
            >
                Click to create magic ✨
            </motion.p>
        </motion.div>
    );
};
