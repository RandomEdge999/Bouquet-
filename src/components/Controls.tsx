import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

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
                onClick={onGenerate}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                    group flex items-center gap-2
                    pl-3 pr-4 py-2 rounded-full 
                    bg-white/40 backdrop-blur-md
                    hover:bg-white/60 transition-all
                    border border-white/50 hover:border-white/70
                    shadow-sm hover:shadow-md
                "
            >
                {/* Icon */}
                <div className="relative w-4 h-4 text-stone-600 group-hover:text-rose-600 transition-colors">
                    <Gift size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                </div>

                {/* Text Label */}
                <span className="text-xs font-medium text-stone-600 uppercase tracking-widest group-hover:text-rose-700 transition-colors">
                    New Bouquet
                </span>
            </motion.button>

            {/* Hint Text - Made smaller */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-right text-[9px] text-stone-400 mt-1.5 font-medium tracking-wide pr-3"
            >
                Click to create magic ✨
            </motion.p>
        </motion.div>
    );
};
