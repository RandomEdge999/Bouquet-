import React from 'react';
import { motion } from 'framer-motion';

interface NoteCardProps {
    message: string;
    signature: string;
}

export const NoteCard: React.FC<NoteCardProps> = ({ message }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 100 }}
            className="
                fixed z-20
                
                /* Mobile - CENTERED above flowers */
                top-16 left-1/2 -translate-x-1/2
                w-[85vw] max-w-[300px]
                
                /* Tablet - slightly larger, still top-left */
                sm:top-20 sm:left-4 sm:right-auto sm:max-w-[300px]
                
                /* Desktop - Right side, centered vertically */
                md:top-1/2 md:-translate-y-1/2 md:translate-x-0
                md:left-auto md:right-8 lg:right-12
                md:w-72 lg:w-80 md:max-w-none
                
                /* Premium card styling */
                bg-gradient-to-br from-white/95 to-stone-50/95
                backdrop-blur-sm
                p-2.5 sm:p-3 md:p-5 lg:p-6
                shadow-lg md:shadow-xl
                transform -rotate-2
                
                /* Subtle elegant border */
                border border-stone-200/60
                rounded
            "
            style={{
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            }}
        >
            {/* Header - Compact on mobile */}
            <div className="relative mb-1.5 md:mb-4 pb-1.5 md:pb-3 border-b border-stone-200/60">
                <h3 className="font-serif text-xs md:text-base lg:text-lg font-semibold tracking-wide text-center">
                    <span className="text-red-700">Merry Christmas</span>
                </h3>
                <p className="font-serif text-[10px] md:text-sm text-center text-stone-600 mt-0.5">
                    My Dearest Venooo
                </p>
                {/* Decorative underline */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 md:w-20 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent" />
            </div>

            {/* Message - Truncated on mobile */}
            <p className="font-script text-xs sm:text-sm md:text-xl lg:text-2xl text-stone-600 leading-snug md:leading-relaxed mb-2 md:mb-5 text-center px-1 md:px-2 line-clamp-2 md:line-clamp-none">
                {message}
            </p>

            {/* Signature */}
            <div className="text-right pt-1 md:pt-2 border-t border-stone-100/60">
                <p className="font-sans text-[6px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] text-stone-400 uppercase mb-0.5 md:mb-1">
                    With all my love,
                </p>
                <p className="font-serif text-[10px] md:text-sm lg:text-base font-semibold text-stone-700 tracking-wide">
                    Your Aleem
                </p>
            </div>
        </motion.div>
    );
};

export const MobileNoteCard: React.FC<NoteCardProps & { isOpen: boolean; onToggle: () => void }> = () => null;
