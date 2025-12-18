import React from 'react';
import { motion } from 'framer-motion';

interface NoteCardProps {
    message: string;
    signature: string;
}

export const NoteCard: React.FC<NoteCardProps> = ({ message }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 100 }}
            className="
                fixed z-20
                
                /* Mobile positioning */
                bottom-20 right-3
                w-[170px]
                
                /* Tablet */
                sm:bottom-24 sm:right-4
                sm:w-[200px]
                
                /* Desktop */
                md:bottom-auto md:right-8 lg:right-12
                md:top-1/2 md:-translate-y-1/2
                md:w-72 lg:w-80
                
                /* Premium card styling */
                bg-gradient-to-br from-white/95 to-stone-50/95
                backdrop-blur-sm
                p-3 sm:p-4 md:p-5 lg:p-6
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
            {/* Header */}
            <div className="relative mb-2 md:mb-4 pb-2 md:pb-3 border-b border-stone-200/60">
                <h3 className="font-serif text-sm md:text-base lg:text-lg font-semibold tracking-wide text-center">
                    <span className="text-red-700">Merry Christmas</span>
                </h3>
                <p className="font-serif text-xs md:text-sm text-center text-stone-600 mt-0.5">
                    My Dearest Venooo
                </p>
                {/* Decorative underline */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 md:w-20 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent" />
            </div>

            {/* Message */}
            <p className="font-script text-sm sm:text-base md:text-xl lg:text-2xl text-stone-600 leading-snug md:leading-relaxed mb-3 md:mb-5 text-center px-1 md:px-2 line-clamp-3 md:line-clamp-none">
                {message}
            </p>

            {/* Signature */}
            <div className="text-right pt-1.5 md:pt-2 border-t border-stone-100/60">
                <p className="font-sans text-[7px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] text-stone-400 uppercase mb-0.5 md:mb-1">
                    With all my love,
                </p>
                <p className="font-serif text-xs md:text-sm lg:text-base font-semibold text-stone-700 tracking-wide">
                    Your Aleem
                </p>
            </div>
        </motion.div>
    );
};

export const MobileNoteCard: React.FC<NoteCardProps & { isOpen: boolean; onToggle: () => void }> = () => null;
