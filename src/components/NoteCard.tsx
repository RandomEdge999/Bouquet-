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
                
                /* Mobile: Bottom right corner, smaller */
                bottom-20 right-3
                w-[170px]
                
                /* Tablet: Slightly larger */
                sm:bottom-24 sm:right-4
                sm:w-[200px]
                
                /* Desktop: Right side, centered vertically, larger */
                md:bottom-auto md:right-8 lg:right-12
                md:top-1/2 md:-translate-y-1/2
                md:w-72 lg:w-80
                
                /* Card styling - Christmas colors */
                bg-gradient-to-br from-[#fffdf9]/95 to-[#fff5f5]/95
                backdrop-blur-sm
                p-3 sm:p-4 md:p-5 lg:p-6
                shadow-lg md:shadow-xl
                transform -rotate-2
                
                /* Festive border */
                border-2 border-red-100/50
                rounded-sm
            "
            style={{
                boxShadow: '0 8px 30px -8px rgba(220, 38, 38, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,0.5)'
            }}
        >
            {/* Christmas corner decorations */}
            <div className="absolute -top-1 -left-1 text-lg md:text-xl">🎄</div>
            <div className="absolute -top-1 -right-1 text-sm md:text-base">❄️</div>
            <div className="absolute -bottom-1 -left-1 text-sm md:text-base">🎁</div>
            <div className="absolute -bottom-1 -right-1 text-lg md:text-xl">⭐</div>

            {/* Header - Christmas greeting */}
            <div className="relative mb-2 md:mb-4 pb-2 md:pb-3 border-b border-red-200/50">
                <h3 className="font-serif text-sm md:text-base lg:text-lg font-semibold text-stone-700 tracking-wide text-center">
                    <span className="text-green-600">Merry</span> <span className="text-red-600">Christmas</span>,
                </h3>
                <p className="font-serif text-xs md:text-sm text-center text-rose-500 mt-0.5">
                    My Dearest Venooo 💕
                </p>
                {/* Decorative underline */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 md:w-16 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent" />
            </div>

            {/* Christmas Message */}
            <p className="font-script text-sm sm:text-base md:text-xl lg:text-2xl text-stone-600 leading-snug md:leading-relaxed mb-3 md:mb-5 text-center px-1 md:px-2 line-clamp-3 md:line-clamp-none">
                {message}
            </p>

            {/* Signature */}
            <div className="text-right pt-1.5 md:pt-2 border-t border-red-100/50">
                <p className="font-sans text-[7px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] text-stone-400 uppercase mb-0.5 md:mb-1">
                    With all my love this Christmas,
                </p>
                <p className="font-serif text-xs md:text-sm lg:text-base font-semibold text-stone-700 tracking-wide">
                    Your Aleem <span className="text-red-500">♥</span> 🎄
                </p>
            </div>
        </motion.div>
    );
};

// Export a dummy component for backwards compatibility if needed
export const MobileNoteCard: React.FC<NoteCardProps & { isOpen: boolean; onToggle: () => void }> = () => null;
