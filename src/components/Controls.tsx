import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface ControlsProps {
    onGenerate: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ onGenerate }) => {
    return (
        <motion.div
            className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
        >
            <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onGenerate}
                className="
                    group relative overflow-hidden
                    h-11 md:h-12 px-6 md:px-8 rounded-full 
                    bg-gradient-to-r from-stone-800 via-stone-900 to-stone-800
                    text-white
                    flex items-center gap-2 md:gap-3
                    font-medium text-sm tracking-wide
                    shadow-lg hover:shadow-xl
                    transition-all duration-300
                    border border-stone-700/50
                "
            >
                {/* Shimmer effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {/* Icon with rotation animation */}
                <RefreshCw
                    size={16}
                    className="relative z-10 group-hover:rotate-180 transition-transform duration-500"
                />

                {/* Text */}
                <span className="relative z-10">New Bouquet</span>

                {/* Subtle glow */}
                <span className="absolute inset-0 rounded-full bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
        </motion.div>
    );
};
