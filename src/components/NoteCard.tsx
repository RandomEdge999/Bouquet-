import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Reply, Archive, Trash2, MoreHorizontal } from 'lucide-react';

interface NoteCardProps {
    subject: string;
    message: string;
    signature: string;
    isOpen: boolean;
    onClose: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ subject, message, signature, isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
                    />

                    {/* iOS Mail Interface Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 300 }}
                        className="
                            fixed z-[61]
                            inset-x-0 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
                            w-full sm:w-[450px]
                            h-[85vh] sm:h-auto sm:max-h-[80vh]
                            bg-white/90 glass-ios
                            rounded-t-[2.5rem] sm:rounded-[2.5rem]
                            shadow-2xl
                            flex flex-col
                            overflow-hidden
                        "
                    >
                        {/* Header Actions */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/50 bg-white/40">
                            <button
                                onClick={onClose}
                                className="flex items-center text-blue-500 font-medium text-base hover:opacity-70 transition-opacity"
                            >
                                <ChevronLeft size={22} className="-ml-1" />
                                <span>Inbox</span>
                            </button>

                            <span className="text-stone-400 text-xs font-medium tracking-wide">Messages</span>

                            <button onClick={onClose} className="text-blue-500 font-medium">
                                Done
                            </button>
                        </div>

                        {/* Email Headers */}
                        <div className="px-6 py-4 space-y-3 bg-white/20">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-stone-900 leading-tight mb-1">{subject}</h2>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-lg shadow-inner">
                                            👨🏻‍💻
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-stone-900 leading-none">Aleem</span>
                                            <span className="text-xs text-stone-500 mt-0.5">To: <span className="text-stone-800">My Venooo</span></span>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs text-stone-400 font-medium whitespace-nowrap pt-1">Just now</span>
                            </div>
                        </div>

                        <div className="h-px bg-stone-200/50 mx-6" />

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto px-8 py-6">
                            <div className="prose prose-stone prose-p:font-serif prose-p:text-lg prose-p:leading-relaxed prose-headings:font-sans text-stone-700">
                                <p className="whitespace-pre-line">{message}</p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-stone-100">
                                <p className="font-script text-2xl text-stone-800">{signature} ❤️</p>
                            </div>
                        </div>

                        {/* Bottom Toolkit */}
                        <div className="px-6 py-4 border-t border-stone-200/50 bg-stone-50/50 backdrop-blur-md flex items-center justify-between text-blue-500">
                            <Trash2 size={20} className="stroke-[1.5]" />
                            <Archive size={20} className="stroke-[1.5]" />
                            <Reply size={20} className="stroke-[1.5]" />
                            <MoreHorizontal size={20} className="stroke-[1.5]" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
