import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface NoteCardProps {
    message: string;
    signature: string;
    isOpen: boolean;
    onClose: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ message, isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* MOBILE: Modal - Dead center of screen with backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="md:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        className="
                            md:hidden fixed z-[61]
                            inset-4 m-auto
                            w-auto max-w-[300px] h-auto max-h-[70vh]
                            overflow-y-auto
                            bg-gradient-to-br from-white to-stone-50
                            p-4 rounded-xl shadow-2xl
                            border border-stone-200
                        "
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {/* Close X Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
                        >
                            <X size={16} className="text-stone-500" />
                        </button>

                        {/* Content */}
                        <div className="text-center mb-3 pb-3 border-b border-stone-200/60">
                            <h3 className="font-serif text-lg font-bold text-red-700">🎄 Merry Christmas 🎄</h3>
                            <p className="font-serif text-sm text-stone-600 mt-1">My Dearest Venooo</p>
                        </div>
                        <p className="font-script text-base text-stone-600 leading-relaxed mb-4 text-center">{message}</p>
                        <div className="text-right pt-2 border-t border-stone-100">
                            <p className="text-[8px] tracking-widest text-stone-400 uppercase mb-0.5">With all my love,</p>
                            <p className="font-serif text-sm font-semibold text-stone-700">Your Aleem ❤️</p>
                        </div>
                    </motion.div>

                    {/* DESKTOP: Side Card - Conditional logic applied now */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.4 }}
                        className="
                            hidden md:block
                            fixed z-[60]
                            top-1/2 -translate-y-1/2
                            right-24 lg:right-32
                            w-72 lg:w-80
                            bg-gradient-to-br from-white/95 to-stone-50/95
                            backdrop-blur-sm
                            p-5 lg:p-6
                            shadow-xl
                            transform -rotate-2
                            border border-stone-200/60
                            rounded
                        "
                    >
                        {/* Desktop Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute -top-3 -right-3 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform z-10 text-stone-400 hover:text-rose-500"
                        >
                            <X size={16} />
                        </button>

                        <div className="relative mb-4 pb-3 border-b border-stone-200/60">
                            <h3 className="font-serif text-base lg:text-lg font-semibold tracking-wide text-center">
                                <span className="text-red-700">Merry Christmas</span>
                            </h3>
                            <p className="font-serif text-sm text-center text-stone-600 mt-0.5">My Dearest Venooo</p>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent" />
                        </div>

                        <p className="font-script text-xl lg:text-2xl text-stone-600 leading-relaxed mb-5 text-center px-2">{message}</p>

                        <div className="text-right pt-2 border-t border-stone-100/60">
                            <p className="font-sans text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-1">With all my love,</p>
                            <p className="font-serif text-sm lg:text-base font-semibold text-stone-700 tracking-wide">Your Aleem</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
