import React from 'react';
import { motion } from 'framer-motion';

interface MessageCardProps {
    text: string;
    signature: string;
    date: string;
    visible: boolean;
}

export const MessageCard: React.FC<MessageCardProps> = ({ text, signature, date, visible }) => {
    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
            className="bg-[#fdfbf7] p-8 max-w-sm mx-auto shadow-lg rotate-1 border border-stone-200 relative overflow-hidden"
            style={{ fontFamily: '"Playfair Display", serif' }}
        >
            {/* Decorative Stamp */}
            <div className="absolute top-4 right-4 w-12 h-16 border-2 border-dashed border-stone-300 opacity-50 flex items-center justify-center -rotate-6">
                <span className="text-[10px] text-stone-400 font-sans uppercase tracking-widest text-center">
                    First<br />Class
                </span>
            </div>

            <div className="flex flex-col space-y-4 text-stone-800">
                <div className="text-sm font-sans tracking-widest text-stone-400 uppercase">{date}</div>

                <p className="text-xl leading-relaxed whitespace-pre-line text-ink">
                    {text}
                </p>

                <div className="pt-4 text-right italic text-lg text-stone-600">
                    — {signature}
                </div>
            </div>

            {/* Paper texture feel */}
            <div className="absolute inset-0 bg-stone-50 opacity-10 pointer-events-none mix-blend-multiply" />
        </motion.div>
    );
};
